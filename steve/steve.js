

var gl;
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
    var cBuff1=colorBuff(vertexColors)
    var pBuff1=positionBuff(vertices)
    enableColorBuff(cBuff1);
    render(enablePositionBuff(pBuff1),gl.TRIANGLE_STRIP,4,pBuff1);//
    ////////////////////////////////////////////face1/////////////////////////////////////////////////////
    //color array atrribute buffer
    var cBuff2=colorBuff(vertexColors2)
    var pBuff2=positionBuff(vertices2)
    enableColorBuff(cBuff2);
    render(enablePositionBuff(pBuff2),gl.TRIANGLE_STRIP,4,pBuff2);


    ////////////////////////////////////////////face2///////////////////////////////////////////////////
    var cBuff3=colorBuff(vertexColors2)
    var pBuff3=positionBuff(vertices3)
    enableColorBuff(cBuff3);
    render(enablePositionBuff(pBuff3),gl.TRIANGLE_STRIP,4,pBuff3);


        ////////////////////////////////////////////eye1///////////////////////////////////////////////////
    var cBuff4=colorBuff(vertexColors3)
    var pBuff4=positionBuff(vertices4)
    enableColorBuff(cBuff4);
    render(enablePositionBuff(pBuff4),gl.TRIANGLE_STRIP,4,pBuff4);


    ////////////////////////////////////////////eye2///////////////////////////////////////////////////
    var cBuff5=colorBuff(vertexColors3)
    var pBuff5=positionBuff(vertices5)
    enableColorBuff(cBuff5);
    render(enablePositionBuff(pBuff5),gl.TRIANGLE_STRIP,4,pBuff5);


    ////////////////////////////////////////////beard1///////////////////////////////////////////////////
    var cBuff6=colorBuff(vertexColors)
    var pBuff6=positionBuff(vertices6)
    enableColorBuff(cBuff6);
    render(enablePositionBuff(pBuff6),gl.TRIANGLE_STRIP,4,pBuff6);


        ////////////////////////////////////////////beard2///////////////////////////////////////////////////
    var cBuff7=colorBuff(vertexColors)
    var pBuff7=positionBuff(vertices7)
    enableColorBuff(cBuff7);
    render(enablePositionBuff(pBuff7),gl.TRIANGLE_STRIP,4,pBuff7);

            ////////////////////////////////////////////beard3///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors)
    var pBuff=positionBuff(vertices8)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);


  ////////////////////////////////////////////cloth///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
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
    var cBuff=colorBuff(vertexColors5)
    var pBuff=positionBuff(vertices13)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

////////////////////////////////////////////pants2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors6)
    var pBuff=positionBuff(vertices14)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    ////////////////////////////////////////////shoes1///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
    var pBuff=positionBuff(vertices16)
    enableColorBuff(cBuff);
    render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);

    ////////////////////////////////////////////shoes2///////////////////////////////////////////////////
    var cBuff=colorBuff(vertexColors4)
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

