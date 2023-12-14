const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const mongojs = require('mongojs');
const db = mongojs('bezeroakdb', ['bezeroakWithAvatar'])
const multer = require('multer');

const uploadFolder = 'upload/';

const storage = multer.diskStorage({
    "destination" : function(req, file, cb) {
        cb(null, uploadFolder);
    },
    "filename" : function(req, file, cb) {
        if (!file) {
            cb(null, '');
        }
        else {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const newFileName = `avatar-${uniqueSuffix}.${file.mimetype.split('/')[1]}`;
            cb(null, newFileName);
        }
    }
});
const upload = multer({
    "storage" : storage,
    "fileFilter" : function(req, file, cb) {
        const acceptedMimeTypes = ['image/png', 'image/jpeg'];
        if (!file || acceptedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
    "limits" : {
        "fileSize" : 4 * 1024 * 1024
    }
});

let users = [];

db.bezeroak.find((error, userdocs) => {
    if (error) {
        console.error(error);
    }
    else {
        users = userdocs;
    }
});

/* GET users listing. */
router.get('/', (req, res) => {
    res.render("users", {
        "title" : "Users", 
        "users" : users
    });
});

router.get('/list', (req, res) => {
    res.json(users);
});


router.post('/new', upload.single('avatar'), (req, res) => {
    const newUser = {
        "izena" : req.body.izena,
        "abizena" : req.body.abizena,
        "email" : req.body.email,
        "avatar" : req.file ? req.file.filename : ""
    };
    db.bezeroak.insert(newUser, (error, user) => {
        if (error) {
            console.error(error);
            res.status(404).json({ "error" : "Erabiltzailea ez da sartu." });
        }
        else {
            console.log(user);
            users.push(user);
            res.json(user);
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    db.bezeroak.findOne({ "_id" : mongojs.ObjectId(req.params.id) }, (error, user) => {
        if (error) {
            console.error(error);
            res.status(500).json({ "error" : "Internal Server Error" });
        }
        else if (!user) {
            res.status(404).json({ "error" : "Erabiltzailea ez da aurkitu." });
        }
        else {
            const avatarFileName = user.avatar;
            db.bezeroak.remove({ "_id" : mongojs.ObjectId(req.params.id) }, (err, user) => {
                if (err) {
                    console.error(err);
                    res.status(404).json({ "error" : "Erabiltzailea ez da ezabatu." });
                }
                else {
                    if (avatarFileName) {
                        deleteUploadedFile(avatarFileName);
                    }
                    users = users.filter(user => user._id != req.params.id);
                    console.log(user);
                    res.json(users);
                }
            });
        }
    });
});

router.put("/update/:id", upload.single('avatar'), (req, res) => {
    db.bezeroak.findOne({ "_id" : mongojs.ObjectId(req.params.id) }, (error, user) => {
        if (error) {
            console.error(error);
            res.status(500).json({ "error" : "Internal Server Error" });
        }
        else if (!user) {
            res.status(404).json({ "error" : "Erabiltzailea ez da aurkitu." });
        }
        else {
            const avatarFileName = user.avatar;
            db.bezeroak.update({ "_id" : mongojs.ObjectId(req.params.id) }, {
                    "$set" : {
                        "izena" : req.body.izena,
                        "abizena" : req.body.abizena,
                        "email" : req.body.email,
                        "avatar" : req.file ? req.file.filename : avatarFileName
                    }
                }, (error, user) => {
                    if (error) {
                        console.error(error);
                        res.status(404).json({ "error" : "Erabiltzailea ez da aldatu." });
                    }
                    else {
                        if (req.file && avatarFileName) {
                            deleteUploadedFile(avatarFileName);
                        }
                        let user = users.find(user => user._id == req.params.id);
                        user.izena = req.body.izena;
                        user.abizena = req.body.abizena;
                        user.email = req.body.email;
                        user.avatar = req.file ? req.file.filename : avatarFileName;
                        console.log(user);
                        res.json(user);
                    }
                }
            );
        }
    });
});

let deleteUploadedFile = fileName => {
    const projectRoot = path.resolve(__dirname, '..');
    const filePath = path.join(projectRoot, uploadFolder, fileName);
    fs.unlink(filePath, error => {
        if (error) {
            console.error('Errorea fitxategia ezabatzean: ', error);
        }
        else {
            console.log(`${fileName} fitxategia ezabatu da.`);
        }
    });
}

module.exports = router;
