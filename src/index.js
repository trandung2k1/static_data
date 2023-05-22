const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs').promises;
const port = process.env.PORT || 4000;
const path = require('path');
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(morgan('combined'));
app.get('/', async (req, res) => {
    const filePath = path.join(__dirname, './db/db.json');
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    const json = JSON.parse(data);
    return res.status(200).json(json);
});
app.delete('/:id', async (req, res) => {
    const id = +req.params.id;
    const filePath = path.join(__dirname, './db/db.json');
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    const json = JSON.parse(data);
    const result = json.todos.filter((item) => item.id !== id);
    const newData = { todos: result };
    await fs.writeFile(filePath, JSON.stringify(newData));
    return res.status(200).json(result);
});
app.listen(port, () => {
    console.log('Server listen on http://localhost:%d', port);
});
