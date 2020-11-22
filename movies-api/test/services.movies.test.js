const assert = require('assert');
const proxyquire = require('proxyquire');

const { getAllStub, mongoLibMock } = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');

describe('services-movies', function () {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': mongoLibMock
  });
  const movieService = new MoviesServices();
  describe('when getMovies method is called', async function () {
    it('should call de getAll mongoLib method', async function () {
      await movieService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });
  });
});