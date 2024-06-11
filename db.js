const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/AuthJWT')
.then(()=>{
    console.log("DB connected")
})
.catch((er)=>{
    console.log(er)
})


const schema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        token:{
            type:String,
            required:true,
        }
})

const Collection = new mongoose.model('Auth', schema)


module.exports = Collection