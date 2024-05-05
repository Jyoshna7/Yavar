const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
var username1;
var id1;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Jyoshna7!',
  port: 5432,
});

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(bodyParser.json());

// Function to create tables
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        time TIME,
        completed BOOLEAN DEFAULT false,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
};

// Function to add a new task
const addTask = async (userId, title, description, date, time) => {
  try {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [userId, title, description, date, time]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('Error adding task:', error.message);
    throw new Error('An error occurred while adding task');
  }
};

// Function to get tasks for a user
const getTasksByUserId = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error getting tasks:', error.message);
    throw new Error('An error occurred while getting tasks');
  }
};

// Define route to handle adding a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { userId, title, description, date, time } = req.body;
    const taskId = await addTask(userId, title, description, date, time);
    res.status(201).json({ success: true, message: 'Task added successfully', taskId });
  } catch (error) {
    console.error('Error adding task:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while adding task' });
  }
});

// Define route to get tasks for a user
app.get('/api/tasks/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await getTasksByUserId(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while getting tasks' });
  }
});

// Define route to handle deleting a task
app.delete('/api/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while deleting task' });
  }
});

// Define route to handle updating a task
app.put('/api/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { completed } = req.body;
    await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2', [completed, taskId]);
    res.status(200).json({ success: true, message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while updating task' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const addUser = async (username, password) => {
  try {
    // Insert new user into users table
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, password]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('Error adding user:', error.message);
    throw new Error('An error occurred while adding user');
  }
};

// Function to validate user login
const validateUser = async (username, password) => {
  try {
    // Query the database to check if the username and password match
    const result = await pool.query(
      'SELECT id FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    console.log(result)
    const id = parseInt(result.rows[0].id);
    username1 = username;
    id1 = id;
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error validating user:', error.message);
    throw new Error('An error occurred while validating user');
  }
};

// Define route to handle adding a new user
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password);
    const userId = await addUser(username, password);
    res.status(201).json({ success: true, message: 'User added successfully', userId });
    username1 = username;
    id1 = id;
  } catch (error) {
    console.error('Error signing up:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while signing up' });
  }
});

// Define route to handle user login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const isValidUser = await validateUser(username, password);
    if (isValidUser) {
      res.status(200).json({ success: true, message: 'Login successful' });
      
    } else {
      res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while logging in' });
  }
});
app.get('/api/user', async (req, res) => {
    res.status(200).json({ success: true, user:username1 });
});
app.get('/api/userid', async (req, res) => {
  res.status(200).json({ success: true, user:id1 });
});
// Define route to get total task count
// Define route to get total tasks for a user
app.get('/api/total-tasks/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await pool.query('SELECT COUNT(*) AS totalTasks FROM tasks WHERE user_id = $1', [userId]);
    const totalTasks = result.rows[0].totaltasks;
    res.status(200).json({ success: true, totalTasks });
  } catch (error) {
    console.error('Error getting total tasks:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while getting total tasks' });
  }
});

// Define route to get completed tasks for a user
app.get('/api/completed-tasks/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await pool.query('SELECT COUNT(*) AS completedTasks FROM tasks WHERE user_id = $1 AND completed = true', [userId]);
    const completedTasks = parseInt(result.rows[0].completedtasks); // Convert string to number
    res.status(200).json({ success: true, completedTasks });
  } catch (error) {
    console.error('Error getting completed tasks:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while getting completed tasks' });
  }
});

// Create tables when the server starts
createTables();
