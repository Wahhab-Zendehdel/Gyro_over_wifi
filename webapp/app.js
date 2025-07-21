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

function startMotionEvents() {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', (event) => {
            const { rotationRate } = event;
            if (rotationRate) {
                const data = {
                    x: rotationRate.alpha,
                    y: rotationRate.beta,
                    z: rotationRate.gamma
                };
                socket.send(JSON.stringify(data));
            }
        });
    } else {
        alert('Device Motion API not supported on this device.');
    }
}

window.addEventListener('load', startMotionEvents);
