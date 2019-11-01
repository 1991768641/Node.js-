const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/maoyan-admin', {useNewUrlParser: true, useUnifiedTopology: true });

const Users=mongoose.model('users',{
    username:String,
    password:String
})

const Movie=mongoose.model('movies',{
    movieLogo:String,
    moviename:String,
    starring:String,
    details:String,
    showTime:String,
    submitTime:String
})

module.exports={
    Users,
    Movie
}
