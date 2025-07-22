import socketio

sio = socketio.Client(ssl_verify=False)

@sio.event
def connect():
    print('connection established')

@sio.event
def disconnect():
    print('disconnected from server')

@sio.on('gyroData')
def on_gyro_data(data):
    print('I received a message!', data)

sio.connect('https://localhost:8080', transports=['websocket'])
sio.wait()
