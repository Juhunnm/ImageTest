import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

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
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3115",
    database: 'imgdb',
})

app.post('/upload', upload.single('image'), (req, res) => {
    const { label } = req.body;
    const filename = req.file.originalname;
    const isedit = 0;
    const sql = "INSERT INTO images(fname, label,isedit ) VALUES (?, ?, ?)";
    db.query(sql, [filename, label, isedit], (err, data) => {
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

        const sql2 = "UPDATE images SET label = ?, isedit = ? WHERE fname = ?";
        db.query(sql2, [label, isedit, fname], (err, data) => {
            if (err) {
                console.error(err);
                return res.json({ Message: "Update ERROR", error: err });
            }
            res.json({ Status: "Update Success" });
        });
    });
});



app.get('/', (req, res) => {
    // home.js 요청
    const sql = "SELECT * FROM images";
    db.query(sql, (err, data) => {
        if (err) return res.json("ERROR");
        return res.json(data);
    })
    // ImgeLog.js 요청
    
})
app.listen(8800, () => {
    console.log("connected ")
})