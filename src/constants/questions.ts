export const questions = [
  {
    id: 'clbclvfj800003b6d1b2tegev',
    level: 1,
    question: 'Két egymás után következő természetes szám szorzata 552. Melyik ez a két szám?',
    answers: ['22 és 23', '-23 és -24', '23 és 24', '-21 és -22'],
    correct: 2,
  },
  {
    id: 'clbclvp6i00013b6dhvjsqwdr',
    level: 1,
    question:
      'Egy ballagó osztályban mindenki megajándékozta minden osztálytársát a saját fényképével. Mennyi volt az osztálylétszám, ha 1056 fénykép cserélt gazdát?',
    answers: ['33', '46', '13', '39'],
    correct: 0,
  },
  {
    id: 'clbdxykpk00003b6djuitz757',
    level: 1,
    question:
      'Labdarúgó-bajnokságon, amelyen minden csapat egy alkalommal játszott a többi csapattal, 55 mérkőzést játszottak. Hány csapat vett részt a bajnokságon?',
    answers: ['23', '10', '12', '11'],
    correct: 3,
  },
  {
    id: 'clbdxyphu00013b6dy3ahc980',
    level: 2,
    question:
      '19 200 Ft-ot kell bizonyos számú személy között egyenlően elosztani. Ha kettővel kevesebben volnának, akkor mindegyiknek 800 Ft-tal több jutna. Hányan voltak eredetileg?',
    answers: ['5', '10', '9', '8'],
    correct: 3,
  },
  {
    id: 'clbdxyt7u00023b6d92yjgip6',
    level: 2,
    question:
      'Egy könyvtárból 720 oldalas könyvet kölcsönöztem. Ha naponta 20 oldallal többet olvasnék el, mint kezdetben terveztem, akkor 6 nappal előbb olvasnám el a könyvet. Hány napig olvastam volna a könyvet eredetileg?',
    answers: ['18', '16', '17', '22'],
    correct: 0,
  },
  {
    id: 'clbdxywti00033b6dh8esuj68',
    level: 2,
    question:
      'Kétfajta áruból vásároltunk, mindkettőből 3600 Ft értékben. Az első fajta áruból, amelyiknek kg-ja 20 Ft-tal volt drágább, mint a másiké, 2 kg-mal kevesebbet vettünk. Mekkora mennyiséget vásároltunk a két áruból?',
    answers: ['18kg és 21kg', '16kg és 20kg', '18kg és 20kg', '22kg és 17kg'],
    correct: 2,
  },
  {
    id: 'clbdy2duw000g3b6dawtjhmzf',
    level: 3,
    question:
      'Egy társaság 48 000 Ft-ért kisbuszt bérelt. Az elutazás pillanatában még egy utas csatlakozott hozzájuk, így mindegyik utasnak 200 Ft-tal kevesebbet kellett fizetnie. Hány utas volt eredetileg?',
    answers: ['13', '15', '19', '16'],
    correct: 1,
  },
  {
    id: 'clbdxz64400053b6dr36qq36r',
    level: 3,
    question:
      'Egy kétjegyű szám számjegyeinek összege 9. Ha a számjegyeket felcseréljük és az így kapott számot az eredetivel megszorozzuk, szorzatul 2268-at kapunk. Melyik ez a szám?',
    answers: ['36 és 63', '18 és 81', '45 és 54', 'Nincs megoldás'],
    correct: 0,
  },
  {
    id: 'clbdxz9gu00073b6d4fcikok8',
    level: 3,
    question:
      'Határozzuk meg azt a kétjegyű számot, amelyben az egyesek száma 2-vel nagyobb a tízesek számánál, és ha a számot megszorozzuk a számjegyeinek az összegével, akkor 144-et kapunk. Melyik ez a szám? ',
    answers: ['26', '24', '19', '31'],
    correct: 1,
  },
  {
    id: 'clbdxze5u00083b6dz0xxnu4p',
    level: 4,
    question:
      'Egy áru árát felemelték, majd később - mivel nem fogyott - kétszer annyi százalékkal csökkentették, mint ahány százalékkal felemelték annak idején. Így az eredeti árnál 5,5%-kal lett olcsóbb. Hány százalékkal emelték fel az árát eredetileg?',
    answers: ['5%-kal', '10%-kal', '7%-kal', '11%-kal'],
    correct: 0,
  },
  {
    id: 'clbdxzhhj000a3b6dgdklh3xa',
    level: 4,
    question: 'Hány oldalú sokszögnek van annyi átlója, ahány oldala?',
    answers: ['4', '5', '6', '9'],
    correct: 1,
  },
  {
    id: 'clbdy32if000j3b6dfckxpavf',
    level: 4,
    question:
      'Egy sakkverseny minden résztvevője pontosan egy játszmát játszott a többi résztvevő mindegyikével. Ezen a versenyenösszesen 153 partit játszottak le. Hányan vettek részt a sakkversenyen?',
    answers: ['11', '24', '18', '19'],
    correct: 2,
  },
  {
    id: 'clbdxzowu000d3b6dgtrqel5u',
    level: 4,
    question:
      'Két kombájn együtt 4 nap alatt learatta a szövetkezet búzatábláját. Az egyik kombájn egyedül 6 nappal hosszabb idő alatt végezte volna el ugyanazt az aratási munkát, mint a másik. Hány napig aratott volna külön-külön a két kombájn?',
    answers: ['5 és 14 nap', '6 és 12 nap', '8 és 9 nap', '4 és 14 nap'],
    correct: 1,
  },
] as const;

export const levels = 4;

export type Question = typeof questions[number];
