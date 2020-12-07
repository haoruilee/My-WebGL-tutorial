var canvas, gl, program;

var R = mat4();
var rotateMatrix;
var S = mat4();
var scaleMatrix;
var M = mat4();
var modelViewMatrix;

var scaleX = 1.3;
var scaleY = 1.3;
var scaleZ = 1.3;

var translateX = 0;
var translateY = -0.45;
var translateZ = 0;

var cubeSelected = false;
var ear1Selected = false;
var ear2Selected = false;
var bodySelected = false;
var arm1Selected = false;
var arm2Selected = false;
var leg1Selected = false;
var leg2Selected = false;
var allSelected = true;

var cubeTx = 0;
var cubeTy = 1;
var cubeTz = 0;

var ear1Tx = -0.2;
var ear1Ty = 1;
var ear1Tz = 0;

var ear2Tx = 0;
var ear2Ty = 1;
var ear2Tz = 0;

var bodyTx = 0;
var bodyTy = 0.24;
var bodyTz = 0;

var arm1Tx = -2.1;
var arm1Ty = 0.1;
var arm1Tz = 0;

var arm2Tx = 2.1;
var arm2Ty = 0.1;
var arm2Tz = 0;

var leg1Tx = -0.55;
var leg1Ty = -0.9;
var leg1Tz = 0;

var leg2Tx = 0.55;
var leg2Ty = -0.9;
var leg2Tz = 0;

var angle = 0.0;
var axis = [0, 0, 1];
var lastPos = [0, 0, 0];
var curx, cury;
var startX, startY;
var trackingMouse = false;
var trackballMove = false;

function trackballView(x, y) {
    var d, a;
    var v = [];

    v[0] = x;
    v[1] = y;

    d = v[0] * v[0] + v[1] * v[1];
    if (d < 1.0)
        v[2] = Math.sqrt(1.0 - d);
    else {
        v[2] = 0.0;
        a = 1.0 / Math.sqrt(d);
        v[0] *= a;
        v[1] *= a;
    }
    return v;
}

function mouseMotion(x, y) {
    var dx, dy, dz;

    var curPos = trackballView(x, y);
    if (trackingMouse) {
        dx = curPos[0] - lastPos[0];
        dy = curPos[1] - lastPos[1];
        dz = curPos[2] - lastPos[2];

        if (dx || dy || dz) {
            angle = -0.1 * Math.sqrt(dx * dx + dy * dy + dz * dz);

            axis[0] = lastPos[1] * curPos[2] - lastPos[2] * curPos[1];
            axis[1] = lastPos[2] * curPos[0] - lastPos[0] * curPos[2];
            axis[2] = lastPos[0] * curPos[1] - lastPos[1] * curPos[0];

            lastPos[0] = curPos[0];
            lastPos[1] = curPos[1];
            lastPos[2] = curPos[2];
        }
    }
}

function startMotion(x, y) {
    trackingMouse = true;
    startX = x;
    startY = y;
    curx = x;
    cury = y;

    lastPos = trackballView(x, y);
    trackballMove = true;
}

