import asyncio
import websockets
import json

async def receive_data():
    uri = "ws://localhost:8081"
    async with websockets.connect(uri) as websocket:
        while True:
            data = await websocket.recv()
            print(json.loads(data))

if __name__ == "__main__":
    asyncio.run(receive_data())
