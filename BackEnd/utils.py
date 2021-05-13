import os
import json

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