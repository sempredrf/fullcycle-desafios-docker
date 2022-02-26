const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Diego')`
connection.query(sql)
// connection.end()

app.get('/', (req,res) => {
    const sqlSelect = 'SELECT * FROM people LIMIT 1';
    connection.query(sqlSelect, (err, results) => {
        if (err) {
            res.status(500).send(`error: ${err}`)
        } else {

            let html = '<h1>FullCycle Rocks!</h1><h2>People</h2><ul>'

            results.forEach(result => {
                html += `<li>${result.name}</li>`
            })            
            res.send(html)
        }
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})