"use strict";

var canvas;
var gl;

var numVertices  = 36;//�����嶥����
var iBufferCubeID, cBufferCubeID, vBufferCubeID; //������� 3�� buffer
var cBufferTetraID, vBufferTetraID; //������� 2�� buffer
var vColor, vPosition;
var vColor2, vPosition2;
var CurModelViewMatrix = mat4(); //��ǰ�任����
var CurModelViewMatrixLoc; //shader ����
var CubeTx = 0; //������ƽ����
var TetraTx = 0; //������ƽ����
var CubeRotateAngle = 0; //��������ת�Ƕ�
var TetraRotateAngle = 0; //��������ת�Ƕ�


//������������飬ֱ������
    var vertices = [
        vec3( -0.5, -0.5,  0.5 ),
        vec3( -0.5,  0.5,  0.5 ),
        vec3(  0.5,  0.5,  0.5 ),
        vec3(  0.5, -0.5,  0.5 ),
        vec3( -0.5, -0.5, -0.5 ),
        vec3( -0.5,  0.5, -0.5 ),
        vec3(  0.5,  0.5, -0.5 ),
        vec3(  0.5, -0.5, -0.5 )
    ];

     var vertexColors = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
    ];

// indices of the 12 triangles that compise the cube

var indices = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];

//������������飬����õ�
var vertices_tetrahedron = [];
var colors_tetrahedron = [];

var basevertices = [
        vec3(0.0000, 0.0000, -1.0000),
        vec3(0.0000, 0.9428, 0.3333),
        vec3(-0.8165, -0.4714, 0.3333),
        vec3(0.8165, -0.4714, 0.3333)
    ];

var basecolors_tetrahedron = [
        vec4(1.0, 0.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0),
        vec4(0.5, 0.5, 0.5, 1.0)
    ];

function triangle(a, b, c, color) {

    // add colors and vertices for one triangle

    colors_tetrahedron.push(basecolors_tetrahedron[color]);
    vertices_tetrahedron.push(a);
    colors_tetrahedron.push(basecolors_tetrahedron[color]);
    vertices_tetrahedron.push(b);
    colors_tetrahedron.push(basecolors_tetrahedron[color]);
    vertices_tetrahedron.push(c);
}

function tetra(a, b, c, d) {
    // tetrahedron with each side using
    // a different color

    triangle(a, c, b, 0);
    triangle(a, c, d, 1);
    triangle(a, b, d, 2);
    triangle(b, c, d, 3);
}


window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //����������
    tetra(basevertices[0], basevertices[1], basevertices[2], basevertices[3]);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //�����������
    // color array atrribute buffer
    cBufferCubeID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferCubeID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
  
    // array element buffer
    iBufferCubeID = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW); //ע������ת��  
       
    //vertex buffer
    vBufferCubeID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCubeID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);

    //�����������
    //vertex buffer
    vBufferTetraID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices_tetrahedron), gl.STATIC_DRAW);
//    vPosition2 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    
    // color array atrribute buffer
    cBufferTetraID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors_tetrahedron), gl.STATIC_DRAW);
  //  vColor2 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

    CurModelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    //event listeners for buttons

    document.getElementById("CubeLeft").onclick = function() {
        CubeTx -= 0.1;
    };
    document.getElementById("CubeRight").onclick = function() {
        CubeTx += 0.1;
    };
    document.getElementById("CubeR1").onclick = function() {
        CubeRotateAngle -= 5;
    };
    document.getElementById("CubeR2").onclick = function() {
        CubeRotateAngle += 5;
    };
    document.getElementById("TetraLeft").onclick = function() {
        TetraTx -= 0.1;
    };
    document.getElementById("TetraRight").onclick = function() {
        TetraTx += 0.1;
    };
    document.getElementById("TetraR1").onclick = function() {
        TetraRotateAngle -= 5;
    };
    document.getElementById("TetraR2").onclick = function() {
        TetraRotateAngle += 5;
    };
    


    //尝试动起来
    canvas.addEventListener("mousedown", function(event){
        var x = 2*event.clientX/canvas.width-1;
        var y = 2*(canvas.height-event.clientY)/canvas.height-1;
        TetraRotateAngle += x;
        CubeRotateAngle -= x;
        //stopMotion(x, y);
      });

    render();
}

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //������任
    var T = translate(CubeTx, 0.0, 0.0);
    var R = rotateY(CubeRotateAngle);
    CurModelViewMatrix = mult(T, R);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));
    
    //��������ɫ
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferCubeID);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    //�����嶥��
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferCubeID);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    //����������
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBufferCubeID);

    //����������
    gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);


    //������任
    T = translate(TetraTx, 0.0, 0.0);
    R = rotateY(TetraRotateAngle);
    CurModelViewMatrix = mult(T, R);
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));

    //��������ɫ
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferTetraID);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    //�����嶥��
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferTetraID);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    //����������
    gl.drawArrays(gl.TRIANGLES, 0, vertices_tetrahedron.length);

    requestAnimFrame(render);
}
