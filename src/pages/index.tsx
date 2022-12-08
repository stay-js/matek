import type { NextPage } from 'next';
import type { Props as User } from '@components/User';
import { useState } from 'react';
import { Layout } from '@layouts/Layout';
import { questions } from '@utils/questions';
import { Form } from '@components/User';
import { Popup } from '@components/Popup';
import { trpc } from '@utils/trpc';

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const { mutate, isLoading, isSuccess } = trpc.email.send.useMutation({
    onMutate: () => setIsPopupOpen(true),
  });

  if (!user) {
    return (
      <Layout path="/" title="Matek - Zétény Nagy" desc="Matek - Zétény Nagy">
        <Form setUser={setUser} />
      </Layout>
    );
  }

  return (
    <Layout path="/" title="Matek - Zétény Nagy" desc="Matek - Zétény Nagy">
      <div>
        {questions.map((question, index) => (
          <section
            key={question.id}
            id={question.id}
            className="mx-auto flex min-h-screen w-11/12 flex-col items-center justify-center"
          >
            <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-neutral-800 p-8 text-sm shadow-2xl sm:p-12 md:px-20">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium text-neutral-300">{index + 1}. Kérdés</h2>

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

              {index === questions.length - 1 ? (
                <button
                  className="group flex w-full items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium  text-white hover:from-green-400 hover:to-blue-600 hover:text-white"
                  type="button"
                  onClick={() => mutate({ user, answers })}
                >
                  <span className="flex w-full items-center justify-center rounded-md bg-neutral-800 px-6 py-3 transition-all group-hover:bg-opacity-0">
                    Elküldöm
                  </span>
                </button>
              ) : (
                <button
                  className="group flex w-full items-center rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 font-medium  text-white hover:from-green-400 hover:to-blue-600 hover:text-white"
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(questions[index + 1].id)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  <span className="flex w-full items-center justify-center rounded-md  bg-neutral-800 px-6 py-3 transition-all group-hover:bg-opacity-0">
                    Következő
                  </span>
                </button>
              )}
            </div>
          </section>
        ))}
      </div>

      <Popup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </Layout>
  );
};

export default Home;
