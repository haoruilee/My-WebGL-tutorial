/**
 * 视图矩阵
 * xu.lidong@qq.com
 * */

var g_vs = `
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_ViewMat;
varying vec4 v_Color;
void main() {
    gl_Position = u_ViewMat * a_Position;
    v_Color = a_Color;
}`;

var g_fs = `
precision mediump float;
varying vec4 v_Color;
void main(){
    gl_FragColor = v_Color;
}`;

var g_eyeX = 0.0;
var g_eyeY = 0.0;

function main() {
    var gl = getGL();
    var shaderProgram = initShader(gl);
    var n = initVertexBuffers(gl, shaderProgram);
    draw(gl, shaderProgram, n);

    document.onkeydown = function (event) {
        if(event.key === 'a') {
            g_eyeX += 0.01;
            draw(gl, shaderProgram, n);
        } else if(event.key === 'd') {
            g_eyeX -= 0.01;
            draw(gl, shaderProgram, n);
        } else if(event.key === 'w') {
            g_eyeY += 0.01;
            draw(gl, shaderProgram, n);
        } else if(event.key === 's') {
            g_eyeY -= 0.01;
            draw(gl, shaderProgram, n);
        } else if(event.key === 'b') {
            g_eyeZ += 0.01;
            draw(gl, shaderProgram, n);
        } else if(event.key === 't') {
            g_eyeZ -= 0.01;
            draw(gl, shaderProgram, n);
        } else {

        }
    }
}

function getGL() {
    var canvas = document.getElementById("container");
    return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
}

function initShader(gl) {
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource( vs, g_vs);
    gl.compileShader(vs);

    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource( fs, g_fs);
    gl.compileShader(fs);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    return shaderProgram;
}

function initVertexBuffers(gl, shaderProgram) {
    var verticesColors = new Float32Array([
        // 顶点坐标			颜色
        0.0, 0.5, -0.4, 	0.4, 1.0, 0.4,
        -0.5, -0.5, -0.4,	0.4, 1.0, 0.4,
        0.5, -0.5, -0.4,	1.0, 0.4, 0.4,

        0.5, 0.4, -0.2, 	1.0, 0.4, 0.4,
        -0.5, 0.4, -0.2,	1.0, 1.0, 0.4,
        0.0, -0.6, -0.2,	1.0, 1.4, 0.4,

        0.0, 0.5, 0.0,		0.4, 0.4, 1.0,
        -0.5, -0.5, 0.0,	0.4, 0.4, 1.0,
        0.5, -0.5, 0.0,		1.0, 0.4, 0.4,
    ]);
    var FSIZE = verticesColors.BYTES_PER_ELEMENT;

    var vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(shaderProgram, "a_Color");
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    return verticesColors.length / 6;
}

function draw(gl, shaderProgram, n) {
    var u_ViewMat = gl.getUniformLocation(shaderProgram, "u_ViewMat");
    var viewMat = lookAt(g_eyeX, g_eyeY, 0, 0, 0, -1, 0, 1, 0);
    gl.uniformMatrix4fv(u_ViewMat, false, viewMat);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

/**
 *  以下代码为lookAt的实现
 * */

/**
 * 由平移向量获取平移矩阵
 * */
function getTranslationMatrix(x, y, z) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x, y, z, 1.0,
    ]);
}

/**
 * 由旋转弧度和旋转轴获取旋转矩阵
 * */
function getRotationMatrix(rad, x, y, z) {
    if (x > 0) {
        // 绕x轴的旋转矩阵
        return new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, Math.cos(rad), -Math.sin(rad), 0.0,
            0.0, Math.sin(rad), Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]);
    } else if (y > 0) {
        // 绕y轴的旋转矩阵
        return new Float32Array([
            Math.cos(rad), 0.0, -Math.sin(rad), 0.0,
            0.0, 1.0, 0.0, 0.0,
            Math.sin(rad), 0.0, Math.cos(rad), 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]);
    } else if(z > 0) {
        // 绕z轴的旋转矩阵
        return new Float32Array([
            Math.cos(rad), Math.sin(rad), 0.0, 0.0,
            -Math.sin(rad), Math.cos(rad), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]);
    } else {
        // 没有指定旋转轴，报个错，返回一个单位矩阵
        console.error("error: no axis");
        return new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]);
    }
}

