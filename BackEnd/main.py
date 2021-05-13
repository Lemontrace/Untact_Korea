from flask import Flask, request
import requests
<<<<<<< HEAD
import json
=======
import utils
>>>>>>> 361146a6f961f63d0077b82147f9cb2b75e26996

app = Flask(__name__, static_folder='data')


@app.route('/getFestivals')
def get_festivals():
    location = request.args.get('location')
    return app.send_static_file('festival/%s.json' % location)

@app.route('/getTours')
def get_tours():
    pass
    #TODO

youtube_api_key = 'AIzaSyC-5mfLh9EWPdHNOv25ngb2UfNYh6eZ4Uo'
def get_video_key(query):
    args={'part': 'snippet', 'maxResults': 1, 'q': query, 'type': 'video', 'key': youtube_api_key}
    r = requests.get('https://youtube.googleapis.com/youtube/v3/search',params=args)
    js=json.loads(r.text)
    return js['items'][0]['id']['videoId']


print(get_video_key("광안리 불꽃축제"))


#app.run('0.0.0.0', 5000)

