import os
import json
import requests

basedir = os.path.abspath(os.path.dirname(__file__))
tourFile = os.path.join(basedir, 'data/tour.json')
failLog = os.path.join(basedir, 'log/fail.log')

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
    threshold = 5
    try:
        while threshold:
            request_url = 'https://www.youtube.com/results?search_query=' + keyword
            html = requests.get(request_url).text

            index = html.find('"watchEndpoint":{"videoId":"')

            # 최대 threshold 번 만큼 재시도함
            if index == -1:
                threshold -= 1
                continue

            target = html[index: index + 100]
            video_id = (target.split('"')[5])
            return video_id

        # 이심원충신정려현판 은 검색결과가 없기 때문에, 무조건 여기로 옴.
        raise(Exception("Search Failed"))
    except:
        with open(failLog, "a") as f:
            f.write(keyword + "\n")
    # Fake videoId
    return "X" * 11
