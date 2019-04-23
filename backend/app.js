const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);

    res.status(201).json({
        message: 'Post Added Successfully'
    });
    next();
});


app.use('/api/posts',(request, response, next) => {
    const posts = [
        {id: '12ss545', title: 'first server-side post', content: 'first server-side content'},
        {id: '12ss545', title: 'second server-side post', content: 'second server-side content'},
        {id: '12ss545', title: 'third server-side post', content: 'third server-side content'},
    ];
    response.status(200).json({
        message: 'post fetched successfully!',
        posts: posts
    });
    next();
});

module.exports = app;
