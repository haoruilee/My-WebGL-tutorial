var canvas;
var gl;

var ispause = true; //是否开始旋转
var then = 0; //计算旋转时间差

var ms = 180; // 画圆的面数
var projection;
var lightx = 0.2;
var lighty = 0.2;
var lightz = 0;
var lightPosition = vec4(lightx, lighty, lightz, 0.0);

//颜色材质表：http://learnwebgl.brown37.net/10_surface_properties/surface_properties_color.html

var lightAmbient = vec4(0.3, 0.3, 0.3, 1.0); //全局的光
var lightDiffuse = vec4(0.5, 0.8, 0.4, 1.0); //漫反射
var lightSpecular = vec4(0.8, 0.9, 1.0, 1.0); //镜面反射

var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
var materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);

var materialAmbient2 = vec4(0.1, 0.18725, 0.1745, 0.8);
var materialDiffuse2 = vec4(0.396, 0.74151, 0.69102, 0.8);
var materialSpecular2 = vec4(0.297254, 0.30829, 0.306678, 0.8);

var materialShininess = 20.0;
var materialShininess2 = 50.0;

// 苦力怕
var points = []; // 顶点容器
var colors = []; // 颜色容器
var vColor, vPosition;
var cBuffer, vBuffer; 
var numVertices = 36 * 9 + ms * 3 * 2 * 3 + 12; //  顶点个数
var modelViewMatrix = mat4(); // 当前变换矩阵
var modelViewMatrixLoc; // shader变量
var CubeTx = 0,
    CubeTy = 0,
    CubeTz = 0; // 平移量
var CubeRotateAngle = 0; // 旋转角度
var CubeRotateAnglex = 0; // 旋转角度x
var CubeRotateAnglez = 0; // 旋转角度z
var scalePercent = 0.5; // 缩放比例
var direct = vec4(0.0, 0.0, 1.0, 1.0); // 当前正面方向
var world = 0;

// 村民 
var points2 = []; // 顶点容器
var colors2 = []; // 颜色容器
var vColor2, vPosition2;
var cBuffer2, vBuffer2; // 村民的buffer
var numVertices2 = 36 * 9 + ms * 3 * 2 * 3 + 12; // 村民顶点个数
var CubeTx2 = 0,
    CubeTy2 = 0,
    CubeTz2 = 0; // 村民平移量
var CubeTTx2 = 0,
    CubeTTy2 = 0,
    CubeTTz2 = 0; //平移量

var CubeRotateAngle2 = 0; // 村民旋转角度
var CubeRotateAngle2x = 0; // 旋转角度x
var CubeRotateAngle2z = 0; // 旋转角度z
var CubeRotateAngle2_Y = 0;
var CubeRotateAngle2_X = 0;
var CubeRotateAngle2_Z = 0;
var scalePercent2 = 0.5; // 缩放比例
var direct2 = vec4(0.0, 0.0, 1.0, 1.0); // 当前正面方向

var viewMatrixLoc; // 视图矩阵的存储地址
var viewMatrix; // 当前视图矩阵
var viewIndex = 0; // 视图编号

var body = vec3(0.4, 0.45, 0.2);
var cloth = vec3(0.4, 0.05, 0.2);
var pants = vec3(0.4, 0.1, 0.2);
var leg = vec3(0.18, 0.25, 0.05);
var shoe = vec3(0.18, 0.05, 0.05);
var leg2 = vec3(0.12, 0.55, 0.05);
var shoe2 = vec3(0.12, 0.05, 0.05);

var eye = vec3(0.0, 0.0, 0.0);
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var radius = 4.0;
var theta = 0.0;
var phi = 0.0;
var dr = 5.0 * Math.PI / 180.0;

var dragging = false;


