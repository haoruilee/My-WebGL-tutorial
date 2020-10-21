

var gl;
var points;

var vPosition, vPosition2;
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

    var vertexColors = [
        vec4(0.34, 0.094, 0.090, 1.0),  // red
        vec4(0.34, 0.094, 0.090, 1.0),  // green
        vec4(0.34, 0.094, 0.090, 1.0),  // blue
        vec4(0.34, 0.094, 0.090, 1.0),   // blue

    ];

    var vertexColors2 = [
        vec4(0.34, 0.094, 0.090, 1.0),  // red
        vec4(0.34, 0.094, 0.090, 1.0),  // green
        vec4(0.34, 0.094, 0.090, 1.0),  // blue
        vec4(0.34, 0.094, 0.090, 1.0),   // blue

    ];

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);

    // color array atrribute buffer

    // Load the data into the GPU
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition );


    // Load the data into the GPU
    bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW);

    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition2 );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    requestAnimFrame( render );

}
