var express = require('express')
var router = express.Router()
const Commit = require('./dataBase/control/commit')
router.get('/sort',function(req,res){
    
       let commits = []
       Commit.sortByLikeCount()
       .then( docs =>{
         commits = commits.concat(docs)
           res.send(commits)
       })
       .catch( err =>{
           console.log(err)
           res.status(404).send(err)
       })
})
router.get('/randomCard',function(req,res){
    Commit.randomCard()
    .then(doc=>{
        console.log(doc)
        let card = {
            name:doc['user_name'],
            src:doc['profile_image'],
            text:doc['text']
        }
        res.json(card)
    })
    .catch( err =>{
        console.log(err)
        res.status(404).send(err)
    })
})
router.get('*',function(req,res){
    res.status(404).end()
})
router.post('/testpost',function(req,res){
   console.log(req.body)
    res.json({"data":1})    
})
module.exports = router