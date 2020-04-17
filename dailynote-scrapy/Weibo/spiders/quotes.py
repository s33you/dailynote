# -*- coding: utf-8 -*-
import scrapy
import json
from urllib.parse import urlencode
from Weibo.items import *
from time import sleep
import time
import Weibo.parse as parse
import re

class WeiboSpider(scrapy.Spider):
    name = "Weibo"
    allowed_domains = ["m.weibo.cn"]
    item_parse_error = True
    home_params = {
        "is_all[]": "1",
        "jumpfrom": "weibocom",
        "sudaref": "s.weibo.com",
        "type": "uid",
        "value": "3176010690",
        "containerid": "1076033176010690",
    }
    home_base_url = 'https://m.weibo.cn/api/container/getIndex?'
    commit_base_url = 'https://m.weibo.cn/comments/hotflow?id={id}&mid={mid}&max_id={max_id}&max_id_type=0'
    commit_child_url = 'https://m.weibo.cn/comments/hotFlowChild?cid={cid}&max_id={max_id}&max_id_type=0'
    def start_requests(self):
        url = self.home_base_url + urlencode(self.home_params)
        yield scrapy.Request(url=url, callback=self.parse_weibo)

    def parse_weibo(self, response):
        sleep(2)
        jsonDict = json.loads(response.text)
        cards = jsonDict.get('data').get('cards')
        since_id = ''
        for card in cards:
            if card.get('mblog'):
                mblog = card.get('mblog')
                if not mblog.get('isTop'):
                    item = WeiboItem()
                    item['mid'] = mblog['mid']
                    weibo_id = mblog['mid']
                    since_id = mblog['mid']
                    item['text'] = mblog['text']
                    item['created_at'] = mblog['created_at']
                    if parse.parse_time(date=item.get('created_at').strip()) != False:
                        # commit_url 构造
                        commit_url = self.commit_base_url.format(id=weibo_id,mid=weibo_id,max_id='0')
                        yield scrapy.Request(url=commit_url,callback = self.parse_commit,meta = {'weibo_id':weibo_id,'page':1})
                    yield item
        self.home_params['since_id'] = since_id
        url = self.home_base_url + urlencode(self.home_params)
        sleep(3)
        if self.item_parse_error:
            yield scrapy.Request(url=url, callback=self.parse_weibo)

    def parse_commit(self, response):
        sleep(2)
        page = response.meta.get('page')
        weibo_id = response.meta.get('weibo_id')
        commit_id = ''
        jsonDict = json.loads(response.text)
        commit_list = jsonDict.get('data').get('data')
        if commit_list and page <= 4:
            max_id = jsonDict.get('data').get('max_id')
            for commit in commit_list:
                if re.match('\.*(浮生)\.*|\.*(日记)\.*',commit.get('text')):
                    item = CommitItem()
                    item['id'] = commit.get('id')
                    commit_id= commit.get('id')
                    item['like_count'] = commit.get('like_count')
                    item['created_at'] = commit.get('created_at')
                    item['text'] = commit.get('text')
                    item['user_name'] = commit.get('user').get('screen_name')
                    yield item
                    #构造符合条件commit 的 child_commit url
                    child_url = self.commit_child_url.format(cid=commit_id,max_id='0')
                    yield scrapy.Request(url=child_url,callback = self.parse_child_commit,meta={'commit_id':commit_id,'page':1})
            print('next commit page')
            #构造下一commit列表url
            url = self.commit_base_url.format(id=weibo_id,mid=weibo_id,max_id=max_id)
            page =page + 1
            sleep(3)
            yield scrapy.Request(url = url,callback = self.parse_commit,meta={'weibo_id':weibo_id,'page':page}) 

    def parse_child_commit(self,response):
        sleep(2)
        page = response.meta.get('page')
        commit_id = response.meta.get('commit_id')
        
        jsonDict = json.loads(response.text)
        commit_list = jsonDict.get('data')
        if commit_list and page <= 4:
            max_id = jsonDict.get('max_id')
            for commit in commit_list:
                if commit.get('like_count') >=20:
                    item = ChildCommitItem()
                    item['id'] = commit.get('id')
                    item['like_count'] = commit.get('like_count')
                    item['text'] = re.sub('(<span).*(</span>)',"",commit.get('text'))
                    item['created_at'] = commit.get('created_at')
                    item['user_name'] = commit.get('user').get('screen_name')
                    item['profile_image'] = commit.get('user').get('profile_image_url')
                    yield item
            print('next page')
            page =page + 1
            # 构造下一评论回复列表的url
            url = self.commit_child_url.format(cid=commit_id,max_id=max_id)
            print('child_url is :' + url)
            sleep(3)
            yield scrapy.Request(url = url,callback = self.parse_child_commit,meta={'commit_id':commit_id,'page':page})
            








