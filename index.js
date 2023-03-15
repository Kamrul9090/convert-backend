const express = require('express');
const cors = require('cors');
// const docxConverter = require('docx-pdf');
const bodyparser = require('body-parser');
const path = require('path')
const multer = require('multer')
let docxtopdf = require('docx-pdf')
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join('uploads')))
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

// multer configuration
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

const upload_file = multer({ storage: storage });



async function run() {
    try {

        app.post('/docxtopdf', upload_file.single('file'), (req, res) => {
            let outputFilePath = Date.now() + "output.pdf";

            docxtopdf(req.file.path, outputFilePath, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.download(outputFilePath, () => {
                    })
                }
            })
        })



        // pdf to image



    } finally {

    }
}

run().catch(e => console.log(e))

app.get('/', (req, res) => {
    res.send('My server is open on port 5000');
})

app.listen(port, () => {
    console.log(`This server is open on port ${port}`);
})
