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
app.get('/', function(req, res){
	var title = 'Task List';

	client.lrange('tasks', 0, -1, function(err, reply){
		client.hgetall('call', function(err, call){
			res.render('index', {
			title: title,
			tasks: reply,
			call: call
		});
		});
	});
});

app.post('/task/add', function(req, res){
	var task = req.body.task;

	client.rpush('tasks', task, function(err, reply){
		if(err){
			console.log(err);
		}
		console.log('Task Added...');
		res.redirect('/');
	});
});

app.post('/task/remove', function(req,res){
  var tasksToDel = req.body.tasks;
  client.lrange('tasks', 0, -1, function(err,tasks){
      for(var i=0; i< tasks.length; i++){
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

app.post('/call/add', function(req, res){
	var newCall = {};

	newCall.name = req.body.name;
	newCall.company = req.body.company;
	newCall.phone = req.body.phone;
	newCall.time = req.body.time;

	client.hmset('call', ['name', newCall.name, 'company', newCall.company, 'phone', newCall.phone, 'time', newCall.time], function(err, reply){
		if(err){
			console.log(err);
		}
		console.log(reply);
		res.redirect('/');
	});
});

//start the server at port 4484(you can choice the port of your choice)
app.listen(4484);
console.log('Server Listening on port 4484');

module.exports = app;
