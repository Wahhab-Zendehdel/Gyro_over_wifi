# Browser Gyroscope Test

This project allows you to view gyroscope and accelerometer data from your mobile device in real-time.

## :rocket: Getting Started

### Prerequisites

-   A mobile device with motion sensors.
-   A modern web browser on your mobile device.

### Usage

This project can be used in two ways:

1.  **Deployed to a hosting service that supports HTTPS (e.g., GitHub Pages):**
    -   This is the recommended approach.
    -   Simply push the code to a GitHub repository and enable GitHub Pages in the repository settings.
    -   The web application will be available at `https://<your-username>.github.io/<your-repo-name>/`.

2.  **Run locally with a self-signed SSL certificate:**
    -   This approach is useful for testing and development.
    -   You will need to have OpenSSL installed on your computer.

    **Instructions:**

    1.  **Generate a self-signed SSL certificate:**
        -   Navigate to the `server` directory:
            ```bash
            cd server
            ```
        -   Run the following command:
            ```bash
            openssl req -new -x509 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=CA/L=San Francisco/O=My Company/OU=My Department/CN=localhost"
            ```

    2.  **Run the Python server:**
        -   Navigate to the `server` directory:
            ```bash
            cd server
            ```
        -   Run the server:
            ```bash
            python server.py
            ```
        -   The server will start an HTTPS server on port 8080 and a secure WebSocket server on port 8081.

    3.  **Trust the self-signed certificate:**
        -   Open your browser and navigate to `https://localhost:8080`.
        -   You will see a warning message about the self-signed certificate.
        -   You will need to accept the risk and proceed to the website. The exact steps for this will vary depending on your browser.

    4.  **View the sensor data:**
        -   Once you have trusted the certificate, you should be able to see the sensor data being displayed on the web page.

## (Optional) Receiving Data with Python

If you want to receive the sensor data on your computer, you can use the provided Python client and server scripts.

### Prerequisites

-   Python 3.8 or higher on your computer.
-   `websockets` Python library (`pip install websockets`).

### Usage

1.  **Start the WebSocket server:**
    -   Follow the instructions above to run the server with a self-signed SSL certificate.

2.  **Modify the web application:**
    -   You will need to modify the `scripts/script.js` file to connect to the WebSocket server.
    -   Uncomment the following line:
        ```javascript
        // var socket = new WebSocket('wss://<your-computer-ip>:8081');
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
