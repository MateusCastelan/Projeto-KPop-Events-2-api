const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://web2kpop:Kpop2222@cluster0.kdjob5o.mongodb.net/');

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

const usersSchema = new mongoose.Schema({
  author_name: String,
  author_email: String,
  author_user: String,
  author_pwd: String,
  author_level: String,
  author_status: Boolean,
  author_create_date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', usersSchema);

router.post('/', async (req, res) => {
  const user = req.body;
  // const user = req.body.user;
  try {
    const newUser = await User.create(user);
    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Usuário salvo com sucesso!', newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const foundUser = await User.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundUser = await User.findById( pid );
    console.log('Objeto encontrado com sucesso!');
    res.json({ message: 'Usuário encontrado com sucesso!', foundUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const newUser = req.body;
  // const newUser = req.body.user;
  console.log(newUser);
  try {
    const updatedUser = await User.findByIdAndUpdate(pid, 
      { 
        author_name: newUser.author_name, 
        author_email: newUser.author_email,
        author_pwd: newUser.author_pwd,
        author_level: newUser.author_level,
        author_status: newUser.author_status,
      }, { new: true });
    console.log('Objeto Atualizado:', updatedUser);
    res.json({ message: 'Usuário alterado com sucesso!', updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedUser = await User.findByIdAndDelete(pid);
    console.log('Objeto deletado:', deletedUser);
    res.json({ message: 'Usuário deletado com sucesso!', deletedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




module.exports = router;