# Unreal Engine Socket.IO Integration Guide

This guide explains how to connect your Unreal Engine project to the Socket.IO server to receive gyroscope data.

## 1. Get a Socket.IO Plugin

Unreal Engine does not have built-in support for Socket.IO. You will need to use a plugin from the Unreal Engine Marketplace. Here are a few popular options:

- **Socket.IO Client** by anjopia: [https://www.unrealengine.com/marketplace/en-US/product/socket-io-client](https://www.unrealengine.com/marketplace/en-US/product/socket-io-client)
- **JSON Query & Socket.IO** by papercomp: [https://www.unrealengine.com/marketplace/en-US/product/json-query-socket-io](https://www.unrealengine.com/marketplace/en-US/product/json-query-socket-io)

Install one of these plugins into your Unreal Engine project.

## 2. Connect to the Socket.IO Server

After installing the plugin, you can connect to the Socket.IO server from your Blueprints.

1.  **Create a Socket.IO client instance:** In your Blueprint (e.g., the Level Blueprint or a custom Actor Blueprint), create a new `SocketIOClient` object. You might need to do this in the `BeginPlay` event.
2.  **Set the server address:** Configure the client to connect to your server's address, which is `wss://<your_server_ip>:8080`. Remember to replace `<your_server_ip>` with the actual IP address of your server. If you are running the server on the same machine as the Unreal Engine editor, you can use `wss://localhost:8080`.
3.  **Connect:** Call the `Connect` function on the `SocketIOClient` object.

## 3. Bind an Event to a Function

The core of the integration is to listen for the `gyroData` event from the server and execute a function when it's received.

1.  **Create a custom event:** In your Blueprint's Event Graph, right-click and create a new **Custom Event**. Name it something descriptive, like `OnGyroDataReceived`.
2.  **Add an input parameter:** Select the custom event and, in the Details panel, add a new input parameter. The type of this parameter will depend on the plugin you are using, but it will likely be a `String` or a `JsonObject`. This parameter will hold the data received from the server.
3.  **Bind the event:** Use the `Bind Event to Function` or a similar node provided by your plugin.
    -   The **Event Name** should be `gyroData`.
    -   The **Function** to bind is the custom event you just created (`OnGyroDataReceived`).
4.  **Process the data:** In the `OnGyroDataReceived` event, you can now access the received data. You will likely need to parse the JSON string and extract the `rot_x`, `rot_y`, `rot_z`, etc., values. You can then use these values to control objects in your scene.

## Example Blueprint (Conceptual)

Here is a conceptual example of what your Blueprint's `BeginPlay` event might look like:

```
Event BeginPlay -> Create SocketIOClient -> Set Server URL ("wss://localhost:8080") -> Connect
               |
               -> Bind Event "gyroData" to "OnGyroDataReceived"

Event OnGyroDataReceived (Data: String) -> Parse JSON (Data) -> Get rot_x, rot_y, rot_z -> ... your game logic ...
```

By following these steps, you will be able to receive real-time gyroscope data from the server in your Unreal Engine project and use it to create interactive experiences.
