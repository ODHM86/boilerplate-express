let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// const upper_case = process.env['MESSAGE_STYLE'];
//let the_variable = process.env.MESSAGE_STYLE;
//console.log("value of environment var: ",upper_case);

// console.log(upper_case);
// if (upper_case == "uppercase"){
//    console.log("in uppercase");
//  }
console.log("Hello World");
absolutPath = __dirname + "/views/index.html";
assets_folder = __dirname + "/public";
json_object = {"message": "Hello json"};
json_object_upper = {"message" : "HELLO JSON"};
//json_object_upper = json_object['message'].toUpperCase();
console.log("original value :",json_object);

app.use(bodyParser.urlencoded({extended: true}));

app.use(function middleware(req, res, next){
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.use("/public", express.static(assets_folder));
app.get('/',function(req,res){
 // res.send("Hello Express");

  res.sendFile(absolutPath);
});

app.get('/json', function(req, res){

  if (process.env['MESSAGE_STYLE'] === "uppercase"){
    console.log("in uppercase_");
    
//    
    res.json(json_object_upper);
  }
  else{
    console.log("original var: ", json_object);
  res.json(json_object);
    }
});

app.get('/now', function(res,req, next) {
  req.time = new Date().toString();
  
  console.log(req.time);
  next();

}, function(req,res) {
    req.time = new Date().toString();
    var json_time = {"time" : req.time};
    res.json({"time":req.time});
  }
);

app.use('/:word/echo',function(req,res,next){
  console.log(req.params);
  console.log(req.params.word);
  res.json({"echo": req.params.word});
 
});

app.route('/name').get(function(req,res,next){
 
  var user_json = {"name":req.query.first +" "+ req.query.last};
  console.log(req.query)
  res.json(user_json);
});
  
app.post('/name',function(req,res){
    let post_value = req.body;
    let post_value_first = post_value.first;
    let response_json = {"name": post_value_first +" "+ post_value.last};
  console.log("the first req.body is: ", req.body.first, "the second req.body is: ", req.body.last,", the value using index is:post_value['first'] is: ", post_value['first'])
  console.log('the post is: ',post_value);
  console.log(typeof post_value )
    res.json(response_json);
});
 module.exports = app;

