var num = 1;
var gl;
var program;
var canvas
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

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

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);


function positionBuff(points) {
	var paff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, paff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
	return paff;
}

function enablePositionBuff(buff) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	return vPosition;
}

function colorBuff(color) {
	var cBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW);

	return cBuff;
}

function enableColorBuff(buff) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	return vColor;
}
///////////////////////////////////////////////hair////////////////////////////////////////////////////////

    gl.clear(gl.COLOR_BUFFER_BIT);
    // color array atrribute buffer
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    ////////////////////////////////////////////face1/////////////////////////////////////////////////////
    //color array atrribute buffer
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices2)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    /*cBuffer2 = gl.createBuffer();
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
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render(vPosition,gl.TRIANGLE_STRIP,4,bufferId2);*/
    ////////////////////////////////////////////face2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices3)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId3);*/
        ////////////////////////////////////////////eye1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors3)
    var pBuff=positionBuff(vertices4)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId4);*/
    ////////////////////////////////////////////eye2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors3)
    var pBuff=positionBuff(vertices5)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId5);*/
    ////////////////////////////////////////////beard1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices6)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId6);*/
        ////////////////////////////////////////////beard2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices7)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId7);*/
            ////////////////////////////////////////////beard3///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices8)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    /*cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId8);*/
  ////////////////////////////////////////////cloth///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices9)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId9);*/
     ////////////////////////////////////////////neck///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices10)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    /*cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId10);*/
    ////////////////////////////////////////////arms///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices11)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId11);*/
        ////////////////////////////////////////////arms///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices12)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId12);*/
            ////////////////////////////////////////////pants1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors5)
    var pBuff=positionBuff(vertices13)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId13);*/
////////////////////////////////////////////pants2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors6)
    var pBuff=positionBuff(vertices14)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId14);*/
    ////////////////////////////////////////////shoes1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices16)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    /*cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId15);*/
    ////////////////////////////////////////////shoes2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices17)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
   /* cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId16);*/
    ////////////////////////////////////////////nose///////////////////////////////////////////////////
    var N = 10000;
    var center=vec2(0.05, 0.45)
    var vertexData = [center];
    var r = 0.05;

    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = center[0]+r * Math.sin(theta);
        var y = center[1]+ r * Math.cos(theta);
        var point = vec2(x, y);
        vertexData.push(point);
     }
    vertexColorsnose=[vec4(1,0.772,0.65,1)]
    for (var i = 0; i <= N; i++) {
        point=vec4(1,0.772,0.65,1)
        vertexColorsnose.push(point);
     }
    var cBuff=colorBuff(vertexColorsnose)
    var pBuff=positionBuff(vertexData)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_FAN,vertexData.length,pBuff);
    /*cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAYvertexColors4_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColorsnose), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId17 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId17 );
    gl.bufferData(gl.ARRAY_BUFFER,  flatten(vertexData), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );

    render(vPosition2,gl.TRIANGLE_FAN,vertexData.length,bufferId17);*/
        ////////////////////////////////////////////eye1///////////////////////////////////////////////////
    var vertices18= [
        vec2(-0.1, 0.4),
        vec2(0,  0.4),
        vec2(-0.1,0.5),
        vec2(0, 0.5)

    ];
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices18)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    /*cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors4), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId17 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId17 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices18), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId17);*/
////////////////////////////////////////////eye2///////////////////////////////////////////////////
    var vertices19= [
        vec2(0.1, 0.4),
        vec2(0.2,  0.4),
        vec2(0.1,0.5),
        vec2(0.2, 0.5)

    ];
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices19)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    /*cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors4), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId18 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId18 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices19), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId18);*/
    ////////////////////////////////////////////sun///////////////////////////////////////////////////
    var N = 10000;
    var center=vec2(-0.8, 0.8)
    var vertexData = [center];
    var r = 0.2;
    var a=1
    var b=1

    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = center[0]+r * Math.sin(theta)*a;
        var y = center[1]+ r * Math.cos(theta)*b;
        var point = vec2(x, y);
        vertexData.push(point);
     }
    vertexColorssun=[vec4(1,0.784,0.156,1)]
    for (var i = 0; i <= N; i++) {
        point=vec4(1,1,1,1)
        vertexColorssun.push(point);
     }
    var cBuff=colorBuff(vertexColorssun)
    var pBuff=positionBuff(vertexData)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_FAN,vertexData.length,pBuff);






    ////////////////////////////////////////////night/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    canvas.onmousedown = function(event) {
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
    var vertexColors7 = [
        vec4(1, 0, 0, 1.0),  // red
        vec4(1, 0, 0, 1.0),  // green
        vec4(1, 0, 0, 1.0),  // blue

    ];
    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);


