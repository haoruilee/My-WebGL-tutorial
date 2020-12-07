// 顶点着色器
var 	trackingMouse = false;


var gl;
var canvas;
var program;



var ispause=true;
var isufo=false;
var cdata,vdata;
var numberofpoints=[];
var CurModelViewMatrixLoc;
var count=0;


//////////elements function////////////
function octalball(radius,count){

    let data=[];
    let a=[radius,0,0];
    let b=[0,radius,0];
    let c=[0,0,radius];
    data.push(...fenxing(a, b, c, count,radius));
    return data;
}
function fenxing(a,b,c,count,radius){
    if(count<=0){
        return [a,b,c];
    }
    let d,e,f;
    d=middlePoint(a,b,radius);
    e=middlePoint(b,c,radius);
    f=middlePoint(a,c,radius);
    let data=[];
    data.push(...fenxing(e,f,d,count-1,radius));
    data.push(...fenxing(a,d,f,count-1,radius));
    data.push(...fenxing(d,b,e,count-1,radius));
    data.push(...fenxing(f,e,c,count-1,radius));
    return data;
}
function middlePoint(a,b,radius){
    let c,d=[],e=[];
    for(let i=0;i<3;i++){
        d.push(b[i]+a[i]);
    }
    c=Math.pow(d[0]*d[0]+d[1]*d[1]+d[2]*d[2],1/2);
    for(let i=0;i<3;i++){
        e.push(radius*d[i]/c);
    }
    return e;
}

function quarterball(radius,count){
    let data=[];
    let a=[radius,0,0];
    let b=[0,radius,0];
    let c=[0,0,radius];
    let d=[-radius,0,0];
    data.push(...fenxing(a, b, c, count,radius));
    data.push(...fenxing(d, b, c, count,radius));
    return data;
}
function halfball(radius,count){
    let data=[];
    //半球的几个顶点
    let a=[radius,0,0];
    let b=[0,radius,0];
    let c=[0,0,radius];
    let d=[-radius,0,0];
    let f=[0,0,-radius];
    data.push(...fenxing(b, a, c, count,radius));
    data.push(...fenxing(d, b, c, count,radius));
    data.push(...fenxing(a, b, f, count,radius));
    data.push(...fenxing(b, d, f, count,radius));
    return data;
}
function totalball(radius,count){
    let data=[];
    let a=[radius,0,0];
    let b=[0,radius,0];
    let c=[0,0,radius];
    let d=[-radius,0,0];
    let e=[0,-radius,0];
    let f=[0,0,-radius];
    data.push(...fenxing(b, a, c, count,radius));
    data.push(...fenxing(d, b, c, count,radius));
    data.push(...fenxing(a, b, f, count,radius));
    data.push(...fenxing(b, d, f, count,radius));

    data.push(...fenxing(a, e, c, count,radius));
    data.push(...fenxing(e, d, c, count,radius));
    data.push(...fenxing(e, a, f, count,radius));
    data.push(...fenxing(d, e, f, count,radius));
    // data.push(...fenxing(a, b, c, count,radius));
    // data.push(...fenxing(b, d, c, count,radius));
    // data.push(...fenxing(b, a, f, count,radius));
    // data.push(...fenxing(d, b, f, count,radius));
    //
    // data.push(...fenxing(e, a, c, count,radius));
    // data.push(...fenxing(d, e, c, count,radius));
    // data.push(...fenxing(a, e, f, count,radius));
    // data.push(...fenxing(e, d, f, count,radius));
    return data;
}

function cylinder(radius,height,count){
    let data=[];
    for(let i=0;i<2*count;i++){
        data.push(radius*Math.cos(i*Math.PI/count));
        i%2===0?data.push(height/2):data.push(-height/2);
        data.push(radius*Math.sin(i*Math.PI/count));
    }
    data.push(radius);
    data.push(height/2);
    data.push(0);

    data.push(radius*Math.cos(Math.PI/count));
    data.push(-height/2);
    data.push(radius*Math.sin(Math.PI/count));
    return data;
}

function cvpitems(r1,r2,h,n) {
    let data=[];

    for(let i=0;i<n;i++){
        data.push(r1*Math.cos(i*Math.PI/(n/2)));
        data.push(h/2);
        data.push(r1*Math.sin(i*Math.PI/(n/2)));
        data.push(r2*Math.cos(i*Math.PI/(n/2)));
        data.push(-h/2);
        data.push(r2*Math.sin(i*Math.PI/(n/2)));
    }
    data.push(r1);
    data.push(h/2);
    data.push(0);

    data.push(r2);
    data.push(-h/2);
    data.push(0);
    return data;
}

function mytranslate(vect,distance){
    let a=Math.pow(vect[0]*vect[0]+vect[1]*vect[1]+vect[2]*vect[2],1/2);
    return a===0?translate(0,0,0):translate(vect[0] * distance / a, vect[1] * distance / a, vect[2] * distance / a);
}

function dynamicrotate(degree,selfaxisdata,rollingaixs,degreeplus) {
    let list=[];
    list.push(degree+degreeplus);
    list.push(selfaxiscal(selfaxisdata,rollingaixs,degreeplus));
    return list;
}

