import socketio
import aiohttp
from aiohttp import web

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

@sio.event
async def connect(sid, environ):
    print('connect ', sid)

@sio.event
async def sensor_data(sid, data):
    print('message from ', sid, ': ', data)
    await sio.emit('sensor_data', data, room=sid)

@sio.event
async def disconnect(sid):
    print('disconnect ', sid)

async def index(request):
    return web.FileResponse('../index.html')

app.router.add_get('/', index)
app.router.add_static('/scripts', '../scripts')
app.router.add_static('/styles', '../styles')

if __name__ == '__main__':
    web.run_app(app)
