# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import pymongo
from scrapy.exceptions import DropItem
import json
import codecs
import os
from Weibo.items import *
import Weibo.parse as parse

# from scrapy.exceptions import DropItem
class JsonWithEncodingPipeline(object):
    
        def __init__(self):
            self.file = codecs.open('weibo_data_utf8.json', 'w', encoding='utf-8')
            self.file.write('[')
    
        def process_item(self, item, spider):
            line = json.dumps(dict(item), ensure_ascii=False,indent =2) + "\n"
            self.file.write(line+',')
            return item
    
        def close_spider(self, spider):
            self.file.seek(-1, os.SEEK_END)
            self.file.truncate()
            self.file.write(']')
            self.file.close()            
 
class MongoPipeline(object):
    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
 
    @classmethod
    def from_crawler(cls, crawler):
        return cls(mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DB')
        )
 
    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        self.db[CommitItem.collection].create_index([('created_at', pymongo.ASCENDING)])
        self.db[WeiboItem.collection].create_index([('created_at', pymongo.ASCENDING)])
        self.db[ChildCommitItem.collection].create_index([('like_count', pymongo.ASCENDING)])

    def process_item(self, item, spider):
        if item.collection =='ChildCommit':
            self.db[item.collection].update({'id': item.get('id')}, {'$set': item}, True)
        return item
 
    def close_spider(self, spider):
        self.client.close()

class WeiboPipeline():

    def process_item(self, item, spider):
        if isinstance(item, WeiboItem):
            if item.get('created_at'):
                item['created_at'] = item['created_at'].strip()
                if  parse.parse_time(date = item.get('created_at')):
                    item['created_at'] =  parse.parse_time(date = item.get('created_at'))
                    return item
                else:
                    print('Recently 7 Days Weibo Finished\n')
                    spider.item_parse_error = False
                    raise DropItem('Date Is Too Old')
        return item
            
        
            