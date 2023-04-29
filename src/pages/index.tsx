import type { NextPage } from 'next';
import type { Props as User } from '@components/User';
import type { Question } from '@constants/questions';
import { useState } from 'react';
import { trpc } from '@utils/trpc';
import { questions, levels } from '@constants/questions';
import { Form } from '@components/User';
import { EmailPopup, LevelFailedPopup } from '@components/Popup';
import { Meta } from '@components/Meta';
import { Button } from '@components/Button';

export const Content: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [level, setLevel] = useState<number | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState<boolean>(false);
  const [isLevelFailedPopupOpen, setIsLevelFailedPopupOpen] = useState<boolean>(false);

  const currentQuestions = questions.filter((question) => question.level === level);

  const { mutate, isLoading, isSuccess } = trpc.email.send.useMutation({
    onMutate: () => setIsEmailPopupOpen(true),
  });

  const handleNextLevel = () => {
    if (level && level < levels) {
      if (
        currentQuestions.filter((question) => question.correct === answers.get(question.id))
          .length < 2
      ) {
        return setIsLevelFailedPopupOpen(true);
      }

      window.scrollTo({ top: 0 });
      setLevel(level + 1);
    }

    if (level === levels) setIsDone(true);
  };

  if (!user) {
    return (
      <main>
        <Form setUser={setUser} />
      </main>
    );
  }

  if (!level) {
    return (
      <main className="mx-auto flex min-h-screen w-11/12 flex-col items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-neutral-800 p-8 text-sm shadow-2xl sm:p-12 md:px-20">
          <h2 className="text-xl font-bold text-neutral-50">Szabályok, játék menete</h2>
          <p>
            Az utolsó szint kivételével, minden szinten 3 kérdés található. Ha legalább 2 kérdésre
            jól válaszol tovább jut következő szintre. Ha nem, akkor újra próbálhatja az utolsó
            szintet, vagy befelyezhezi a játékot.
          </p>

          <Button onClick={() => setLevel(1)}>Rendben</Button>
        </div>
      </main>
    );
  }

  if (isDone) {
    const answeredQuestions = questions.filter((question) => question.level <= level);
    const correctAnswers = answeredQuestions.filter(
      (question) => question.correct === answers.get(question.id),
    ).length;

    return (
      <main>
        <section className="mx-auto flex min-h-screen w-11/12 flex-col items-center justify-center">
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-neutral-800 p-8 text-sm shadow-2xl sm:p-12 md:px-20">
            <h2 className="text-xl font-bold text-neutral-50">Köszönjük a játékot!</h2>
            <ul>
              <li>
                Ön a(z) <b>{level}.</b> szintig jutott el <b>{levels}</b> szintből.
              </li>
              <li>
                Eredmény: <b>{((correctAnswers / answeredQuestions.length) * 100).toFixed(2)}%</b>
              </li>
              <li>
                Összesen <b>{answeredQuestions.length}</b> kérdésből <b>{correctAnswers}</b> helyes
                választ adott meg.
              </li>
            </ul>

            <p>
              Amennyiben szeretné, hogy válaszait, az ön által megadott e-mail címre elküldjük,
              nyomja meg az alábbi gombot.
            </p>

            <Button onClick={() => mutate({ user, answers, level })}>Kérem az eredményt!</Button>
          </div>
        </section>

        <EmailPopup
          isOpen={isEmailPopupOpen}
          setIsOpen={setIsEmailPopupOpen}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </main>
    );
  }

  return (
    <main>
      {currentQuestions.map((question, index) => (
        <section
          key={question.id}
          id={question.id}
          className="mx-auto flex min-h-screen w-11/12 flex-col items-center justify-center"
        >
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-neutral-800 p-8 text-sm shadow-2xl sm:p-12 md:px-20">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-medium text-neutral-300">
                {(level - 1) * 3 + index + 1}. Kérdés
              </h2>

              <h3 className="w-fit font-medium text-neutral-300">{question.question}</h3>

              <div className="flex flex-col gap-2">
                {question.answers.map((answer, index) => (
                  <div
                    key={`${question.id}-${index}`}
                    className="flex w-fit cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      id={`${question.id}-${index}`}
                      checked={answers.get(question.id) === index}
                      onChange={() => setAnswers(new Map(answers.set(question.id, index)))}
                    />

                    <label htmlFor={`${question.id}-${index}`}>{answer}</label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={
                index === currentQuestions.length - 1
                  ? handleNextLevel
                  : () =>
                      document
                        .getElementById((currentQuestions[index + 1] as Question).id)
                        ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {index === currentQuestions.length - 1
                ? level === levels
                  ? 'Befejezem'
                  : 'Következő szint'
                : 'Következő'}
            </Button>
          </div>
        </section>
      ))}

      <LevelFailedPopup
        isOpen={isLevelFailedPopupOpen}
        setIsOpen={setIsLevelFailedPopupOpen}
        setIsDone={setIsDone}
      />
    </main>
  );
};

const Page: NextPage = () => (
  <>
    <Meta path="/" title="Matek - Zétény Nagy" desc="Matek - Zétény Nagy" />

    <Content />
  </>
);

export default Page;
