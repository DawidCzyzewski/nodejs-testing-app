// TODO: zainstalować supertest -D
const request = require("supertest");
const app = require("./app");
describe("Dogs", () => {
  beforeAll(async () => {
    // tu jest mongodb z TODO na dole. Trzeba tylko w afterAll zamknąć zmockowane połączenie
    // można też użyć jest (google) mock-a-function-from-another-file-jest
  });

  it("should return dogs on /dogs endpoint"),
    async () => {
      //given
      const route = "/dogs";
      //when
      const response = await request(app).get(route);
      // then(expected)
      expect(response.body).toEqual([]);
    };
});

// Jest problem bo nie połączyliśmy się z bazą danych. Tu by wypadało zmockować jakąś bazę danych. Generalnie chodzi o użycie supertest na endpointach
// TODO: npm install --save-dev @shelf/jest-mongodb
