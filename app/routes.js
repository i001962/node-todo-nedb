var Todo = require('./models/todo');
var feed = require('feed-read');
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {
		// use NeDB Todo.find ... get all todos in the in memory database
	  Todo.find({$not:{done: true}},function(err, todos) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

		  res.json(todos); // return all todos in JSON format
		});
	});


	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
	 var i = 0;
 	   //  feed(req.body.text, function(err, articles) {
 	   //          if (err) throw err;
 	   //          for (i = 0; i < articles.length; i++) {
 	   //              var StrippedString = articles[i].title.replace(/(<([^>]+)>)/ig, "");
			//
												console.log('you are here2');
	                        Todo.insert({
													title: req.body.text,
	                      //      title: StrippedString,
	                           link: req.body.text,
	                            done: false
	                        }, function(err, todos) {
	                            if (err)
	                                res.send(err)
															console.log('you just instert: ' + todos);
	                        });
      // 						}
			// 	});
				Todo.find({$not:{done: true}}, function(err, todos) {
										if (err)
												res.send(err)
										res.json(todos);
				});
	});


// 	app.post('/api/todos', function(req, res) {
//
// 			var i= 0;
// 		//	var arttitle = {}; req.body.text,http://craphound.com/?feed=rss2
// 			feed(req.body.text, function(err, articles) {
// 				if (err) throw err;
// 				//   * "title"     - The article title (String).
// 				//   * "author"    - The author's name (String).
// 				//   * "link"      - The original article link (String).
// 				//   * "content"   - The HTML content of the article (String).
// 				//   * "published" - The date that the article was published (Date).
// 				//   * "feed"      - {name, source, link}
// 			//	console.log(articles);
// 				for(i=0;i<articles.length;i++){
// 								//		console.log('title: ' + articles[i].title);
// 								//		console.log('link: ' + articles[i].link);
// 										var StrippedString = articles[i].title.replace(/(<([^>]+)>)/ig,"");
//
// 										// parse url from google rss query string if google alert
// 									// 	var qs = (function(a) {
// 		    					// 		if (a == "") return {};
// 		    					// 			var b = {};
// 		    					// 			for (var i = 0; i < a.length; ++i)
// 		    					// 			{
// 		        			// 				var p=a[i].split('=', 2);
// 		        			// 				if (p.length == 1)
// 		            	// 					b[p[0]] = "";
// 		        			// 			else
// 		            	// 				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
// 		    					// 			}
// 		    					// 	return b;
// 									// 	})(articles[i].link.split('&'));
// 									// //	console.log('thisi is gs url: ' + qs["url"]);
//
// 						//		try upserting
// 						// Count all planets in the solar system
// Todo.count({ link:  articles[i].link }, function (err, count) {
//   // count equals to 3
// 	if (err)
// 		res.send(err)
// 	console.log('this is the record count: ' + count);
// 	if (count = 1)  {
//     Todo.update({
//         link: articles[i].link,
//         done: true
//     }, function(err, itsInDB) {
//         if (err)
//             res.send(err)
//         console.log('inserted this: ' + itsInDB.done + itsInDB.title + itsInDB._id);
//     });}
//     else {
//         Todo.insert({
//             title: StrippedString,
//             link: articles[i].link,
//             done: false
//         }, function(err, todo) {
//             if (err)
//                 res.send(err)
//         });
//     };
//
// 									// Todo.update({title : StrippedString, link : articles[i].link, done:false},
// 									//  	 { $set: { done:true } }, { multi: true },
// 									//  	  function (err, numReplaced, newDoc) {
// 									//  			 if (err)
// 									//  			 res.send(err)
// 									//
// 									//
// 									//
// 									//
// 									// // 	console.log('updated this to done true: ' + newDoc.done + newDoc.title + newDoc._id)
// 									// //
// 									//  	});
// 									// Todo.update({link : articles[i].link, done: false}, { title : StrippedString, link : articles[i].link, done:false }, { upsert: true }, function (err, numReplaced, newDoc) {
// 									// 	if (err)
// 									// 			res.send(err)
// 									// 	console.log('number upserted: ' + numReplaced + ' record: ' + newDoc._id);
// 									//
// 									// 			});
// // try insert
//
// 									// 	 Todo.insert({
// 									// //		title : articles[i].title,ß
// 									//   	title : StrippedString,
// 									//   // if google alert
// 									// 	//	link : qs["url"],
// 									// 	link : articles[i].link,
// 									// 	done : false
// 									// 	}, function(err, todo) {
// 									// 		if (err)
// 									// 			res.send(err)
// 									//
// 									// 			// Todo.find({},function(err, todos) {
// 									// 			// 	if (err)
// 									// 			// 		res.send(err)
// 									// 			// console.log(todos.done + todos.title)
// 									// 			// });
// 									// 		});
// 			   // end feed read
// 			// use NeDB Todo.find ... get all todos in the in memory database
// 			// get and return all the todos after you create another
// 		//	Todo.find({$not:{done: true}},function(err, todos) {
// 			Todo.find({},function(err, todos) {
// 				if (err)
// 					res.send(err)
// 				res.json(todos);
// 			});
// 		}); //end feed
//
// 		});
// 				});
// 						});
	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		console.log(req.params);
	  	// Todo.find({_id : req.params.todo_id},function(err, todos) {
	  	// 	if (err)
	  	// 		res.send(err)
	  	// 	console.log('this is being sent at the link: ' + todos[0].link);
			// 	var email 	= require("emailjs/email");
				// var server 	= email.server.connect({
				//    user:    "i001962",
				//    password:"HAeGzEGtdvh34r",
				//    host:    "smtp.sendgrid.net",
	  		// 	tls: {ciphers: "SSLv3"}
				// });
 //					send the message and get a callback with an error or details of the message that was sent
		// 		server.send({
		// 		  // text:    "https://github.com/eleith/emailjs",
		// 																																																							text:  todos[0].link,
		// 	// text:   qs["url"] ,
		//
		// 		   from:    "you <username@your-email.com>",
		// //i001962		   to:      "someone <buffer-2af35f6385137193b076@to.bufferapp.com>",
		// 		to:      "hazel <buffer-4d948747a159483a087c@to.bufferapp.com>",
		// 		   subject: todos[0].title + ' #foodsafety '
		// 		}, function(err, message) { console.log(err || message); });
	  	// });
			Todo.update({ _id : req.params.todo_id }, { $set: { done: true } }, { multi: true }, function (err, numReplaced) {

     	console.log(req.params.todo_id);
			});

			Todo.find({$not:{done: true}},function(err, todos) {

				if (err)
					res.send(err)
		//		console.log(todos);
				res.json(todos);
				});
	 // 		});
		// });
	});
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
