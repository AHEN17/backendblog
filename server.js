const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://nehashetty:Mongodb@cluster0.wfi6caw.mongodb.net/backend-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

app.use(bodyParser.json());

const authorModel = require('./models/authorModel');
const blogModel = require('./models/blogModel');

// POST a new blog
app.post('/blogs', async (req, res) => {
  try {
    const { title, blogContent, authorName } = req.body;
    const newBlog = await blogModel.create({ title, blogContent, authorName });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
fetch('http://localhost:3000/blogs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Example Blog Post',
    blogContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorName: 'John Doe'
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});
