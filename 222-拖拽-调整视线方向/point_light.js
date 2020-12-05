//球坐标系
//
var near = 0.3;
var far = 5.0;
var radius = 2.5;
var theta  = 0.0;
var phi    = 0.0;

var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio



var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Normal;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'uniform mat4 u_NormalMatrix;\n' +
    'uniform vec3 u_PointLightPosition;\n' +
    'uniform vec3 u_PointLightColor;\n' +
    'uniform vec3 u_AmbientColor;\n' +
    'varying vec4 v_Color;\n' +
    'void main(){\n' +
    'vec4 a_Color = vec4(0.0,1.0,0.0,1.0);\n' +
    'gl_Position = u_MvpMatrix * a_Position;\n' +
    'vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +//计算法向量并进行归一化
    'vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +//计算顶点世界坐标
    'vec3 lightDirection = normalize(u_PointLightPosition - vec3(vertexPosition));\n' +//计算光线方向向量并进行归一化
    'float NDotL = max(dot(normal,lightDirection),0.0);\n' +//计算法向量和方向向量的点积
    'vec3 diffuse = u_PointLightColor * vec3(a_Color) * NDotL;\n' +//计算点光源的反射光的颜色
    'vec3 ambient = u_AmbientColor * a_Color.rgb;\n' +//计算环境光反射光颜色
    'v_Color = vec4(ambient + diffuse,a_Color.a);' +
    '}\n';
 
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'varying vec4 v_Color;\n' +
    'void main(){\n' +
    'gl_FragColor = v_Color;\n' +
    '}\n';
 
 
var ANGLE_STEP = 3.0;
var g_arm1Angle = 90.0;
var g_joint1Angle = 0.0;
 
var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
 
function main()
{
    //获取canvas对象
    var canvas = document.getElementById("canvas");

    //获取WebGL上下文
    var gl = getWebGLContext(canvas);
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    var n = initVertexBuffers(gl);
    //开启深度检测
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1.0,1.0,1.0,1.0);
 
 
    //对光源数据进行赋值
    var u_PointLightPosition = gl.getUniformLocation(gl.program,'u_PointLightPosition');
    //修改下面这个值就会改变光照点
    gl.uniform3f(u_PointLightPosition,0.0,0.0,4.0);
    var u_PointLightColor = gl.getUniformLocation(gl.program,'u_PointLightColor');
    //改变反射光的值
    //似乎因为原物体是绿色的，所以只有第二个值可以起作用
    gl.uniform3f(u_PointLightColor,0.5,0.5,0.5);
    var u_AmbientColor = gl.getUniformLocation(gl.program,'u_AmbientColor');
    gl.uniform3f(u_AmbientColor,0.1,0.5,0.2);
 
    //法向量变换矩阵
    //模型移动时法向量会一起变
    var u_NormalMatrix = gl.getUniformLocation(gl.program,'u_NormalMatrix');
 
    //模型视图矩阵
    //调整它则改变视点位置
    var u_MvpMatrix = gl.getUniformLocation(gl.program,'u_MvpMatrix');
    var viewProjMatrix = new Matrix4();
    viewProjMatrix.setPerspective(50,canvas.width/canvas.height,1,100);
    viewProjMatrix.lookAt(0,0,90.0,0.0,0.0,0.0,0.0,1.0,0.0);
 


    document.onkeydown = function(ev){
        keyDown(ev,gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);
    };
    draw(gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix);
 
}
function initVertexBuffers(gl)
{
    var vertices = new Float32Array([
        1.5, 10.0, 1.5, -1.5, 10.0, 1.5, -1.5,  0.0, 1.5,  1.5,  0.0, 1.5, // v0-v1-v2-v3 front
        1.5, 10.0, 1.5,  1.5,  0.0, 1.5,  1.5,  0.0,-1.5,  1.5, 10.0,-1.5, // v0-v3-v4-v5 right
        1.5, 10.0, 1.5,  1.5, 10.0,-1.5, -1.5, 10.0,-1.5, -1.5, 10.0, 1.5, // v0-v5-v6-v1 up
        -1.5, 10.0, 1.5, -1.5, 10.0,-1.5, -1.5,  0.0,-1.5, -1.5,  0.0, 1.5, // v1-v6-v7-v2 left
        -1.5,  0.0,-1.5,  1.5,  0.0,-1.5,  1.5,  0.0, 1.5, -1.5,  0.0, 1.5, // v7-v4-v3-v2 down
        1.5,  0.0,-1.5, -1.5,  0.0,-1.5, -1.5, 10.0,-1.5,  1.5, 10.0,-1.5  // v4-v7-v6-v5 back
    ]);
 
    // Normal
    var normals = new Float32Array([
        0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
        1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
        0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
        0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
        0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
    ]);
 
    // Indices of the vertices
    var indices = new Uint8Array([
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
        12,13,14,  12,14,15,    // left
        16,17,18,  16,18,19,    // down
        20,21,22,  20,22,23     // back
    ]);
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
 
    initArrayBuffer(gl,vertices,3,gl.FLOAT,'a_Position');
    initArrayBuffer(gl,normals,3,gl.FLOAT,'a_Normal');
    return indices.length;
}
function initArrayBuffer(gl,data,num,type,attribute){
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    var a_attribute = gl.getAttribLocation(gl.program,attribute);
    gl.vertexAttribPointer(a_attribute,num,type,false,0,0);
    gl.enableVertexAttribArray(a_attribute);
    return true;
}
 
