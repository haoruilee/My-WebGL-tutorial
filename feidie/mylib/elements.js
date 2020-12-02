
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


