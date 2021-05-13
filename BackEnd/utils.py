import os
import json
import requests

basedir = os.path.abspath(os.path.dirname(__file__))
tourFile = os.path.join(basedir, 'data/tour.json')

def parseTour(location):
    result = []
    with open(tourFile, encoding='utf-8') as f:
        tourDatas = json.load(f)
        tourRecordsInLoc = tourDatas.get(location, [])
        for record in tourRecordsInLoc:
            result.append({
                "관광지명": record['관광지명'],
                "지역": record['제공기관명'].split(' ')[0],
                "위도": record['위도'],
                "경도": record['경도'],
                "관리기관전화번호": record['관리기관전화번호'],
                "설명": record['관광지소개'],
            })
    return result

# 임시 유튜브 스크래퍼
def search_youtube(keyword):
    # 동영상 만 검색하는 필터
    filter = "&sp=EgIQAQ%253D%253D"
    html = requests.get('https://www.youtube.com/results?search_query=' + keyword + filter).text

    index = html.find('"watchEndpoint":{"videoId":"')

    target = html[index: index + 100]
    videoId = target.split('"')[5]
    if len(videoId) != 11:
        # videoId 가 11자리가 아니면, 그냥 적당한 영상 id 를 돌려줌
        return "W_z6esc8KQk"
    return videoId
