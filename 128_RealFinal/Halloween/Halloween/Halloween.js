var canvas;
var gl;
var program;

var ms = 180; // 画圆的面数

var ispause = true; //是否开始旋转
var then = 0; //计算旋转时间差

var lightPosition = vec4(0.8, 0.8, 0.1, 1.0);
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
var materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);
var materialShininess = 100.0;

var modelViewMatrix, normalMatrix;
var modelViewMatrixLoc, normalMatrixLoc;


var points = []; // 顶点容器
var normals = []; // 法向量容器
var vNormal, vPosition, vTexCoord;
var nBuffer, vBuffer, tBuffer; // buffer
var CubeTx = 0,
    CubeTy = 0,
    CubeTz = 0; //平移量
var CubeRotateAngle = 0; //旋转角度
var scalePercent = 0.5; // 缩放比例
var direct = vec4(0.0, 0.0, 1.0, 1.0); // 当前正面方向


var texCoordsArray = []; //纹理坐标容器

//左手
var points_1 = []; // 顶点容器
var normals_1 = []; // 法向量容器
var texCoordsArray_1 = []; //纹理坐标容器
var vNormal_1, vPosition_1, vTexCoord_1;
var nBuffer_1, vBuffer_1, tBuffer_1; // buffer
var CubeRotateAngleX_1 = 0; //绕X轴旋转角度
var CubeRotateAngleZ_1 = 0; //绕Z轴旋转角度
var direct_1 = 0; //决定手臂前摆(0)还是后摆(1)
//右手
var points_2 = []; // 顶点容器
var normals_2 = []; // 法向量容器
var texCoordsArray_2 = []; //纹理坐标容器
var vNormal_2, vPosition_2, vTexCoord_2;
var nBuffer_2, vBuffer_2, tBuffer_2; // buffer
var CubeRotateAngleX_2 = 0; //绕X轴旋转角度
var CubeRotateAngleZ_2 = 0; //绕Z轴旋转角度
var direct_2 = 0; //决定手臂前摆(0)还是后摆(1)
//左腿
var points_3 = []; // 顶点容器
var normals_3 = []; // 法向量容器
var texCoordsArray_3 = []; //纹理坐标容器
var vNormal_3, vPosition_3, vTexCoord_3;
var nBuffer_3, vBuffer_3, tBuffer_3; // buffer
var CubeRotateAngleX_3 = 0; //绕X轴旋转角度
var CubeRotateAngleZ_3 = 0; //绕Z轴旋转角度
var direct_3 = 0; //决定手臂前摆(0)还是后摆(1)
//右腿
var points_4 = []; // 顶点容器
var normals_4 = []; // 法向量容器
var texCoordsArray_4 = []; //纹理坐标容器
var vNormal_4, vPosition_4, vTexCoord_4;
var nBuffer_4, vBuffer_4, tBuffer_4; // buffer
var CubeRotateAngleX_4 = 0; //绕X轴旋转角度
var CubeRotateAngleZ_4 = 0; //绕Z轴旋转角度
var direct_4 = 0; //决定手臂前摆(0)还是后摆(1)

// 右
var points2 = []; // 顶点容器
var normals2 = []; // 法向量容器
var texCoordsArray2 = []; //纹理坐标容器
var vNormal2, vPosition2, vTexCoord2;
var nBuffer2, vBuffer2, tBuffer2; // 右buffer
var CubeTx2 = 0,
    CubeTy2 = 0,
    CubeTz2 = 0; // 右平移量
var CubeRotateAngle2 = 0; // 右旋转角度
var scalePercent2 = 0.5; // 缩放比例
var direct2 = vec4(0.0, 0.0, 1.0, 1.0); // 当前正面方向


var points3 = [];
var normals3 = [];
var texCoordsArray3 = []; //纹理坐标容器
var vNormal3, vPosition3, vTexCoord3;
var nBuffer3, vBuffer3, tBuffer3; // 雪人的buffer
var CubeTx3 = 0,
    CubeTy3 = 0,
    CubeTz3 = 0; // 雪人平移量
var CubeRotateAngle3 = 0; // 雪人旋转角度
var scalePercent3 = 0.5; // 缩放比例
var direct3 = vec4(0.0, 0.0, 1.0, 1.0); // 当前正面方向

//地面
var points5 = [];
var normals5 = [];
var texCoordsArray5 = []; //纹理坐标容器
var vNormal5, vPosition5, vTexCoord5;
var nBuffer5, vBuffer5, tBuffer5; // 地面的buffer

// 光源
var points6 = []; // 顶点容器
var normals6 = []; // 法向量容器
var texCoordsArray6 = []; //纹理坐标容器
var vNormal6, vPosition6, vTexCoord6;
var nBuffer6, vBuffer6, tBuffer6; // 光源的buffer
var CubeTx6 = lightPosition[0],
    CubeTy6 = lightPosition[1],
    CubeTz6 = lightPosition[2]; //光源平移量
var scalePercent6 = 1; // 缩放比例

var viewMatrixLoc; // 视图矩阵的存储地址
var viewMatrix; // 当前视图矩阵
var eye = vec3(0.0, 0.0, 5.0);
const at = vec3(0.0, 0.0, -10.0);
const up = vec3(0.0, 1.0, 0.0);
var lookx = 0;
var looky = 0;
var lookz = 3;

