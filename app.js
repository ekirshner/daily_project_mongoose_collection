const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');

const server = express();

//Set up body-parser
server.use(bodyparser.urlencoded({ extended: false }));

//Set up Mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Set up Mustache
server.engine('mustache', mustache());
server.set('views', './templates');
server.set('view engine', 'mustache');

//css
server.use(express.static('templates'));

//Take the Destination object that we created on travel.js
const Destination = require('./travel');

//Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/travelDestination');




//Set up home page 
server.get('/', function (req, res) {
    Destination.find()
        .then( function(data) {
            console.log(data);
            res.render('travelDestinations', {
                destination: data,
            })
        })
        .catch( function () {
            console.log("clearly, this isn't working");
        });

});



//********************** Run this To Add A New Destination *******************
server.post('/add', function (req, res) { 
    
    let destination = new Destination({
        name: req.body.name,
        beaches: req.body.beaches,
       // languages: ['French', 'English'],
        //bestFor: [{
          //  maritalStatus: 'Married',
           // children: false,
           // budget: 'expensive'
       // }]
    });

destination.save()
    .then(function () {
        console.log('saved it!');
        res.redirect('/');
    })
    .catch(function (err) {
        console.log('YOU FAILED TREMENDOUSLY');
    });
});
//********************************************************************************


//********************** Run this To Delete Destination *******************
server.post('/remove', function (req, res) { 
    console.log(req.body);

    Destination.remove( {name: req.body.removeName}, function(err) {
        console.log(err)
    } )
        res.redirect('/') 
});


//********************************************************************************








    // build a destination object
    // using the data that was posted.
    // use mongoose to save that object in the database

    // in the success callback of the save function, 
    // render your result back to the user
    // Or if you want, redirect back a homepage or something

//});

// Create new destination
// let destination = new Destination({
//     name: 'France',
//     beaches: 37,
//     languages: ['French', 'English'],
//     bestFor: [
//         {maritalStatus: 'Married',
//         children: false,
//         budget: 'expensive'}
//     ]
// });

// destination.save()
//     .then(function () {
//         console.log('saved it!');
//     })
//     .catch(function (err) {
//         console.log(err);
//     });


// console.log(destination.toObject());
//***************************************************************************** */

//Set up Server
server.listen(3000, function () {
    console.log("we're in!")
});

