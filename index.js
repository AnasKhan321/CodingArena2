const express = require('express')
const multer = require('multer');
const app = express()
const port = 3000
const ConnectToMongo = require('./db.js')
const Course = require('./Course.js')
const cors = require('cors');
ConnectToMongo();

app.use(cors());
app.use(express.static('uploads'));
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage });




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/allcourses', async(req, res) => {
    let data = await  Course.find();
    res.json({ data: data, sucess: true })
})

app.post('/upload', upload.single('image'), async(req, res) => {

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imagePath = req.file.path;
    console.log(req.body)

    const c = await Course.create({
        IName : req.body.IName,
        CourseT : req.body.CourseT,
        CourseD : req.body.CourseD,
        Price : req.body.Price,
        imageurl : req.file.filename
    })
  
    res.status(200).json({ message: 'File uploaded successfully', imagePath });
  });


app.get('/getcourse/:id' , async(req,res)=>{
    const data = await  Course.findOne({_id : req.params.id})
    res.json({ data: data, sucess: true })
})

app.post('/updatecourse/:id' , async(req,res)=>{
    const updatee = await Course.findByIdAndUpdate(req.params.id, req.body)
    res.json({sucess : true })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})