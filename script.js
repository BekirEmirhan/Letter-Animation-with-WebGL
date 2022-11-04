var vertexShaderText = 
[
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'attribute vec3 vertColor;',
    '',
    'varying vec3 fragColor;',
    'uniform mat4 mWorld;',
    'uniform mat4 mView;',
    'uniform mat4 mProj;',
    '',
    'void main()',
    '{',
    '   fragColor = vertColor;',
    '   gl_Position = mProj * mView * mWorld *  vec4(vertPosition,0.0,1.0);',
    '}'
].join("\n");
var fragmentShaderText = 
[
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    '   gl_FragColor = vec4(fragColor,1.0);',
    '}'
].join("\n");


function init() {
    console.log("Working...") ;
    var canvas = document.getElementById("game-surface");
    var gl = canvas.getContext("webgl");
    if(!gl){
        console.log("WebGl not supported!");
        gl = canvas.getContext("exp-webgl");
    }
    if(!gl){
        alert("Your browser does not support WebGL");
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0,0,window.innerWidth,window.innerHeight);
    gl.clearColor(0.75,0.85,0.8,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader,vertexShaderText);
    gl.shaderSource(fragmentShader,fragmentShaderText);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
        console.error("ERROR compiling vertex shader!",gl.getShaderInfoLog(vertexShader));
        return;        
    }
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
        console.error("ERROR compiling vertex shader!",gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
        console.error("ERROR linking program!",gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
        console.error("ERROR validating program!",gl.getProgramInfoLog(program));
        return;
    }

    const numVerts = 20;
    const vertexIds = new Float32Array(numVerts);
    vertexIds.forEach((v, i) => {
        vertexIds[i] = i;
      });
    var u = vertexIds / numVerts;
    var angle = []
    for(var i = 0.1;i<1.2;i+=0.005){
        angle.push(i* Math.PI * 2.0)
    }       // goes from 0 to 2PI

    var radius = 0.8;
    var circle = [];
    
    console.log(angle.length)


    // BLOCK-1
    var xt = -0.4;
    var yt = -0.4;
    for(var i =0;i<=40;i++){
        circle.push(xt+i*0.001);
        circle.push(yt-i*0.001);
        circle.push(0);
        circle.push(0.1);
        circle.push(1.0);
        circle.push(1.0);
        circle.push(xt+i*0.001+0.7);
        circle.push(yt+0.7-i*0.001);
        //yt+=0.1;
        circle.push(0);
        circle.push(0.1);
        circle.push(1.0);
        circle.push(1.0);
    }





    // BLOCK-2
    var xt = -0.4;
    var yt = -0.4;
    for(var i =0;i<=40;i++){
        circle.push(xt+i*0.001);
        circle.push(yt+i*0.001);
        circle.push(0);
        circle.push(0.1);
        circle.push(1.0);
        circle.push(1.0);
        circle.push(xt-0.7+i*0.001);
        circle.push(yt+0.7+i*0.001);
        //yt+=0.1;
        circle.push(0);
        circle.push(0.1);
        circle.push(1.0);
        circle.push(1.0);
    }


    //BLOCK-3
    var xt = -0.4;
    var yt = -0.4;
    for(var i =0;i<=40;i++){
        circle.push(xt+0.4+i*0.001);
        circle.push(yt+0.4+i*0.001);
        circle.push(0);
        circle.push(0.1);
        circle.push(1.0);
        circle.push(1.0);
        circle.push(xt-0.3+i*0.001);
        circle.push(yt+1.1+i*0.001);
        //yt+=0.1;
        circle.push(0);
        circle.push(0.1);
        circle.push(1.0);
        circle.push(1.0);
        

        console.log(circle[i]);
    }


    //BLOCK-4
    var xt = -0.4;
    var yt = -0.4;
    for(var i =0;i<=40;i++){
        circle.push(xt+0.7-i*0.001);
        circle.push(yt+0.7-i*0.001);
        circle.push(0);
        circle.push(0.1);
        circle.push(1.0);
        circle.push(1.0);
        circle.push(xt-i*0.001);
        circle.push(yt+1.4-i*0.001);
        //yt+=0.1;
        circle.push(0);
        circle.push(0.1);
        circle.push(1.0);
        circle.push(1.0);
        

        console.log(circle[i]);
    }
    console.log(circle);
    var triangleVertices = 
    [//X,Y,Z        R,G,B
        0.0,0.5,0.0 ,   1.0,0.0,0.0,
        -0.5,-0.5,0.0,  0.0,1.0,0.0,
        0.5,-0.5,0.0,   0.0,0.0,1.0,
        1.0,-1.0,0.0,   0.0,0.0,1.0,
        0.3,-0.7,0.0,   0.0,0.0,1.0
    ];
    var triangleVertexBufferObject = gl.createBuffer();
    var circleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,circleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(circle),gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program,'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program,'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        6*Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        6*Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    gl.useProgram(program);
    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
    
    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);

    glMatrix.mat4.identity(worldMatrix);
    glMatrix.mat4.lookAt(viewMatrix,[0,0,-3],[0,0,0],[1,1,0]);
    glMatrix.mat4.perspective(projMatrix,glMatrix.glMatrix.toRadian(45),canvas.width / canvas.height,0.1,1000.0);

    gl.uniformMatrix4fv(matWorldUniformLocation,gl.FALSE,worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation,gl.FALSE,viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation,gl.FALSE,projMatrix);


    var identityMatrix = new Float32Array(16);
    glMatrix.mat4.identity(identityMatrix);
    var angle = 0;
    console.log(circle.length)
    t = 0.001;
    t2 = 0.01;
    var loop = function(){
        angle = performance.now() / 1000 *0.2 * 2* Math.PI;
        glMatrix.mat4.rotate(worldMatrix,identityMatrix,angle,[0,1,1]);
        
        gl.uniformMatrix4fv(matWorldUniformLocation,gl.FALSE,worldMatrix);
        glMatrix.mat4.translate(worldMatrix,worldMatrix,[t,0,0]);
        
        t+=t2;
        if(t>0.9){
            t2 = t2*-1;
        }
        if(t<-0.9){
            t2 = t2*-1;
        }
        gl.uniformMatrix4fv(matWorldUniformLocation,gl.FALSE,worldMatrix);
        gl.clearColor(0.75,0.85,0.8,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.LINES,0,1000); 
        //gl.drawArrays(gl.TRIANGLES,2,3); 
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);


    
    return true 

}