function stopMotion(x, y) {
    trackingMouse = false;
    if (startX != x || startY != y) {
    }
    else {
        angle = 0.0;
        trackballMove = false;
    }
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    gl.enable(gl.DEPTH_TEST);

    rotateMatrix = gl.getUniformLocation(program, "rotateMatrix");
    gl.uniformMatrix4fv(rotateMatrix, false, flatten(R));

    scaleMatrix = gl.getUniformLocation(program, "scaleMatrix");
    gl.uniformMatrix4fv(scaleMatrix, false, flatten(S));

    modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    gl.uniformMatrix4fv(modelViewMatrix, false, flatten(M));


    document.getElementById("CurrentSelected").innerHTML = "Current Selected : All";

    document.onkeydown = function (event) {
        if (cubeSelected) {
            switch (event.keyCode) {
                case 65: cubeTx -= 10 / 680; break;//A
                case 68: cubeTx += 10 / 680; break;//D
                case 87: cubeTy += 10 / 680; break;//W
                case 83: cubeTy -= 10 / 680; break;//S
                case 81: cubeTz -= 10 / 680; break;//Q
                case 69: cubeTz += 10 / 680; break;//E
            }
        } else if (ear1Selected) {
            switch (event.keyCode) {
                case 65: ear1Tx -= 10 / 680; break;
                case 68: ear1Tx += 10 / 680; break;
                case 87: ear1Ty += 10 / 680; break;
                case 83: ear1Ty -= 10 / 680; break;
                case 81: ear1Tz -= 10 / 680; break;
                case 69: ear1Tz += 10 / 680; break;
            }
        } else if (ear2Selected) {
            switch (event.keyCode) {
                case 65: ear2Tx -= 10 / 680; break;
                case 68: ear2Tx += 10 / 680; break;
                case 87: ear2Ty += 10 / 680; break;
                case 83: ear2Ty -= 10 / 680; break;
                case 81: ear2Tz -= 10 / 680; break;
                case 69: ear2Tz += 10 / 680; break;
            }
        } else if (bodySelected) {
            switch (event.keyCode) {
                case 65: bodyTx -= 10 / 680; break;//A
                case 68: bodyTx += 10 / 680; break;//D
                case 87: bodyTy += 10 / 680; break;//W
                case 83: bodyTy -= 10 / 680; break;//S
                case 81: bodyTz -= 10 / 680; break;//Q
                case 69: bodyTz += 10 / 680; break;//E
            }
        } else if (arm1Selected) {
            switch (event.keyCode) {
                case 65: arm1Tx -= 10 / 680; break;
                case 68: arm1Tx += 10 / 680; break;
                case 87: arm1Ty += 10 / 680; break;
                case 83: arm1Ty -= 10 / 680; break;
                case 81: arm1Tz -= 10 / 680; break;
                case 69: arm1Tz += 10 / 680; break;
            }
        } else if (arm2Selected) {
            switch (event.keyCode) {
                case 65: arm2Tx -= 10 / 680; break;
                case 68: arm2Tx += 10 / 680; break;
                case 87: arm2Ty += 10 / 680; break;
                case 83: arm2Ty -= 10 / 680; break;
                case 81: arm2Tz -= 10 / 680; break;
                case 69: arm2Tz += 10 / 680; break;
            }
        } else if (leg1Selected) {
            switch (event.keyCode) {
                case 65: leg1Tx -= 10 / 680; break;
                case 68: leg1Tx += 10 / 680; break;
                case 87: leg1Ty += 10 / 680; break;
                case 83: leg1Ty -= 10 / 680; break;
                case 81: leg1Tz -= 10 / 680; break;
                case 69: leg1Tz += 10 / 680; break;
            }
        } else if (leg2Selected) {
            switch (event.keyCode) {
                case 65: leg2Tx -= 10 / 680; break;
                case 68: leg2Tx += 10 / 680; break;
                case 87: leg2Ty += 10 / 680; break;
                case 83: leg2Ty -= 10 / 680; break;
                case 81: leg2Tz -= 10 / 680; break;
                case 69: leg2Tz += 10 / 680; break;
            }
        } else if (allSelected) {
            switch (event.keyCode) {
                case 65: translateX -= 10 / 680; break;
                case 68: translateX += 10 / 680; break;
                case 87: translateY += 10 / 680; break;
                case 83: translateY -= 10 / 680; break;
                case 81: translateZ -= 10 / 680; break;
                case 69: translateZ += 10 / 680; break;
            }
        }
    }

    document.getElementById("CubeSelected").onclick = function () {
        cubeSelected = true;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : Cube";
    }
    document.getElementById("Ear1Selected").onclick = function () {
        cubeSelected = false;
        ear1Selected = true;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : Left Ear";
    }
    document.getElementById("Ear2Selected").onclick = function () {
        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = true;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : Right Ear";
    }
    document.getElementById("BodySelected").onclick = function () {
        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = true;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : Body";
    }
    document.getElementById("Arm1Selected").onclick = function () {
        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = true;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : Left Arm";
    }
    document.getElementById("Arm2Selected").onclick = function () {
        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = true;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : Right Arm";
    }
    document.getElementById("Leg1Selected").onclick = function () {
        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = true;
        leg2Selected = false;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : Left Leg";
    }
    document.getElementById("Leg2Selected").onclick = function () {
        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = true;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : Right Leg";
    }
    document.getElementById("AllSelected").onclick = function () {
        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = true;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : All";
    }
    document.getElementById("Combine").onclick = function () {
        cubeTx = 0; cubeTy = 1; cubeTz = 0;
        ear1Tx = -0.2; ear1Ty = 1; ear1Tz = 0;
        ear2Tx = 0.2; ear2Ty = 1; ear2Tz = 0;
        bodyTx = 0; bodyTy = 0.24; bodyTz = 0;
        arm1Tx = -2.1; arm1Ty = 0.1; arm1Tz = 0;
        arm2Tx = 2.1; arm2Ty = 0.1; arm2Tz = 0;
        leg1Tx = -0.55; leg1Ty = -0.9; leg1Tz = 0;
        leg2Tx = 0.55; leg2Ty = -0.9; leg2Tz = 0;

        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = true;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : All";
    }
    document.getElementById("Split").onclick = function () {
        cubeTx = 0; cubeTy = 1.2; cubeTz = 0;
        ear1Tx = -0.3; ear1Ty = 1.4; ear1Tz = 0.2;
        ear2Tx = 0.4; ear2Ty = 1.3; ear2Tz = -0.3;
        bodyTx = 0; bodyTy = 0.24; bodyTz = 0;
        arm1Tx = -2.5; arm1Ty = 0.1; arm1Tz = 0.3;
        arm2Tx = 2.7; arm2Ty = -0.1; arm2Tz = -0.15;
        leg1Tx = -0.75; leg1Ty = -1.4; leg1Tz = 0.2;
        leg2Tx = 0.65; leg2Ty = -1.6; leg2Tz = -0.1;

        cubeSelected = false;
        ear1Selected = false;
        ear2Selected = false;
        bodySelected = false;
        arm1Selected = false;
        arm2Selected = false;
        leg1Selected = false;
        leg2Selected = false;
        allSelected = false;
        document.getElementById("CurrentSelected").innerHTML = "Current Selected : None";
    }

    document.getElementById("ScaleX").onchange = function (event) {
        scaleX = event.target.value;
    }
    document.getElementById("ScaleY").onchange = function (event) {
        scaleY = event.target.value;
    }
    document.getElementById("ScaleZ").onchange = function (event) {
        scaleZ = event.target.value;
    }

    canvas.addEventListener("mousedown", function (event) {
        var x = 2 * event.clientX / canvas.width - 1;
        var y = 2 * (canvas.height - event.clientY) / canvas.height - 1;
        startMotion(x, y);
    });

    canvas.addEventListener("mouseup", function (event) {
        var x = 2 * event.clientX / canvas.width - 1;
        var y = 2 * (canvas.height - event.clientY) / canvas.height - 1;
        stopMotion(x, y);
    });

    canvas.addEventListener("mousemove", function (event) {
        var x = 2 * event.clientX / canvas.width - 1;
        var y = 2 * (canvas.height - event.clientY) / canvas.height - 1;
        mouseMotion(x, y);
    });

    render();
};

