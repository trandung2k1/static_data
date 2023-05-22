const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const port = 5000;
const path = require('path');
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(morgan('combined'));
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './db/db.json');
    const data = fs.readFileSync(filePath, { encoding: 'utf8' });
    const json = JSON.parse(data);
    return res.status(200).json(json);
});
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const filePath = path.join(__dirname, './db/db.json');
    const data = fs.readFileSync(filePath, { encoding: 'utf8' });
    const json = JSON.parse(data);
    const result = json.todos.filter((item) => item.id != id);
    const newData = { todos: result };
    fs.writeFileSync(filePath, JSON.stringify(newData));
    return res.status(200).json(result);
});
app.listen(port, () => {
    console.log('Server listen on http://localhost:%d', port);
});
