let sprite = {
    x: 0,
    y: 0,
    rotation: 0,
};

let intervalId = null;
let hasExecuted = false;

let mouseX = 0;
let mouseY = 0;

document.body.style.backgroundColor = '#121212';
document.body.style.color = '#E0E0E0';

const codeInput = document.createElement('textarea');
codeInput.value = "";
codeInput.style.position = 'fixed';   
codeInput.style.left = '0';
codeInput.style.top = '0';
codeInput.style.width = '600px';
codeInput.style.fontSize = '100px';
codeInput.style.height = '100vh';
codeInput.style.fontSize = '24px';
codeInput.style.padding = '10px';
codeInput.style.margin = '0';
codeInput.style.boxSizing = 'border-box';
codeInput.style.resize = 'none';  
codeInput.style.backgroundColor = '#1E1E1E';
codeInput.style.color = '#E0E0E0';
codeInput.style.border = '1px solid #444';

const canvas = document.createElement('canvas');
canvas.width = 480;
canvas.height = 360;
canvas.style.position = 'fixed';
canvas.style.right = '100px';
canvas.style.top = '120px';
canvas.style.backgroundColor = '#999';
canvas.id = 'screen';
canvas.style.borderRadius = '5px';
canvas.style.borderLeft = '2px solid #FFF'
document.body.appendChild(canvas);

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left - canvas.width / 2;
    mouseY = -(event.clientY - rect.top - canvas.height / 2);
});

const ctx = canvas.getContext('2d');

function drawSprite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(sprite.x + canvas.width / 2, sprite.y * -1 + canvas.height / 2);
    ctx.rotate(sprite.rotation * Math.PI / 180);

    ctx.fillStyle = 'cyan';
    ctx.fillRect(-25, -25, 50, 50);

    ctx.restore();
}

function tick() {
    try {
        if (!hasExecuted) {
            eval(codeInput.value); 
            hasExecuted = true;
        }
        drawSprite();  
    } catch (e) {
        console.error('Error in code:', e);
    }
}

const startButton = document.createElement('button');
startButton.textContent = 'Start';
startButton.style.position = 'fixed';
startButton.style.right = '470px';
startButton.style.top = '60px';
startButton.style.width = '100px';
startButton.style.height = '50px';
startButton.style.fontSize = '20px';
startButton.style.padding = '10px 20px';
startButton.style.border = 'none';
startButton.style.color = '#E0E0E0';
startButton.style.backgroundColor = '#1E1E1E';
startButton.style.border = 'solid 2px #E0E0E0'
startButton.style.borderRadius = '5px';

startButton.addEventListener('click', () => { setInterval(tick, 1000 / 60); startButton.textContent = 'Running'; startButton.style.width = '110px'; startButton.style.opacity =  '0.4'; stopButton.style.color = 'white'; stopButton.style.opacity = '1';; });

function saveg() {
    location.href = location.pathname + '?data=' + encodeURIComponent(JSON.stringify({code: codeInput.value, sprited: sprite}));
}

const stopButton = document.createElement('button');
stopButton.textContent = 'Stop';
stopButton.style.position = 'fixed';
stopButton.style.right = '360px';
stopButton.style.top = '60px';
stopButton.style.width = '90px';
stopButton.style.height = '50px';
stopButton.style.fontSize = '20px';
stopButton.style.padding = '10px 20px';
stopButton.style.border = 'none';
stopButton.style.borderRadius = '5px';
stopButton.style.color = '#E0E0E0';
stopButton.style.backgroundColor = '#1E1E1E';
stopButton.style.border = 'solid 2px #E0E0E0'
stopButton.style.opacity = '0.2';

stopButton.addEventListener('click', () => { saveg() });

const params = new URLSearchParams(window.location.search);
const data = params.get('data');

if (data) {
    const Data = JSON.parse(decodeURIComponent(data));
    if (Data.code) {codeInput.value = Data.code}
    if (Data.sprited) {sprite = Data.sprited}
    setTimeout(() => {
        if (!Data.play) {codeInput.focus()};
    }, 100); 
}

document.body.appendChild(codeInput);
document.body.appendChild(startButton);
document.body.appendChild(stopButton);
drawSprite();
