var gl;
var points;

var vEar = [
    vec2(-0.6, 0.3),
    vec2(-0.75, 0.86),
    vec2(-0.35, 0.6),
    vec2(0.6, 0.3),
    vec2(0.75, 0.86),
    vec2(0.35, 0.6)
];

var vFace = [
    vec2(0, 0)
];

var vMouth = [
    vec2(0.45 * Math.sin(Math.PI / 180 * -45), 0.02-0.45 * Math.cos(Math.PI / 180 * -45))
];

var vEye1 = [
    vec2(-0.2, -0.1)
];

var vEye2 = [
    vec2(0.2, -0.1)
];

var vEyebrow1 = [
    vec2(-0.1, -0.03),
    vec2(-0.4, 0.07),
    vec2(0.1/3.8-0.1, -0.03+0.3/3.8),
    vec2(0.1/3.8-0.4, 0.07+0.3/3.8)
];

var vEyebrow2 = [
    vec2(0.1, -0.03),
    vec2(0.4, 0.07),
    vec2(-0.1/3.8+0.1, -0.03+0.3/3.8),
    vec2(-0.1/3.8+0.4, 0.07+0.3/3.8)
];

var vPurple = [
    vec4(148 / 255, 0 / 255, 211 / 255, 1.0),
    vec4(148 / 255, 0 / 255, 211 / 255, 1.0),
    vec4(148 / 255, 0 / 255, 211 / 255, 1.0),
    vec4(148 / 255, 0 / 255, 211 / 255, 1.0),
    vec4(148 / 255, 0 / 255, 211 / 255, 1.0),
    vec4(148 / 255, 0 / 255, 211 / 255, 1.0)
];

var vPurple2 = [
    vec4(255 / 255, 255 / 255, 255 / 255, 1.0),
    vec4(148 / 255, 0 / 255, 211 / 255, 1.0)
];

var vBlack = [
    vec4(0 / 255, 0 / 255, 0 / 255, 1.0),
    vec4(0 / 255, 0 / 255, 0 / 255, 1.0)
];

var cBuffer1, cBuffer2, cBuffer3, cBuffer4, cBuffer5, cBuffer6;
var vBuffer1, vBuffer2, vBuffer3, vBuffer4, vBuffer5, vBuffer6, vBuffer7;
var purple, black, purple2;
var ear, eye1, eye2, face, eyebrow1, eyebrow2, mouth;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //ears_purple

    cBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vPurple), gl.STATIC_DRAW);

    purple = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(purple, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(purple);

    vBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vEar), gl.STATIC_DRAW);

    ear = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(ear, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ear);

    //face_purple

    for (var i = 0; i < 361; i++) {
        vFace.push(vec2(0.76 * Math.sin(Math.PI / 180 * i), 0.76 * Math.cos(Math.PI / 180 * i)));
        vPurple2.push(vec4(148 / 255, 0 / 255, 211 / 255, 1.0));
    }

    cBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vPurple2), gl.STATIC_DRAW);

    purple2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(purple2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(purple2);

    vBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vFace), gl.STATIC_DRAW);

    face = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(face, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(face);

    //eyes_black

    for (var i = 0; i < 361; i++) {
        vEye1.push(vec2(-0.2 + 0.14 * Math.sin(Math.PI / 180 * i), -0.1 + 0.14 * Math.cos(Math.PI / 180 * i)));
        vBlack.push(vec4(0 / 255, 0 / 255, 0 / 255, 1.0));
    }

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vBlack), gl.STATIC_DRAW);

    black = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(black, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(black);

    vBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vEye1), gl.STATIC_DRAW);

    eye1 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(eye1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(eye1);

    for (var i = 0; i < 361; i++) {
        vEye2.push(vec2(0.2 + 0.14 * Math.sin(Math.PI / 180 * i), -0.1 + 0.14 * Math.cos(Math.PI / 180 * i)));
    }

    cBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vBlack), gl.STATIC_DRAW);

    black = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(black, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(black);

    vBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vEye2), gl.STATIC_DRAW);

    eye2 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(eye2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(eye2);

    //eyebrows_black

    cBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vBlack), gl.STATIC_DRAW);

    black = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(black, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(black);

    vBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vEyebrow1), gl.STATIC_DRAW);

    eyebrow1 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(eyebrow1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(eyebrow1);

    vBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer6);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vEyebrow2), gl.STATIC_DRAW);

    eyebrow2 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(eyebrow2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(eyebrow2);

    //mouth_black

    for (var i = 1; i < 92; i++) {
        vMouth.push(vec2(0.45 * Math.sin(Math.PI / 180 * (-45+i)), 0.02-0.45 * Math.cos(Math.PI / 180 * (-45+i))));
        vMouth.push(vec2(0.34 * Math.sin(Math.PI / 180 * (-60+i*4/3)), -0.17-0.34 * Math.cos(Math.PI / 180 * (-60+i*4/3))));
    }

    cBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer6);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vBlack), gl.STATIC_DRAW);

    black = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(black, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(black);

    vBuffer7 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer7);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vMouth), gl.STATIC_DRAW);

    mouth = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(mouth, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(mouth);

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    //ears
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.vertexAttribPointer(purple, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.vertexAttribPointer(ear, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    //face
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer4);
    gl.vertexAttribPointer(purple2, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer4);
    gl.vertexAttribPointer(face, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 362);

    //eye1
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.vertexAttribPointer(black, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(eye1, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 362);

    //eye2
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer3);
    gl.vertexAttribPointer(black, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.vertexAttribPointer(eye2, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 362);

    //eyebrow1
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer5);
    gl.vertexAttribPointer(black, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer5);
    gl.vertexAttribPointer(eyebrow1, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    //eyebrow2
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer6);
    gl.vertexAttribPointer(eyebrow2, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    //mouth
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer6);
    gl.vertexAttribPointer(black, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer7);
    gl.vertexAttribPointer(mouth, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 183);
}
