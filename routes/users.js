const express = require('express');
const router = express.Router();
const mongojs = require('mongojs')
const db = mongojs('bezeroakdb', ['bezeroak'])

let users = [];

db.bezeroak.find(function(err, userdocs) {
    if (err) {
        console.log(err);
    }
    else {
        users = userdocs;
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("users", {
        'title': "Users", 
        'users': users
    });
});

router.get('/list', function(req, res, next) {
    res.json(users);
});


router.post("/new", (req, res) => {
    db.bezeroak.insert(req.body, function(err, user) {
        if (err) {
            console.log(err);
            res.json({});
        }
        else {
            console.log(user);
            users.push(user);
            res.json(user);
        }
    });
});

router.delete("/delete/:id", (req, res) => {
    db.bezeroak.remove(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        function(err, user) {
            if (err) {
                console.log(err);
            }
            else {
                users = users.filter(user => user._id != req.params.id);
                console.log(user);
            }
        }
    );
    res.json(users);
});

router.put("/update/:id", (req, res) => {
    db.bezeroak.update(
        {
            '_id': mongojs.ObjectId(req.params.id)
        },
        {
            '$set': {
                'izena': req.body.izena,
                'abizena': req.body.abizena,
                'email': req.body.email
            }
        },
        function(err, user) {
            if (err) {
                console.log(err);
            }
            else {
                let user = users.find(user => user._id == req.params.id);
                user.izena = req.body.izena;
                user.abizena = req.body.abizena;
                user.email = req.body.email;
                console.log(user);
            }
        }
    );
    res.json(users);
});

module.exports = router;
