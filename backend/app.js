var express = require('express');
var app = express();
var bodyParser=require('body-parser');
const Post=require('./models/post');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(function(req,res,next){
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","*");
  res.setHeader("Access-Control-Allow-Methods","*");
  next();
});
mongoose.connect("mongodb+srv://ikhurana:ishaan123@cluster0-bxch1.mongodb.net/PostApp?retryWrites=true")
.then(() => {
  console.log("Connected to database!");
}).catch(
  () =>{
    console.log("Connection failed!");
  }
);
app.post('/api/posts', (req,res,next)=>{
  const post=new Post(
    {
      title: req.body.title,
      content: req.body.content
    }
  );
  post.save().then(result => {
    res.status(201).json({
      message:"Post added successfully",
      updated_id:result._id
    })
    console.log(result._id + "looks cool");
  });
})
app.get('/api/posts',function(req,res,next){
  Post.find().then(
    documents=> {
      res.json({posts:documents});
    }
  )
});
app.delete('/api/posts/:postId', function(req,res,next){
  Post.deleteOne({_id:req.params.postId}).then(result=>{
    console.log(result);
  });
  res.status(200).json({message:"Post deleted successfully!"});
});
module.exports = app;
