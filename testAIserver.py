from flask import Flask, jsonify, request, make_response
# from TestAI.WGAN import *
import pymongo
import time

app = Flask(__name__)


@app.route('/test', methods=['GET'])
def testRedirect():
    req = request.get_json()
    print('test redirect', req)
    return make_response(jsonify({"result": "redirect success"}), 200)


app.run(host='0.0.0.0', port=5500, debug=True, threaded=True)