var g_joint2Angle = 0,g_joint3Angle = 0;
function keyDown(ev,gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix)
{
    console.log(ev.keyCode);//7查看按键绑定的值
    switch(ev.keyCode){
        case 38:
            if(g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
            break;
        case 40:
            if(g_joint1Angle>-135.0) g_joint1Angle -= ANGLE_STEP;
            break;
        case 39:
            g_arm1Angle = (g_arm1Angle + ANGLE_STEP) % 360;
            break;
        case 37:
            g_arm1Angle = (g_arm1Angle - ANGLE_STEP)%360;
            break ;
        case 90:
            g_joint2Angle = (g_joint2Angle + ANGLE_STEP)%360;
            break;
        case 88:
            g_joint2Angle = (g_joint2Angle - ANGLE_STEP)%360;
            break;
        case 86:
            if(g_joint3Angle < 60.0) g_joint3Angle = (g_joint3Angle+ANGLE_STEP)%360;
            break;
        case 67:
            if(g_joint3Angle > -60.0) g_joint3Angle = (g_joint3Angle-ANGLE_STEP)%360;
            break;
        default :return ;
    }
    draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
 
}
function draw(gl,n,viewProjMatrix,u_MvpMatrix,u_NormalMatrix)
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //base
    var baseHeight = 2.0;
    g_modelMatrix.setTranslate(0.0, -12.0, 0.0);
    drawBox(gl, n, 10.0,baseHeight,10.0,viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
    // Arm1
    var arm1Length = 10.0; // Length of arm1
    g_modelMatrix.translate(0.0,baseHeight,0.0);
    g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);    // Rotate around the y-axis
    drawBox(gl, n, 3.0,arm1Length,3.0,viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // Draw
 
    //arm2
    var arm2Length = 8;
    g_modelMatrix.translate(0.0,arm1Length,0.0);
    g_modelMatrix.rotate(g_joint1Angle, 0.0, 0.0, 1.0);
    drawBox(gl, n, 4,arm2Length,4,viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // Draw
 
    // palm
    var palmLength = 2.0;
    g_modelMatrix.translate(0.0, arm2Length, 0.0); 　　　// Move to joint1
    g_modelMatrix.rotate(g_joint2Angle, 0.0, 1.0, 0.0);  // Rotate around the z-axis
    drawBox(gl, n,3,palmLength,6,viewProjMatrix, u_MvpMatrix, u_NormalMatrix); // Draw
 
    //finger1
    pushMatrix(g_modelMatrix);
    g_modelMatrix.translate(0.0, palmLength, 2);
    g_modelMatrix.rotate(g_joint3Angle, 1.0, 0.0, 0.0);
    drawBox(gl, n,1,2,1,viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
 
    //finger2
    g_modelMatrix = popMatrix();
    g_modelMatrix.translate(0.0,palmLength, -2);
    g_modelMatrix.rotate(-g_joint3Angle, 1.0, 0.0, 0.0);
    drawBox(gl, n,1,2,1,viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
 
}
var g_matrixStack = [];
function pushMatrix(m)
{
    var m2 = new Matrix4(m);
    g_matrixStack.push(m2);
}
function popMatrix()
{
    return g_matrixStack.pop();
}
var g_normalMatrix = new Matrix4();
var WIDTH = 3.0,HEIGHT = 10,DEPTH=3.0;
 
function drawBox(gl,n,width,height,depth,viewProjMatrix,u_MvpMatrix,u_NormalMatrix)
{
    //将模型视图矩阵赋值给顶点着色器
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    g_mvpMatrix.scale(width/WIDTH,height/HEIGHT,depth/DEPTH);
    //WIDTH = width,HEIGHT=height,DEPTH = depth;
 
    gl.uniformMatrix4fv(u_MvpMatrix,false,g_mvpMatrix.elements);
    gl.uniformMatrix4fv(gl.getUniformLocation(gl.program,'u_ModelMatrix'),false,g_modelMatrix.elements);
 
    //计算法向量变换矩阵
    g_normalMatrix.setInverseOf(g_modelMatrix);
    g_normalMatrix.transpose();
    gl.uniformMatrix4fv(u_NormalMatrix,false,g_normalMatrix.elements);
    //绘制
    gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);
}