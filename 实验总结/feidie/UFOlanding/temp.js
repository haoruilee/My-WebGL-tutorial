
var gl;
var canvas;
var program;



var ispause=true;
var isufo=false;
var cdata,vdata;
var numberofpoints=[];
var CurModelViewMatrixLoc;
var count=0;

var UFOselfaxis=[
    vec3(1,0,0),
    vec3(0,1,0),
    vec3(0,0,1)
];
var UFOmovedistance=vec3(0,0,0);
var UFOrolleddegree=vec3(0,0,0);
var planetselfaxis=[
    vec3(1,0,0),
    vec3(0,1,0),
    vec3(0,0,1)
];
var planetmovedistance=vec3(0,0,0);
var planetrolleddegree=vec3(0,0,0);


var near = 0.3;
var far = 5.0;
var radius = 2.5;
var theta  = 0.0;
var phi    = 0.0;

var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);


//-------------------------4th
var vNormal,vPosition;

var ambientaddr,diffuseaddr,specularaddr,lightPositionaddr,shininessaddr;

var glassNBufferID,glassvBufferID,
    plateNBufferID,platevBufferID,
    jetNBufferID,jetvBufferID,
    planetballNBufferID,planetballvBufferID,
    discNBufferID,discvBufferID,
    lineNBufferID,linevBufferID;

var rawcdata=[
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
];



var lightPosition = vec4(0.0, 0.0, 0.0, 0.0 );


var lightAmbient = vec4(0.3, 0.3, 0.3, 1.0 );     //全局的光
var lightDiffuse = vec4( 0.5, 0.8, 0.4, 1.0);    //漫反射
var lightSpecular = vec4( 0.8, 0.9, 1.0, 1.0 );  //镜面反射


var materialAmbient = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 1.0, 1.0, 0.0);
var materialSpecular = vec4( 1.0, 1.0, 1.0, 0.0 );
var materialShininess = 50.0;

var ctm;
var ambientColor, diffuseColor,
    specularColor;

var viewerPos;

var ambientProduct = mult(lightAmbient, materialAmbient);
var diffuseProduct = mult(lightDiffuse, materialDiffuse);
var specularProduct = mult(lightSpecular, materialSpecular);

let planetindex=0


//-----------------4th


