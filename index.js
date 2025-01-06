const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());  // Make sure this middleware is present

let nextId = 1;
const todos = [];

app.post('/api/todos', (req, res) => {
    const { title, description, dueDate, status } = req.body;

    console.log('Received data:', req.body);  

    
    if (!title || !description || !dueDate || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTodo = { id: nextId++, title, description, dueDate, status };
    todos.push(newTodo); 
    
    res.status(201).json(newTodo);  
});

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'To-Do not found' });
    }
    res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const { title, description, dueDate, status } = req.body;
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'To-Do not found' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.status = status || todo.status;

    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'To-Do not found' });
    }

    todos.splice(index, 1); // Remove the to-do
    res.status(204).send(); // No content
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
