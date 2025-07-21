# Browser Gyroscope Test

This project allows you to stream gyroscope and accelerometer data from your mobile device to your computer in real-time.

## :rocket: Getting Started

### Prerequisites

-   A mobile device with motion sensors.
-   A modern web browser on your mobile device.
-   Python 3.8 or higher on your computer.
-   `websockets` Python library (`pip install websockets`).
-   OpenSSL (for running the server locally with HTTPS).

### Usage

1.  **Deploy to GitHub Pages:**
    -   Push the code to a GitHub repository and enable GitHub Pages in the repository settings.
    -   The web application will be available at `https://<your-username>.github.io/<your-repo-name>/`.

2.  **Run Locally:**
    -   **Generate SSL Certificate:**
        -   Navigate to the `server` directory and run:
            ```bash
            openssl req -new -x509 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=CA/L=San Francisco/O=My Company/OU=My Department/CN=localhost"
            ```
    -   **Run the Server:**
        -   In the `server` directory, run:
            ```bash
            python server.py
            ```
    -   **Trust the Certificate:**
        -   Open your browser and navigate to `https://localhost:8080`.
        -   Accept the security warning to trust the self-signed certificate.

3.  **Connect and Stream:**
    -   Open the web application on your mobile device.
    -   If running locally, you will need to modify `scripts/script.js` to connect to your computer's IP address.

## :handshake: Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## :license: License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
