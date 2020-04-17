const express= require('express')
const app = express()
const path = require('path')
// const router = require('./router')
const bodyParse = require('body-parser')
app.use('/public',express.static(path.join(__dirname, 'public')))
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())
// app.use(router)
// app.engine('html', require('express-art-template'));
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine','art')
//设置视图
app.listen(5000,function(){
    console.log('127.0.0.1:5000')
    console.log('服务启动成功')
})

app.post('/test',function(req,res){
    console.log(req.body)
    res.send('跨域测试')
})
app.get('/jsonp',function(req,res,next) {
    //要响应回去的数据
     let data = {
       username : 'jsonp-backend',
       password : 123456
     }
   
     let {wd , callback} = req.query;
     console.log(wd);
     console.log(callback);
     // 调用回调函数 , 并响应
     res.end(`${callback}(${JSON.stringify(data)})`);
   })
 let whitList = ['http://127.0.0.1:3000'] 
 app.use(function(req, res, next) {
    let origin = req.headers.origin
    //从白名单里面获取源与当前源做比较
    if (whitList.includes(origin)) {
      // 设置哪个源可以访问我
      res.setHeader('Access-Control-Allow-Origin', origin)
      // 允许携带哪个头访问我
      res.setHeader('Access-Control-Allow-Headers', 'name')
      // 允许哪个方法访问我
      res.setHeader('Access-Control-Allow-Methods', 'PUT')
      // 允许携带cookie
      res.setHeader('Access-Control-Allow-Credentials', true)
      // 预检的存活时间
      res.setHeader('Access-Control-Max-Age', 6)
      // 允许返回的头
      res.setHeader('Access-Control-Expose-Headers', 'name')
      if (req.method === 'OPTIONS') {
        res.end() // OPTIONS请求不做任何处理
      }
    }
    next()
  })
  app.put('/cors', function(req, res) {
    let data = {
        username : 'cors-backend',
        password : 123456
    }
    console.log(req.headers)
    res.setHeader('name', 'cors-backend') //返回一个响应头，后台需设置
    res.end(JSON.stringify(data))
  })
  app.get('/cors', function(req, res) {
    console.log(req.headers)
    res.end('hi,you cors run success')
  })
  
   
