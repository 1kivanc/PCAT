const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Connect DB
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//create a photo
// Photo.create({
//   title: 'Photo title 3',
//   description: 'Photo description 3 lorem ipsum',
// });

//read a photo
// Photo.find({},(err,data) => {
//     console.log(data);
// })

//update photo
// const id = '63e37e9f5f87203075c4a9dd';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo title 111 updated',
//     description: 'Photo description 111 updated',
//   },
//   {
//     new:true
//   },

//   (err, data) => {
//     console.log(data);
//   }
// );
const id = "63e381231615fbad56b5f011"

Photo.findByIdAndDelete(id,(err,data) => {
    console.log('Photo is removed');
})