# Unreal Engine Socket.IO Setup

This document provides instructions on how to set up the Socket.IO plugin in Unreal Engine and receive the sensor data from the web application.

## Prerequisites

-   Unreal Engine 4.27 or 5.x
-   [Socket.IO Client Plugin](https://www.unrealengine.com/marketplace/en-US/product/socket-io-client)

## Instructions

1.  **Install the Socket.IO Client Plugin:**
    -   Download and install the Socket.IO Client plugin from the Unreal Engine Marketplace.
    -   Enable the plugin in your Unreal Engine project (Edit -> Plugins -> Socket.IO Client -> Enable).

2.  **Create a Blueprint Actor:**
    -   Create a new Blueprint Actor in your project (e.g., `BP_SensorReceiver`).

3.  **Add a Socket.IO Client Component:**
    -   Open the `BP_SensorReceiver` Blueprint.
    -   Click the "Add Component" button and select "Socket.IO Client".

4.  **Connect to the Server:**
    -   In the "BeginPlay" event of the Blueprint, get the Socket.IO Client component and call the "Connect" function.
    -   Set the "URL" to the address of your Python server (e.g., `http://localhost:8080`).

5.  **Bind to the "sensor_data" Event:**
    -   In the "BeginPlay" event, after connecting to the server, call the "Bind Event" function on the Socket.IO Client component.
    -   Set the "Event Name" to "sensor_data".
    -   Create a new custom event to handle the received data (e.g., `OnSensorDataReceived`).

6.  **Receive and Process the Data:**
    -   In the `OnSensorDataReceived` event, you will receive the sensor data as a JSON object.
    -   Use the "Get JSON String Value" function to get the values of the different sensors (e.g., `rot_x`, `rot_y`, `rot_z`).
    -   You can then use these values to control objects in your scene, such as rotating a camera or moving a character.

## Example Blueprint

Here is an example of what your `BP_SensorReceiver` Blueprint might look like:

![Unreal Engine Blueprint](https://i.imgur.com/your-blueprint-image.png)

*(Please note that this is just an example, and you will need to adapt it to your specific needs.)*

## Important Notes

-   Make sure that your computer and mobile device are on the same Wi-Fi network.
-   The Python server must be running for the Unreal Engine client to connect.
-   You may need to adjust the port and IP address in the "Connect" function to match your server's configuration.
