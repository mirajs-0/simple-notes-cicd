const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Notes API', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(2)
  })

  test('a valid note can be added', async () => {
    const newNote = { content: 'async/await simplifies making async calls' }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
  })

  test('health check returns ok', async () => {
    await api
      .get('/health')
      .expect(200)
  })
})