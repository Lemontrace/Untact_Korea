from flask import Flask, request
import requests
import utils

app = Flask(__name__, static_folder='data')


@app.route('/get_data')
def get_data():
    data_type = request.args.get('type')
    location = request.args.get('location')

    if data_type == 'festival':
        return app.send_static_file('festival/%s.json' % location)
    if data_type == 'tour':
        pass
        # code



youtube_api_key = 'AIzaSyDbMPQCMvNP9FM4gP7Of36ki2iuwSQYRlo'
def make_youtube_api_request(query):
    args={'part': 'snippet', 'maxResults': 1, 'q': query, 'type': 'video', 'key': youtube_api_key}
    r = requests.get('https://youtube.googleapis.com/youtube/v3/search',params=args)
    return r.text
    


print(make_youtube_api_request("광안리 불꽃축제"))


#app.run('0.0.0.0', 5000)
