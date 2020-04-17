
const mongoose = require('mongoose')
require('../index')

const commitSchema = mongoose.Schema({
    id:String,
    created_at:String,
    like_count:Number,
    profile_image:String,
    user_name:String,
    text:String
})
const Commit = mongoose.model('ChildCommit', commitSchema,'ChildCommit')
module.exports = Commit
