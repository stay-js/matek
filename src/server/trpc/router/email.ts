import { TRPCError } from '@trpc/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { env } from '@env/server.mjs';
import { router, publicProcedure } from '../trpc';
import { questions } from '@utils/questions';

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
        answers: z.unknown(),
      }),
    )
    .mutation(async ({ input: { user, answers } }) => {
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
        Az ön által megadott válaszok:
        ${questions.map((question, index) => {
          const answer = (answers as Record<string, number | null>)[question.id];
          const correct = question.correct === answer;

          return `
            <div>
            <b>${index + 1}. ${question.question}</b>
            <br />
            Ön válasza: <b>${answer ? question.answers[answer] : 'Nem adott meg választ.'}</b>
            <br />
            ${
              correct ? 'Helyes' : `Helytelen, helyes válasz: ${question.answers[question.correct]}`
            }
            </div>
            <br />
          `;
        })}
        <br />
        </div>
        `,
      };

      console.log(mailOptions);

      try {
        const status = await transporter.sendMail(mailOptions);
        return status;
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', cause: error });
      }
    }),
});
