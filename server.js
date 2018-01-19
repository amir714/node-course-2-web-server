const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamit',(text)=>{
    return text.toUpperCase()
});
app.set('view engine','hbs');
//middleware
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to write data');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'This is home page',
        welcomeMessage:'This is welcome text',
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About page',
    });
});


app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
}); 