const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

let notes = [
  { id: 1, content: 'HTML is easy' },
  { id: 2, content: 'Browser can execute only JavaScript' },
]

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.post('/api/notes', (req, res) => {
  const note = {
    id: notes.length + 1,
    content: req.body.content
  }
  notes = notes.concat(note)
  res.json(note)
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('1')
})

const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`) // eslint-disable-line no-console
  })
}

module.exports = app