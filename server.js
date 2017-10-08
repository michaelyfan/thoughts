/*
    CRUD:
    Create (POST)
    Read (GET)
    Update (PUT)
    Delete (DELETE)
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));

MongoClient.connect('mongodb://testuser:testpass@ds123084.mlab.com:23084/michael-sandbox-db', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function() {
        console.log('listening on 3000');
    });

})

app.get('/', (req, res) => { //request, response
    db.collection('quotes').find().toArray((err, result) => {
        if(err) return console.log(err);
        res.render('index.ejs', {quotes: result})
    })
});

app.post('/quotes', (req, res) => {
    req.body.rating = 0;
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);
        res.redirect('/');
    });
});

app.put('/quotes', (req, res) => {
    let newRating;
    if (req.body.isVoteUp == true) {
        newRating = parseInt(req.body.rating) + 1;
    } else {
        newRating = parseInt(req.body.rating) - 1;
    }
    db.collection('quotes').findOneAndUpdate(
        {
            _id: ObjectId(req.body.id)
        },
        {
            $set: {
                rating: newRating
            }
        },
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    )
})

app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete(
        {
            _id: ObjectId(req.body.id)
        },
        (err, result) => {
            if (err) return res.send(500, err);
            res.send({
                message: 'Quote succesfully deleted'
            })
        }
    )
})