function initCube(sx,sy,sz,tx,ty,tz,rx,ry,rz,colortemp,brown) {
    var vertices = [
        vec3(0.5, 0.5, 0.5), vec3(-0.5, 0.5, 0.5),  vec3(-0.5, -0.5, 0.5), vec3(0.5, -0.5, 0.5),
        vec3(0.5, 0.5, 0.5),  vec3(0.5, -0.5, 0.5), vec3(0.5, -0.5, -0.5), vec3(0.5, 0.5, -0.5),
        vec3(0.5, 0.5, 0.5),vec3(0.5, 0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(-0.5, 0.5, 0.5),
        vec3(-0.5, 0.5, 0.5), vec3(-0.5, 0.5, -0.5),vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5),
        vec3(-0.5, -0.5, -0.5), vec3(0.5, -0.5, -0.5), vec3(0.5, -0.5, 0.5), vec3(-0.5, -0.5, 0.5),
        vec3(0.5, -0.5, -0.5), vec3(-0.5, -0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(0.5, 0.5, -0.5)
    ];
    var normals=[vec3(0,0,1),vec3(0,0,1), vec3(0,0,1),vec3(0,0,1),
        vec3(1,0,0),  vec3(1,0,0), vec3(1,0,0), vec3(1,0,0),
         vec3(0,1,0), vec3(0,1,0),vec3(0,1,0),vec3(0,1,0),
        vec3(-1,0,0), vec3(-1,0,0),vec3(-1,0,0),vec3(-1,0,0),
        vec3(0,-1,0), vec3(0,-1,0),  vec3(0,-1,0),  vec3(0,-1,0),
         vec3(0,0,-1),  vec3(0,0,-1),vec3(0,0,-1),vec3(0,0,-1)];


    var colors=[
        brown,brown,brown,brown,//back
        brown,brown,brown,brown,//right
        brown,brown,brown,brown,//head
        brown,brown,brown,brown,//left
        colortemp,colortemp,colortemp,colortemp,
        colortemp,colortemp,colortemp,colortemp//face
    ]

    var indices = [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ];

    initArrayBuffer(vertices, 3, gl.FLOAT, "vPosition");
    initArrayBuffer(colors, 3, gl.FLOAT, "vColor");
    initArrayBuffer(normals, 3, gl.FLOAT, "a_Normal");





    var T = mat4();
    T = mult(T, rotateX(rx));
    T = mult(T, rotateY(ry));
    T = mult(T, rotateZ(rz));
    T = mult(T, scalem(sx, sy, sz));
    T = mult(T, translate(tx, ty, tz));

    translateMatrix = gl.getUniformLocation(program, "translateMatrix");
    gl.uniformMatrix4fv(translateMatrix, false, flatten(T));


    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // 设置入射光
    var u_LightColor = gl.getUniformLocation(program, "u_LightColor");
    gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
    var u_LightPosition = gl.getUniformLocation(program, "u_LightPosition");
    gl.uniform3f(u_LightPosition, 2.3, 4.0, 3.5);

    // 设置环境光
    var u_LightColorAmbient = gl.getUniformLocation(program, "u_LightColorAmbient");
    gl.uniform3f(u_LightColorAmbient, 0.7, 0.7, 0.7);


    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
}

function initFace() {
    var white = vec3(255,255,255);

    var eyes1 = [
        vec3(-0.1, 0, -0.501),
        vec3(-0.4, 0, -0.501),
        vec3(- 0.1, -0.22 , -0.501),
        vec3(- 0.4, -0.22, -0.501)
    ];

    var eyes2 = [
        vec3(0.1, 0, -0.501),
        vec3(0.4, 0, -0.501),
        vec3(0.1, -0.22 , -0.501),
        vec3(0.4, -0.22, -0.501)
    ];

    var T = mat4();
    T = mult(T, scalem(0.5, 0.5, 0.5));
    T = mult(T, translate(cubeTx, cubeTy, cubeTz));
    translateMatrix = gl.getUniformLocation(program, "translateMatrix");
    gl.uniformMatrix4fv(translateMatrix, false, flatten(T));
    var colors = [
        white,white,white,white,white,white,white,white
    ]
    initArrayBuffer(colors, 3, gl.FLOAT, "vColor");

    initArrayBuffer(eyes1, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, eyes1.length);

    initArrayBuffer(eyes2, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, eyes2.length);


    var blue = vec3(27 / 255, 177 / 255, 154 / 255);

    var eyeball1 = [
        vec3(-0.1, 0, -0.502),
        vec3(-0.25, 0, -0.502),
        vec3(-0.1, -0.22 , -0.502),
        vec3(-0.25, -0.22, -0.502)
    ];
    var eyeball2 = [
        vec3(0.1, 0, -0.502),
        vec3(0.25, 0, -0.502),
        vec3(0.1, -0.22 , -0.502),
        vec3(0.25, -0.22, -0.502)
    ];

    var colors = [
        blue,blue,blue,blue,
        blue,blue,blue,blue
    ]
    initArrayBuffer(colors, 3, gl.FLOAT, "vColor");

    initArrayBuffer(eyeball1, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, eyeball1.length);

    initArrayBuffer(eyeball2, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, eyeball2.length);

    var brown = vec3(87 / 255, 24 / 255, 23 / 255);
        var beard1 = [
        vec3(0.25, -0.27, -0.502),
        vec3(-0.25, -0.27, -0.502),
        vec3(0.25, -0.5 , -0.502),
        vec3(-0.25, -0.5, -0.502)
    ];
        var beard2 = [
        vec3(-0.2,-0.22, -0.502),
        vec3(-0.3,-0.22, -0.502),
        vec3(-0.2, -0.5 , -0.502),
        vec3(-0.3, -0.5, -0.502)
    ];
        var beard3 = [
        vec3(0.3, -0.22, -0.502),
        vec3(0.2, -0.22, -0.502),
        vec3(0.3, -0.5 , -0.502),
        vec3(0.2, -0.5, -0.502)
    ];
        var colors = [
        brown,brown,brown,brown,
        brown,brown,brown,brown, brown,brown,brown,brown
    ]
    initArrayBuffer(colors, 3, gl.FLOAT, "vColor");

    initArrayBuffer(beard1, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, beard1.length);

    initArrayBuffer(beard2, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, beard2.length);

    initArrayBuffer(beard3, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, beard3.length);


        var hair1 = [
        vec3(0.5, 0.5, -0.502),
        vec3(-0.5, 0.5, -0.502),
        vec3(0.5, 0.2 , -0.502),
        vec3(-0.5, 0.2, -0.502)
    ];
        var hair2 = [
        vec3(-0.4,0.5, -0.502),
        vec3(-0.5,0.5, -0.502),
        vec3(-0.4, 0.15 , -0.502),
        vec3(-0.5, 0.15, -0.502)
    ];
        var hair3 = [
        vec3(0.5, 0.5, -0.502),
        vec3(0.4, 0.5, -0.502),
        vec3(0.5, 0.15 , -0.502),
        vec3(0.4, 0.15, -0.502)
    ];
        var colors = [
        brown,brown,brown,brown,
        brown,brown,brown,brown,
            //brown,brown,brown,brown,
            brown,brown,brown,brown
    ]
    initArrayBuffer(colors, 3, gl.FLOAT, "vColor");

    initArrayBuffer(hair1, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, hair1.length);

    initArrayBuffer(hair2, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, hair2.length);

    initArrayBuffer(hair3, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, hair3.length);

    var skincolor = vec3(255/255,223/255,206/255);
     var colors = [
        skincolor,skincolor,skincolor,skincolor
    ]
    initArrayBuffer(colors, 3, gl.FLOAT, "vColor");
    var skin1 = [
        vec3(0.501, 0, 0.501), vec3(0.501, -0.5, 0.501), vec3(0.501, 0, -0.501), vec3(0.501, -0.5, -0.501)
    ];
     var skin2 = [
        vec3(-0.501, 0, 0.501), vec3(-0.501, -0.5, 0.501), vec3(-0.501, 0, -0.501), vec3(-0.501, -0.5, -0.501)
    ];
    initArrayBuffer(skin1, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, skin1.length);
    initArrayBuffer(skin2, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, skin2.length);




    var N = 10000;
    var center=vec3(0, -0.11,-0.501)
    var vertexData = [center];
    var r = 0.1;

    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = center[0]+r * Math.sin(theta);
        var y = center[1]+ r * Math.cos(theta);
        var point = vec3(x, y,-0.501);
        vertexData.push(point);
     }
    colors=[vec3(1,0.772,0.65)]
    for (var i = 0; i <= N; i++) {
        point=vec3(1,0.772,0.65)
        colors.push(point);
     }
    initArrayBuffer(colors, 3, gl.FLOAT, "vColor");
    initArrayBuffer(vertexData, 3, gl.FLOAT, "vPosition");
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexData.length);
}


