const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/dailynotes', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function (err) {
    console.log('数据库连接成功')
    if (err)
        return console.log(new Error('数据库连接失败'))
});