function positionBuff(points) {
	var paff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, paff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	return paff;
}

function enablePositionBuff(buff) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	return vPosition;
}

function colorBuff(color) {
	var cBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW);

	return cBuff;
}

function enableColorBuff(buff) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	return vColor;
}
///////////////////////////////////////////////hair////////////////////////////////////////////////////////

    gl.clear(gl.COLOR_BUFFER_BIT);
    // color array atrribute buffer
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    ////////////////////////////////////////////face1/////////////////////////////////////////////////////
    //color array atrribute buffer
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices2)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    ////////////////////////////////////////////face2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices3)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
        ////////////////////////////////////////////eye1///////////////////////////////////////////////////
        var vertexColorseye = [
        vec4(1, 0, 0, 1.0),  // red
        vec4(1, 0, 0, 1.0),  // green
        vec4(1, 0, 0, 1.0),  // blue
    ];
        var verticeseye = [
        vec2(-0.15, 0.4),
        vec2(0,  0.45),
        vec2(-0.15,0.5)

    ];
    var cBuff=colorBuff(vertexColorseye)
    var pBuff=positionBuff(verticeseye)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLES,3,pBuff);
    ////////////////////////////////////////////eye2///////////////////////////////////////////////////
    var vertexColorseye = [
        vec4(1, 0, 0, 1.0),  // red
        vec4(1, 0, 0, 1.0),  // green
        vec4(1, 0, 0, 1.0),  // blue
    ];
    var verticeseye = [
        vec2(0.25, 0.4),
        vec2(0.1,  0.45),
        vec2(0.25,0.5)

    ];
    var cBuff=colorBuff(vertexColorseye)
    var pBuff=positionBuff(verticeseye)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLES,3,pBuff);

    ////////////////////////////////////////////beard1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices6)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);


        ////////////////////////////////////////////beard2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices7)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

            ////////////////////////////////////////////beard3///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices8)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);


  ////////////////////////////////////////////cloth///////////////////////////////////////////////////
     var vertexColorscloth = [
        vec4(0.459, 0.165, 0.470, 1.0),  // red
        vec4(0.459, 0.165, 0.470, 1.0),  // green
        vec4(0.459, 0.165, 0.470, 1.0),  // blue
        vec4(0.459, 0.165, 0.470, 1.0)
    ];
    var cBuff=colorBuff(vertexColorscloth)
    var pBuff=positionBuff(vertices9)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

     ////////////////////////////////////////////neck///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices10)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    ////////////////////////////////////////////arms///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices11)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

        ////////////////////////////////////////////arms///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices12)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

            ////////////////////////////////////////////pants1///////////////////////////////////////////////////
             var vertexColorspant = [
        vec4(0.360, 0.176, 0.122, 1.0),  // red
        vec4(0.360, 0.176, 0.122, 1.0),  // green
        vec4(0.360, 0.176, 0.122, 1.0),  // blue
        vec4(0.360, 0.176, 0.122, 1.0)
    ];
    var cBuff=colorBuff(vertexColorspant)
    var pBuff=positionBuff(vertices13)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