function initQuadrangularPyramid(sx,sy,sz,tx,ty,tz,rx,ry,rz) {
    var vertices = [
        vec3(0.12, -0.12, -0.5), vec3(0.12, 0.12, -0.5), vec3(0, 0, -0.8),
        vec3(0.12, -0.12, -0.5), vec3(-0.12, -0.12, -0.5), vec3(0, 0, -0.8),
        vec3(0.12, 0.12, -0.5), vec3(-0.12, 0.12, -0.5), vec3(0, 0, -0.8),
        vec3(-0.12, 0.12, -0.5), vec3(-0.12, -0.12, -0.5), vec3(0, 0, -0.8),
        vec3(-0.12, -0.12, -0.5), vec3(-0.12, 0.12, -0.5), vec3(0.12, 0.12, -0.5), vec3(0.12, -0.12, -0.5)
    ];

    var colors = [
        vec3(0, 0, 0.8), vec3(0, 0.8, 0), vec3(153 / 255, 0, 1),
        vec3(0, 0, 0.8), vec3(0.8, 0, 0), vec3(153 / 255, 0, 1),
        vec3(0, 0.8, 0), vec3(0.8, 0.8, 0), vec3(153 / 255, 0, 1),
        vec3(0.8, 0.8, 0), vec3(0.8, 0, 0), vec3(153 / 255, 0, 1),
        vec3(0.8, 0, 0), vec3(0.8, 0.8, 0), vec3(0, 0.8, 0), vec3(0, 0, 0.8)
    ]

    var indices = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11,
        12, 13, 14,
        14, 15, 12
    ]

    initArrayBuffer(vertices, 3, gl.FLOAT, "vPosition");
    initArrayBuffer(colors, 3, gl.FLOAT, "vColor");

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    var T = mat4();
    T = mult(T, scalem(sx, sy, sz));
    T = mult(T, translate(tx, ty, tz));
    T = mult(T, rotateX(rx));
    translateMatrix = gl.getUniformLocation(program, "translateMatrix");
    gl.uniformMatrix4fv(translateMatrix, false, flatten(T));

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
}

