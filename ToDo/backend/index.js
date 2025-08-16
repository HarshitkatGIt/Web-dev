const express = require('express');
const cors = require('cors');
const Todo = require('./db');
const schema = require('./zod');
app = express();
app.use(express.json());
app.use(cors());

let id = 1;
app.post('/todo', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    if (!(schema.safeParse({ title, description }).success)) return res.status(411).json({ error: 'invalid type of title or description' });
    while ((await Todo.findOne({ id })) != null) id++;
    const send = new Todo({ title, description, id });
    console.log('milgya vai', await Todo.findOne({ id }));

    try { await send.save(); } catch (err) { console.log(err); return res.status(403).json({ mgs: 'hello papa , wo db ki to . . .' }) };
    id++;
    res.json({ msg: 'send' })
})
app.get('/todos', async (req, res) => {
    const response = await Todo.find();
    res.json({ todo: response });
})
app.post('/completed', async (req, res) => {
    const id = req.body.id;
    try { await Todo.updateOne({ id }, { '$set': { completed: true } }) } catch (err) { console.log(err), res.status(409).json({ error: 'couldn\'t update' }) }
    res.json({ msg: 'updated' })
})
app.listen(3000, () => { console.log('sabse pyari teri surat ') })