var currentAngle = [0.0, 0.0]; // [绕x轴旋转角度，绕y轴旋转角度]

var projectionMatrixLoc; // 投影矩阵的存储地址
var projectionMatrix; // 当前投影矩阵
var fovy = 45.0; // Field-of-view in Y direction angle (in degrees)
var aspect = 1.0; // Viewport aspect ratio
var near = 0.04;
var far = 10.0;

var body = vec3(0.4, 0.45, 0.2);
var cloth = vec3(0.4, 0.05, 0.2);
var pants = vec3(0.4, 0.1, 0.2);
var leg = vec3(0.15, 0.25, 0.05);
var shoe = vec3(0.15, 0.05, 0.05);




var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

function configureTexture0(image) {
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture0"), 0);
}

function configureTexture1(image) {
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
}

function configureTexture2(image) {
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 2);
}

function configureTexture3(image) {
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture3"), 3);
}

function configureTexture4(image) {
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE4);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D); // 这句话会报错，就直接注释掉了
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture4"), 4);
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    var image = document.getElementById("texImage"); //图片
    var image2 = document.getElementById("texImage2"); //右图片

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    //gl.clearColor( 0.91, 0.92, 0.93, 1.0 ); // 灰色背景色
    gl.clearColor(30.0 / 255.0, 20.0 / 255.0, 77.0 / 255.0, 1.0); // 紫色背景色
    gl.enable(gl.DEPTH_TEST); // 开启隐藏面消除

    // 初始化着色器
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    setPoints(); // 设置所有顶点位置及法向量

    // 获取viewMatrix变量的存储地址
    viewMatrixLoc = gl.getUniformLocation(program, 'viewMatrix');
    // 设置视点、视线和上方向
    viewMatrix = lookAt(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    // 将视图矩阵传递给viewMatrix变量
    gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));

    // 设置材质
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

    // 创建缓冲区，并向缓冲区写入立方体每个面的颜色信息555555555555555555555555555
    nBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals5), gl.STATIC_DRAW);
    //获取着色器中vNormal变量，并向其传递数据
    vNormal5 = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal5, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal5);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points5), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition5 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition5, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition5);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray5), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord5 = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);

    // 创建缓冲区，并向缓冲区写入立方体每个面的法向量信息66666666
    nBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer6);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals6), gl.STATIC_DRAW);
    //获取着色器中vNormal变量，并向其传递数据
    vNormal6 = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal6, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal6);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer6);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points6), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition6 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition6, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition6);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer6);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray6), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord6 = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);

    configureTexture0(image);

    // 创建缓冲区，并向缓冲区写入立方体每个面的法向量信息11111111111111111111111111111111111111111111111111
    nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
    // 获取着色器中vNormal变量，并向其传递数据
    vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);

    initBody(); //身体各部位初始化

    configureTexture4(image);

    // 创建缓冲区，并向缓冲区写入立方体每个面的法向量信息222222222222222222222222222222222222222222222222222222
    nBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals2), gl.STATIC_DRAW);
    //获取着色器中vNormal变量，并向其传递数据
    vNormal2 = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal2);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points2), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition2 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition2);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray2), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord2 = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord2);

    configureTexture2(image2);


    // 创建缓冲区，并向缓冲区写入立方体每个面的颜色信息333333333333333333333333333333333333333333333333333333333
    nBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals3), gl.STATIC_DRAW);
    //获取着色器中vNormal变量，并向其传递数据
    vNormal3 = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal3, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal3);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points3), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition3 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition3);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray3), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord3 = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord3, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord3);

    //configureTexture1(image1);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
    normalMatrixLoc = gl.getUniformLocation(program, "normalMatrix");


    document.getElementById("cubeForward").onclick = function () {
        CubeTx += 0.1 * direct[0];
        CubeTy += 0.1 * direct[1];
        CubeTz += 0.1 * direct[2];
    };
    document.getElementById("cubeBack").onclick = function () {
        CubeTx -= 0.1 * direct[0];
        CubeTy -= 0.1 * direct[1];
        CubeTz -= 0.1 * direct[2];
    };
    document.getElementById("cubeR1").onclick = function () {
        CubeRotateAngle -= 5;
    };
    document.getElementById("cubeR2").onclick = function () {
        CubeRotateAngle += 5;
    };
    document.getElementById("small").onclick = function () {
        scalePercent -= 0.05;
    };
    document.getElementById("big").onclick = function () {
        scalePercent += 0.05;
    };

    document.getElementById("cubeForward2").onclick = function () {
        CubeTx2 += 0.1 * direct2[0];
        CubeTy2 += 0.1 * direct2[1];
        CubeTz2 += 0.1 * direct2[2];
    };
    document.getElementById("cubeBack2").onclick = function () {
        CubeTx2 -= 0.1 * direct2[0];
        CubeTy2 -= 0.1 * direct2[1];
        CubeTz2 -= 0.1 * direct2[2];
    };
    document.getElementById("cubeR12").onclick = function () {
        CubeRotateAngle2 -= 5;
    };
    document.getElementById("cubeR22").onclick = function () {
        CubeRotateAngle2 += 5;
    };
    document.getElementById("small2").onclick = function () {
        scalePercent2 -= 0.05;
    };
    document.getElementById("big2").onclick = function () {
        scalePercent2 += 0.05;
    };
    document.getElementById("lightLeft").onclick = function () {
        lightPosition[0] -= 0.1;
        CubeTx6 = lightPosition[0];
    };
    document.getElementById("lightRight").onclick = function () {
        lightPosition[0] += 0.1;
        CubeTx6 = lightPosition[0];
    };
    document.getElementById("lightFront").onclick = function () {
        lightPosition[2] += 0.1;
        console.log("lightPosition[2]", lightPosition[2]);
        CubeTz6 = lightPosition[2];
    };
    document.getElementById("lightBack").onclick = function () {
        lightPosition[2] -= 0.1;
        console.log("lightPosition[2]", lightPosition[2]);
        CubeTz6 = lightPosition[2];
    };
    document.getElementById("lightUp").onclick = function () {
        lightPosition[1] += 0.1;
        CubeTy6 = lightPosition[1];
    };
    document.getElementById("lightDown").onclick = function () {
        lightPosition[1] -= 0.1;
        CubeTy6 = lightPosition[1];
    };
    document.getElementById("startrot").onclick = function () {
        if (ispause) {
            ispause = false;
            console.log("ispause：", ispause)
        } else if (!ispause) {
            ispause = true;
            console.log("ispause：", ispause)
        }
    }

    gl.uniform4fv(gl.getUniformLocation(program,
        "lightPosition"), flatten(lightPosition));
    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    // 鼠标拖动
    initEventHandlers(canvas, currentAngle);

    render();

};

