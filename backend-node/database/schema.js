'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/portfolio_db', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
     });
const bcrypto = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');
const { isEmail } = require('validator');

    

const portfolioSchema = new Schema({
    _id: {
        type: String,
        require: true,
        minlength: 2
    },
    name: {
        type: String,
        require: true,
        minlength: 2
    },
    crypto: {
        type: Number,
        require: true
    }
});

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      set: (pass) => bcrypto.hashSync(pass, 12)
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: function (email) {
          return isEmail(email);
      }
  },

  });
  
userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('user', userSchema);
const PortfolioModel = mongoose.model("portfolio", portfolioSchema);

module.exports = {
    PortfolioModel,
    UserModel
};