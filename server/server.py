import socketio
import eventlet
import eventlet.wsgi
import ssl

# Create a Socket.IO server
sio = socketio.Server(cors_allowed_origins='*')

# Wrap the Socket.IO server with a WSGI application
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'},
    '/scripts/script.js': {'content_type': 'application/javascript', 'filename': 'scripts/script.js'},
    '/styles/style.css': {'content_type': 'text/css', 'filename': 'styles/style.css'},
})

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

@sio.on('gyroData')
def on_gyro_data(sid, data):
    print('Received gyro data: ', data)
    sio.emit('gyroData', data, broadcast=True, include_self=False)

if __name__ == '__main__':
    # Use eventlet to run the server
    eventlet.wsgi.server(eventlet.wrap_ssl(eventlet.listen(('0.0.0.0', 8080)),
                                           certfile='server/cert.pem',
                                           keyfile='server/key.pem',
                                           server_side=True), app)
