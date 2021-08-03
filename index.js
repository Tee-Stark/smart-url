const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Urls = require('./controllers/urls_module.js');
const userRoutes = require('./routes/user_routes.js');
const config = require('./config.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/users', userRoutes);

app.get('/', async (req, res) => {
    const shortUrls = await urlModel.find();
    if (shortUrls) {
        const urls = [];
        shortUrls.map(url => {
            urls.push(url);
        });
        res.status(200).json({message: "ALL URLS", urls});
    }
    else{
        res.status(500).json({message: "Could not load all urls"});
    }
})

app.post('/shorten', async (req, res) => {
    const fullUrl = req.body.fullUrl;
    await Urls.createShort(fullUrl)
    .then(data => {
        res.status(200).json({message: "New short url generated successfully...", data});
    })
    .catch(err => {
        res.status(500).json({message: `${err.message}\n...unable to create new short url`});
    })
});

mongoose.connect(config.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
})
.then(console.log("MONGODB CONNECTED"))
.catch(err => console.error(err));

mongoose.connection.on("open", () => {
    app.listen(config.PORT, () => {
        console.log("Server listening on port: " + config.PORT);
    });
});