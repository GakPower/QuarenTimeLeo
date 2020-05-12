const express = require('express'); 
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
let fs = require('fs');
let all = fs.readFileSync('C://Users//anasa//Documents//Network and Communication//task1//FinalMovieDataset.txt', "utf8");
let router = express.Router();

mongoose.connect('mongodb://localhost:27017/test')
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("success");
});



app.use(cors());
var Schema = mongoose.Schema;

var userRatings = new Schema({ 
    email: String,
    average: Number,
    ratings: [{movieId: Number, rate: Number}]

});

var resources = new Schema( { 
    Type: String,
    Dataset: []
});


var Recources = mongoose.model('Recources', resources);
var UserRatings = mongoose.model('UserRatings', userRatings);



const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/QuarenTime'));

router.get('/testing', (req,res) => { 
    console.log("connected");
});

app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port,() => console.log( "this compiles!"));





app.get('/get-users', function(req, res, next){
    var results = [];
    db.collection("UserRatings").find().forEach(element => { 
                results.push(element.email);}).then(() => { 
                console.log(results);
                res.json(results);
             });
});

app.get('/user', function(req,res,next) { 
    let query = req.query.email;

    db.collection("UserRatings").findOne({email: query}).then(function(doc){                                               //how to find elements in mongodb
        res.json(doc);
    });
})


app.post('/user-add', function(req,res) {
    console.log(req.body);
     let user =  new UserRatings({email: req.body.email, average: req.body.average, ratings: req.body.ratings});
    
    db.collection("UserRatings").insertOne(user, function (err, results) {  
                                    //how to insert users into mongodb
            res.json(results);
    });
})



app.get('/translation', function(req,res,next) { 
    db.collection("Recources").find().then(res => { 
        res.forEach(elem => { 
            console.log(elem.Dataset[0]); });
    })
})


db.collection("UserRatings").find().then(doc => { 
    doc.forEach(elem => { 
        console.log(elem);
    })
})
    
 
/*
all = all.trim();  // final crlf in file
let lines = all.split("\r\n");
let n = lines.length;
var matrix = [];
for(var i=0; i < 610; i++) {
    matrix[i] = new Array(9744);                        //we added one number to 9742 because we added the average;
}

for (let i = 0; i < n; i++) {  // each line
  let tokens = lines[i].split(" ");
  
  for (let j = 0; j < 9744;j++) {  // each val curr line
    matrix[i][j] = Number(tokens[j]);
  }
}

let rowObj = {movieId: 0, rate: 0};

for(let i = 0; i < 610; i++) {
    let array = [];
    for(let j = 2; j < 9744; j ++) {
        if( matrix[i][j] == 0) { 
            continue;
        }
        else { 
            rowObj = {movieId: j-2, rate: matrix[i][j]};
            array.push(rowObj);
           
        }   
    }

    let user =  new UserRatings({email: matrix[i][0], average: matrix[i][1], ratings:array});
    db.collection("UserRatings").insert(user, function (err, results) {                                 //how to insert users into mongodb
        console.log(results)
    }); 

}*/


/*UserRatings.findOne({'email': '17'}, function(err,res) { 
    if(err) 
        return handleError(err);
    console.log(res.ratings.rate);
});*/ 

let testUser = new UserRatings({email: '999', average: 99, ratings: [{movieId: 30, rate: 50},{movieId: 23, rate: 69},{movieId: 10, rate: 55}]});
let movierating = {movieId: 44, rate: 21};                                                         //TESTING PURPOSES

/*db.collection("UserRatings").insert(user, function (err, results) {
    console.log(results)
}); */




//db.collection("UserRatings").update({email: '999'},{$push: {ratings: movierating}});                           //how to update the movies array in mongodb

/*

db.collection("UserRatings").find({email: '999'}).then(function(doc){                                               //how to find elements in mongodb
    doc.forEach(element => {
        element.ratings.forEach(movies => {
            if(movies.movieId == 44)
                console.log(movies.rate);
        });
    }); 
});











/*
//UserRatings.update({email: 'user1@hotmail.com'} , {average: 7});


//var user1 = new UserRatings({ email: 'user3@hotmail.com', average:4, ratings:{movieId: 6, rate: 5} });


//user1.save();
//for(var i = 0; i < 1000000; i++) 
  //  var j = i + i;

UserRatings.find({ email: 'user1@hotmail.com'}).then(function(doc) { 
   
   console.log(doc);
   
}).catch(function(err) { 
    console.log(err.message);
}); 
     
*/