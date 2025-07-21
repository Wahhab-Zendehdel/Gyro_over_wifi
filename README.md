# Browser Gyroscope Test

This project allows you to stream gyroscope and accelerometer data from your mobile device to your computer in real-time.

## :rocket: Getting Started

### Prerequisites

-   A mobile device with motion sensors.
-   A modern web browser on your mobile device.
-   Python 3.8 or higher on your computer.
-   `websockets` Python library (`pip install websockets`).

### Usage

1.  **Deploy the web application:**
    -   This project is designed to be deployed to GitHub Pages. Simply push the code to a GitHub repository and enable GitHub Pages in the repository settings.
    -   Alternatively, you can run a simple web server in the root directory of the project (e.g., `python -m http.server`).

2.  **Run the Python server:**
    -   Navigate to the `server` directory:
        ```bash
        cd server
        ```
    -   Run the server:
        ```bash
        python server.py
        ```
    -   The server will start a WebSocket server on port 8081.

3.  **Connect and stream:**
    -   Open the web application in a browser on your mobile device.
    -   The application will automatically connect to the WebSocket server running on your computer.
    -   You should see the sensor data being streamed to the server's console.

## :gear: Configuration

-   **WebSocket Port:** The default WebSocket port is `8081`. You can change this in `server/server.py` and `scripts/script.js`.
-   **WebSocket Host:** The web application will try to connect to the WebSocket server on the same host as the web page. If you are running the server on a different machine, you will need to change the host in `scripts/script.js`.

## :handshake: Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## :license: License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
