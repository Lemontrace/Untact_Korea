from flask import Flask, request, jsonify
import requests
import json
import utils
from bs4 import BeautifulSoup

app = Flask(__name__, static_folder='data')


@app.route('/getFestivals')
def get_festivals():
    location = request.args.get('location')
    return app.send_static_file('festival/%s.json' % location)

@app.route('/getTours')
def get_tours():
    location = request.args.get('location')
    return jsonify(utils.parseTour(location))

@app.route('/searchYoutube')
def search_youtube():
    keyword = request.args.get('keyword')
    if not keyword:
        return "missing keyword"
    return utils.search_youtube(keyword)

#app.run('0.0.0.0', 5000)

