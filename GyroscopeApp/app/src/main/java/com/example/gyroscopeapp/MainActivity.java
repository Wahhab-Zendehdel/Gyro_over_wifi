package com.example.gyroscopeapp;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.text.format.Formatter;
import android.util.Log;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private static final String TAG = "MainActivity";
    private SensorManager sensorManager;
    private Sensor gyroscope;
    private TextView ipAddressTextView;
    private TextView gyroscopeValuesTextView;

    private ServerSocket serverSocket;
    private Socket clientSocket;
    private PrintWriter printWriter;

    private static final int SERVER_PORT = 8080;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ipAddressTextView = findViewById(R.id.ip_address_text_view);
        gyroscopeValuesTextView = findViewById(R.id.gyroscope_values_text_view);

        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        gyroscope = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);

        if (gyroscope == null) {
            gyroscopeValuesTextView.setText("Gyroscope not available");
        }

        WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(WIFI_SERVICE);
        String ipAddress = Formatter.formatIpAddress(wifiManager.getConnectionInfo().getIpAddress());
        ipAddressTextView.setText("IP Address: " + ipAddress);

        new Thread(new ServerThread()).start();
    }

    @Override
    protected void onResume() {
        super.onResume();
        sensorManager.registerListener(this, gyroscope, SensorManager.SENSOR_DELAY_NORMAL);
    }

    @Override
    protected void onPause() {
        super.onPause();
        sensorManager.unregisterListener(this);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_GYROSCOPE) {
            float x = event.values[0];
            float y = event.values[1];
            float z = event.values[2];

            String gyroscopeValues = "x: " + x + "\ny: " + y + "\nz: " + z;
            gyroscopeValuesTextView.setText(gyroscopeValues);

            if (printWriter != null) {
                printWriter.println(x + "," + y + "," + z);
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // Not used
    }

    class ServerThread implements Runnable {
        @Override
        public void run() {
            try {
                serverSocket = new ServerSocket(SERVER_PORT);
                Log.d(TAG, "Server started at port " + SERVER_PORT);

                while (true) {
                    clientSocket = serverSocket.accept();
                    Log.d(TAG, "Client connected: " + clientSocket.getInetAddress());

                    printWriter = new PrintWriter(clientSocket.getOutputStream(), true);
                }
            } catch (IOException e) {
                Log.e(TAG, "Error in server thread", e);
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            if (serverSocket != null) {
                serverSocket.close();
            }
            if (clientSocket != null) {
                clientSocket.close();
            }
            if (printWriter != null) {
                printWriter.close();
            }
        } catch (IOException e) {
            Log.e(TAG, "Error closing sockets", e);
        }
    }
}
