const express = require('express');
const mysql = require('mysql');

// Create Connection DB
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql Connected...')
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database nodemysql created...');
    });
});

// Create Table
app.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

// Insert Post 1
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts one added...')
    });
});

// Insert Post 2
app.get('/addpost2', (req, res) => {
    let post = {title: 'Post Two', body: 'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts 2 added...')
    });
});

// Select Posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts fetch...')
    });
});

// Select Single Post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetch...')
    });
});


// Update Post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = `Updated Title ${req.params.id}`;
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post Updated...')
    });
});

// Delete Post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post Deleted...')
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000')
});