function render(now) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    projectionMatrix = perspective(fovy, aspect, near, far);
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    now *= 0.001;
    // 减去上一次的时间得到时间差
    var deltaTime = now - then;
    //console.log("deltaTime：",deltaTime)
    // 记住这次时间
    then = now;
    //如果不ispause则一直转
    /** */
    if (!ispause) {
        CubeRotateAngle += 80 * deltaTime;
        console.log("CubeRotateAngle：", CubeRotateAngle);
    }

    // 左侧苦力怕变换
    var init = translate(-0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    // 顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    // 设置材质
    //左侧人身子
    materialAmbient = vec4(0.215, 0.1745, 0.0215, 0.55); // 翠色
    materialDiffuse = vec4(0.07568, 0.61424, 0.07568, 0.55);
    materialSpecular = vec4(0.633, 0.727811, 0.633, 0.55);
    materialShininess = 27.0;
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "lightPosition"), flatten(lightPosition));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 0, 36 * 3);

    bodyMove();

    // 右变换
    init = translate(0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    S = scalem(scalePercent2, scalePercent2, scalePercent2);
    T = translate(CubeTx2, CubeTy2, CubeTz2);
    R = rotateY(CubeRotateAngle2);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    m = mult(mult(T, R), S);

    // 记录正面的方向
    direct2 = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct2 = multMat4Vec4(m, direct2);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    // 顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);

    // 设置新材质
    // 右边的人全身
    materialAmbient = vec4(185.0 / 255.0, 145.0 / 255.0, 125.0 / 255.0, 1.0); // rgb(185,145,125,1)
    materialDiffuse = vec4(185.0 / 255.0, 145.0 / 255.0, 125.0 / 255.0, 1.0); // rgb(185,145,125,1)
    materialSpecular = vec4(185.0 / 255.0, 145.0 / 255.0, 125.0 / 255.0, 1.0); // rgb(185,145,125,1)
    materialShininess = 100.0;
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition2);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer2);
    gl.vertexAttribPointer(vNormal2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal2);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer2);
    gl.vertexAttribPointer(vTexCoord2, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 2);
    gl.activeTexture(gl.TEXTURE2);
    gl.enableVertexAttribArray(vTexCoord2);

    gl.drawArrays(gl.TRIANGLES, 0, 36 * 9);

    init = translate(0, -0.14, 0); // 初始变换矩阵，用于设置模型的初始位置
    S = scalem(scalePercent3, scalePercent3, scalePercent3);
    T = translate(CubeTx3, CubeTy3, CubeTz3);
    R = rotateY(CubeRotateAngle3);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    m = mult(mult(T, R), S);

    // 记录正面的方向
    direct3 = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct3 = multMat4Vec4(m, direct3);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    // 雪人顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);

    // 设置新材质
    materialAmbient = vec4(1.0, 1.0, 1.0, 1.0);
    materialDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
    materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
    materialShininess = 100.0;
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition3);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer3);
    gl.vertexAttribPointer(vNormal3, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal3);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer3);
    gl.vertexAttribPointer(vTexCoord3, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.enableVertexAttribArray(vTexCoord3);

    gl.drawArrays(gl.LINES, 0, 4 * 180 * 180 + 4 * 360 * 360 + 5 * 4 * 90 * 90 + 4 * (ms * 3 * 2 + ms * 6) + ms * 6 * 3);

    //地面
    modelViewMatrix = translate(0, -0.32, 0);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer5);
    gl.vertexAttribPointer(vPosition5, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition5);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer5);
    gl.vertexAttribPointer(vNormal5, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal5);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer5);
    gl.vertexAttribPointer(vTexCoord5, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 3);
    gl.activeTexture(gl.TEXTURE3);
    gl.enableVertexAttribArray(vTexCoord5);
    gl.drawArrays(gl.TRIANGLES, 0, 36 * 50 * 50);

    // 光源变换
    S = scalem(scalePercent6, scalePercent6, scalePercent6);
    T = translate(CubeTx6, CubeTy6, CubeTz6);

    modelViewMatrix = mult(T, S);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    // 设置新材质
    //已删除
    materialAmbient = vec4(1.0, 1.0, 1.0, 1.0); // rgb(255,255,255)
    materialDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
    materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
    materialShininess = 20.0;
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer6);
    gl.vertexAttribPointer(vPosition6, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition6);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer6);
    gl.vertexAttribPointer(vNormal6, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal6);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer6);
    gl.vertexAttribPointer(vTexCoord5, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 4);
    gl.activeTexture(gl.TEXTURE4);
    gl.enableVertexAttribArray(vTexCoord6);

    gl.drawArrays(gl.TRIANGLES, 0, 36);

    requestAnimFrame(render);
}

