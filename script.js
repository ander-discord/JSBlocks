let sprite = {
    x: 0,
    y: 0,
    rotation: 0,
};

let hasExecuted = false;

document.body.style.backgroundColor = '#121212';
document.body.style.color = '#E0E0E0';

const codeInput = document.createElement('textarea');
codeInput.value = "";
codeInput.style.position = 'fixed';   
codeInput.style.left = '0';
codeInput.style.top = '0';
codeInput.style.width = '600px';
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
canvas.width = 980;
canvas.height = 720;
canvas.style.position = 'fixed';
canvas.style.left = '780px';
canvas.style.top = '120px';
canvas.style.background = '#333';
canvas.style.borderLeft = '2px solid #444';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function drawSprite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(sprite.x + canvas.width / 2, sprite.y * -1 + canvas.height / 2);
    ctx.rotate(sprite.rotation * Math.PI / 180);

    ctx.fillStyle = 'orange';
    ctx.fillRect(-25, -25, 50, 50);

    ctx.restore();
}

function tick() {
    console.log("Ticking")
    try {
        if (!hasExecuted) {
            eval(codeInput.value); 
            hasExecuted = true;
        }
        drawSprite();  
        spriteLabel.innerText = `x:${sprite.x} y:${sprite.y}`;  
    } catch (e) {
        console.error('Error in code:', e);
    }
}

const actionButton = document.createElement('button');
actionButton.textContent = 'R';
actionButton.style.position = 'fixed';
actionButton.style.left = '790px';
actionButton.style.top = '60px';
actionButton.style.width = '50px';
actionButton.style.height = '50px';
actionButton.style.fontSize = '20px';
actionButton.style.padding = '10px 20px';
actionButton.style.color = 'black';
actionButton.style.border = 'none';
actionButton.style.borderRadius = '5px';
actionButton.addEventListener('click', () => { datag(true); });

function datag(playf) {
    location.href = location.pathname + '?data=' + encodeURIComponent(JSON.stringify({code: codeInput.value, play: playf}));
}

const stopButton = document.createElement('button');
stopButton.textContent = 'S';
stopButton.style.position = 'fixed';
stopButton.style.left = '850px';
stopButton.style.top = '60px';
stopButton.style.width = '50px';
stopButton.style.height = '50px';
stopButton.style.fontSize = '20px';
stopButton.style.padding = '10px 20px';
stopButton.style.color = 'black';
stopButton.style.border = 'none';
stopButton.style.borderRadius = '5px';

stopButton.addEventListener('click', () => { datag(false) });

const params = new URLSearchParams(window.location.search);
const data = params.get('data');

if (data) {
    const Data = JSON.parse(decodeURIComponent(data));
    codeInput.value = Data.code; 
    if (Data.play) { setInterval(tick, 1000 / 60); }
    setTimeout(() => {
        codeInput.focus();
    }, 100); 
}

const spriteLabel = document.createElement('p');
spriteLabel.innerText = `x:${sprite.x} y:${sprite.y}`;
spriteLabel.style.left = '960px';
spriteLabel.style.top = '20px';
spriteLabel.style.position = 'fixed';
spriteLabel.style.fontSize = '40px';

document.body.appendChild(codeInput);
document.body.appendChild(actionButton);
document.body.appendChild(stopButton);
document.body.appendChild(spriteLabel);
drawSprite();
