export const questions = [
  {
    id: 'clbclvfj800003b6d1b2tegev',
    question: 'Két egymás után következő természetes szám szorzata 552. Melyik ez a két szám?',
    answers: ['22 és 23', '-23 és -24', '23 és 24', '-21 és -22'],
    correct: 2,
  },
  {
    id: 'clbclvp6i00013b6dhvjsqwdr',
    question:
      'Egy ballagó osztályban mindenki megajándékozta minden osztálytársát a saját fényképével. Mennyi volt az osztálylétszám, ha 1056 fénykép cserélt gazdát?',
    answers: ['33', '46', '13', '39'],
    correct: 0,
  },
] as const;

export type Question = typeof questions[number];
