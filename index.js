const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());  // Make sure this middleware is present

let nextId = 1;
const todos = [];

app.post('/api/todos', (req, res) => {
    const { title, description, dueDate, status } = req.body;

    console.log('Received data:', req.body);  // Logs the request body

    // Validate required fields
    if (!title || !description || !dueDate || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTodo = { id: nextId++, title, description, dueDate, status };
    todos.push(newTodo);  // Push the new Todo into the todos array
    
    res.status(201).json(newTodo);  // Return the newly created Todo
});

app.get('/api/todos', (req, res) => {
    res.json(todos);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
