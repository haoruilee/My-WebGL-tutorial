

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