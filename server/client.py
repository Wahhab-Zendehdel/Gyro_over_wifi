import asyncio
import websockets
import json

import ssl

async def receive_data():
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    uri = "wss://localhost:8081"
    async with websockets.connect(uri, ssl=ssl_context) as websocket:
        while True:
            data = await websocket.recv()
            print(json.loads(data))

if __name__ == "__main__":
    asyncio.run(receive_data())
