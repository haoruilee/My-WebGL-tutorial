/**
 * Created by haoruili
 */
window.onload = function() {

    //顶点着色器程序
    var VSHADER_SOURCE =
        "void main() {" +
        //设置坐标
        "gl_Position = vec4(0.0, 0.0, 0.0, 1.0); " +
        //设置尺寸
        "gl_PointSize = 10.0; " +
        "} ";

    //片元着色器
    var FSHADER_SOURCE =
        "void main() {" +
        //设置颜色
        "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
        "}";
    //获取canvas元素
    var canvas = document.getElementById('canvas');
    //获取绘制二维上下文
    var gl = canvas.getContext('webgl');
    if (!gl) {
        console.log("Failed");
        return;
    }
    //编译着色器
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, VSHADER_SOURCE);
    gl.compileShader(vertShader);

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, FSHADER_SOURCE);
    gl.compileShader(fragShader);
    //合并程序
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1);

    //绘制三角形

    //三角形参数，作为vertices
    //-1,-1是第一个点的坐标，0,1是第二个点的坐标，1,-1是第三个点的坐标，前三个点组成一个片元，后面继续写是新片元
    var vertices = new Float32Array([-1, -0.5, 0, 1, 1, -1,
        1, -0.5, 0.5, 0.5, 1, 1, -1, 1, 0, 0, 1, 1
    ]);

    //  Configure WebGL

    gl.viewport(0, 0, canvas.width, canvas.height);
    //一定要写！清空背景颜色，不然在A卡上会花
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.drawArrays(gl.TRIANGLES, 0, 9);
}