////////////////////////////////////////////pants2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors6)
    var pBuff=positionBuff(vertices14)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    ////////////////////////////////////////////shoes1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColorscloth)
    var pBuff=positionBuff(vertices16)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    ////////////////////////////////////////////shoes2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColorscloth)
    var pBuff=positionBuff(vertices17)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    ////////////////////////////////////////////nose///////////////////////////////////////////////////
    var N = 10000;
    var center=vec2(0.05, 0.45)
    var vertexData = [center];
    var r = 0.05;

    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = center[0]+r * Math.sin(theta);
        var y = center[1]+ r * Math.cos(theta);
        var point = vec2(x, y);
        vertexData.push(point);
     }
    vertexColorsnose=[vec4(1,0.772,0.65,1)]
    for (var i = 0; i <= N; i++) {
        point=vec4(1,0.772,0.65,1)
        vertexColorsnose.push(point);
     }
    var cBuff=colorBuff(vertexColorsnose)
    var pBuff=positionBuff(vertexData)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_FAN,vertexData.length,pBuff);

    ////////////////////////////////////////////moon///////////////////////////////////////////////////
    var N = 10000;
    var center=vec2(0.8, 0.8)
    var vertexData = [center];
    var r = 0.2;

    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = center[0]+r * Math.sin(theta);
        var y = center[1]+ r * Math.cos(theta);
        var point = vec2(x, y);
        vertexData.push(point);
     }
    vertexColorssun=[vec4(1,0.784,0.156,1)]
    for (var i = 0; i <= N; i++) {
        point=vec4(1,0.784,0.156,1)
        vertexColorssun.push(point);
     }
    var cBuff=colorBuff(vertexColorssun)
    var pBuff=positionBuff(vertexData)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_FAN,vertexData.length,pBuff);
        ////////////////////////////////////////////moon///////////////////////////////////////////////////
    var N = 10000;
    var center=vec2(0.9, 0.8)
    var vertexData = [center];
    var r = 0.2;

    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = center[0]+r * Math.sin(theta);
        var y = center[1]+ r * Math.cos(theta);
        var point = vec2(x, y);
        vertexData.push(point);
     }
    vertexColorssun=[vec4(0,0,0,1)]
    for (var i = 0; i <= N; i++) {
        point=vec4(0,0,0,1)
        vertexColorssun.push(point);
     }
    var cBuff=colorBuff(vertexColorssun)
    var pBuff=positionBuff(vertexData)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_FAN,vertexData.length,pBuff);
    }



};

////////////////////////////////////////////////////////////////////////////////////////



function render(vPosition, func, pe, ID) {
    gl.bindBuffer( gl.ARRAY_BUFFER, ID );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.drawArrays(func, 0, pe);
}

function hat() {
    canvas = document.getElementById( "gl-canvas" );

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

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);


function positionBuff(points) {
	var paff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, paff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	return paff;
}

function enablePositionBuff(buff) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	return vPosition;
}

function colorBuff(color) {
	var cBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW);

	return cBuff;
}

function enableColorBuff(buff) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	return vColor;
}
///////////////////////////////////////////////hair////////////////////////////////////////////////////////

    gl.clear(gl.COLOR_BUFFER_BIT);
    // color array atrribute buffer
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    ////////////////////////////////////////////face1/////////////////////////////////////////////////////
    //color array atrribute buffer
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices2)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    /*cBuffer2 = gl.createBuffer();
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
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render(vPosition,gl.TRIANGLE_STRIP,4,bufferId2);*/
    ////////////////////////////////////////////face2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices3)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId3);*/
        ////////////////////////////////////////////eye1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors3)
    var pBuff=positionBuff(vertices4)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId4);*/
    ////////////////////////////////////////////eye2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors3)
    var pBuff=positionBuff(vertices5)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId5);*/
    ////////////////////////////////////////////beard1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices6)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId6);*/
        ////////////////////////////////////////////beard2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices7)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId7);*/
            ////////////////////////////////////////////beard3///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices8)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    /*cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId8);*/
  ////////////////////////////////////////////cloth///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices9)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId9);*/
     ////////////////////////////////////////////neck///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices10)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    /*cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId10);*/
    ////////////////////////////////////////////arms///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices11)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId11);*/
        ////////////////////////////////////////////arms///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors2)
    var pBuff=positionBuff(vertices12)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId12);*/
            ////////////////////////////////////////////pants1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors5)
    var pBuff=positionBuff(vertices13)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId13);*/