// 计算矩阵作用于向量的结果，mat4 * vec4
function multMat4Vec4(mat4, vector) {
    var newVec = [];
    for (var i = 0; i < 4; i++) {
        newVec.push(mat4[i][0] * vector[0] +
            mat4[i][1] * vector[1] +
            mat4[i][2] * vector[2] +
            mat4[i][3] * vector[3]);
    }
    return newVec;
}

function setPoints() {
    // 画
    drawHmbbYellow(points, normals, texCoordsArray);
    drawLeftArm2(points_1, normals_1, texCoordsArray_1); // 左手臂
    drawRightArm2(points_2, normals_2, texCoordsArray_2); // 右手臂
    drawLeftLeg(points_3, normals_3, texCoordsArray_3); // 左腿
    drawLeftShoe(points_3, normals_3, texCoordsArray_3); // 左腿
    drawRightLeg(points_4, normals_4, texCoordsArray_4); // 右腿
    drawRightShoe(points_4, normals_4, texCoordsArray_4); // 右腿
    // 画右
    drawHmbb(points2, normals2, texCoordsArray2);
    //drawSnow(points3, normals3, texCoordsArray3);//雪人
    // snow(points4, normals4);//雪花
    // for(var x = -50;x < 50;x=x+2){
    //     for(var z = -50;z < 50;z=z+2){
    //         floor(points5, normals5, texCoordsArray5, x, z);//地面
    //     }
    // }
    drawLight(points6, normals6, texCoordsArray6); // 光源
}

function quadPush(texCoordsArray) { //输入一个矩形的空纹理坐标
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[1]);
    texCoordsArray.push(texCoord[2]);
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[2]);
    texCoordsArray.push(texCoord[3]);
}

function quadPushTCNULL(texCoordsArray) { //输入一个矩形的空纹理坐标
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[0]);
}

function quad(vertices, a, b, c, d, pointArray, normalArray) {
    /**
     *  // 光源的八个顶点(x,y,z,a)
    var lightVertices = [
        vec4(-0.01, -0.01, 0.01, 1.0),
        vec4(-0.01, 0.01, 0.01, 1.0),
        vec4(0.01, 0.01, 0.01, 1.0),
        vec4(0.01, -0.01, 0.01, 1.0),
        vec4(-0.01, -0.01, -0.01, 1.0),
        vec4(-0.01, 0.01, -0.01, 1.0),
        vec4(0.01, 0.01, -0.01, 1.0),
        vec4(0.01, -0.01, -0.01, 1.0)
    ];
    quad(lightVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(lightVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(lightVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(lightVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(lightVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(lightVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPush(texCoordsArray);
    }
     */
    var t1 = subtract(vertices[b], vertices[a]);
    var t2 = subtract(vertices[c], vertices[b]);
    var normal = cross(t1, t2);
    normal = vec4(normal[0], normal[1], normal[2], 0.0);
    pointArray.push(vertices[a]);
    normalArray.push(normal);
    pointArray.push(vertices[b]);
    normalArray.push(normal);
    pointArray.push(vertices[c]);
    normalArray.push(normal);
    pointArray.push(vertices[a]);
    normalArray.push(normal);
    pointArray.push(vertices[c]);
    normalArray.push(normal);
    pointArray.push(vertices[d]);
    normalArray.push(normal);
}