////////////////////////////////////////////eye2///////////////////////////////////////////////////
    
        //onmousedown检测鼠标点击
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


    ////////////////////////////////////////////sun///////////////////////////////////////////////////
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
        point=vec4(1,1,1,1)
        vertexColorssun.push(point);
     }
    var cBuff=colorBuff(vertexColorssun)
    var pBuff=positionBuff(vertexData)
    enableColorBuff(cBuff);
    headmain(gl)
    

    function headmain()
    {
     ///////////////////////////////////////////////hair////////////////////////////////////////////////////////
    
     gl.clear(gl.COLOR_BUFFER_BIT);
     // color array atrribute buffer
     var cBuff1=colorBuff(vertexColors)
     var pBuff1=positionBuff(vertices)
     enableColorBuff(cBuff1);
     render(enablePositionBuff(pBuff1),gl.TRIANGLE_STRIP,4,pBuff1);//
     ////////////////////////////////////////////face1/////////////////////////////////////////////////////
     //color array atrribute buffer
     var cBuff2=colorBuff(vertexColors2)
     var pBuff2=positionBuff(vertices2)
     enableColorBuff(cBuff2);
     render(enablePositionBuff(pBuff2),gl.TRIANGLE_STRIP,4,pBuff2);
    
    
     ////////////////////////////////////////////face2///////////////////////////////////////////////////
     var cBuff3=colorBuff(vertexColors2)
     var pBuff3=positionBuff(vertices3)
     enableColorBuff(cBuff3);
     render(enablePositionBuff(pBuff3),gl.TRIANGLE_STRIP,4,pBuff3);
    
    
         ////////////////////////////////////////////eye1///////////////////////////////////////////////////
     var cBuff4=colorBuff(vertexColors3)
     var pBuff4=positionBuff(vertices4)
     enableColorBuff(cBuff4);
     render(enablePositionBuff(pBuff4),gl.TRIANGLE_STRIP,4,pBuff4);
    
    
     ////////////////////////////////////////////eye2///////////////////////////////////////////////////
     var cBuff5=colorBuff(vertexColors3)
     var pBuff5=positionBuff(vertices5)
     enableColorBuff(cBuff5);
     render(enablePositionBuff(pBuff5),gl.TRIANGLE_STRIP,4,pBuff5);
    
    
     ////////////////////////////////////////////beard1///////////////////////////////////////////////////
     var cBuff6=colorBuff(vertexColors)
     var pBuff6=positionBuff(vertices6)
     enableColorBuff(cBuff6);
     render(enablePositionBuff(pBuff6),gl.TRIANGLE_STRIP,4,pBuff6);
    
    
         ////////////////////////////////////////////beard2///////////////////////////////////////////////////
     var cBuff7=colorBuff(vertexColors)
     var pBuff7=positionBuff(vertices7)
     enableColorBuff(cBuff7);
     render(enablePositionBuff(pBuff7),gl.TRIANGLE_STRIP,4,pBuff7);
    
             ////////////////////////////////////////////beard3///////////////////////////////////////////////////
     var cBuff=colorBuff(vertexColors)
     var pBuff=positionBuff(vertices8)
     enableColorBuff(cBuff);
     render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    
    
    ////////////////////////////////////////////cloth///////////////////////////////////////////////////
     var cBuff=colorBuff(vertexColors4)
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
     var cBuff=colorBuff(vertexColors5)
     var pBuff=positionBuff(vertices13)
     enableColorBuff(cBuff);
     render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    
    ////////////////////////////////////////////pants2///////////////////////////////////////////////////
     var cBuff=colorBuff(vertexColors6)
     var pBuff=positionBuff(vertices14)
     enableColorBuff(cBuff);
     render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    
     ////////////////////////////////////////////shoes1///////////////////////////////////////////////////
     var cBuff=colorBuff(vertexColors4)
     var pBuff=positionBuff(vertices16)
     enableColorBuff(cBuff);
     render(enablePositionBuff(pBuff),gl.TRIANGLE_STRIP,4,pBuff);
    
     ////////////////////////////////////////////shoes2///////////////////////////////////////////////////
     var cBuff=colorBuff(vertexColors4)
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
    
    ////////////////////////////////////////////eye2///////////////////////////////////////////////////
     
         //onmousedown检测鼠标点击
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
    
      
    }
    
    
    canvas.onmousedown = function(event) {
    headmain()
    ////////////////////////////////////////////sun///////////////////////////////////////////////////
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
            point=vec4(1,1,1,1)
            vertexColorssun.push(point);
        }
        var cBuff=colorBuff(vertexColorssun)
        var pBuff=positionBuff(vertexData)
        enableColorBuff(cBuff); 
        render(enablePositionBuff(pBuff),gl.TRIANGLE_FAN,vertexData.length,pBuff);
    }

    ////////////////////////////////////////////transparent2///////////////////////////////////////////////////
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

};


function render(vPosition, func, pe, ID) {
    gl.bindBuffer( gl.ARRAY_BUFFER, ID );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.drawArrays(func, 0, pe);
}
