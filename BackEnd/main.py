from flask import *


app = Flask(__name__,static_folder='data')

@app.route('/get_data')
def get_data():
    data_type = request.args.get('data_type')
    location = request.args.get('location')
    
    if (data_type=='festival'):
        return app.send_static_file('%s.json' % location)
        