// 所有的备选颜色
var chooseColors = [
    vec4(0.27, 0.96, 0.30, 1.0), // 绿色 rgb(69,245,77)
    vec4(1.0, 1.0, 1.0, 1.0), // 白色
    vec4(0.51, 0.33, 0.24, 1.0), // 褐色
    vec4(0.0, 0.0, 0.0, 1.0), // 黑色
    vec4(200 / 255, 200 / 255, 146 / 255, 1.0) // 村民肤色
];

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas, null);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(30.0 / 255.0, 20.0 / 255.0, 77.0 / 255.0, 1.0); // 紫色背景色
    //gl.clearColor(1, 1, 1, 1.0); // 紫色背景色

    setPoints(); // 设置所有顶点位置及颜色
    gl.enable(gl.DEPTH_TEST); // 消除隐藏面

    // 初始化着色器
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // 获取viewMatrix变量的存储地址
    viewMatrixLoc = gl.getUniformLocation(program, 'viewMatrix');
    // 设置视点、视线和上方向
    viewMatrix = lookAt(vec3(0, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0));
    // 将视图矩阵传递给viewMatrix变量
    gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));

    // 创建缓冲区，并向缓冲区写入立方体每个面的颜色信息
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    //获取着色器中vColor变量，并向其传递数据
    vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);

    cBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors2), gl.STATIC_DRAW);
    //获取着色器中vColor变量，并向其传递数据
    vColor2 = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor2);

    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);

    vBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points2), gl.STATIC_DRAW);
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition2 = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition2);

    modelViewMatrixLoc = gl.getUniformLocation(program, 'modelViewMatrix');

    //event listeners for buttons
    document.getElementById("adjustView").onclick = function () {
        if (viewIndex === 0) {
            viewIndex = 1;
            // 设置视点、视线和上方向
            viewMatrix = lookAt(vec3(0.10, 0.15, 0.15), vec3(0, 0, 0), vec3(0, 1, 0));
            // 将视图矩阵传递给viewMatrix变量
            gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
        } else if (viewIndex === 1) {
            viewIndex = 0;
            // 设置视点、视线和上方向
            viewMatrix = lookAt(vec3(0, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0));
            // 将视图矩阵传递给viewMatrix变量
            gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
        }
    };
    //  
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
    document.getElementById("cubeRx1").onclick = function () {
        CubeRotateAnglex -= 10;
    };
    document.getElementById("cubeRx2").onclick = function () {
        CubeRotateAnglex += 10;
    };
    document.getElementById("cubeRz1").onclick = function () {
        CubeRotateAnglez -= 10;
    };
    document.getElementById("cubeRz2").onclick = function () {
        CubeRotateAnglez += 10;
    };
    document.getElementById("small").onclick = function () {
        scalePercent -= 0.05;
    };
    document.getElementById("big").onclick = function () {
        scalePercent += 0.05;
    };

    // 村民 

    document.getElementById("cubeR12").onclick = function () {
        CubeRotateAngle2 -= 5;
        world = 0;
    };
    document.getElementById("cubeR22").onclick = function () {
        CubeRotateAngle2 += 5;
        world = 0;
    };
    document.getElementById("cubeRx12").onclick = function () {
        CubeRotateAngle2x -= 10;
        world = 0;
    };
    document.getElementById("cubeRx22").onclick = function () {
        CubeRotateAngle2x += 10;
        world = 0;
    };
    document.getElementById("cubeRz12").onclick = function () {
        CubeRotateAngle2z -= 10;
        world = 0;
    };
    document.getElementById("cubeRz22").onclick = function () {
        CubeRotateAngle2z += 10;
        world = 0;
    };
    document.getElementById("small2").onclick = function () {
        scalePercent2 -= 0.05;
    };
    document.getElementById("big2").onclick = function () {
        scalePercent2 += 0.05;
    };
    document.getElementById("left").onclick = function () {
        CubeTTx2 -= 0.1 * direct2[2];
        world = 1;
    };
    document.getElementById("right").onclick = function () {
        CubeTTx2 += 0.1 * direct2[2];
        world = 1;
    };
    document.getElementById("up").onclick = function () {

        CubeTTy2 += 0.1 * direct2[2];
        world = 1;
    };
    document.getElementById("down").onclick = function () {

        CubeTTy2 -= 0.1 * direct2[2];
        world = 1;
    };
    document.getElementById("rotate_X").onclick = function () {
        CubeRotateAngle2_X += 5;
        world = 1;
    };
    document.getElementById("rotate_Y").onclick = function () {
        CubeRotateAngle2_Y += 5;
        world = 1;
    };
    document.getElementById("rotate_Z").onclick = function () {
        CubeRotateAngle2_Z += 5;
        world = 1;
    }
    document.getElementById("startrot").onclick = function () {
        if(ispause) {
        ispause=false;
        console.log("ispause：",ispause)
        }
        else if(!ispause) {
        ispause=true;
        console.log("ispause：",ispause)
        }
    }
    document.getElementById("changelight1").onclick = function () {

        lightx += 0.05;
        //lighty += 0.05;
        lightPosition = vec4(lightx, lighty, lightz, 0.0);
        var vNormal = gl.getAttribLocation(program, "vNormal");
        gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormal);
        var ambientProduct = mult(lightAmbient, materialAmbient2);
        var diffuseProduct = mult(lightDiffuse, materialDiffuse2);
        var specularProduct = mult(lightSpecular, materialSpecular2);
        projection = ortho(-1, 1, -1, 1, -100, 100);


        gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
            flatten(ambientProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
            flatten(diffuseProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
            flatten(specularProduct));
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
            flatten(lightPosition));

        gl.uniform1f(gl.getUniformLocation(program,
            "shininess"), materialShininess2);

        gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"),
            false, flatten(projection));
        //render();


    };
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    projection = ortho(-1, 1, -1, 1, -100, 100);


    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
        flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
        flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
        flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
        flatten(lightPosition));

    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);

    gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"),
        false, flatten(projection));

    /**页面加载调用 requestAnimationFrame 时会传入时间。

我觉得如果时间的单位是秒会简单一些，由于 requestAnimationFrame 传递给我们的时间是毫秒 （千分之一秒），我们需要将它乘以 0.001 得到秒。 */
    requestAnimationFrame(render);


    // 添加鼠标事件监听
    initEventHandles(canvas);

    // 滑轮缩放处理
    canvas.addEventListener('wheel', onMouseWheel, false);

}

