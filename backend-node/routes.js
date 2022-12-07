'use strict';

const { PortfolioModel, UserModel } = require('./database/schema.js');
const router = require("express").Router();
const axios = require("axios");
require('dotenv').config();
//const passport = require('./auth.js')
const createError = require('http-errors');
const { login, register } = require('./services.js');
const passport = require('passport');
//const bcrypt = require('bcrypt');
//const { ExtractJwt } = require('passport-jwt');


// AUTH
// router.post('/login', passport.authenticate('local'), login);

// router.post('/register', register);



// CREATE -----------------------------------------
router.post('/addCrypto', (req, res, next) => {
    PortfolioModel.create(req.body)
        .then(results => res.status(201).send(results))
        .catch(err => next(err))
});

// READ -----------------------------------------
router.get('/getPortfolio', (req, res, next) => {
    console.log(req);
    PortfolioModel.find()
        .then(results => res.send(results))
        .catch(err => next(err))
});

router.get('/getPortfolio/:id', (req, res, next) => {
    const _id = req.params.id;
    PortfolioModel.find({ _id })
        .then(results => res.send(results))
        .catch(err => next(err))
});

// UPDATE -----------------------------------------
router.patch("/updatePortfolio/:id", async (req, res, next) => {
    try {
        await PortfolioModel.findByIdAndUpdate(req.params.id, req.body)
        const newModel = await PortfolioModel.findById(req.params.id);
        console.log(newModel);
        res.send(newModel);
    } catch (err) {
        return next(err);
    }
})

// DELETE -----------------------------------------
router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    PortfolioModel.findByIdAndDelete(id)
        .then(results => res.status(201).send(results))
        .catch(err => next(err))
})



//API GETS ----------

router.get("/api/search", async (req, res, next) => {
    // SANDBOX
    //     await axios.get("https://rest-sandbox.coinapi.io/v1/assets?filter_asset_id=BTC;ETH;SOL;USDT;XRP;BNB;MATIC;LRC;DOT;DOGE;LTC;LINK;IMX;SNX,GRT;AVAX", 
    //     { headers: {"X-CoinAPI-Key": `${process.env.COIN_API_KEY}`}
    // })

    // PRODUCTION
    await axios.get("https://rest.coinapi.io/v1/assets?filter_asset_id=BTC;ETH;SOL;USDT;XRP;BNB;MATIC;LRC;DOT;DOGE;LTC;LINK;IMX;SNX,GRT;AVAX",
        {
            headers: { "X-CoinAPI-Key": `${process.env.COIN_API_KEY}` }
        })

        .then(results => res.status(201).send(JSON.stringify(results.data)))
        .catch(err => console.log(err))
})

router.get("/api/search/:id", async (req, res, next) => {
    const id = req.params.id;
    await axios.get(`https://rest.coinapi.io/v1/assets?filter_asset_id=${id}`,
        {
            headers: { "X-CoinAPI-Key": `${process.env.COIN_API_KEY}` }
        })
        .then(results => res.status(201).send(JSON.stringify(results.data)))
        .catch(err => console.log(err))
})

// API FOR CRYPTO NEWS ->  NEWSAPI
router.get("/news", async (req, res, next) => {
    await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&ethereum&crypto&apiKey=${process.env.NEWS_2_API}`)
        .then(results => res.status(201).send(JSON.stringify(results.data)))
        .catch(err => console.log(err))
})


module.exports = router;




// ATTEMPTS TO AUTHORISATIOn
// AUTHENTICATION ATTEMPT 1
// const isAuthenticated = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         return next(createError.Unauthorized('Login failed'));
//     }
//     return next();
// }

// router.get('/getAll', isAuthenticated, (req, res, next) => {
//     const user = req.body
//     UserModel.find({ user })
//         .then(results => res.send(results))
//         .catch(err => next(err))

//     // UserModel.find((err,user) => {
//     //     if (err) return next(err);
//     //     return res.json(user);
//     // });
// })

// router.post('/register', async ({ body }, res, next) => {
//     UserModel.create(body)
//         .then(results => res.status(201).send(results))
//         .catch(err => next(err))
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//     console.log("FIRST: ", req)
//     res.send();
// })


// AUTHORISATION ATTEMPT 2
// router.post('/login', passport.authenticate('local'), login);

// router.post('/register', register);


// CUSTOM AUTHENTICATION
// router.post('/register', async (req, res) => {
//     const user = req.body;
//     const takenUserName = await UserModel.find({username: user.username})
//     const takenEmail = await UserModel.find({email: user.email})

//     if (takenUserName || takenEmail ) {
//         res.json({message: "Username or Email has already been taken"})
//     } else {
//         user.password = await bcrypto.hash(req.body.password, 12)
//     }
//     UserModel.create({
//         username: user.username.toLowerCase(),
//         email: user.email.toLowerCase(),
//         password: user.password
//     })
//     res.json({message: "User successfully registered"})
// });

// router.post('/login', (req, res) => {
//     const logInRequest = req.body;
//     UserModel.find({ username: logInRequest.username })
//         .then(dbUser => {
//             if (!dbUser){
//                 return res.json({message: "Invalid username or password"})
//             }
//             bcrypt.compare(logInRequest.password, dbUser.password)
//             .then(confirmed => {
//                 if (confirmed) {
//                 const payLoad = {
//                     id: dbUser._id,
//                     username: dbUser.username
//                 }
//                 jwt.sign(
//                     payload,
//                     process.env.JWT_SECRET,
//                     {expiresIn: 86400},
//                     (err, token) => {
//                         if (err) {
//                           return res.json({message: "nope"})
//                         } else {
//                         return res.json({
//                             message: "success",
//                             token: "Bearer " + token
//                             })
//                         }
//                     })
//             } else {
//                 return res.json({message: "Invalid username or password"})
//         }
//     })
// });

// const authorise = (details, pw, res, next) => {
//     console.log(details)
//     const hashedPW = bcrypto.hashSync(pw, 12)
//     console.log(hashedPW)
//     if (hashedPW === details.password){
//         res.status(201).send(details.username)
//     } else {
//         res.send("Invalid password")
//     }
// }

// router.post('/login', async (req, res, next) => {
//     const username = req.body.username;
//     UserModel.find({ username })
//         .then(results => authorise(results, req.body.password))
//         .catch(err => next(err));
// })