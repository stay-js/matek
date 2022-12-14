import { TRPCError } from '@trpc/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { env } from '@env/server.mjs';
import { questions, levels } from '@constants/questions';
import { router, publicProcedure } from '../../trpc';

const transporter = nodemailer.createTransport({
  host: env.NODEMAILER_HOST,
  port: Number(env.NODEMAILER_PORT),
  secure: true,
  auth: {
    user: env.NODEMAILER_USER,
    pass: env.NODEMAILER_PASS,
  },
});

export const emailRouter = router({
  send: publicProcedure
    .input(
      z.object({
        user: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        answers: z.record(z.number()),
        level: z.number(),
      }),
    )
    .mutation(async ({ input: { user, answers, level } }) => {
      const answeredQuestions = questions.filter((question) => question.level <= level);
      const correctAnswers = answeredQuestions.filter(
        (question) => question.correct === answers[question.id],
      ).length;

      const mailOptions = {
        from: `Matek - noreply<${env.NODEMAILER_USER}>`,
        to: user.email,
        subject: 'Eredmények',
        html: `
        <div>
        Név: <b>${user.name}</b>
        <br />
        E-mail: <b>${user.email}</b>
        </div>
        <br />

        <div>
        Ön a(z) <b>${level}.</b> szintig jutott el <b>${levels}</b> szintből.
        Eredmény: <b>${((correctAnswers / answeredQuestions.length) * 100).toFixed(2)}%</b>
        <br />
        Összesen <b>${
          answeredQuestions.length
        }</b> kérdésből <b>${correctAnswers}</b> helyes választ adott meg.
        </div>
        <br />
    
        <div>
        Az ön által megadott válaszok:
        ${answeredQuestions
          .map((question, index) => {
            return `
            <div>
            <b>${index + 1}. ${question.question}</b>
            <br />
            Az ön válasza: <b>${
              question.answers[answers[question.id]] || 'Nem adott meg választ.'
            }</b>
            <br />
            Helyes válasz: <b>${question.answers[question.correct]}</b>
            </div>
            <br />
          `;
          })
          .join('')}

        </div>
        `,
      };

      try {
        const status = await transporter.sendMail(mailOptions);
        return status;
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', cause: error });
      }
    }),
});
