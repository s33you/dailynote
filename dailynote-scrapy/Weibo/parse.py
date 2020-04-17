import time,re
from datetime import datetime
def parse_time(date):
    if re.match('刚刚', date):
        date = time.strftime('%Y-%m-%d %H:%M', time.localtime(time.time()))
        return date
    if re.match('\d+分钟前', date):
        minute = re.match('(\d+)', date).group(1)
        date = time.strftime('%Y-%m-%d %H:%M', time.localtime(time.time() - float(minute) * 60))
        return date
    if re.match('\d+小时前', date):
        hour = re.match('(\d+)', date).group(1)
        date = time.strftime('%Y-%m-%d %H:%M', time.localtime(time.time() - float(hour) * 60 * 60))
        return date
    if re.match('昨天.*', date):
        date = re.match('昨天(.*)', date).group(1)
        date = time.strftime('%Y-%m-%d', time.localtime(time.time() - 24 * 60 * 60 ))
        return date
    if re.match('\d{2}-\d{2}', date):
        now = datetime.now()
        temp_date = str(now.year) + '-' + date
        create_date = datetime.strptime(temp_date, '%Y-%m-%d')
        if (now - create_date).days <= 13:
            date = time.strftime('%Y-', time.localtime()) + date
            return date
        return False
    return False