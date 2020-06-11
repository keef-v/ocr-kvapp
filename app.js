var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var path = require('path')
var upload = multer({ dest: 'uploads/' })
const { createWorker } = require('tesseract.js')
const worker = createWorker({
    logger: m => console.log(m),
});

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/status', (req, res) => {
    res.status(200).send('Server setup and running')
})
app.get('/', (req, res) => {
    
    res.status(200).sendFile(path.join(__dirname + '/form.html'));
})

app.post('/upload', upload.single('image2text'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
      const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400;
        return res.status(400).send('No Files were uploaded')
    }
    async function getTextFromImage() {
        await worker.load()
        await worker.loadLanguage('eng')
        await worker.initialize('eng')
           
        const { data: { text } } = await worker.recognize(file.originalname); // name of file is file.originalname
        await worker.terminate()
        
        res.send(text)
    }

    getTextFromImage();
   
})

module.exports = app;