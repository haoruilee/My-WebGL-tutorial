Room = function(gl, size) {
	this.size = size;
	//封装后的新建cube
	//新建屋子
	/*
	​
0: 8.333333333333334
​
1: 125
​
2: 8.333333333333334
​
length: 3
	*/
	this.roomMesh = MeshFactory.createCubeMesh(gl, size);
	//新建床（相对于屋子进行定义）
	this.tableMesh = MeshFactory.createCubeMesh(gl, [size[0] / 3, 8, size[2] / 3], [0, -size[1] / 4, 0], true);
	//[8.333333333333334, 125, 8.333333333333334]  [ 0, -62.5 ]
	console.log("房间定义：",[size[0] / 30, size[1] / 2, size[2] / 30], [0, -size[1] / 4]);
	this.texture = TextureLoader.get("res/wall.jpg");
	
	var arrays = [ "aPosition", "aNormal", "aTexcoord" ];
	var uniforms = [ "uProjection", "uModelview","uSampler", "uAmbientLight", "uLightPosition", "uLightIntensity" ];
	this.shaderProgram = ShaderDatabase.link(gl, "room-vertex-shader", "room-frag-shader", arrays, uniforms);
};

Room.prototype.renderCube = function(gl, mesh, camera, lightPosition, lightIntensity) {
	// enable depth test
	gl.enable(gl.DEPTH_TEST);
	
	// setup shader
    gl.useProgram(this.shaderProgram);
    gl.uniformMatrix4fv(this.shaderProgram.uniforms["uProjection"], false, camera.getProjection());
    gl.uniformMatrix4fv(this.shaderProgram.uniforms["uModelview"], false, camera.getModelview());
    gl.uniform3fv(this.shaderProgram.uniforms["uAmbientLight"], [0.08, 0.06, 0.02]);
    gl.uniform3fv(this.shaderProgram.uniforms["uLightPosition"], lightPosition);
    gl.uniform1f(this.shaderProgram.uniforms["uLightIntensity"], lightIntensity);
	
	// enable vertex arrays
	gl.enableVertexAttribArray(this.shaderProgram.arrays["aPosition"]);
	gl.enableVertexAttribArray(this.shaderProgram.arrays["aTexcoord"]);
	
	// bind position buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.positionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.arrays["aPosition"], 3, gl.FLOAT, false, 0, 0);

	// bind normal buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
	gl.vertexAttribPointer(this.shaderProgram.arrays["aNormal"], 3, gl.FLOAT, false, 0, 0);
	
	// bind texture coordinate buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.texcoordBuffer);
	gl.vertexAttribPointer(this.shaderProgram.arrays["aTexcoord"], 2, gl.FLOAT, false, 0, 0);

	// bind texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.shaderProgram.uniforms["uSampler"], 0);

	// bind index buffer
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
	
	// render
	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
	gl.flush();	
};

Room.prototype.update = function(gl, camera, lightPosition, lightIntensity) {
	gl.disable(gl.BLEND);
	
	this.renderCube(gl, this.roomMesh, camera, lightPosition, lightIntensity);
	this.renderCube(gl, this.tableMesh, camera, lightPosition, lightIntensity);
};