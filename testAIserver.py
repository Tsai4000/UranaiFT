from flask import Flask, jsonify, request, make_response
# from TestAI.WGAN import *
import pymongo
import time
import random

app = Flask(__name__)


@app.route('/test', methods=['GET'])
def testRedirect():
    req = request.get_json()
    print('test redirect', req)
    return make_response(jsonify({"result": "redirect success"}), 200)


@app.route('/predict', methods=['POST'])
def predict():
    print(request.get_json())
    return make_response(jsonify({"result": random.uniform(-1, 1)}), 200)


app.run(port=5500, debug=True, threaded=True)
