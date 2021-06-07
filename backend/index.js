// const { response } = require('express');
const express = require('express')
const cors = require('cors');
const sqlite = require('sqlite3')

const app = express()

var bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());



const db = new sqlite.Database('./multilist.sqlite', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

    }
});

db.get("PRAGMA foreign_keys = ON");

app.get('/Listor', (request, response) => {
    db.all('SELECT * FROM lists ORDER BY created_at_date DESC, created_at_time DESC', (err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.status(200).json({rows});
    })
})


app.get('/getTasksDone/:listDid', (request, response) => {
    db.all('SELECT checked FROM list_items WHERE listDid = ?', [request.params.listDid], (err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.status(200).json({rows});
    })
})

app.get('/Lista/:id', (request, response) => {
    db.all('SELECT lists.list_name, list_items.id, list_items.checked, list_items.text FROM lists LEFT JOIN list_items ON lists.id = list_items.listDid WHERE lists.id = ?', [request.params.id], (err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.status(200).json({rows});
    })
})

app.put('/updateListName', (request, response) => {
    var reqBody = request.body;
    console.log(reqBody);
    db.run('UPDATE lists SET list_name =? WHERE id=?', [reqBody.list_name, reqBody.id],(err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.status(200).json({rows});
    })
})

app.put('/updateArticle', (request, response) => {
    var reqBody = request.body;
    console.log(reqBody);
    db.run('UPDATE list_items SET text =? WHERE id=?', [reqBody.text, reqBody.id],(err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.status(200).json({rows});
    })
})

app.put('/updateCheckboxValue', (request, response) => {
    var reqBody = request.body;
    console.log(reqBody);
    db.run('UPDATE list_items SET checked =? WHERE id=?', [reqBody.checked, reqBody.id],(err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.status(200).json({rows});
    })
})

app.delete('/deleteList', (request, response) => {
    var reqBody = request.body;
    console.log(reqBody);
    db.run('DELETE FROM lists WHERE id =?', [reqBody.id],(err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.status(200).json({rows});
    })
})

app.delete('/deleteArticle', (request, response) => {
    var reqBody = request.body;
    console.log(reqBody);
    db.run('DELETE FROM list_items WHERE id =?', [reqBody.id],(err, rows) => {
        if (err) {
            response.status(400).json({"error": err.message});
            return;
        }
        response.status(200).json({rows});
    })
})


app.post('/SkapaLista/',(request, response) => {
    var reqBody = request.body;
    console.log(reqBody)
    db.run('INSERT INTO lists (list_name) VALUES (?)',
    [reqBody.list_name],
    function (err, result) {
        if (err) {
            response.status(400).json({"error": err.message})
            return;
        }
        response.status(201).json({
            "listID": this.lastID
        })
    })
})

app.post('/SkapaArtikel/',(request, response) => {
    var reqBody = request.body;
    console.log(reqBody)
    db.run('INSERT INTO list_items (text, listDid, checked) VALUES (?, ?, ?)',
    [reqBody.text, reqBody.listDid, reqBody.checked], 
    function (err, result) {
        if (err) {
            response.status(400).json({"error": err.message})
            return;
        }
        console.log(response)
        response.status(201).json({
            "ItemID": this
        })
    })
})


app.get('/', (request, response) => {
    response.send('hej')
})

app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})