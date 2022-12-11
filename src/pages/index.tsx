import type { NextPage } from 'next';
import type { Props as User } from '@components/User';
import { useState } from 'react';
import { Layout } from '@layouts/Layout';
import { questions, levels } from '@utils/questions';
import { Form } from '@components/User';
import { EmailPopup, LevelFailedPopup } from '@components/Popup';
import { trpc } from '@utils/trpc';

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
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
      console.log(
        currentQuestions.filter((question) => question.correct === answers[question.id]).length,
      );
      console.log(currentQuestions.filter((question) => question.correct === answers[question.id]));
      if (
        currentQuestions.filter((question) => question.correct === answers[question.id]).length < 2
      )
        return setIsLevelFailedPopupOpen(true);

      window.scrollTo({ top: 0 });
      setLevel(level + 1);
    }

    if (level === levels) setIsDone(true);
  };

  if (!user) {
    return (
      <Layout path="/" title="Matek - Zétény Nagy" desc="Matek - Zétény Nagy">
        <Form setUser={setUser} />
      </Layout>
    );
  }

  if (!level) {
    return (
      <Layout path="/" title="Matek - Zétény Nagy" desc="Matek - Zétény Nagy">
        <section className="mx-auto flex min-h-screen w-11/12 flex-col items-center justify-center">
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-neutral-800 p-8 text-sm shadow-2xl sm:p-12 md:px-20">
            <h2 className="text-xl font-bold text-neutral-50">Szabályok, játék menete</h2>
            <p>
              Az utolsó szint kivételével, minden szinten 3 kérdés található. Ha legalább 2 kérdésre
              jól válaszol tovább jut következő szintre. Ha nem, akkor újra próbálhatja az utolsó
              szintet, vagy befelyezhezi a játékot.
            </p>

            <button
              className="group flex w-full items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium  text-white hover:from-green-400 hover:to-blue-600 hover:text-white"
              type="button"
              onClick={() => setLevel(1)}
            >
              <span className="flex w-full items-center justify-center rounded-md bg-neutral-800 px-6 py-3 transition-all group-hover:bg-opacity-0">
                Rendben
              </span>
            </button>
          </div>
        </section>
      </Layout>
    );
  }

  if (isDone) {
    const answeredQuestions = questions.filter((question) => question.level <= level);
    const correctAnswers = answeredQuestions.filter(
      (question) => question.correct === answers[question.id],
    ).length;

    return (
      <Layout path="/" title="Matek - Zétény Nagy" desc="Matek - Zétény Nagy">
        <section className="mx-auto flex min-h-screen w-11/12 flex-col items-center justify-center">
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-neutral-800 p-8 text-sm shadow-2xl sm:p-12 md:px-20">
            <h2 className="text-xl font-bold text-neutral-50">Köszönjük a játékot!</h2>
            <ul>
              <li>
                Ön az <b>{level}</b> szintig jutott el {levels} szintből.
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
            <button
              className="group flex w-full items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium  text-white hover:from-green-400 hover:to-blue-600 hover:text-white"
              type="button"
              onClick={() => user && level && mutate({ user, answers, level })}
            >
              <span className="flex w-full items-center justify-center rounded-md bg-neutral-800 px-6 py-3 transition-all group-hover:bg-opacity-0">
                Kérem az eredményt!
              </span>
            </button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout path="/" title="Matek - Zétény Nagy" desc="Matek - Zétény Nagy">
      <div>
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
                        checked={answers[question.id] === index}
                        onChange={() => setAnswers({ ...answers, [question.id]: index })}
                      />

                      <label htmlFor={`${question.id}-${index}`}>{answer}</label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="group flex w-full items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium  text-white hover:from-green-400 hover:to-blue-600 hover:text-white"
                type="button"
                onClick={
                  index === currentQuestions.length - 1
                    ? handleNextLevel
                    : () =>
                        document
                          .getElementById(currentQuestions[index + 1].id)
                          ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span className="flex w-full items-center justify-center rounded-md bg-neutral-800 px-6 py-3 transition-all group-hover:bg-opacity-0">
                  {index === currentQuestions.length - 1
                    ? level === levels
                      ? 'Elküldöm'
                      : 'Következő szint'
                    : 'Következő'}
                </span>
              </button>
            </div>
          </section>
        ))}
      </div>

      <EmailPopup
        isOpen={isEmailPopupOpen}
        setIsOpen={setIsEmailPopupOpen}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <LevelFailedPopup
        isOpen={isLevelFailedPopupOpen}
        setIsOpen={setIsLevelFailedPopupOpen}
        setIsDone={setIsDone}
      />
    </Layout>
  );
};

export default Home;
