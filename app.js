const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const fs = require('fs');
const app = express();

//Connect DB
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));
const port = 3000;

app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  // console.log(req.files.image)
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', async (req,res) => {
    const photo = await Photo.findOne({_id:req.params.id});
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()

    res.redirect(`/photos/${req.params.id}`)
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
