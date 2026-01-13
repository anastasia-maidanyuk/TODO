const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- Routes ---

// 1. Get All Tasks (Search, Filter, Sort)
app.get('/tasks', async (req, res) => {
  const { search, status, sort, order } = req.query;

  // Базовий запит
  let where = {};
  
  // Пошук
  if (search) {
    where.title = { contains: search }; // SQLite case-insensitive за замовчуванням не завжди працює, але для демо ОК
  }

  // Фільтрація
  if (status === 'done') {
    where.isDone = true;
  } else if (status === 'undone') {
    where.isDone = false;
  }

  // Сортування
  let orderBy = {};
  if (sort === 'priority') {
    orderBy.priority = order === 'asc' ? 'asc' : 'desc';
  } else {
    orderBy.createdAt = 'desc'; // За замовчуванням нові зверху
  }

  try {
    const tasks = await prisma.task.findMany({
      where,
      orderBy,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 2. Create Task
app.post('/tasks', async (req, res) => {
  const { title, priority } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });
  
  // Валідація пріоритету (1-10)
  const validPriority = Math.max(1, Math.min(10, Number(priority) || 1));

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        priority: validPriority,
      },
    });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Could not create task" });
  }
});

// 3. Toggle Status
app.patch('/tasks/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    // Спочатку знаходимо задачу, щоб дізнатися поточний статус
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { isDone: !task.isDone },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Could not update task" });
  }
});

// 4. Delete Task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});