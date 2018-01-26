// npm i express@3
// npm i mogoose

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/test');

app.configure(() => {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});
const Todo = mongoose.model('Todo', { text: String, done: Boolean});

// get : select(SQL), find(MongoDB)
// get으로 http://localhost:3000/todos 요청하면 아래의 코드로 처리한다.
app.get('/todos', (req, res) => {
    Todo.find((err, todos) => {
        if(err) { res.send(err); return; }
        res.json(todos);
    })
})

// post : insert(SQL), create(MongoDB)
app.post('/todos', (req, res) => {
    Todo.create({
        text: req.body.text,
        done: false
    }, (err, todo) => {
        if (err) {
            res.send(err);
            return;
        }
        Todo.find((err, todos) => {
            res.json(todos);
        })
    })
})

app.delete('/todos/:id', (req, res) => {
    Todo.remove({
        _id: req.params.id
    }, (err, todo) => {
        if (err) {
            res.send(err);
            return;
        }
        Todo.find((err, todos) => {
            res.json(todos);
        })
    })
})
app.get("*", (req, res) => {
    res.sendfile('./public/index.html')
})

app.listen(port);
console.log('Server Started at prot:' + port );