function render(now) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //console.log("now：",now)
    // 转换时间为秒
    now *= 0.001;
    // 减去上一次的时间得到时间差
    var deltaTime = now - then;
    //console.log("deltaTime：",deltaTime)
    // 记住这次时间
    then = now;
    //如果不ispause则一直转
    /** */
    if(!ispause) {
    CubeRotateAngle = 90 * now;
    console.log("CubeRotateAngle：", CubeRotateAngle);
    }
    //  变换
    var init = translate(-0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);
    var Rx = rotateX(CubeRotateAnglex);
    var Rz = rotateZ(CubeRotateAnglez);

    modelViewMatrix = mult(mult(mult(mult(mult(init, T), R), Rx), Rz), S);
    var m = mult(mult(mult(mult(T, R), Rx), Rz), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //  颜色
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    //  顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);


    // 村民 变换
    init = translate(0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    S = scalem(scalePercent2, scalePercent2, scalePercent2);
    T = translate(CubeTx2, CubeTy2, CubeTz2);
    TT = translate(CubeTTx2, CubeTTy2, CubeTTz2)
    R = rotateY(CubeRotateAngle2);
    Rx = rotateX(CubeRotateAngle2x);
    Rz = rotateZ(CubeRotateAngle2z);
    R_X = rotate(CubeRotateAngle2_X, 1, 0, 0);
    R_Y = rotate(CubeRotateAngle2_Y, 0, 1, 0);
    R_Z = rotate(CubeRotateAngle2_Z, 0, 0, 1);


    modelViewMatrix = mult(R_Z, mult(R_X, mult(R_Y, mult(TT, mult(mult(mult(mult(mult(init, T), R), Rx), Rz), S)))));
    m = mult(R_Z, mult(R_X, mult(R_Y, mult(TT, mult(mult(mult(mult(T, R), Rx), Rz), S)))));



    // 记录正面的方向
    direct2 = vec4(0.0, 0.0, 1.0, 1.0); // 初始化初始方向
    direct2 = multMat4Vec4(m, direct2);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    // 村民 颜色
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    //  顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices2);

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


// 添加鼠标事件监听处理
function initEventHandles(domElement) {


    var lastX = -1;
    var lastY = -1;

    // 添加事件监听的dom元素
    domElement = (domElement !== undefined) ? domElement : document;


    // 鼠标按下事件
    domElement.onmousedown = function (event) {

        event.preventDefault();

        // 鼠标点击位置
        var x = event.clientX;
        var y = event.clientY;

        lastX = x;
        lastY = y;

        dragging = true;

    }

    domElement.onmouseleave = function (event) {

        event.preventDefault();
        dragging = false;

    }

    // 鼠标抬起事件
    domElement.onmouseup = function (event) {

        event.preventDefault();
        dragging = false;

    }

    // 鼠标移动事件
    domElement.onmousemove = function (event) {

        event.preventDefault();

        var x = event.clientX,
            y = event.clientY;
        if (dragging) {
            phi = phi - (x - lastX) * 30 * dr * (-0.001);
            theta = theta + (y - lastY) * 30 * dr * (-0.001);
            if (theta < 30 * dr) {
                theta = 30 * dr;
            } else if (theta > 150 * dr) {
                theta = 150 * dr;
            }
            at = vec3(eye[0] + radius * Math.sin(theta) * Math.cos(phi), eye[1] + radius * Math.cos(theta),
                eye[2] + radius * Math.sin(theta) * Math.sin(phi));

            viewMatrix = lookAt(eye, at, vec3(0, 1, 0));
            gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
        }

        lastX = x;
        lastY = y;
    }

}


function onMouseWheel(event) {

    scalePercent += 0.05 * Math.sign(event.deltaY)
    scalePercent2 += 0.05 * Math.sign(event.deltaY)

}


function setPoints() {
    // 画 
    drawMouse(points, colors, 0, 0.0, 0.24, 0.1019, 0.102);

    drawBody(0, 1, 2, 3, 0, points, colors); // 身体的第一个面，黄色
    drawBody(0, 3, 7, 4, 0, points, colors); // 身体的第二个面，黄色
    drawBody(4, 5, 6, 7, 0, points, colors); // 身体的第三个面，黄色
    drawBody(1, 5, 6, 2, 0, points, colors); // 身体的第四个面，黄色
    drawBody(0, 4, 5, 1, 0, points, colors); // 身体的第五个面，黄色
    drawBody(3, 7, 6, 2, 0, points, colors); // 身体的第六个面，黄色

    drawCloth(0, 1, 2, 3, 1, points, colors); // 衣服的第一个面，白色
    drawCloth(0, 3, 7, 4, 1, points, colors); // 衣服的第二个面，白色
    drawCloth(4, 5, 6, 7, 1, points, colors); // 衣服的第三个面，白色
    drawCloth(1, 5, 6, 2, 1, points, colors); // 衣服的第四个面，白色
    drawCloth(0, 4, 5, 1, 1, points, colors); // 衣服的第五个面，白色
    drawCloth(3, 7, 6, 2, 1, points, colors); // 衣服的第六个面，白色

    drawPants(0, 1, 2, 3, 2, points, colors); // 裤子的第一个面，褐色
    drawPants(0, 3, 7, 4, 2, points, colors); // 裤子的第二个面，褐色
    drawPants(4, 5, 6, 7, 2, points, colors); // 裤子的第三个面，褐色
    drawPants(1, 5, 6, 2, 2, points, colors); // 裤子的第四个面，褐色
    drawPants(0, 4, 5, 1, 2, points, colors); // 裤子的第五个面，褐色
    drawPants(3, 7, 6, 2, 2, points, colors); // 裤子的第六个面，褐色

    drawLeftLeg2(0, 1, 2, 3, 0, points, colors); // 左腿的第一个面，白色
    drawLeftLeg2(0, 3, 7, 4, 0, points, colors); // 左腿的第二个面，白色
    drawLeftLeg2(4, 5, 6, 7, 0, points, colors); // 左腿的第三个面，白色
    drawLeftLeg2(1, 5, 6, 2, 0, points, colors); // 左腿的第四个面，白色
    drawLeftLeg2(0, 4, 5, 1, 0, points, colors); // 左腿的第五个面，白色
    drawLeftLeg2(3, 7, 6, 2, 0, points, colors); // 左腿的第六个面，白色

    drawRightLeg2(0, 1, 2, 3, 0, points, colors); // 右腿的第一个面，白色
    drawRightLeg2(0, 3, 7, 4, 0, points, colors); // 右腿的第二个面，白色
    drawRightLeg2(4, 5, 6, 7, 0, points, colors); // 右腿的第三个面，白色
    drawRightLeg2(1, 5, 6, 2, 0, points, colors); // 右腿的第四个面，白色
    drawRightLeg2(0, 4, 5, 1, 0, points, colors); // 右腿的第五个面，白色
    drawRightLeg2(3, 7, 6, 2, 0, points, colors); // 右腿的第六个面，白色

    drawLeftShoe2(0, 1, 2, 3, 3, points, colors); // 左腿鞋子的第一个面，黑色
    drawLeftShoe2(0, 3, 7, 4, 3, points, colors); // 左腿鞋子的第二个面，黑色
    drawLeftShoe2(4, 5, 6, 7, 3, points, colors); // 左腿鞋子的第三个面，黑色
    drawLeftShoe2(1, 5, 6, 2, 3, points, colors); // 左腿鞋子的第四个面，黑色
    drawLeftShoe2(0, 4, 5, 1, 3, points, colors); // 左腿鞋子的第五个面，黑色
    drawLeftShoe2(3, 7, 6, 2, 3, points, colors); // 左腿鞋子的第六个面，黑色

    drawRightShoe2(0, 1, 2, 3, 3, points, colors); // 右腿鞋子的第一个面，黑色
    drawRightShoe2(0, 3, 7, 4, 3, points, colors); // 右腿鞋子的第二个面，黑色
    drawRightShoe2(4, 5, 6, 7, 3, points, colors); // 右腿鞋子的第三个面，黑色
    drawRightShoe2(1, 5, 6, 2, 3, points, colors); // 右腿鞋子的第四个面，黑色
    drawRightShoe2(0, 4, 5, 1, 3, points, colors); // 右腿鞋子的第五个面，黑色
    drawRightShoe2(3, 7, 6, 2, 3, points, colors); // 右腿鞋子的第六个面，黑色

    drawLeftArm2(0, 1, 2, 3, 0, points, colors); // 左手臂的第一个面，黄色
    drawLeftArm2(0, 3, 7, 4, 0, points, colors); // 左手臂的第二个面，黄色
    drawLeftArm2(4, 5, 6, 7, 0, points, colors); // 左手臂的第三个面，黄色
    drawLeftArm2(1, 5, 6, 2, 0, points, colors); // 左手臂的第四个面，黄色
    drawLeftArm2(0, 4, 5, 1, 0, points, colors); // 左手臂的第五个面，黄色
    drawLeftArm2(3, 7, 6, 2, 0, points, colors); // 左手臂的第六个面，黄色

    drawRightArm2(0, 1, 2, 3, 0, points, colors); // 右手臂的第一个面，黄色
    drawRightArm2(0, 3, 7, 4, 0, points, colors); // 右手臂的第二个面，黄色
    drawRightArm2(4, 5, 6, 7, 0, points, colors); // 右手臂的第三个面，黄色
    drawRightArm2(1, 5, 6, 2, 0, points, colors); // 右手臂的第四个面，黄色
    drawRightArm2(0, 4, 5, 1, 0, points, colors); // 右手臂的第五个面，黄色
    drawRightArm2(3, 7, 6, 2, 0, points, colors); // 右手臂的第六个面，黄色

    drawLeftEye(points, colors);
    drawRightEye(points, colors);
    drawTeeth(points, colors);

    // 画村民 
    drawMouse(points2, colors2, 2, 0.0, 0.24, 0.1019, 0.102);

    drawBody(0, 1, 2, 3, 4, points2, colors2); // 身体的第一个面，村民
    drawBody(0, 3, 7, 4, 4, points2, colors2); // 身体的第二个面，村民
    drawBody(4, 5, 6, 7, 4, points2, colors2); // 身体的第三个面，村民
    drawBody(1, 5, 6, 2, 4, points2, colors2); // 身体的第四个面，村民
    drawBody(0, 4, 5, 1, 4, points2, colors2); // 身体的第五个面，村民
    drawBody(3, 7, 6, 2, 4, points2, colors2); // 身体的第六个面，村民

    drawCloth(0, 1, 2, 3, 1, points2, colors2); // 衣服的第一个面，白色
    drawCloth(0, 3, 7, 4, 1, points2, colors2); // 衣服的第二个面，白色
    drawCloth(4, 5, 6, 7, 1, points2, colors2); // 衣服的第三个面，白色
    drawCloth(1, 5, 6, 2, 1, points2, colors2); // 衣服的第四个面，白色
    drawCloth(0, 4, 5, 1, 1, points2, colors2); // 衣服的第五个面，白色
    drawCloth(3, 7, 6, 2, 1, points2, colors2); // 衣服的第六个面，白色

    drawPants(0, 1, 2, 3, 2, points2, colors2); // 裤子的第一个面，褐色
    drawPants(0, 3, 7, 4, 2, points2, colors2); // 裤子的第二个面，褐色
    drawPants(4, 5, 6, 7, 2, points2, colors2); // 裤子的第三个面，褐色
    drawPants(1, 5, 6, 2, 2, points2, colors2); // 裤子的第四个面，褐色
    drawPants(0, 4, 5, 1, 2, points2, colors2); // 裤子的第五个面，褐色
    drawPants(3, 7, 6, 2, 2, points2, colors2); // 裤子的第六个面，褐色

    drawLeftLeg(0, 1, 2, 3, 1, points2, colors2); // 左腿的第一个面，白色
    drawLeftLeg(0, 3, 7, 4, 1, points2, colors2); // 左腿的第二个面，白色
    drawLeftLeg(4, 5, 6, 7, 1, points2, colors2); // 左腿的第三个面，白色
    drawLeftLeg(1, 5, 6, 2, 1, points2, colors2); // 左腿的第四个面，白色
    drawLeftLeg(0, 4, 5, 1, 1, points2, colors2); // 左腿的第五个面，白色
    drawLeftLeg(3, 7, 6, 2, 1, points2, colors2); // 左腿的第六个面，白色

    drawRightLeg(0, 1, 2, 3, 1, points2, colors2); // 右腿的第一个面，白色
    drawRightLeg(0, 3, 7, 4, 1, points2, colors2); // 右腿的第二个面，白色
    drawRightLeg(4, 5, 6, 7, 1, points2, colors2); // 右腿的第三个面，白色
    drawRightLeg(1, 5, 6, 2, 1, points2, colors2); // 右腿的第四个面，白色
    drawRightLeg(0, 4, 5, 1, 1, points2, colors2); // 右腿的第五个面，白色
    drawRightLeg(3, 7, 6, 2, 1, points2, colors2); // 右腿的第六个面，白色

    drawLeftShoe(0, 1, 2, 3, 3, points2, colors2); // 左腿鞋子的第一个面，黑色
    drawLeftShoe(0, 3, 7, 4, 3, points2, colors2); // 左腿鞋子的第二个面，黑色
    drawLeftShoe(4, 5, 6, 7, 3, points2, colors2); // 左腿鞋子的第三个面，黑色
    drawLeftShoe(1, 5, 6, 2, 3, points2, colors2); // 左腿鞋子的第四个面，黑色
    drawLeftShoe(0, 4, 5, 1, 3, points2, colors2); // 左腿鞋子的第五个面，黑色
    drawLeftShoe(3, 7, 6, 2, 3, points2, colors2); // 左腿鞋子的第六个面，黑色

    drawRightShoe(0, 1, 2, 3, 3, points2, colors2); // 右腿鞋子的第一个面，黑色
    drawRightShoe(0, 3, 7, 4, 3, points2, colors2); // 右腿鞋子的第二个面，黑色
    drawRightShoe(4, 5, 6, 7, 3, points2, colors2); // 右腿鞋子的第三个面，黑色
    drawRightShoe(1, 5, 6, 2, 3, points2, colors2); // 右腿鞋子的第四个面，黑色
    drawRightShoe(0, 4, 5, 1, 3, points2, colors2); // 右腿鞋子的第五个面，黑色
    drawRightShoe(3, 7, 6, 2, 3, points2, colors2); // 右腿鞋子的第六个面，黑色

    drawLeftArm(0, 1, 2, 3, 4, points2, colors2); // 左手臂的第一个面，村民
    drawLeftArm(0, 3, 7, 4, 4, points2, colors2); // 左手臂的第二个面，村民
    drawLeftArm(4, 5, 6, 7, 4, points2, colors2); // 左手臂的第三个面，村民
    drawLeftArm(1, 5, 6, 2, 4, points2, colors2); // 左手臂的第四个面，村民
    drawLeftArm(0, 4, 5, 1, 4, points2, colors2); // 左手臂的第五个面，村民
    drawLeftArm(3, 7, 6, 2, 4, points2, colors2); // 左手臂的第六个面，村民

    drawRightArm(0, 1, 2, 3, 4, points2, colors2); // 右手臂的第一个面，村民
    drawRightArm(0, 3, 7, 4, 4, points2, colors2); // 右手臂的第二个面，村民
    drawRightArm(4, 5, 6, 7, 4, points2, colors2); // 右手臂的第三个面，村民
    drawRightArm(1, 5, 6, 2, 4, points2, colors2); // 右手臂的第四个面，村民
    drawRightArm(0, 4, 5, 1, 4, points2, colors2); // 右手臂的第五个面，村民
    drawRightArm(3, 7, 6, 2, 4, points2, colors2); // 右手臂的第六个面，村民

    drawLeftEye(points2, colors2);
    drawRightEye(points2, colors2);
    drawTeeth(points2, colors2);
}

// 绘制身体
function drawBody(a, b, c, d, colorIndex, points, colors) {
    // 身体的八个顶点(x,y,z,a)
    var bodyVertices = [
        vec4(-body[0] / 2, body[1] * 2 / 3, body[2] / 2, 1.0),
        vec4(body[0] / 2, body[1] * 2 / 3, body[2] / 2, 1.0),
        vec4(body[0] / 2, -body[1] / 3, body[2] / 2, 1.0),
        vec4(-body[0] / 2, -body[1] / 3, body[2] / 2, 1.0),
        vec4(-body[0] / 2, body[1] * 2 / 3, -body[2] / 2, 1.0),
        vec4(body[0] / 2, body[1] * 2 / 3, -body[2] / 2, 1.0),
        vec4(body[0] / 2, -body[1] / 3, -body[2] / 2, 1.0),
        vec4(-body[0] / 2, -body[1] / 3, -body[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(bodyVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制衣服
function drawCloth(a, b, c, d, colorIndex, points, colors) {
    // 衣服的八个顶点(x,y,z,a)
    var clothVertices = [
        vec4(-cloth[0] / 2, -body[1] / 3, cloth[2] / 2, 1.0),
        vec4(cloth[0] / 2, -body[1] / 3, cloth[2] / 2, 1.0),
        vec4(cloth[0] / 2, -body[1] / 3 - cloth[1], cloth[2] / 2, 1.0),
        vec4(-cloth[0] / 2, -body[1] / 3 - cloth[1], cloth[2] / 2, 1.0),
        vec4(-cloth[0] / 2, -body[1] / 3, -cloth[2] / 2, 1.0),
        vec4(cloth[0] / 2, -body[1] / 3, -cloth[2] / 2, 1.0),
        vec4(cloth[0] / 2, -body[1] / 3 - cloth[1], -cloth[2] / 2, 1.0),
        vec4(-cloth[0] / 2, -body[1] / 3 - cloth[1], -cloth[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(clothVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制裤子
function drawPants(a, b, c, d, colorIndex, points, colors) {
    // 裤子的八个顶点(x,y,z,a)
    var clothVertices = [
        vec4(-pants[0] / 2, -body[1] / 3 - cloth[1], pants[2] / 2, 1.0),
        vec4(pants[0] / 2, -body[1] / 3 - cloth[1], pants[2] / 2, 1.0),
        vec4(pants[0] / 2, -body[1] / 3 - cloth[1] - pants[1], pants[2] / 2, 1.0),
        vec4(-pants[0] / 2, -body[1] / 3 - cloth[1] - pants[1], pants[2] / 2, 1.0),
        vec4(-pants[0] / 2, -body[1] / 3 - cloth[1], -pants[2] / 2, 1.0),
        vec4(pants[0] / 2, -body[1] / 3 - cloth[1], -pants[2] / 2, 1.0),
        vec4(pants[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -pants[2] / 2, 1.0),
        vec4(-pants[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -pants[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(clothVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制左腿
function drawLeftLeg(a, b, c, d, colorIndex, points, colors) {
    // 左腿的八个顶点(x,y,z,a)
    var leftLegVertices = [
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -leg[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -leg[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(leftLegVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制右腿
function drawRightLeg(a, b, c, d, colorIndex, points, colors) {
    // 右腿的八个顶点(x,y,z,a)
    var rightLegVertices = [
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], leg[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], leg[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -leg[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -leg[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(rightLegVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制左腿
function drawLeftLeg2(a, b, c, d, colorIndex, points, colors) {
    // 左腿的八个顶点(x,y,z,a)
    var leftLegVertices = [
        vec4(-pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg2[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg2[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], leg2[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], leg2[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg2[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg2[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], -leg2[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], -leg2[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(leftLegVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制右腿
function drawRightLeg2(a, b, c, d, colorIndex, points, colors) {
    // 右腿的八个顶点(x,y,z,a)
    var rightLegVertices = [
        vec4(pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg2[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1], leg2[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], leg2[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], leg2[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg2[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1], -leg2[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], -leg2[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], -leg2[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(rightLegVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制左腿鞋子
function drawLeftShoe2(a, b, c, d, colorIndex, points, colors) {
    // 左腿鞋子的八个顶点(x,y,z,a)
    var leftShoeVertices = [
        vec4(-pants[0] / 4 - shoe2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], shoe2[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], shoe2[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1] - shoe2[1], shoe2[2] / 2, 1.0),
        vec4(-pants[0] / 4 - shoe2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1] - shoe2[1], shoe2[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], -shoe2[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], -shoe2[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1] - shoe2[1], -shoe2[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1] - shoe2[1], -shoe2[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(leftShoeVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制右腿鞋子
function drawRightShoe2(a, b, c, d, colorIndex, points, colors) {
    // 右腿鞋子的八个顶点(x,y,z,a)
    var rightShoeVertices = [
        vec4(pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], shoe2[2] / 2, 1.0),
        vec4(pants[0] / 4 + shoe2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], shoe2[2] / 2, 1.0),
        vec4(pants[0] / 4 + shoe2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1] - shoe2[1], shoe2[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1] - shoe2[1], shoe2[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], -shoe2[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1], -shoe2[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1] - shoe2[1], -shoe2[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg2[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg2[1] - shoe2[1], -shoe2[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(rightShoeVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]); // 黑色
    }
}



// 绘制左腿鞋子
function drawLeftShoe(a, b, c, d, colorIndex, points, colors) {
    // 左腿鞋子的八个顶点(x,y,z,a)
    var leftShoeVertices = [
        vec4(-pants[0] / 4 - shoe[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 - shoe[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], -shoe[2] / 2, 1.0),
        vec4(-pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], -shoe[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(leftShoeVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]);
    }
}

// 绘制右腿鞋子
function drawRightShoe(a, b, c, d, colorIndex, points, colors) {
    // 右腿鞋子的八个顶点(x,y,z,a)
    var rightShoeVertices = [
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 + shoe[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 + shoe[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1], -shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 + leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], -shoe[2] / 2, 1.0),
        vec4(pants[0] / 4 - leg[0] / 2, -body[1] / 3 - cloth[1] - pants[1] - leg[1] - shoe[1], -shoe[2] / 2, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(rightShoeVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]); // 黑色
    }
}

// 画左手臂
function drawLeftArm(a, b, c, d, colorIndex, points, colors) {
    // 左手臂的八个顶点(x,y,z,a)
    var leftArmVertices = [
        vec4(-0.2, 0.0, 0.025, 1.0),
        vec4(-0.2, 0.0, -0.025, 1.0),
        vec4(-0.2, -0.05, -0.025, 1.0),
        vec4(-0.2, 0.05, 0.025, 1.0),
        vec4(-0.3, -0.3, 0.025, 1.0),
        vec4(-0.3, -0.3, -0.025, 1.0),
        vec4(-0.25, -0.3, -0.025, 1.0),
        vec4(-0.25, -0.3, 0.025, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(leftArmVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]); // 黄色
    }
}

// 画左手臂
function drawLeftArm2(a, b, c, d, colorIndex, points, colors) {
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
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(leftArmVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]); // 黄色
    }
}

// 画右手臂
function drawRightArm(a, b, c, d, colorIndex, points, colors) {
    // 右手臂的八个顶点(x,y,z,a)
    var leftArmVertices = [
        vec4(0.2, 0.0, 0.025, 1.0),
        vec4(0.2, 0.0, -0.025, 1.0),
        vec4(0.2, -0.05, -0.025, 1.0),
        vec4(0.2, 0.05, 0.025, 1.0),

        vec4(0.3, -0.3, 0.025, 1.0),
        vec4(0.3, -0.3, -0.025, 1.0),
        vec4(0.25, -0.3, -0.025, 1.0),
        vec4(0.25, -0.3, 0.025, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(leftArmVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]); // 黄色
    }
}
// 画右手臂
function drawRightArm2(a, b, c, d, colorIndex, points, colors) {
    // 右手臂的八个顶点(x,y,z,a)

    var leftArmVertices = [
        vec4(0.2, 0.0, 0.025, 1.0),
        vec4(0.2, 0.0, -0.025, 1.0),
        vec4(0.2, -0.05, -0.025, 1.0),
        vec4(0.2, 0.05, 0.025, 1.0),

        vec4(0.3, 0, 0.9, 1.0),
        vec4(0.3, 0.1, 0.9, 1.0),
        vec4(0.25, 0.1, 0.9, 1.0),
        vec4(0.25, 0, 0.9, 1.0)
    ];
    var indices = [a, b, c, a, c, d]; // 顶点索引顺序
    // 存取顶点余顶点索引信息算法
    for (var i = 0; i < indices.length; i++) {
        points.push(leftArmVertices[indices[i]]);
        colors.push(chooseColors[colorIndex]); // 黄色
    }
}

// 画左眼
function drawLeftEye(points, colors) {
    // 画眼白
    var leftEyeVertices = getCircleVertex(-0.08, 0.15, 0.103, 0.06, ms, 360, 0);
    for (var i = 0; i < leftEyeVertices.length; i++) {
        points.push(leftEyeVertices[i]);
        colors.push(chooseColors[1]); // 白色
    }
    // 画眼球
    leftEyeVertices = getCircleVertex(-0.06, 0.15, 0.104, 0.02, ms, 360, 0);
    for (var i = 0; i < leftEyeVertices.length; i++) {
        points.push(leftEyeVertices[i]);
        colors.push(chooseColors[3]); // 黑色
    }
}

// 画右眼
function drawRightEye(points, colors) {
    var rightEyeVertices = getCircleVertex(0.08, 0.15, 0.103, 0.06, ms, 360, 0);
    for (var i = 0; i < rightEyeVertices.length; i++) {
        points.push(rightEyeVertices[i]);
        colors.push(chooseColors[1]); // 白色
    }
    var rightEyeVertices = getCircleVertex(0.06, 0.15, 0.104, 0.02, ms, 360, 0);
    for (var i = 0; i < rightEyeVertices.length; i++) {
        points.push(rightEyeVertices[i]);
        colors.push(chooseColors[3]); // 黑色
    }
}

// 画嘴巴
function drawMouse(points, colors, colorIndex, x, y, z, z2) {
    //var mouseVertices = getCircleVertex(0.0, 0.24, 0.1019, 0.21, ms, 80, 140);
    //alert("1111")
    var mouseVertices = getCircleVertex(x, y, z, 0.21, ms, 80, 140);
    for (var i = 0; i < mouseVertices.length; i++) {
        points.push(mouseVertices[i]);
        colors.push(chooseColors[3]); // 黑色
    }
    //alert("22222")
    //mouseVertices = getCircleVertex(0.0, 0.24, 0.102, 0.205, ms, 80, 140);
    mouseVertices = getCircleVertex(x, y, z2, 0.205, ms, 80, 140);
    for (var i = 0; i < mouseVertices.length; i++) {
        points.push(mouseVertices[i]);
        colors.push(chooseColors[colorIndex]); // 黄色
    }
}

// 画牙齿
function drawTeeth(points, colors) {
    // 左牙
    points.push(vec4(-0.05, 0.036, 0.102, 1.0));
    points.push(vec4(-0.02, 0.032, 0.102, 1.0));
    points.push(vec4(-0.05, 0.01, 0.102, 1.0));
    points.push(vec4(-0.02, 0.032, 0.102, 1.0));
    points.push(vec4(-0.05, 0.01, 0.102, 1.0));
    points.push(vec4(-0.02, 0.005, 0.102, 1.0));

    // 右牙
    points.push(vec4(0.02, 0.032, 0.102, 1.0));
    points.push(vec4(0.05, 0.036, 0.102, 1.0));
    points.push(vec4(0.02, 0.005, 0.102, 1.0));
    points.push(vec4(0.05, 0.036, 0.102, 1.0));
    points.push(vec4(0.02, 0.005, 0.102, 1.0));
    points.push(vec4(0.05, 0.01, 0.102, 1.0));

    // 设置牙齿颜色
    for (var i = 0; i < 12; i++) {
        colors.push(chooseColors[1]); // 白色
    }
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