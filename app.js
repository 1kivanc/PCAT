const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const app = express();
const PhotoController = require('./controllers/PhotoController');
const PageController = require('./controllers/pageConrtoller');
const password = process.env.Password;

//Connect DB
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://kivanc:${password}@cluster0.qagikoc.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
  console.log('DB CONNECT')
}).catch((err) => {
  console.log(err);
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
const port = process.env.PORT  || 3000;

app.get('/',PhotoController.getAllPhotos);

app.get('/photos/:id',PhotoController.getPhoto);

app.get('/about', PageController.getAboutPage);
app.get('/add', PageController.getAddPage);

app.post('/photos', PhotoController.createPhoto);

app.get('/photos/edit/:id', PageController.getEditPage);

app.put('/photos/:id', PhotoController.updatePhoto);

app.delete('/photos/:id', PhotoController.deletePhoto );
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
