var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var redis = require('redis');

//this is all to have a express server.
var app = express();

//create clients
var client = redis.createClient();

client.on('connect', function(){
  console.log('Redis Server Connected....');
})


//this is saying to store all the views in the veiws directory
app.set('views', path.join(__dirname, 'views'));
//setting the engine
app.set('view engine', 'ejs');

//middle ware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//root path that renders index.ejs
app.get('/', function(req,res){
  var title = 'Task List';

app.post('/task/add', function(req,res){
  var task = req.body.task;
  client.rpush('tasks', task, function(err, data){
    if(err){
      console.log(err);
    } else {
      console.log('Task added')
      res.redirect('/')
    }
  });
});

app.post('/task/remove', function(req,res){
  var tasksToDel = req.body.tasks;
  client.lrange('tasks', 0, -1, function(err,tasks){
      for(var i=0; i< tasks.length; i++){
        console.log('Task removed'+ i);
        //if the task to delete is in the array of tasks, than delete
        if(tasksToDel.indexOf(tasks[i]) > -1){
          client.lrem('tasks', 0, tasks[i], function(){
            if(err){
              console.log(err);
            }
            console.log('Task removed');
          })
        }
      }
      res.redirect('/');
  });
});

  //you can use normal redis command here, so lrange ( the list name, the beginning of teh list setion you want, the end point)
  // note 0 -1 will retreive all items in the list.
  client.lrange('tasks', 0, -1, function(err, data){
    //we can bring the render function inside here,
    res.render('index', {
      title: title,
      tasks: data,
    });
  });
});


// res.render('index', {
//   title: title
// });

//start the server at port 4484(you can choice the port of your choice)
app.listen(4484);
console.log('Server Listening on port 4484');

module.exports = app;
