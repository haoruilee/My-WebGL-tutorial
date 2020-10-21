var gl;
var points;

var vPosition, vPosition2;
var bufferId, bufferId2;
var program;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }


    var vertices = [
        vec2(-0.3, 0.5),
        vec2(0.4, 0.5),
        vec2(-0.3, 0.8),
        vec2(0.4, 0.8)

    ];

    var vertexColors = [
        vec4(0.34, 0.094, 0.090, 1.0), // red
        vec4(0.34, 0.094, 0.090, 1.0), // green
        vec4(0.34, 0.094, 0.090, 1.0), // blue
        vec4(0.34, 0.094, 0.090, 1.0), // blue

    ];


    //  Configure WebGL

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // color array atrribute buffer

    // Load the data into the GPU
    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);

    //绑定颜色
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer); //绑定缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, flatten(verticescolor), gl.STATIC_DRAW); //向缓冲区写入顶点数据

    //获取顶点着色器中attribute变量位置
    var a_Position = gl.getAttribLocation(program, "a_Position");

    var SIZE = verticescolor.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, SIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, SIZE * 5, SIZE * 2);
    gl.enableVertexAttribArray(a_Color);
    gl.bindBuffer(gl.ARRAY_BUFFER, iBuffer); //绑定缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, flatten(indexV), gl.STATIC_DRAW); //向缓冲区写入索引数据

    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimFrame(render);

}