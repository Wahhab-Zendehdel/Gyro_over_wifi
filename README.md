# Gyroscope Web Streamer

[![Python Application](https://github.com/your-username/your-repo/actions/workflows/python-app.yml/badge.svg)](https://github.com/your-username/your-repo/actions/workflows/python-app.yml)

## :wave: Introduction

This project allows you to stream gyroscope sensor data from your mobile device to your computer in real-time using a web browser. It consists of two main components:

-   :iphone: **A web application** that accesses the gyroscope sensor using the Generic Sensor API and sends the data over a WebSocket connection.
-   :computer: **A Python server** that serves the web application and relays gyroscope data to all connected clients.

## :rocket: Getting Started

### Prerequisites

-   Python 3.8 or higher ([Download](https://www.python.org/downloads/))
-   A mobile device with a gyroscope sensor and a modern web browser that supports the Generic Sensor API.

### Installation & Usage

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2.  **Install dependencies:**

    ```bash
    pip install websockets
    ```

3.  **Run the Python server:**

    ```bash
    cd python_server
    python server.py
    ```

    The server will start a web server on port 8080 and a WebSocket server on port 8081.

4.  **Connect and stream:**
    -   Ensure your mobile device and computer are on the same Wi-Fi network.
    -   Open a web browser on your mobile device and navigate to `http://<your-computer-ip>:8080`.
    -   The web page will display the gyroscope data from your device.
    -   Open the same address in a web browser on your computer to see the data mirrored in real-time.

## :gear: Configuration

-   **Ports:** The default ports are `8080` for the web server and `8081` for the WebSocket server. You can change these in `python_server/server.py`.

## :handshake: Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## :license: License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
