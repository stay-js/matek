import type { NextApiHandler } from 'next';
import nodemailer from 'nodemailer';
import { questions, levels } from '@constants/questions';
import SuperJSON from 'superjson';
import { z } from 'zod';
import { env } from 'src/env.mjs';

const Schema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  answers: z.map(z.string(), z.number()),
  level: z.number(),
});

export type Props = z.infer<typeof Schema>;

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (env.NODE_ENV === 'production' && req.headers.origin !== 'https://matek.znagy.hu') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (!req.body) return res.status(400).json({ error: 'No request body' });

  const result = Schema.safeParse(SuperJSON.parse(req.body as string));

  if (!result.success) return res.status(400).json({ error: 'Invalid request body' });

  const { user, answers, level } = result.data;

  const answeredQuestions = questions.filter((question) => question.level <= level);
  const correctAnswers = answeredQuestions.filter(
    (question) => question.correct === answers.get(question.id),
  ).length;

  try {
    const transporter = nodemailer.createTransport({
      host: env.NODEMAILER_HOST,
      port: Number(env.NODEMAILER_PORT),
      secure: true,
      auth: {
        user: env.NODEMAILER_USER,
        pass: env.NODEMAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: 'Matek - noreply<noreply@znagy.hu>',
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
                question.answers[answers.get(question.id) as number] ?? 'Nem adott meg választ.'
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
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
