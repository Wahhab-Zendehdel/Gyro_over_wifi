import asyncio
import json
import websockets
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer

PORT = 8080

import os

class WebServer(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.join(os.path.dirname(__file__), '..'), **kwargs)

async def handler(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        print(f"Received: {data}")
        # Broadcast the data to all connected clients
        for client in connected:
            await client.send(message)

async def main():
    loop = asyncio.get_running_loop()
    # Start the web server in a separate thread
    httpd = TCPServer(("", PORT), WebServer)
    httpd_thread = loop.run_in_executor(None, httpd.serve_forever)
    print(f"Web server serving at port {PORT}")

    # Start the WebSocket server
    async with websockets.serve(register, "0.0.0.0", 8081):
        print("WebSocket server started at port 8081")
        await httpd_thread

connected = set()

async def register(websocket):
    connected.add(websocket)
    try:
        await handler(websocket, path=None)
    finally:
        connected.remove(websocket)

if __name__ == "__main__":
    asyncio.run(main())
