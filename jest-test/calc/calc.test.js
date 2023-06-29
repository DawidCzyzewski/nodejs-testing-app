// runner łączy, tworzy środowisko testowe
// reporter - informacja o tym co się wydarzyło, pokazuje wyniki działania środowiska
// matchers - porównywanie, sprawdzzenie wartości, np czy to string, czy obiekt itp
// SPY - sprawdza ile razy się coś wykonało, sprawdzamy czy zostało wywołane
// Mock - tworzenie wydmuszek zewnętrznych funkcji? Nadpisujemy na dany moment odpowiedź, np. true lub false itp
// coverage - pokrycie testami, czyli czy cały kod został przetestowany i dostajemy tabelę zwrotną

// jest też libka supertest i w prosty sposób możemy dzięki niej testować endpointy

// jeśli w calc exportowałem moduł jako obiekt, to tu też musi być obiekt importowany, jeśli jako element (bez wąsów) to tu analogicznie
const { calc } = require("./calc");

// describe to zbiór testów, który opisujemy jak najbardziej deskryptywnie co do tego, co będziemy robić. Adrian najczęściej stosuje tu nazwę funkcji, którą testuje, tak zrobię i ja w tym przypadku
describe("Calc", () => {
  // oprócz describe i test (it) są jeszcze beforeAll, beforeEach, afterAll, afterEach - jak sama nazwa wskazuje. Służą między innymi co mockowania czegoś w beforach, np do localstorage albo setTimeout czy coś takiego i później w afterach zdejmujemy

  beforeAll(() => {
    console.log("beforeAll");
  });
  beforeEach(() => {
    console.log("beforeEach");
  });

  // tu będą testy. Testy można pisać przez test() lub it(). Nie ma to znaczenia, robi to dokładnie to samo
  // przy pisaniu testów opisowych it lepiej brzmi
  it("should return 4 if we invoke calc with 1, 3, add", () => {
    // given
    // given to jest to co jest nadane z zewnątrz, teraz nie mamy nic
    const expected = 4;

    // when
    const result = calc(1, 3, "add");

    // then
    // zamist .toBe można użyc jeszcze toEqual, toBeTruthy, toBeNull, toBeUndefinied, toBeDefinied, toBeGreaterThan etc (jest tego masa, dokumentacja) lub po prostu not
    // expect(result).not.toBe(expected);
    expect(result).toBe(expected);
    expect().toHaveBeenCalledWith(calc, 1, 3, "add");
  });

  it("should return 8, for calc with 4, 2, multi", () => {
    // given
    const expected = 8;
    // when
    const result = calc(4, 2, "multi");
    // then
    expect(result).toBe(expected);
  });

  it("should return 0, for calc with action undefinied", () => {
    const expected = 0;

    const result = calc(1, 2);

    expect(result).toBe(expected);
  });
});