window.onload=function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    aspect =  canvas.width/canvas.height;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //打开深度检测
    gl.enable(gl.DEPTH_TEST);
    //程序对象
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //获取变量地址
    CurModelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    vPosition = gl.getAttribLocation(program, "vPosition");
    vNormal = gl.getAttribLocation(program, "vNormal");

    ambientaddr=gl.getUniformLocation(program, "ambientProduct")
    diffuseaddr=gl.getUniformLocation(program, "diffuseProduct")
    specularaddr=gl.getUniformLocation(program, "specularProduct")
    lightPositionaddr=gl.getUniformLocation(program, "lightPosition")
    shininessaddr=gl.getUniformLocation(program, "shininess")


    {
        //一个半球玻璃
        count = 5;
        vdata = halfball(0.2, count);
        let n = 12 * Math.pow(4, count);
        numberofpoints[0]=n;

        //计算法向量
        let testNomal=[]
        let len=vdata.length
        for(let i=0;i<len;i+=3){
            let t1 = subtract(vdata[i+1], vdata[i]);
            let t2 = subtract(vdata[i+2], vdata[i+1]);
            let nomalTemp = cross(t1, t2);
            nomalTemp = vec3(nomalTemp);

            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
        }
        console.log("1")

        //缓冲区操作
        glassNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, glassNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        glassvBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, glassvBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
    }
    {
        //星球主体
        count = 6;
        vdata = totalball(0.3, count);
        let n = 24 * Math.pow(4, count);
        numberofpoints[1]=n;
        let testNomal=[]
        let len=vdata.length
        for(let i=0;i<len;i+=3){
            let t1 = subtract(vdata[i+1], vdata[i]);
            let t2 = subtract(vdata[i+2], vdata[i+1]);
            let nomalTemp = cross(t1, t2);
            // for(let i in nomalTemp){
            //     nomalTemp[i]=-nomalTemp[i]
            // }
            nomalTemp = vec3(nomalTemp);

            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
        }



        console.log("2")
        //缓冲区操作
        planetballNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, planetballNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        planetballvBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, planetballvBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
    }
    {
        //喷气口
        count = 500;
        vdata = cylinder(0.1, 0.14, count);
        let n = 2 * count + 2;
        numberofpoints[2]=n;

        let testNomal=[]
        let len=vdata.length

        for(let i=0;i<len;i++){
            let t1=[vdata[0]-vdata[3],vdata[1]-vdata[4],vdata[2]-vdata[5]]
            let t2=[vdata[0]-vdata[6],vdata[1]-vdata[7],vdata[2]-vdata[8]];
            let nomalTemp = cross(t1, t2);
            nomalTemp = vec3(nomalTemp);

            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
        }
        console.log("3")

        //缓冲区操作
        jetNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, jetNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        jetvBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, jetvBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
    }
    {
        //卫星环
        count = 500;
        vdata =cvpitems(0.55,0.65,0,count);
        let n = 2 * count + 2;
        numberofpoints[3]=n;
        let testNomal=[]
        let len=vdata.length
        for(let i=0;i<len;i++){
            let t1=[vdata[0]-vdata[3],vdata[1]-vdata[4],vdata[2]-vdata[5]]
            let t2=[vdata[0]-vdata[6],vdata[1]-vdata[7],vdata[2]-vdata[8]];
            let nomalTemp = cross(t1, t2);
            nomalTemp = vec3(nomalTemp);

            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
        }
        console.log("4")

        //缓冲区操作
        discNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, discNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        discvBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, discvBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
    }
    {
        //UFO底板
        var count = 500;
        vdata =cvpitems(0.2,0.6,0.05,count);
        let n = 2 * count + 2;
        numberofpoints['plate']=n;
        let testNomal=[]
        let len=vdata.length


        for(let i=0;i<len;i++){
            let t1=[vdata[0]-vdata[3],vdata[1]-vdata[4],vdata[2]-vdata[5]]
            let t2=[vdata[0]-vdata[6],vdata[1]-vdata[7],vdata[2]-vdata[8]];
            let nomalTemp = cross(t1, t2);
            nomalTemp = vec3(nomalTemp);

            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
        }
        console.log("5")
        //缓冲区操作
        plateNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, plateNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        platevBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, platevBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
    }

    gl.uniform1f(shininessaddr,materialShininess);


    document.getElementById("Button1").onclick = function()
    {
        near = 0.3;
        theta = 0.0* Math.PI/180.0;;
        phi = 0.0* Math.PI/180.0;;
        radius = 2.5;
        isufo=false;
    };
    document.getElementById("Button4").onclick = function()
    {
        near = 0.3;
        theta = 270.0* Math.PI/180.0;
        phi = 0.0* Math.PI/180.0;
        radius = 2.5;
        isufo=false;
    };
    document.getElementById("Button5").onclick = function()
    {
        near = 0.3;
        radius = 2.5;
        isufo=false;
        theta = 90* Math.PI/180.0;;
        phi = +90.0* Math.PI/180.0;;
    };
    document.getElementById("Button7").onclick = function() {
        ispause=true;
    };
    document.getElementById("Button8").onclick = function() {
        ispause=false;
    };
    document.getElementById("Button9").onclick = function() {
        near = 0.1;
        phi = 0;
        theta = (UFOrolleddegree[1]+90)*Math.PI/180.0;;
        radius = 0.9;
        isufo=true;
    };

    render();
};