// 绘制光源
function drawLight(pointArray, normalArray, texCoordsArray) {
    // 光源的八个顶点(x,y,z,a)
    var lightVertices = [
        vec4(-0.01, -0.01, 0.01, 1.0),
        vec4(-0.01, 0.01, 0.01, 1.0),
        vec4(0.01, 0.01, 0.01, 1.0),
        vec4(0.01, -0.01, 0.01, 1.0),
        vec4(-0.01, -0.01, -0.01, 1.0),
        vec4(-0.01, 0.01, -0.01, 1.0),
        vec4(0.01, 0.01, -0.01, 1.0),
        vec4(0.01, -0.01, -0.01, 1.0)
    ];
    quad(lightVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(lightVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(lightVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(lightVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(lightVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(lightVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPush(texCoordsArray);
    }
}

function drawHmbb(points, normals, texCoordsArray) {
    drawBody(points, normals, texCoordsArray); // 身体
    drawCloth(points, normals, texCoordsArray); // 衣服
    drawPants(points, normals, texCoordsArray); // 裤子
    drawLeftLeg(points, normals, texCoordsArray); // 左腿
    drawRightLeg(points, normals, texCoordsArray); // 右腿
    drawLeftShoe(points, normals, texCoordsArray); // 左腿
    drawRightShoe(points, normals, texCoordsArray); // 右腿
    drawLeftArm(points, normals, texCoordsArray); // 左手臂
    drawRightArm(points, normals, texCoordsArray); // 右手臂
}

function drawHmbbYellow(points, normals, texCoordsArray) {
    drawBody(points, normals, texCoordsArray); // 身体
    drawCloth(points, normals, texCoordsArray); // 衣服
    drawPants(points, normals, texCoordsArray); // 裤子
}

// 绘制身体
function drawBody(pointArray, normalArray, texCoordsArray) {
    // 身体的八个顶点(x,y,z,a)
    var bodyVertices = [
        vec4(-body[0] / 2, -body[1] / 3, body[2] / 2, 1.0),
        vec4(-body[0] / 2, body[1] * 2 / 3, body[2] / 2, 1.0),
        vec4(body[0] / 2, body[1] * 2 / 3, body[2] / 2, 1.0),
        vec4(body[0] / 2, -body[1] / 3, body[2] / 2, 1.0),
        vec4(-body[0] / 2, -body[1] / 3, -body[2] / 2, 1.0),
        vec4(-body[0] / 2, body[1] * 2 / 3, -body[2] / 2, 1.0),
        vec4(body[0] / 2, body[1] * 2 / 3, -body[2] / 2, 1.0),
        vec4(body[0] / 2, -body[1] / 3, -body[2] / 2, 1.0)
    ];
    quad(bodyVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(bodyVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(bodyVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(bodyVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(bodyVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(bodyVertices, 5, 4, 0, 1, pointArray, normalArray);
    var texCoordface = [
        vec2(0.25, 0.234),
        vec2(0.25, 0.65),
        vec2(0.8, 0.65),
        vec2(0.8, 0.234)
    ];
    texCoordsArray.push(texCoordface[2]);
    texCoordsArray.push(texCoordface[3]);
    texCoordsArray.push(texCoordface[0]);
    texCoordsArray.push(texCoordface[2]);
    texCoordsArray.push(texCoordface[0]);
    texCoordsArray.push(texCoordface[1]);
    for (var i = 0; i < 5; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 绘制衣服
function drawCloth(pointArray, normalArray, texCoordsArray) {
    // 衣服的八个顶点(x,y,z,a)
    var clothVertices = [
        vec4(-cloth[0] / 2, -body[1] / 3 - cloth[1], cloth[2] / 2, 1.0),
        vec4(-cloth[0] / 2, -body[1] / 3, cloth[2] / 2, 1.0),
        vec4(cloth[0] / 2, -body[1] / 3, cloth[2] / 2, 1.0),
        vec4(cloth[0] / 2, -body[1] / 3 - cloth[1], cloth[2] / 2, 1.0),
        vec4(-cloth[0] / 2, -body[1] / 3 - cloth[1], -cloth[2] / 2, 1.0),
        vec4(-cloth[0] / 2, -body[1] / 3, -cloth[2] / 2, 1.0),
        vec4(cloth[0] / 2, -body[1] / 3, -cloth[2] / 2, 1.0),
        vec4(cloth[0] / 2, -body[1] / 3 - cloth[1], -cloth[2] / 2, 1.0)
    ];
    quad(clothVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(clothVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(clothVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(clothVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(clothVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(clothVertices, 5, 4, 0, 1, pointArray, normalArray);
    var texCoordface = [
        vec2(0.25, 0.1),
        vec2(0.25, 0.234),
        vec2(0.8, 0.234),
        vec2(0.8, 0.1),
    ];
    texCoordsArray.push(texCoordface[2]);
    texCoordsArray.push(texCoordface[3]);
    texCoordsArray.push(texCoordface[0]);
    texCoordsArray.push(texCoordface[2]);
    texCoordsArray.push(texCoordface[0]);
    texCoordsArray.push(texCoordface[1]);
    for (var i = 0; i < 5; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 绘制裤子
function drawPants(pointArray, normalArray, texCoordsArray) {
    // 裤子的八个顶点(x,y,z,a)
    var pantsVertices = [
        vec4(-pants[0] / 2, -body[1] / 3 - cloth[1] - pants[1], pants[2] / 2, 1.0),
        vec4(-pants[0] / 2, -body[1] / 3 - cloth[1], pants[2] / 2, 1.0),
        vec4(pants[0] / 2, -body[1] / 3 - cloth[1], pants[2] / 2, 1.0),
        vec4(pants[0] / 2, -body[1] / 3 - cloth[1] - pants[1], pants[2] / 2, 1.0),
        vec4(-pants[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -pants[2] / 2, 1.0),
        vec4(-pants[0] / 2, -body[1] / 3 - cloth[1], -pants[2] / 2, 1.0),
        vec4(pants[0] / 2, -body[1] / 3 - cloth[1], -pants[2] / 2, 1.0),
        vec4(pants[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -pants[2] / 2, 1.0)
    ];
    quad(pantsVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(pantsVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(pantsVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(pantsVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(pantsVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(pantsVertices, 5, 4, 0, 1, pointArray, normalArray);
    var texCoordface = [
        vec2(0.25, 0),
        vec2(0.25, 0.1),
        vec2(0.8, 0.1),
        vec2(0.8, 0),
    ];
    texCoordsArray.push(texCoordface[2]);
    texCoordsArray.push(texCoordface[3]);
    texCoordsArray.push(texCoordface[0]);
    texCoordsArray.push(texCoordface[2]);
    texCoordsArray.push(texCoordface[0]);
    texCoordsArray.push(texCoordface[1]);
    for (var i = 0; i < 5; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 绘制左腿
function drawLeftLeg(pointArray, normalArray, texCoordsArray) {
    // 左腿的八个顶点(x,y,z,a)
    var leftLegVertices = [
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -leg[2] / 2, 1.0)
    ];
    quad(leftLegVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(leftLegVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(leftLegVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(leftLegVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(leftLegVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(leftLegVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 绘制右腿
function drawRightLeg(pointArray, normalArray, texCoordsArray) {
    // 右腿的八个顶点(x,y,z,a)
    var rightLegVertices = [
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], leg[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], leg[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -leg[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -leg[2] / 2, 1.0)
    ];
    quad(rightLegVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(rightLegVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(rightLegVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(rightLegVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(rightLegVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(rightLegVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 绘制左腿鞋子
function drawLeftShoe(pointArray, normalArray, texCoordsArray) {
    // 左腿鞋子的八个顶点(x,y,z,a)
    var leftShoeVertices = [
        vec4(-pants[0] / 4 - shoe[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 - shoe[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], -shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], -shoe[2] / 2, 1.0)
    ];
    quad(leftShoeVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(leftShoeVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(leftShoeVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(leftShoeVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(leftShoeVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(leftShoeVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 绘制右腿鞋子
function drawRightShoe(pointArray, normalArray, texCoordsArray) {
    // 右腿鞋子的八个顶点(x,y,z,a)
    var rightShoeVertices = [
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 + shoe[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 + shoe[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], -shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], -shoe[2] / 2, 1.0)
    ];
    quad(rightShoeVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(rightShoeVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(rightShoeVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(rightShoeVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(rightShoeVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(rightShoeVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}
// 画左手臂
function drawLeftArm2(pointArray, normalArray, texCoordsArray) {
    // 左手臂的八个顶点(x,y,z,a)
    var leftArmVertices = [
        vec4(-0.2, 0.0, 0.025, 1.0),
        vec4(-0.2, 0.0, -0.025, 1.0),
        vec4(-0.2, -0.05, -0.025, 1.0),
        vec4(-0.2, 0.05, 0.025, 1.0),

        vec4(-0.3, 0, 0.9, 1.0),
        vec4(-0.3, 0.1, 0.9, 1.0),
        vec4(-0.25, 0.1, 0.9, 1.0),
        vec4(-0.25, 0, 0.9, 1.0)
    ];
    quad(leftArmVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(leftArmVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(leftArmVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(leftArmVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(leftArmVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(leftArmVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 画右手臂
function drawRightArm2(pointArray, normalArray, texCoordsArray) {
    // 右手臂的八个顶点(x,y,z,a)
    var rightArmVertices = [
        vec4(0.2, 0.0, 0.025, 1.0),
        vec4(0.2, 0.0, -0.025, 1.0),
        vec4(0.2, -0.05, -0.025, 1.0),
        vec4(0.2, 0.05, 0.025, 1.0),

        vec4(0.3, 0, 0.9, 1.0),
        vec4(0.3, 0.1, 0.9, 1.0),
        vec4(0.25, 0.1, 0.9, 1.0),
        vec4(0.25, 0, 0.9, 1.0)
    ];
    quad(rightArmVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(rightArmVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(rightArmVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(rightArmVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(rightArmVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(rightArmVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 画左手臂
function drawLeftArm(pointArray, normalArray, texCoordsArray) {
    // 左手臂的八个顶点(x,y,z,a)
    var leftArmVertices = [
        vec4(-0.3, -0.3, -0.025, 1.0),
        vec4(-0.2, 0.0, -0.025, 1.0),
        vec4(-0.2, 0.0, 0.025, 1.0),
        vec4(-0.3, -0.3, 0.025, 1.0),
        vec4(-0.25, -0.3, -0.025, 1.0),
        vec4(-0.2, -0.05, -0.025, 1.0),
        vec4(-0.2, 0.05, 0.025, 1.0),
        vec4(-0.25, -0.3, 0.025, 1.0)
    ];
    quad(leftArmVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(leftArmVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(leftArmVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(leftArmVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(leftArmVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(leftArmVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}

// 画右手臂
function drawRightArm(pointArray, normalArray, texCoordsArray) {
    // 右手臂的八个顶点(x,y,z,a)
    var rightArmVertices = [
        vec4(0.3, -0.3, 0.025, 1.0),
        vec4(0.2, 0.0, 0.025, 1.0),
        vec4(0.2, 0.0, -0.025, 1.0),
        vec4(0.3, -0.3, -0.025, 1.0),
        vec4(0.25, -0.3, 0.025, 1.0),
        vec4(0.2, 0.05, 0.025, 1.0),
        vec4(0.2, -0.05, -0.025, 1.0),
        vec4(0.25, -0.3, -0.025, 1.0)
    ];
    quad(rightArmVertices, 1, 0, 3, 2, pointArray, normalArray);
    quad(rightArmVertices, 2, 3, 7, 6, pointArray, normalArray);
    quad(rightArmVertices, 3, 0, 4, 7, pointArray, normalArray);
    quad(rightArmVertices, 6, 5, 1, 2, pointArray, normalArray);
    quad(rightArmVertices, 4, 5, 6, 7, pointArray, normalArray);
    quad(rightArmVertices, 5, 4, 0, 1, pointArray, normalArray);
    for (var i = 0; i < 6; i++) {
        quadPushTCNULL(texCoordsArray);
    }
}




// 画圆（边缘）
// 半径r 面数m 度数c 偏移量offset
function getCircleLineVertex(x, y, z, r, m, c, offset) {
    var arr = [];
    var addAng = c / m;
    var angle = 0;
    for (var i = 0; i < m; i++) {
        arr.push(vec4(x + Math.sin(Math.PI / 180 * (angle + offset)) * r, y + Math.cos(Math.PI / 180 * (angle + offset)) * r, z, 1.0));
        angle = angle + addAng;
        arr.push(vec4(x + Math.sin(Math.PI / 180 * (angle + offset)) * r, y + Math.cos(Math.PI / 180 * (angle + offset)) * r, z, 1.0));
    }
    return arr;
}

// 画圆
// 半径r 面数m 度数c 偏移量offset
function getCircleVertex(x, y, z, r, m, c, offset) {
    var arr = [];
    var addAng = c / m;
    var angle = 0;
    for (var i = 0; i < m; i++) {
        arr.push(vec4(x + Math.sin(Math.PI / 180 * (angle + offset)) * r, y + Math.cos(Math.PI / 180 * (angle + offset)) * r, z, 1.0));
        arr.push(vec4(x, y, z, 1.0));
        angle = angle + addAng;
        arr.push(vec4(x + Math.sin(Math.PI / 180 * (angle + offset)) * r, y + Math.cos(Math.PI / 180 * (angle + offset)) * r, z, 1.0));
    }
    return arr;
}


function initBody() {
    // 创建缓冲区，并向缓冲区写入立方体每个面的法向量信息11111111111111111111111111111左手臂
    nBuffer_1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer_1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals_1), gl.STATIC_DRAW);
    // 获取着色器中vNormal变量，并向其传递数据
    vNormal_1 = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal_1, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal_1);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer_1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer_1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points_1), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition_1 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition_1, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition_1);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer_1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer_1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray_1), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord_1 = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord_1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord_1);

    // 创建缓冲区，并向缓冲区写入立方体每个面的法向量信息11111111111111111111111111111右手臂
    nBuffer_2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer_2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals_2), gl.STATIC_DRAW);
    // 获取着色器中vNormal变量，并向其传递数据
    vNormal_2 = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal_2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal_2);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer_2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer_2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points_2), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition_2 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition_2, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition_2);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer_2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer_2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray_2), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord_2 = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord_2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord_2);

    // 创建缓冲区，并向缓冲区写入立方体每个面的法向量信息11111111111111111111111111111左脚
    nBuffer_3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer_3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals_3), gl.STATIC_DRAW);
    // 获取着色器中vNormal变量，并向其传递数据
    vNormal_3 = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal_3, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal_3);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer_3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer_3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points_3), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition_3 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition_3, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition_3);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer_3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer_3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray_3), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord_3 = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord_3, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord_3);

    // 创建缓冲区，并向缓冲区写入立方体每个面的法向量信息11111111111111111111111111111右脚
    nBuffer_4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer_4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals_4), gl.STATIC_DRAW);
    // 获取着色器中vNormal变量，并向其传递数据
    vNormal_4 = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal_4, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal_4);
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer_4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer_4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points_4), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition_4 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition_4, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition_4);
    // 创建缓冲区，并向缓冲区写入纹理的顶点信息
    tBuffer_4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer_4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray_4), gl.STATIC_DRAW);
    //获取着色器中vTexCoord变量，并向其传递数据
    vTexCoord_4 = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord_4, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord_4);

}

function bodyMove() {
    // 左手臂变换
    var init = translate(-0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);
    var Rx_1 = rotateX(CubeRotateAngleX_1);
    var Rz_1 = rotateZ(CubeRotateAngleZ_1);

    modelViewMatrix = mult(mult(mult(init, T), mult(Rz_1, mult(Rx_1, R))), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    // 顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer_1);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    // 设置材质
    // 左侧人左手
    materialAmbient = vec4(0.5, 0.0, 0.5, 1.0); // rgb(127,0,127,1)
    materialDiffuse = vec4(0.5, 0.0, 0.5, 1.0);
    materialSpecular = vec4(0.5, 0.0, 0.5, 1.0);
    materialShininess = 1.0;
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "lightPosition"), flatten(lightPosition));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer_1);
    gl.vertexAttribPointer(vTexCoord_1, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 0, 36);


    // 右手臂变换
    var init = translate(-0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);
    var Rx_2 = rotateX(CubeRotateAngleX_2);
    var Rz_2 = rotateZ(CubeRotateAngleZ_2);

    modelViewMatrix = mult(mult(mult(init, T), mult(Rz_2, mult(Rx_2, R))), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    // 顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer_2);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    // 设置材质
    // 左侧人右胳膊
    materialAmbient = vec4(0.5, 0.0, 0.5, 1.0); // rgb(127,0,127,1)
    materialDiffuse = vec4(0.5, 0.0, 0.5, 1.0);
    materialSpecular = vec4(0.5, 0.0, 0.5, 1.0);
    materialShininess = 1.0;
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "lightPosition"), flatten(lightPosition));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer_2);
    gl.vertexAttribPointer(vTexCoord_2, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 0, 36);

    // 左腿变换
    var init = translate(-0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);
    var Rx_3 = rotateX(CubeRotateAngleX_3);
    var Rz_3 = rotateZ(CubeRotateAngleZ_3);

    modelViewMatrix = mult(mult(mult(init, T), mult(Rz_3, mult(Rx_3, R))), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    // 顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer_3);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    // 设置材质
    // 左侧人左腿
    materialAmbient = vec4(0.05375, 0.05, 0.06625, 0.82); // rgb(0,0,76)
    materialDiffuse = vec4(0.18275, 0.17, 0.22525, 0.82);
    materialSpecular = vec4(0.332741, 0.328634, 0.346435, 0.82);
    materialShininess = 10.0;
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "lightPosition"), flatten(lightPosition));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer_3);
    gl.vertexAttribPointer(vTexCoord_3, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 0, 36 * 2);

    // 右腿变换
    var init = translate(-0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);
    var Rx_4 = rotateX(CubeRotateAngleX_4);
    var Rz_4 = rotateZ(CubeRotateAngleZ_4);

    modelViewMatrix = mult(mult(mult(init, T), mult(Rz_4, mult(Rx_4, R))), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    normalMatrix = modelViewMatrix;
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix));

    // 顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer_4);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    // 设置材质
    // 左侧人右腿
    materialAmbient = vec4(0.05375, 0.05, 0.06625, 0.82); // rgb(0,0,76)
    materialDiffuse = vec4(0.18275, 0.17, 0.22525, 0.82);
    materialSpecular = vec4(0.332741, 0.328634, 0.346435, 0.82);
    materialShininess = 10.0;
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program,
        "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "specularProduct"), flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program,
        "lightPosition"), flatten(lightPosition));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer_4);
    gl.vertexAttribPointer(vTexCoord_4, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.enableVertexAttribArray(vTexCoord);
    gl.drawArrays(gl.TRIANGLES, 0, 36 * 2);
}

function initEventHandlers(canvas, currentAngle) {
    var dragging = false; // 是否在拖动
    var lastX = -1,
        lastY = -1; // 鼠标的最后位置

    // 按下鼠标
    canvas.onmousedown = function (ev) {
        if (ev.button == 0) { // 按下的是鼠标左键
            var x = ev.clientX,
                y = ev.clientY;
            // 如果鼠标在<canvas>内就开始拖动
            var rect = ev.target.getBoundingClientRect();
            if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
                lastX = x;
                lastY = y;
                dragging = true;
            }
        }
    };

    // 松开鼠标
    canvas.onmouseup = function (ev) {
        if (ev.button == 0) { // 松开的是鼠标左键
            dragging = false;
        }
    };

    // 移动鼠标
    canvas.onmousemove = function (ev) {
        var x = ev.clientX,
            y = ev.clientY;
        if (dragging) {
            currentAngle = [0.0, 0.0];
            var factor = 50 / canvas.height; //旋转因子
            var dx = factor * (x - lastX);
            var dy = factor * (y - lastY);
            // 将沿Y轴旋转的角度控制在-90到90度之间
            currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
            currentAngle[1] = currentAngle[1] + dx;

            var temp = vec4(lookx, looky, lookz, 1);
            temp = multMat4Vec4(rotateX(currentAngle[0]), temp);
            temp = multMat4Vec4(rotateY(currentAngle[1]), temp);
            lookx = temp[0];
            looky = temp[1];
            lookz = temp[2];
            viewMatrix = lookAt(vec3(lookx, looky, lookz), vec3(0, 0, 0), vec3(0, 1, 0));
            gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
        }
        lastX = x;
        lastY = y;
    };

    // 鼠标滚轮事件
    canvas.onmousewheel = function (ev) {
        var delta = ev.wheelDelta / 120;
        lookz = lookz + delta / 5;
        viewMatrix = lookAt(vec3(lookx, looky, lookz), vec3(0, 0, 0), vec3(0, 1, 0));
        gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
        return false; // 禁用窗口的滚轮事件
    }

}