function initArrayBuffer(data, num, type, attrib) {
    var buffer = gl.createBuffer();
    if (!buffer) {
        console.log("无法创建缓冲区对象");
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW);

    var a_attribute = gl.getAttribLocation(program, attrib);

    if (a_attribute < 0) {
        console.log("无法获取顶点位置的存储变量");
        return -1;
    }

    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (trackballMove) {
        axis = normalize(axis);
        R = mult(R, rotate(angle * 300, axis));
    }
    gl.uniformMatrix4fv(rotateMatrix, false, flatten(R));

    S = scalem(scaleX, scaleY, scaleZ);
    scaleMatrix = gl.getUniformLocation(program, "scaleMatrix");
    gl.uniformMatrix4fv(scaleMatrix, false, flatten(S));
    var skincolor = vec3(255/255,223/255,206/255);
    var brown = vec3(87 / 255, 24 / 255, 23 / 255);
    initCube(0.5,0.5,0.5,cubeTx,cubeTy,cubeTz,0,0,0,skincolor,brown);//head
    initFace();
    //initQuadrangularPyramid(0.5,0.5,0.5,ear1Tx,ear1Ty,ear1Tz,270,0,0);//ear1
    initQuadrangularPyramid(0.5,0.5,0.5,ear2Tx,ear2Ty,ear2Tz,270,0,0);//ear2
    initCube(0.3,0.35,0.3,bodyTx,bodyTy,bodyTz,0,0,0,skincolor,skincolor);//body
    initCube(0.1,0.25,0.1,arm1Tx,arm1Ty,arm1Tz,0,0,20,skincolor,skincolor);//arm1
    initCube(0.1,0.25,0.1,arm2Tx,arm2Ty,arm2Tz,0,0,-20,skincolor,skincolor);//arm2
    initCube(0.12,0.2,0.12,leg1Tx,leg1Ty,leg1Tz,0,0,0,skincolor,skincolor);//leg1
    initCube(0.12,0.2,0.12,leg2Tx,leg2Ty,leg2Tz,0,0,0,skincolor,skincolor);//leg2

    M = translate(translateX, translateY, translateZ);
    modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    gl.uniformMatrix4fv(modelViewMatrix, false, flatten(M));

    requestAnimFrame(render);
}
