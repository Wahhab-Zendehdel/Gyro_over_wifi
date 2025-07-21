# Gyroscope Streamer

[![Android CI](https://github.com/your-username/your-repo/actions/workflows/android.yml/badge.svg)](https://github.com/your-username/your-repo/actions/workflows/android.yml)
[![Python Application](https://github.com/your-username/your-repo/actions/workflows/python-app.yml/badge.svg)](https://github.com/your-username/your-repo/actions/workflows/python-app.yml)

## :wave: Introduction

This project allows you to stream gyroscope sensor data from your Android device to your computer in real-time. It consists of two main components:

-   :iphone: **An Android application** that captures gyroscope data and sends it over Wi-Fi.
-   :computer: **A Python server** that receives and displays the data.

## :rocket: Getting Started

### Prerequisites

-   Android Studio ([Download](https://developer.android.com/studio))
-   Python 3.x ([Download](https://www.python.org/downloads/))
-   An Android device with a gyroscope sensor

### Installation & Usage

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2.  **Run the Python server:**

    ```bash
    cd python_server
    python server.py
    ```

    The server will start listening on `0.0.0.0:8080`.

3.  **Run the Android app:**
    -   Open the `GyroscopeApp` directory in Android Studio.
    -   Connect your Android device to your computer.
    -   Build and run the app on your device.

4.  **Connect and stream:**
    -   Ensure your Android device and computer are on the same Wi-Fi network.
    -   The app will display your device's IP address.
    -   The app will automatically attempt to connect to the server. Once connected, it will start streaming gyroscope data.

## :gear: Configuration

-   **Port:** The default port is `8080`. You can change this in:
    -   `GyroscopeApp/app/src/main/java/com/example/gyroscopeapp/MainActivity.java` (in the `SERVER_PORT` constant)
    -   `python_server/server.py`
-   **Permissions:** The Android app requires the following permissions, which are already included in the `AndroidManifest.xml`:
    -   `ACCESS_WIFI_STATE`
    -   `INTERNET`
    -   `ACCESS_NETWORK_STATE`

## :handshake: Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## :license: License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
