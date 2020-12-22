const print = (message) => console.log(message);
const floor = (number) => Math.floor(number);

function drawAxes(canvas) {
    const width = canvas.width;
    const height = canvas.height;

    line(0, floor(height/2), width, floor(height/2));
    line(floor(width/2), 0, floor(width/2), height);
}

function measScale(canvas, scale) {
    const width = canvas.width;
    const height = canvas.height;

    const size = 3;
    const thickness = .1;

    push();
    strokeWeight(thickness);
    translate(0, floor(height/2));
    for(var i = 0; i < floor(canvas.width/scale) + 1; i++) {
        line(0, -size, 0, size);
        translate(scale, 0);
    }
    pop();

    push();
    strokeWeight(thickness);
    translate(floor(width/2), 0);
    for(var i = 0; i < floor(canvas.height/scale) + 1; i++) {
        line(-size, 0, size, 0);
        translate(0, scale);
    }
    pop();
}

function calcFunction(func, step) {
    var values = { x: [], y: []}
    for(var i = step; i < width + step; i+=step) {
        values.x.push(i - step);
        values.y.push(-func(i - step -floor(width/2)));
    }
    return values;
}

function drawFunction(canvas, func, step) {
    push();
    const width = canvas.width;
    const height = canvas.height;

    translate(0, floor(height/2));

    strokeWeight(1);
    for(var i = step; i < width + step; i+=step) {
        line(i - step, -func(i - step -floor(width/2)), i, -func(i - floor(width/2)));
    }
    pop();
}

function drawIntegral(canvas, func, lambda) {
    push();
    const width = canvas.width;
    const height = canvas.height;

    translate(0, floor(height/2));

    strokeWeight(.1);
    fill(255, 0, 0, 100);
    if (lambda < 10) {
        noStroke();
    }

    for(var i = 0; i < width/lambda; i++) {
        rect(0, 0, lambda, -func( ( (i + 1)*lambda + i*lambda)/2 - width/2));
        translate(lambda, 0);
    }
    pop();
}


var step = 0.1;
var lambda = 2; 

function setup() {
    const canvas = createCanvas(1200, 600);
    canvas.id('plot');
    canvas.class('border border-dark ms-5 mt-5');

    document.getElementById('slider').addEventListener('change', (e) => {
        lambda = document.getElementById('slider').value;
        clear();
    });
}

function click() {
    print(1);
}

function draw() {
    const a = 106;
    const b = 188;
    const func = (x) => Math.sin(x/a)*b + Math.cos(x/b)*a;
    
    measScale(canvas, 50);
    drawAxes(canvas);
    
    drawIntegral(canvas, func, lambda);
    drawFunction(canvas, func, step);

    
}