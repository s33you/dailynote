const express= require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const router = require('./router')
// const bodyParse = require('body-parser')
app.use(cors())
app.use('/public',express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)
// app.engine('html', require('express-art-template'));
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine','art')
app.listen(3000,'192.168.1.6',function(){
    console.log('192.168.1.6:3000')
    console.log('服务启动成功')
})