function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    UFOmovedistance[0]=0.9*Math.cos(radians(0-UFOrolleddegree[1]));
    UFOmovedistance[2]=0.9*Math.sin(radians(0-UFOrolleddegree[1]));

    lightPosition[0]=-Math.cos(radians(0-UFOrolleddegree[1]));
    lightPosition[2]=-Math.sin(radians(0-UFOrolleddegree[1]));

    if(!ispause) {
        //动画
        lightPosition[0]=-1.0*Math.cos(radians(0-UFOrolleddegree[1]));
        // lightPosition[1]=-1.0*Math.cos(radians(0-UFOrolleddegree[1]));
        lightPosition[2]=-1.0*Math.sin(radians(0-UFOrolleddegree[1]));


        UFOmovedistance[0]=0.9*Math.cos(radians(0-UFOrolleddegree[1]));
        UFOmovedistance[2]=0.9*Math.sin(radians(0-UFOrolleddegree[1]));

        UFOrolleddegree[1]++;

        // planetindex=UFOrolleddegree[1]%(colorArray.length)
        if(isufo){
            theta+=1*Math.PI/180.0;
        }
    }

    eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = mult(perspective(fovy, aspect, near, far),modelViewMatrix);


    // projectionMatrix = ortho(-1, 1, -1, 1, -100, 100);

    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
        flatten(lightPosition) );

    let transviewMat=mat4();
    // transviewMat=modelViewMatrix;
    {
        //ufo材质
        ambientProduct = mult(lightAmbient, vec4(1,1,0,1));
        diffuseProduct = mult(lightDiffuse, vec4(1,1,0,1));
        specularProduct = mult(lightSpecular, vec4(1,1,0,1));

        //组装
        let rotatemat=rotateZ(90);
        rotatemat=mult(rotate(UFOrolleddegree[1],UFOselfaxis[1]),rotatemat);

        let scalemat=scalem(0.1,0.1,0.1);
        let translatemat=translate(0,0,0);
        for(let i=0;i<3;i++){
            translatemat=mult(mytranslate(UFOselfaxis[i],UFOmovedistance[i]),translatemat);
        }

        let transmat = mult(scalemat,rotatemat);
        transmat=mult(translatemat, transmat);

        //半球玻璃
        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, glassNBufferID);
        //传值：法向量
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormal);
        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, glassvBufferID);
        //传值：顶点
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);
        //变换矩阵计算
        let glasstransMat = transmat;
        glasstransMat=mult(transviewMat,glasstransMat);
        //传值：变换矩阵
        gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(glasstransMat));
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );


        //传入光照信息-----
        gl.uniform4fv(ambientaddr, flatten(ambientProduct));
        gl.uniform4fv(diffuseaddr, flatten(diffuseProduct) );
        gl.uniform4fv(specularaddr,flatten(specularProduct));
        //绘制
        gl.drawArrays(gl.TRIANGLES, 0, numberofpoints[0]);


        //--------------------------------------------
        //底板
        //绑定缓冲区

        gl.bindBuffer(gl.ARRAY_BUFFER, plateNBufferID);
        //传值：法向量
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormal);
        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, platevBufferID);
        //传值：顶点
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);
        //上底板

        //传入光照信息
        gl.uniform4fv(ambientaddr, flatten(ambientProduct));
        gl.uniform4fv(diffuseaddr, flatten(diffuseProduct) );
        gl.uniform4fv(specularaddr,flatten(specularProduct));

        //变换矩阵计算
        let upplatetransMat = translate(0,-0.025,0);
        upplatetransMat=mult(transmat,upplatetransMat);
        upplatetransMat=mult(transviewMat,upplatetransMat);
        //传值：变换矩阵
        gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(upplatetransMat));
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
        //绘制
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, numberofpoints['plate']);
        //下底板
        //变换矩阵计算
        let downplatetransMat = mult(translate(0,-0.075,0),rotateZ(180));
        downplatetransMat=mult(transmat,downplatetransMat);
        downplatetransMat=mult(transviewMat,downplatetransMat);
        //传值：变换矩阵
        gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(downplatetransMat));
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
        //绘制
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, numberofpoints['plate']);

        //喷气口--------------------------------------------------------------
        //绑定缓冲区
        //传入光照信息----------------
        gl.uniform4fv(ambientaddr, flatten(ambientProduct));
        gl.uniform4fv(diffuseaddr, flatten(diffuseProduct));
        gl.uniform4fv(specularaddr,flatten(specularProduct));

        gl.bindBuffer(gl.ARRAY_BUFFER, jetNBufferID);
        //传值：法向量
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormal);
        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, jetvBufferID);
        //传值：顶点
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        //喷气口1
        //变换矩阵计算
        let jet1transMat = translate(0.1,-0.17,0);
        jet1transMat=mult(transmat,jet1transMat);
        jet1transMat=mult(transviewMat,jet1transMat);
        //传值：变换矩阵
        gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(jet1transMat));
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
        //绘制
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, numberofpoints[2]);

        //喷气口2
        //变换矩阵计算
        let jet2transMat = translate(-0.1,-0.17,0);
        jet2transMat=mult(transmat,jet2transMat);
        jet2transMat=mult(transviewMat,jet2transMat);
        //传值：变换矩阵
        gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(jet2transMat));
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) )
        //绘制
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, numberofpoints[2]);
    }
    {
        //组装
        let rotatemat=mult(rotate(planetrolleddegree[0],planetselfaxis[0]),rotateZ(-10));
        rotatemat=mult(rotateY(30),rotatemat);
        let scalemat=scalem(1.2,1.2,1.2);
        let translatemat=mult(mytranslate(planetselfaxis[0],planetmovedistance[0]),translate(0,0,0));
        let transmat = mult(scalemat,rotatemat);
        transmat=mult(translatemat, transmat);

        //星球主体

        ambientProduct = mult(lightAmbient, vec4(0.7,0.5,0.5,1));   //rgba(230, 126, 34,1.0)
        diffuseProduct = mult(lightDiffuse, vec4(0.8,0.5,0.5,1));
        specularProduct = mult(lightSpecular, vec4(0.8,0.5,0.5,1));
        gl.uniform4fv(ambientaddr, flatten(ambientProduct));
        gl.uniform4fv(diffuseaddr, flatten(diffuseProduct) );
        gl.uniform4fv(specularaddr,flatten(specularProduct));


        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, planetballNBufferID);
        //传值：法向量
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormal);

        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, planetballvBufferID);
        //传值：顶点
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);
        //变换矩阵计算
        let platformballtransMat = transmat;
        platformballtransMat=mult(transviewMat,platformballtransMat);
        //传值：变换矩阵
        gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(platformballtransMat));
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
        //绘制
        gl.drawArrays(gl.TRIANGLES, 0, numberofpoints[1]);

        //卫星环------------------------------------

        ambientProduct = mult(lightAmbient, vec4(0.6,0.0,0.6,1));   //rgba(230, 126, 34,1.0)
        diffuseProduct = mult(lightDiffuse, vec4(0.3,0.0,0.3,1));
        specularProduct = mult(lightSpecular, vec4(0.3,0.0,0.3,1));
        gl.uniform4fv(ambientaddr, flatten(ambientProduct));
        gl.uniform4fv(diffuseaddr, flatten(diffuseProduct) );
        gl.uniform4fv(specularaddr,flatten(specularProduct));
        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, discNBufferID);
        //传值：法向量
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormal);
        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, discvBufferID);
        //传值：顶点
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);
        //变换矩阵计算
        let disctransMat = transmat;
        disctransMat=mult(transviewMat,disctransMat);
        //传值：变换矩阵
        gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(disctransMat));
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
        //绘制
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, numberofpoints[3]);
    }



    requestAnimFrame(render);

}
