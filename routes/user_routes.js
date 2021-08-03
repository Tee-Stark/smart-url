const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../controllers/users_module.js");
const Urls = require("../controllers/urls_module.js");
const Auth = require("../controllers/auth_module.js");

const router = express.Router();

router.post('/register', (req, res) => {
    const user = req.body;
    Auth.createUser(user)
    .then(data => {
        res.status(200).json(data);
    })   
    .catch(err => {
        res.status(500).json({message: err.message});
    })
});

router.post('/login', (req, res) => {
    const user = req.body;
    Auth.login(user.email)
    .then(data => {
        const validPassword = bcrypt.compareSync(user.password,data.password);
        if (validPassword) {
            res.status(200).json({
                data,
                token: Auth.generateToken(data),
                message: "User logged in Successfully..."
            });   
        } else {
            res.status(401).json({message: "Invalid password!"});
        }
    })
    .catch(err => {
        res.status(500).json({error: "Invalid login credentials..."});
    });
});

router.post('/:id/shorten', async (req, res) => {
    const fullUrl = req.body.fullUrl;
    const userId = req.params.id;
    await Urls.createShort(fullUrl)
    .then(async data => {
        await Users.addUrl(userId, data._id);
        res.status(200).json({message: "New short url generated successfully...", data});
    })
    .catch(err => {
        res.status(500).json({message: `${err.message}\n...unable to create new short url`});
    })
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    Users.getUrls(userId)
    .then(data => {
        res.status(200).json({message: "Your Urls: ", data});
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

router.put('/:id', (req, res) => {
    const urlId = req.params.id;
    const newShort = req.body.short;
    Urls.modifyShort(urlId, newShort)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({message: err.message});
    });
});

module.exports = router;