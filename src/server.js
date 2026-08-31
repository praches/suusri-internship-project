import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory array data store
let tasks = [
  { id: '1', title: 'Complete Day 4 UI Components' },
  { id: '2', title: 'Connect Express API to React' }
];

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: Date.now().toString(), title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE /tasks/:id - Delete task by ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend server active on http://localhost:${PORT}`);
});