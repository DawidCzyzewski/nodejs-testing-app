// typescript, nextjs to dobre kieruni po kursie

// Są dwa nurty pisania testów:
// 1. Code-first: Najpierw piszemy kod, później testy. W trakcie pisania testujemy manulanie, po napisaniu odpalamy testy czy jest wszystko ok. Warto stosować, jak piszemy coś nowego i nie koniecznie wiemy jak dokładnie ma działać. Np. dostajemy makiete, ui, mamy stworzyć formularz, który ma 3 pola z czego jedno select jedno button. Zaczynamy więc od funkcjonalności, żeby zobaczyć, czy np. select ma kilka pól, czy jedno, czy wyszukiwarkę na górze czy kilka do zaznaczenia itp. Czyli przy tworzeniu funkcjonalności, której jeszcze dokładnie nie mamy obmyślonej, czy to będzie flex, czy grid czy co.
// 2. Test-first: Najpierw piszemy testy (które nie będą działać, bo nie mają na czym) a później piszemy kod, który będzie spełniał wymagania testów. Podejście jest fajne jak wiemy dokładnie co ma się zadziać. Mamy np. już jedną usługę napisaną i chcemy napisać nową bo poprzednia jest już stara i wiemy co chcemy otrzymywać, czyli po np. POST ... mamy otrzymać ... więc można już napisać testy z góry, żeby pisząc kod można sprawdzać czy wszystko jest ok

// ------------------------------Code-----------------

const getSome = (first) => {
  return first + 6;
};
const getValue = () => {
  return localStorage.getItem("storedValue");
};

// dzielenie
export const divide = (first, second, isMulti = false) => {
  //   const getSomeValue = getSome(first);

  // refaktor sprawił, że ostatnie isMulti (punkt 4. ) piszemy pierwsze, bo jest najważniejsze i wtedy te z mnożeniem czy dzieleniem schodzą na drugi plan
  if (isMulti) {
    return first * second;
  }

  // if (isMulti) {
  //     return getSomeValue * second;
  //   }

  //   if (isMulti) {
  //     return getSomeValue * second * getValue();
  //   }
  if (first === 0) {
    return "lol...";
  }
  if (second === 0) {
    return "you cannot";
  }
  return first / second;
};

// -----------------------------tests------------------
// pseudokod czyli hipotetyczne odpowiedzi przy zmiennych:
// 1. dwie liczby dodatnie np. 8 i 4 powinny dać 2
// przykłąd matchersa: expect(divide(8,4)).toBe(2)

// albo funckcja wydmuszka getValue
// getValue = () => 1

// teraz SPY czyli sprawdź ile razy funkcja getValue została wykoanana dla parametów 8 i 4 (bo np jeśli multi jest false to powinna zostac wykonana 0 razy)

// 2. Nie dzielimy przez 0, np. 8 i 0 powinny dać "you cannot"
// 3. Jeśli pierwsza liczba 0, zwróć 'lol...'
// 4. Jeśli trzeci argument to true, zwróć mnożenie zamiast dzielenia np. 7, 4, true da wynik 28

// mock - taka wydmuszka do użycia funckji, której nie znamy, np. getSomeValue
// getSomeValue = (some) => some;