function selfaxiscal(selfaxisdata,rollingaixs,degree) {
    let xdata=selfaxisdata[0];
    let xabs=Math.pow((xdata[0]*xdata[0]+xdata[1]*xdata[1]+xdata[2]*xdata[2]),1/2);
    let ydata=selfaxisdata[1];
    let yabs=Math.pow((ydata[0]*ydata[0]+ydata[1]*ydata[1]+ydata[2]*ydata[2]),1/2);
    let zdata=selfaxisdata[2];
    let zabs=Math.pow((zdata[0]*zdata[0]+zdata[1]*zdata[1]+zdata[2]*zdata[2]),1/2);
    if(rollingaixs===0){
        ydata[1]=(ydata[2]*Math.cos(radians(degree))+ydata[1]*Math.sin(radians(degree)))/yabs;
        ydata[2]=(ydata[1]*Math.cos(radians(degree))-ydata[2]*Math.sin(radians(degree)))/yabs;
        zdata[1]=(zdata[2]*Math.cos(radians(degree))+zdata[1]*Math.sin(radians(degree)))/zabs;
        zdata[2]=(zdata[1]*Math.cos(radians(degree))-zdata[2]*Math.sin(radians(degree)))/zabs;
    }
    if(rollingaixs===1){
        xdata[0]=(xdata[0]*Math.cos(radians(degree))-xdata[2]*Math.sin(radians(degree)))/xabs;
        xdata[2]=(xdata[2]*Math.cos(radians(degree))+xdata[0]*Math.sin(radians(degree)))/xabs;
        zdata[0]=(zdata[0]*Math.cos(radians(degree))-zdata[2]*Math.sin(radians(degree)))/zabs;
        zdata[2]=(zdata[2]*Math.cos(radians(degree))+zdata[0]*Math.sin(radians(degree)))/zabs;
    }
    if(rollingaixs===2){
        xdata[0]=(xdata[0]*Math.cos(radians(degree))-xdata[1]*Math.sin(radians(degree)))/xabs;
        xdata[1]=(xdata[1]*Math.cos(radians(degree))+xdata[0]*Math.sin(radians(degree)))/xabs;
        ydata[0]=(ydata[0]*Math.cos(radians(degree))-ydata[1]*Math.sin(radians(degree)))/yabs;
        ydata[1]=(ydata[1]*Math.cos(radians(degree))+ydata[0]*Math.sin(radians(degree)))/yabs;
    }
    return [xdata,ydata,zdata];
}
///////////////////////////////////////////////



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

//球坐标系
//
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
    /*//球坐标系
//
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
const up = vec3(0.0, 1.0, 0.0); */
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

//一个半球玻璃
    {
        
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
        console.log("计算完法向量了")

        //缓冲区操作
        glassNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, glassNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        glassvBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, glassvBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
    }
//星球主体
    {

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

        //缓冲区操作
        planetballNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, planetballNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        planetballvBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, planetballvBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
        console.log("画了星球主体")
    }
//喷气口
    {

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
        console.log("画了喷气口")

        //缓冲区操作
        jetNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, jetNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        jetvBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, jetvBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
    }
//卫星环
    {
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
        console.log("画了卫星环")

        //缓冲区操作
        discNBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, discNBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(testNomal), gl.STATIC_DRAW);

        //缓冲区操作
        discvBufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, discvBufferID);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vdata), gl.STATIC_DRAW);
    }
 //UFO底板
    {
        var count = 500;
        vdata =cvpitems(0.2,0.6,0.05,count);
        let n = 2 * count + 2;
        numberofpoints['plate']=n;
        let testNomal=[]
        let len=vdata.length

//我没懂
        for(let i=0;i<len;i++){
            let t1=[vdata[0]-vdata[3],vdata[1]-vdata[4],vdata[2]-vdata[5]]
            let t2=[vdata[0]-vdata[6],vdata[1]-vdata[7],vdata[2]-vdata[8]];
            let nomalTemp = cross(t1, t2);
            nomalTemp = vec3(nomalTemp);

            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
            testNomal.push(nomalTemp)
        }
        console.log("画了UFO底板")
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

       ///////////////track mouse move////////////////
/*
       canvas.addEventListener("mousedown", function(event){
        //curx += 2*event.clientX/canvas.width-1;
        trackingMouse = true;
        //drawfinal(gl, viewProjMatrix, u_MvpMatrix, u_NormalMatrix)
        //near += 2*event.clientX/canvas.width-1;
        //theta+= event.clientX/canvas.width-1;
        //phi不影响视点
        //phi+=event.clientY/canvas.width-1;
        eye=vec3(2*event.clientX/canvas.width-1,2*event.clientY/canvas.width-1, 5*event.clientY/canvas.width-1);
        console.log("theta:",theta,"near:",near,"far:",far,"radius:",radius,"thata:",theta,"phi:",phi);
        console.log("eye:",eye,radius*Math.sin(theta)*Math.sin(phi),radius*Math.cos(theta));
        //变得太多了，需要print调参
    });

    canvas.addEventListener("mousemove", function(event){
        if(trackingMouse){
        //near += 2*event.clientX/canvas.width-1;
        //theta+= event.clientX/canvas.width-1;
        //改变eye则改变视点
        //eye = vec3(radius*Math.sin(theta)*Math.cos(phi),radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
        //phi+=event.clientY/canvas.width-1;
        eye=vec3(2*event.clientX/canvas.width-1,2*event.clientY/canvas.width-1,5*event.clientY/canvas.width-1);
        console.log("theta:",theta,"near:",near,"far:",far,"radius:",radius,"thata:",theta,"phi:",phi);
        console.log("eye:",eye,radius*Math.sin(theta)*Math.sin(phi),radius*Math.cos(theta));
        }
    });
    canvas.addEventListener("mouseup", function(event){
    trackingMouse = false;
    });
*/
    ///////////////////////////////////////////////

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


 
    //改变eye则改变视点，球坐标系计算到
    eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    render();
};



