const express = require('express');
const mysql = require('mysql');

const app = express();
app.listen(3000, () => {
  console.log('server: running');
});

//G

var addAmount = 0;

app.get('/api/counter/add', (req, res) => {
  addAmount++;
  res.send({ message: 'added 1 to counter' });
});

app.get('/api/counter/get', (req, res) => {
  res.send({ 'currentAmount': addAmount });
});

//VG

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lab2'
});
connection.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('mySQL: connected');
});


app.post('/api/note', (req, res) => {
  var content = req.query.content;
  connection.query('INSERT INTO sticky_notes (name, content) VALUES ("' + req.query.name + '", "' + ((content) ? content : null) + '")', (err) => {
    if(err) { 
      throw err;
    }
    res.send({ message: 'sticky note created' });
  });
});

app.get('/api/note', (req, res) => {
  connection.query('SELECT * FROM sticky_notes WHERE id = "' + req.query.id + '"', (err) => {
    if(err) {
      throw err;
    }
    res.send({ message: 'sticky note read' });
  });
});

app.put('/api/note', (req, res) => {
  var name = req.query.name;
  var content = req.query.content;
  connection.query('UPDATE sticky_notes SET ' + ((name) ? 'name = "' + name + '"' : '') + ((name && content) ? ', ' : '') + ((content) ? 'content = "' + content + '"' : '') + ' WHERE id = "' + req.query.id + '"', (err) => {
    if(err) {
      throw err;
    }
    res.send({ message: 'sticky note updated' });
  });
});

app.delete('/api/note', (req, res) => {
  connection.query('DELETE FROM sticky_notes WHERE id = "' + req.query.id + '"', (err) => {
    if(err) {
      throw err;
    }
    res.send({ message: 'sticky note deleted' });
  });
});

//https://www.npmjs.com/package/mysql
//https://mariadb.org/