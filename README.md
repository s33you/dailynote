# DailyNote/浮生日记

### 项目结构
```javascript
dailynote/
|- dailynote //前端
|- dailynote-backend/ // 后端
|- dailynote-scrapy //爬虫
```
### 项目描述
整个项目大概用了一周时间，爬虫用的时间最多。

基于个人兴趣，本身没有太大技术性。整合了一下微博网红带带大师兄微博下的“浮生日记”相关评论,爬虫的原理就是拿到接口，遍历微博，遍历评论，筛选含有“浮生||日记”关键字的评论，然后拿到评论中的回复。这里偷了懒，没有做ip代理池，和cookie池，因为只拿近七天的数据就不需要如此大费周章了。

前端展示方面本来想做弹幕，结果突然想到摇一摇，利用devicemotion这一原生事件,可以摇一摇达到切换日记的效果

### 使用方法
1.首先进入爬虫文件夹，命令行运行``scrapy crawl Weibo``,运行前确保已经安装scrapy框架的运行环境,当然本地没有启动MongoDB数据库也是不行的。数据库配置和cookie设置修改具体在``middlewares.py``, ``pipelines.py``,两个文件当中,可自行修改  

2.拿到数据之后进入``dailynote-backend``文件夹,
``npm install``，``node app.js``,即可。  

3.进入前端文件夹目录,``npm install``，``npm run serve``



### ToDOList
- 对于不支持devicemotion事件的设备，响应式的提供左右切换按钮

- 进一步整合有用的数据，如:利用like_count做一些类似排行榜？孙笑川最佳日记得奖者？233

- cookie池，代理池的加入(啊，贫穷QAQ)

- 通过后端启用python爬虫，达到定时更新数据的效果。