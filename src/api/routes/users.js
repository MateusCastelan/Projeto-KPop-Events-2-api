const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://web2kpop:Kpop2222@cluster0.kdjob5o.mongodb.net/');

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};


router.use(cors(corsOptions));

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
  
  try {
    if (user.author_pwd) {
      const hashedPassword = await bcrypt.hash(user.author_pwd, 10);
      user.author_pwd = hashedPassword;
    }

    const newUser = await User.create(user);
    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Usuário salvo com sucesso!', newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Tentativa de login:', username);

  try {
    const user = await User.findOne({ author_user: username });

    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.author_pwd);
      if(verifyPassword){
        res.status(200).json({ message: 'Login bem sucecido!'})
      }
  
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
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