

var gl;
var points;
var vPosition, vPosition2;
var cBuffer,cBuffer2;
var vColor,vColor2;
var bufferId, bufferId2;
var program;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    var vertices = [
        vec2(-0.3, 0.5),
        vec2(0.4, 0.5),
        vec2(-0.3, 0.8),
        vec2(0.4, 0.8)

    ];
    var vertices2 = [
        vec2(-0.2, 0.5),
        vec2(0.3, 0.5),
        vec2(-0.2, 0.6),
        vec2(0.3, 0.6)

    ];
    var vertices3 = [
        vec2(-0.3, 0.2),
        vec2(0.4, 0.2),
        vec2(-0.3, 0.5),
        vec2(0.4, 0.5)

    ];
    var vertices4 = [
        vec2(-0.2, 0.4),
        vec2(0, 0.4),
        vec2(-0.2, 0.5),
        vec2(0, 0.5)

    ];
    var vertices5 = [
        vec2(0.1, 0.4),
        vec2(0.3, 0.4),
        vec2(0.1, 0.5),
        vec2(0.3, 0.5)

    ];
    var vertices6 = [
        vec2(-0.1, 0.3),
        vec2(-0.05, 0.3),
        vec2(-0.1, 0.4),
        vec2(-0.05, 0.4)

    ];
    var vertices7 = [
        vec2(0.15, 0.3),
        vec2(0.2, 0.3),
        vec2(0.15, 0.4),
        vec2(0.2, 0.4)

    ];
    var vertices8 = [
        vec2(-0.1, 0.2),
        vec2(0.2, 0.2),
        vec2(-0.1, 0.3),
        vec2(0.2, 0.3)

    ];
    var vertices9 = [
        vec2(-0.3, -0.3),
        vec2(0.4, -0.3),
        vec2(-0.3, 0.1),
        vec2(0.4, 0.1)

    ];
    var vertices10 = [
        vec2(0, 0.1),
        vec2(0.1, 0.1),
        vec2(0, 0.2),
        vec2(0.1, 0.2)

    ];
    var vertices11 = [
        vec2(-0.3, -0.3),
        vec2(-0.2, -0.3),
        vec2(-0.3, -0.1),
        vec2(-0.2, -0.1)

    ];
    var vertices12 = [
        vec2(0.3, -0.3),
        vec2(0.4, -0.3),
        vec2(0.3, -0.1),
        vec2(0.4, -0.1)

    ];
    var vertices13 = [
        vec2(-0.2, -0.6),
        vec2(0.3,  -0.6),
        vec2(-0.2,-0.3),
        vec2(0.3, -0.3)

    ];
    var vertices14 = [
        vec2(0.04, -0.6),
        vec2(0.06,  -0.6),
        vec2(0.04,-0.3),
        vec2(0.06, -0.3)

    ];
    var vertices15 = [
        vec2(0.04, -0.6),
        vec2(0.06,  -0.6),
        vec2(0.04,-0.3),
        vec2(0.06, -0.3)

    ];
    var vertices16 = [
        vec2(-0.2, -0.7),
        vec2(0,  -0.7),
        vec2(-0.2,-0.6),
        vec2(0, -0.6)

    ];
    var vertices17 = [
        vec2(0.1, -0.7),
        vec2(0.3,  -0.7),
        vec2(0.1,-0.6),
        vec2(0.3, -0.6)

    ];
    var vertexColors = [
        vec4(0.34, 0.094, 0.090, 1.0),  // red
        vec4(0.34, 0.094, 0.090, 1.0),  // green
        vec4(0.34, 0.094, 0.090, 1.0),  // blue
        vec4(0.34, 0.094, 0.090, 1.0),   // blue
    ];

    var vertexColors2 = [
        vec4(1, 0.874, 0.807, 1.0),  // red
        vec4(1, 0.874, 0.807, 1.0),  // green
        vec4(1, 0.874, 0.807, 1.0),  // blue
        vec4(1, 0.874, 0.807, 1.0),   // blue

    ];
    var vertexColors3 = [
        vec4(1, 1, 1, 1.0),  // red
        vec4(1, 1, 1, 1.0),  // green
        vec4(1, 1, 1, 1.0),  // blue
        vec4(1, 1, 1, 1.0),   // blue

    ];
    var vertexColors4 = [
        vec4(0.117, 0.760, 0.725, 1.0),  // red
        vec4(0.117, 0.760, 0.725, 1.0),  // green
        vec4(0.117, 0.760, 0.725, 1.0),  // blue
        vec4(0.117, 0.760, 0.725, 1.0),   // blue

    ];
    var vertexColors5 = [
        vec4(0.137, 0.655, 0.776, 1.0),  // red
        vec4(0.137, 0.655, 0.776, 1.0),  // green
        vec4(0.137, 0.655, 0.776, 1.0),  // blue
        vec4(0.137, 0.655, 0.776, 1.0),   // blue

    ];
    var vertexColors6 = [
        vec4(0, 0, 0, 1.0),  // red
        vec4(0, 0, 0, 1.0),  // green
        vec4(0, 0, 0, 1.0),  // blue
        vec4(0, 0, 0, 1.0),   // blue

    ];
    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);
///////////////////////////////////////////////hair////////////////////////////////////////////////////////
    // color array atrribute buffer

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // Load the data into the GPU
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render1();
    ////////////////////////////////////////////face1/////////////////////////////////////////////////////
    //color array atrribute buffer

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render2();
    ////////////////////////////////////////////face2///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices3), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render3();
        ////////////////////////////////////////////eye1///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors3), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId4 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices4), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render4();
    ////////////////////////////////////////////eye2///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors3), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId5 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId5 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices5), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render5();
    ////////////////////////////////////////////beard1///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId6 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId6 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices6), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render6();
        ////////////////////////////////////////////beard2///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId7 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId7 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices7), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render7();
            ////////////////////////////////////////////beard3///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId8 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId8 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices8), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render8();
  ////////////////////////////////////////////cloth///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors4), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId9 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId9 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices9), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render9();
     ////////////////////////////////////////////neck///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId10 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId10 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices10), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render10();
    ////////////////////////////////////////////arms///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId11 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId11 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices11), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render11();
        ////////////////////////////////////////////arms///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors2), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId12 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId12 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices12), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render12();
            ////////////////////////////////////////////pants1///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors5), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId13 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId13 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices13), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render13();
////////////////////////////////////////////pants2///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors6), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId14 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId14 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices14), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render14();
    ////////////////////////////////////////////shoes1///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors4), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId15 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId15 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices16), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render15();
    ////////////////////////////////////////////shoes2///////////////////////////////////////////////////

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors4), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId16 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId16 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices17), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render16();
};


function render1() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render2() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render3() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render4() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId4 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render5() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId5 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render6() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId6 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render7() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId7 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render8() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId8 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render9() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId9 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render10() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId10 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render11() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId11 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render12() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId12 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render13() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId13 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render14() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId14 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render15() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId15 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}
function render16() {

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId16 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

}