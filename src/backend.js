const express = require('express')
const app = express()
const port = '3000'

const fs = require('fs')

app.listen(port, (req, res) => {
  console.log(`⌛ Listening to port ${port}...`)
})

// Add the following middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/membros', (req, res) => {
  fs.readFile('./public/membros.json', 'utf-8', (err, data) => {
    if (err) { console.error('erro ao ler arquivo', err); return res.status(500).json({ error: "erro ao ler arquivo" }); }
    const membrosList = JSON.parse(data)
    console.log("GET: membros")
    return res.status(200).send(membrosList)
  });
})

app.get('/functions', (req, res) => {
  fs.readFile('./public/functions_list.json', 'utf-8', (err, data) => {
    if (err) { console.error('erro ao ler arquivo', err); return res.status(500).json({ error: "erro ao ler arquivo" }); }
    const functions_list = JSON.parse(data)
    console.log("GET: functions")
    return res.status(200).send(functions_list)
  });
})

let currentId = 1

app.post('/membro', (req, res) => {
  const membro_submited_by_form = req.query
  // const id = currentId++
  // let novo = JSON.parse(membro_submited_by_form)
  // novo.push("aaa")
  // novo = JSON.stringify(novo)
  // membro_submited_by_form = novo

  console.log("POST: membro")


  if (!membro_submited_by_form || typeof membro_submited_by_form !== 'object') res.status(400).json({ error: "Query com parametros inválidos" })
  fs.readFile('./public/membros.json', 'utf-8', (err, data) => {
    if (err) { console.error('erro ao ler o arquivo', err); return res.status(500).json({ error: 'erro ao ler o arquivo' }) }
    try {
      const json_membros_to_object = JSON.parse(data)
      json_membros_to_object.membros.push(membro_submited_by_form)
      const object_membros_to_json = JSON.stringify(json_membros_to_object, null, 2)

      fs.writeFile('./public/membros.json', object_membros_to_json, 'utf-8', (err) => {
        if (err) { console.error('erro ao escrever no arquivo', err); return res.status(500).json({ error: 'erro ao escrever no arquivo' }) }
        console.log('Arquivo escrito com sucesso!'); return res.status(200).json({ message: 'Arquivo escrito com sucesso!' })
      })
    } catch (parseError) { console.error('erro no parse', parseError); return res.status(500).json({ error: 'erro no parse' }) }
  })
});

// app.put('/membros', (req, res) => {
//   const membro_submited_by_form = req.query
//   if (!membro_submited_by_form || typeof membro_submited_by_form !== 'object') res.status(400).json({ error: "Query com parametros inválidos" })

//   fs.readFile('./public/membros.json', 'utf-8', (err, data) => {
//     if (err) { console.error('erro ao ler o arquivo', err); return res.status(500).json({ error: 'erro ao ler o arquivo' }) }
//     try {
//       const json_membros_to_object = JSON.parse(data)
//       json_membros_to_object.membros.push(membro_submited_by_form)
//       const object_membros_to_json = JSON.stringify(json_membros_to_object, null, 2)

//       fs.writeFile('./public/membros.json', object_membros_to_json, 'utf-8', (err) => {
//         if (err) { console.error('erro ao escrever no arquivo', err); return res.status(500).json({ error: 'erro ao escrever no arquivo' }) }
//         console.log('Arquivo escrito com sucesso!'); return res.status(200).json({ message: 'Arquivo escrito com sucesso!' })
//       })
//     } catch (parseError) { console.error('erro no parse', parseError); return res.status(500).json({ error: 'erro no parse' }) }
//   })
// });


