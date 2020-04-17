# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class WeiboItem(scrapy.Item):
    collection = 'Weibo'
    mid = scrapy.Field()
    text = scrapy.Field()
    created_at  = scrapy.Field()

class CommitItem(scrapy.Item):
    collection = 'Commit'
    id = scrapy.Field()
    text = scrapy.Field()
    like_count = scrapy.Field()
    user_name = scrapy.Field()
    created_at = scrapy.Field()
class ChildCommitItem(scrapy.Item):
    collection = 'ChildCommit'
    id = scrapy.Field()
    text = scrapy.Field()
    like_count = scrapy.Field()
    user_name = scrapy.Field()
    created_at =scrapy.Field()
    profile_image = scrapy.Field()