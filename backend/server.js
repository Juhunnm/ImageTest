const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// grpc
const client = require('./news_client');
const { reverse } = require('dns');
const app = express();
app.use(express.json());

app.use(cors());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: storage
})
//db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3115",
    database: 'imgdb',
})
//grpc test
app.post('/reverse', (req, res) => {
    // client.GetAllNews({}, (error, response) => {
    //     if (error) {
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    //     res.json(response);
    // });
    let testNews = {
        id: "1",
        title: "Test News",
        body: "This is a test news body.",
        postImage: "path/to/image.jpg"
    };
    let stringMessage = {
        value: "Helloew, world!"
    };
    const reverseTest = req.body;

    client.GetReverse(reverseTest, (err, response) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log("client grpc");
            console.log(response);
            res.json(response);
        }
    });
});
app.post('/upload', upload.single('image'), (req, res) => {
    const { label } = req.body;
    const filename = req.file.originalname;
    const isedit = 0;
    const isdelete = 0;
    const sql = "INSERT INTO images(fname, label,isedit,isdelete) VALUES (?, ?, ?, ?)";
    db.query(sql, [filename, label, isedit,isdelete], (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "ERROR" });
        }
        return res.json({ Status: "Success" });
    });
});


app.post('/update', (req, res) => {
    console.log(req.body)
    const { cid, prev_value, new_value, edit_time, label, isedit, fname } = req.body;

    const sql = "INSERT INTO change_logs (cid, prev_value, new_value, edit_time) VALUES (?, ?, ?, ?)";
    db.query(sql, [cid, prev_value, new_value, edit_time], (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "ERROR", error: err });
        }
        console.log("Change log recorded");

        const sql2 = "UPDATE images SET label = ?, isedit = ? WHERE cid = ?";
        db.query(sql2, [label, isedit, cid], (err, data) => {
            if (err) {
                console.error(err);
                return res.json({ Message: "Update ERROR", error: err });
            }
            res.json({ Status: "Update Success" });
        });
    });
});

app.get("/imglog/:id",(req,res)=>{
    const sql = "select * from change_logs where cid = ?";
    db.query(sql,[req.params.id],(err,data)=>{
        if(err) return res.json("ERROR");
        return res.json(data);
    })
})

app.get ('/', (req, res, next) => {
    console.log(Date.now());
    next();
 })

app.get('/', (req, res) => {
    // home.js 요청
    const sql = "SELECT * FROM images where isdelete =0";
    db.query(sql, (err, data) => {
        if (err) return res.json("ERROR");
        return res.json(data);
    })
    
})

app.get('/img/:id', (req, res) => {
    const sql = "SELECT * FROM images where cid = ? ";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json("ERROR");
        return res.json(data);
    })
})

app.get('/delete/:id', (req, res) => {
    // const sql = "DELETE FROM images WHERE cid = ? ";
    const isdelete = 1;
    const sql = "UPDATE images SET isdelete = ? WHERE cid = ?"
    db.query(sql, [isdelete,req.params.id], (err, data) => {
        if (err) return res.json("ERROR");
        return res.json(data);
    })
})

app.listen(8800, () => {
    console.log("connected ")
})