function render() {
    
    eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
    radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    UFOmovedistance[0]=0.9*Math.cos(radians(0-UFOrolleddegree[1]));
    UFOmovedistance[2]=0.9*Math.sin(radians(0-UFOrolleddegree[1]));

    lightPosition[0]=-Math.cos(radians(0-UFOrolleddegree[1]));
    lightPosition[2]=-Math.sin(radians(0-UFOrolleddegree[1]));

    //如果不ispause则移动飞碟和光照位置
    if(!ispause) {
        //动画
        lightPosition[0]=-1.0*Math.cos(radians(0-UFOrolleddegree[1]));
        lightPosition[1]=-1.0*Math.cos(radians(0-UFOrolleddegree[1]));
        lightPosition[2]=-1.0*Math.sin(radians(0-UFOrolleddegree[1]));
        UFOmovedistance[0]=0.9*Math.cos(radians(0-UFOrolleddegree[1]));
        UFOmovedistance[1]=0.9*Math.cos(radians(0-UFOrolleddegree[1]));
        UFOmovedistance[2]=0.9*Math.sin(radians(0-UFOrolleddegree[1]));

        UFOrolleddegree[1]++;

        // planetindex=UFOrolleddegree[1]%(colorArray.length)
        if(isufo){
            theta+=1*Math.PI/180.0;
        }
    }
    
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = mult(perspective(fovy, aspect, near, far),modelViewMatrix);


    // projectionMatrix = ortho(-1, 1, -1, 1, -100, 100);

    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
        flatten(lightPosition) );

    let transviewMat=mat4();
    // transviewMat=modelViewMatrix;
    {
        
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
        /**
         * 海绵宝宝：
         * var specularProduct = mult(lightSpecular, materialSpecular);
	projection = ortho(-1, 1, -1, 1, -100, 100);

	
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
       flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
       flatten(lightPosition) );
 */

        ambientProduct = mult(lightAmbient, vec4(1.0,1.0,214.0/255,1.0));//rgba(255,255,214,1.0)   
        diffuseProduct = mult(lightDiffuse, vec4(218.0/255,112.0/255,214.0/255,1.0));//rgba(218,112,214,1.0)
        specularProduct = mult(lightSpecular, vec4(28.0/255,112.0/255,214.0/255,1.0));//rgba(28,112,214,1.0)
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
        //var lightAmbient = vec4(0.3, 0.3, 0.3, 1.0 );     //全局的光
        //gl.uniform4fv(ambientaddr, flatten(ambientProduct)); //传入光照信息
        //ambientaddr=gl.getUniformLocation(program, "ambientProduct")  //获取变量地址
        //var ambientProduct = mult(lightAmbient, materialAmbient); 
        //后三位为颜色
        //颜色设定
        ambientProduct = mult(lightAmbient, vec4(230.0/255,126.0/255,34.0/255,1)); //rgba(230, 126, 34,1.0)
        diffuseProduct = mult(lightDiffuse, vec4(230.0/255,126.0/255,34.0/255,1));//改变反射后的光,rgba(20, 126, 34,1.0)
        specularProduct = mult(lightSpecular, vec4(0.0,1.0,1.0,1));//rgba(0, 255, 255,1.0) ?好像没找到，需要绑定ufo看看
        gl.uniform4fv(ambientaddr, flatten(ambientProduct));
        gl.uniform4fv(diffuseaddr, flatten(diffuseProduct) );
        gl.uniform4fv(specularaddr,flatten(specularProduct));
        /*
        //星球主体的此部分代码
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
        */ 
        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, discNBufferID);//discNBufferID为render卫星环部分
        //传值：法向量
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormal);
        //绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, discvBufferID);//discvBufferID为render部分卫星环缓冲区操作
        //传值：顶点
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);
        //变换矩阵计算
        let disctransMat = transmat;//disctransMat为卫星环的变换矩阵,在这里定义
        disctransMat=mult(transviewMat,disctransMat);
        //传值：变换矩阵
        gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(disctransMat));//disctransMat为卫星环变换矩阵
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
        //绘制
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, numberofpoints[3]);
    }



    requestAnimFrame(render);

}
