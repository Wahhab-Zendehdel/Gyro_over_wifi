# Browser Gyroscope Test

This project allows you to view gyroscope and accelerometer data from your mobile device in real-time.

## :rocket: Getting Started

### Prerequisites

-   A mobile device with motion sensors.
-   A modern web browser on your mobile device.

### Usage

1.  **Deploy the web application:**
    -   This project is designed to be deployed to GitHub Pages. Simply push the code to a GitHub repository and enable GitHub Pages in the repository settings.
    -   Alternatively, you can run a simple web server in the root directory of the project (e.g., `python -m http.server`).

2.  **View the sensor data:**
    -   Open the web application in a browser on your mobile device.
    -   You should see the sensor data being displayed on the web page.

## (Optional) Receiving Data with Python

If you want to receive the sensor data on your computer, you can use the provided Python client and server scripts.

### Prerequisites

-   Python 3.8 or higher on your computer.
-   `websockets` Python library (`pip install websockets`).

### Usage

1.  **Start the WebSocket server:**
    -   Navigate to the `server` directory:
        ```bash
        cd server
        ```
    -   Run the server:
        ```bash
        python server.py
        ```
    -   The server will start a WebSocket server on port 8081.

2.  **Modify the web application:**
    -   You will need to modify the `scripts/script.js` file to connect to the WebSocket server.
    -   Uncomment the following line:
        ```javascript
        // var socket = new WebSocket('ws://<your-computer-ip>:8081');
        ```
    -   Replace `<your-computer-ip>` with the IP address of the computer running the Python server.
    -   Uncomment the following lines:
        ```javascript
        // if (socket.readyState === WebSocket.OPEN) {
        //     const data = {
        //         absolute,
        //         rot_x,
        //         rot_y,
        //         rot_z,
        //         acc_x,
        //         acc_y,
        //         acc_z,
        //         currentScreenOrientation
        //     };
        //     socket.send(JSON.stringify(data));
        // }
        ```

3.  **Run the Python client:**
    -   Navigate to the `server` directory:
        ```bash
        cd server
        ```
    -   Run the client:
        ```bash
        python client.py
        ```
    -   The client will connect to the WebSocket server and print the received data.

## :handshake: Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## :license: License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
