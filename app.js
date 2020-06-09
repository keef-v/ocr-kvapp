var express = require('express')
var multer = require('multer')
var path = require('path')
var upload = multer({ dest: 'uploads/' })

var app = express()

app.get('/status', (req, res) => {
    res.status(200).send('Server setup and running')
})
app.get('/', (req, res) => {
    
    res.status(200).sendFile(path.join(__dirname + '/form.html'));
})

app.post('/upload', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
      const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400;
        res.status(400).send('No Files were uploaded')
    }

})

module.exports = app;