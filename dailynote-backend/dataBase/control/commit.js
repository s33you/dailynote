const Commit = require('../model/commit')
function sortByLikeCount(){
   
    return new Promise((res,rej)=>{
        Commit.find({}).sort({like_count:-1})
        .then(docs=>{
            res(docs)
        })
        .catch(err=>{
            console.log(err)
            rej(err)
        })
    })
}
function randomCard(){
    return new Promise((res,rej)=>{
        Commit.aggregate([{$sample:{size:1}}])
        .then(doc=>{
            res(doc[0])
        })
        .catch(err=>{
            rej(err)
        })
    })
}
module.exports  = {
    sortByLikeCount,
    randomCard
}
