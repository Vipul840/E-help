const express = require('express');
const app = express();
const multer=require('multer');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/E-Help');
const help_schema_user = new mongoose.Schema({
   // User_name: String,
   password: String,
   email: String
});
const storage = multer.diskStorage({
   destination:'./public/uploads',
   filename: (req,file,cb)=>{
        cb(null,file.originalname);
   }
});
const upload = multer({ storage: storage });
const help_schema_article = new mongoose.Schema({
   Title: String,
   Content: String,
   Name:String,
   filename: String 
});
const user = mongoose.model('user', help_schema_user);
app.listen(3000, () => {
   console.log("server started on port 3000");
});
const art = mongoose.model('art', help_schema_article);
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render('login');
});
// app.post('/',(req,res)=>{
//     res.redirect('register');
// });
// app.get('/register',(req,res)=>{
//    res.render('register');
// })
// app.post('/register',(req,res)=>{
//      res.redirect('/');
// });
var uname;
app.get('/index', (req, res) => {
   res.render('index', { uname: uname });
});
app.post('/', (req, res) => {
   const write = new user({
      // User_name: req.body.uname,
      password: req.body.psw,
      email: req.body.mail
   });
   write.save();
   uname = write.User_name;
   res.redirect('/index');
});
app.get('/compose', (req, res) => {
   res.render('compose');
});
app.post('/compose',upload.single('file'),async(req, res) => {
   console.log(req.file.filename);
   const write = new art({
     Title: req.body.title,
      Content: req.body.desc,
      filename:req.file.filename,
      Name:req.body.name
   });
  await write.save();
   res.redirect('/index');
});

app.get('/post',(req, res) => {
   run();
   async function run(){
      let posts;
      posts=await art.find({});
      res.render('post',{posts:posts});
   }
});
   app.get('/view_post/:topic', async (req, res) => {
      let posts, index;
      let match = parseInt(req.params.topic);
      index = 1;
      posts = await art.find({}); 
      let matchedPost = null;
      posts.forEach((element) => {
          if (index == match) {
              matchedPost = element;
          }
          index++;
      });
  
      res.render('view_post', { post: matchedPost }); // Assuming 'view_post' is your EJS file
  });
app.get('/html_content',(req,res)=>{
   res.render('html_content');
});
app.get('/css_content',(req,res)=>{
   res.render('css_content');
});
app.get('/javas',(req,res)=>{
   res.render('javas');
});