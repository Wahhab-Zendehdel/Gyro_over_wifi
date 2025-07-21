const xValue = document.getElementById('x');
const yValue = document.getElementById('y');
const zValue = document.getElementById('z');

const socket = new WebSocket('ws://' + window.location.hostname + ':8081');

socket.onopen = () => {
    console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    xValue.textContent = data.x.toFixed(4);
    yValue.textContent = data.y.toFixed(4);
    zValue.textContent = data.z.toFixed(4);
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};

function startGyroscope() {
    if ('Gyroscope' in window) {
        const gyroscope = new Gyroscope({ frequency: 60 });
        gyroscope.addEventListener('reading', () => {
            const { x, y, z } = gyroscope;
            const data = { x, y, z };
            socket.send(JSON.stringify(data));
        });
        gyroscope.start();
    } else {
        alert('Gyroscope API not supported on this device.');
    }
}

window.addEventListener('load', startGyroscope);