////////////////////////////////////////////pants2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors6)
    var pBuff=positionBuff(vertices14)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
/*    cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId14);*/
    ////////////////////////////////////////////shoes1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices16)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    /*cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId15);*/
    ////////////////////////////////////////////shoes2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices17)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
   /* cBuffer2 = gl.createBuffer();
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
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId16);*/
    ////////////////////////////////////////////nose///////////////////////////////////////////////////
    var N = 10000;
    var center=vec2(0.05, 0.45)
    var vertexData = [center];
    var r = 0.05;

    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = center[0]+r * Math.sin(theta);
        var y = center[1]+ r * Math.cos(theta);
        var point = vec2(x, y);
        vertexData.push(point);
     }
    vertexColorsnose=[vec4(1,0.772,0.65,1)]
    for (var i = 0; i <= N; i++) {
        point=vec4(1,0.772,0.65,1)
        vertexColorsnose.push(point);
     }
    var cBuff=colorBuff(vertexColorsnose)
    var pBuff=positionBuff(vertexData)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_FAN,vertexData.length,pBuff);
    /*cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAYvertexColors4_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColorsnose), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId17 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId17 );
    gl.bufferData(gl.ARRAY_BUFFER,  flatten(vertexData), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );

    render(vPosition2,gl.TRIANGLE_FAN,vertexData.length,bufferId17);*/
        ////////////////////////////////////////////eye1///////////////////////////////////////////////////
    var vertices18= [
        vec2(-0.1, 0.4),
        vec2(0,  0.4),
        vec2(-0.1,0.5),
        vec2(0, 0.5)

    ];
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices18)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    /*cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors4), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId17 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId17 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices18), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId17);*/
////////////////////////////////////////////eye2///////////////////////////////////////////////////
    var vertices19= [
        vec2(0.1, 0.4),
        vec2(0.2,  0.4),
        vec2(0.1,0.5),
        vec2(0.2, 0.5)

    ];
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices19)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    /*cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors4), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId18 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId18 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices19), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId18);*/
    ////////////////////////////////////////////sun///////////////////////////////////////////////////
    var N = 10000;
    var center=vec2(-0.8, 0.8)
    var vertexData = [center];
    var r = 0.2;
    var a=1
    var b=1

    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = center[0]+r * Math.sin(theta)*a;
        var y = center[1]+ r * Math.cos(theta)*b;
        var point = vec2(x, y);
        vertexData.push(point);
     }
    vertexColorssun=[vec4(1,0.784,0.156,1)]
    for (var i = 0; i <= N; i++) {
        point=vec4(1,1,1,1)
        vertexColorssun.push(point);
     }
    var cBuff=colorBuff(vertexColorssun)
    var pBuff=positionBuff(vertexData)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_FAN,vertexData.length,pBuff);

        var vertices19= [
        vec2(-0.1, 0.8),
        vec2(0.2,  0.8),
        vec2(-0.1,0.9),
        vec2(0.2, 0.9)

    ];
            var vertexColors = [
        vec4(0, 0.9, 0, 1.0),  // red
        vec4(0, 0.9, 0, 1.0),  // green
        vec4(0, 1, 0, 1.0),  // blue
        vec4(0, 1, 0, 1.0),   // blue
    ];
    cBuffer7 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer7);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId27 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId27 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices19), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId27);

    var vertices19= [
        vec2(-0.2, 0.8),
        vec2(-0.1,  0.8),
        vec2(-0.2,0.83),
        vec2(-0.1, 0.83)

    ];
            var vertexColors = [
        vec4(0, 0.9, 0, 1.0),  // red
        vec4(0, 0.9, 0, 1.0),  // green
        vec4(0, 1, 0, 1.0),  // blue
        vec4(0, 1, 0, 1.0),   // blue
    ];
    cBuffer7 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer7);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor2);

    // Load the data into the GPU
    bufferId28 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId28 );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices19), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
    render(vPosition2,gl.TRIANGLE_STRIP,4,bufferId28);

};

