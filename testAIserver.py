from flask import Flask, jsonify, request, make_response
# from TestAI.WGAN import *
from keras.optimizers import RMSprop
from keras.models import load_model
# Convolution Operation
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from keras.layers.normalization import BatchNormalization

import pymongo
import time
import random
import base64
import cv2
import numpy as np

import tensorflow as tf
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        # Currently, memory growth needs to be the same across GPUs
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        logical_gpus = tf.config.experimental.list_logical_devices('GPU')
        print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
    except RuntimeError as e:
        # Memory growth must be set before GPUs have been initialized
        print(e)

app = Flask(__name__)


def wasserstein_loss(y_true, y_pred):
    return K.mean(y_true * y_pred)


Gmodel = load_model(
    './AImodel/G.h5', custom_objects={"wasserstein_loss": wasserstein_loss}, compile=False)
Dmodel = load_model(
    './AImodel/D.h5', custom_objects={"wasserstein_loss": wasserstein_loss}, compile=False)
# 暫時用localmodel
optimizer = RMSprop(lr=0.00005)
gn, gRandomNormal = Gmodel.get_config(
)['layers'][0]['config']['batch_input_shape']

# Gmodel.compile(optimizer=optimizer, loss=wasserstein_loss,
#                metrics=['accuracy'])

dn, dx, dy, dt = Dmodel.get_config(
)['layers'][0]['config']['batch_input_shape']

# Dmodel.compile(optimizer=optimizer, loss=wasserstein_loss,
#                metrics=['accuracy'])


def imgBase64Decode(inpImg):
    imgdata = base64.b64decode(inpImg)
    img_array = np.frombuffer(imgdata, dtype=np.uint8)
    img = cv2.imdecode(img_array, flags=cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return img


def predictG():
    noise = np.random.normal(0, 1, (1, 100))
    Gpic = Gmodel.predict(noise)
    return Gpic


def predictD(inpImg):
    img = imgBase64Decode(inpImg)
    matrix = cv2.resize(img, (dx, dy), interpolation=cv2.INTER_CUBIC)
    matrix = matrix.reshape(-1, dx, dy, dt)
    predictList = Dmodel.predict(matrix)
    print(predictList[0][0])
    return predictList[0][0]


@app.route('/test', methods=['GET'])
def testRedirect():
    req = request.get_json()
    print('test redirect', req)
    return make_response(jsonify({"result": "redirect success"}), 200)


@app.route('/predict', methods=['POST'])
def predict():
    # print(request.get_json())
    result = predictD(request.get_json()['imgData'][22:])
    return make_response(jsonify({"result": str(result)}), 200)


app.run(port=5500, debug=True, threaded=True)
