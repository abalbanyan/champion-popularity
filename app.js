// Shaders
var vertexShaderText = `
precision mediump float;

attribute vec3 vertPosition;

attribute vec2 textureCoord;
varying vec2 fragTexCoord;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform vec4 vertColor;

varying vec4 vColor;

void main(){
	vColor = vertColor;
	fragTexCoord = textureCoord;
	gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}`

var fragmentShaderText = `
precision mediump float;
varying vec4 vColor;

varying vec2 fragTexCoord;
uniform sampler2D textureSampler;

void main(){
	gl_FragColor = texture2D(textureSampler, fragTexCoord);                
	//gl_FragColor = vColor;
}`


window.onload = function(){
	console.log("Starting.")
	var canvas = document.getElementById('webgl-canvas');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;


	var gl = canvas.getContext('webgl'); // For Chrome and Firefox, all that's needed.


	gl.clearColor(0.75, 0.85, 0.8, 1.0); // R G B A
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 

	// Retrieved champion data using http://api.champion.gg/docs/.
	console.log(championData[0].key, championData[0].roles[0].name, championData[0].roles[0].percentPlayed);

	// Send the shaders to the gpu and compile them.
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);
	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
		console.error("ERROR compiling vertex shader.", gl.getShaderInfoLog(vertexShader));
	}
	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
		console.error("ERROR compiling vertex shader.", gl.getShaderInfoLog(fragmentShader));
	}
	// Set up the program using the shaders.
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.useProgram(program); // Tell WebGL which program should be active.

	gl.enable(gl.DEPTH_TEST);


	////////////////// Icon generation. /////////////////////
	// brutal hack
	var sphereVertices = [
		1.0, 1.0, 1.0,    
		1.0, -1.0, 1.0,    
		-1.0, -1.0, 1.0,   
		-1.0, 1.0, 1.0 
	];
	var sphereIndices = [
		1,0,2,3,2,0
	]
	var textureCoordData = [
		0,0,
		0,1,
		1,1,
		1,0
	]
	var normalData = [
		1.0, 1.0, 1.0,    
		1.0, -1.0, 1.0,    
		-1.0, -1.0, 1.0,   
		-1.0, 1.0, 1.0 
	]

	var vertexOffset = sphereVertices.length;
	var indiceOffset = sphereIndices.length;
	var textureOffset = textureCoordData.length;
	var normalOffset = normalData.length;


	////////////////// Sphere generation. ///////////////////
	//var sphereVertices = [];
    //var normalData = [];
    //var textureCoordData = [];
    //var sphereIndices = []; 
    var latitudeBands = 30;
    var longitudeBands = 30;
    var radius = 10;
    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
    	var theta = latNumber * Math.PI / latitudeBands;
     	var sinTheta = Math.sin(theta);
      	var cosTheta = Math.cos(theta);

      	for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
        	var phi = longNumber * 2 * Math.PI / longitudeBands;
        	var sinPhi = Math.sin(phi);
        	var cosPhi = Math.cos(phi);

	        var x = cosPhi * sinTheta;
	        var y = cosTheta;
	        var z = sinPhi * sinTheta;
	        var u = 1 - (longNumber / longitudeBands);
	        var v = 1 - (latNumber / latitudeBands);

	        normalData.push(x);
	        normalData.push(y);
	        normalData.push(z);
	        textureCoordData.push(u);
	        textureCoordData.push(v);
	        sphereVertices.push(radius * x);
	        sphereVertices.push(radius * y);
	        sphereVertices.push(radius * z);       
	    }
    }
    for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
      for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
        var first = (latNumber * (longitudeBands + 1)) + longNumber;
        var second = first + longitudeBands + 1;
        sphereIndices.push(first);
        sphereIndices.push(second);
        sphereIndices.push(first + 1);

        sphereIndices.push(second);
        sphereIndices.push(second + 1);
        sphereIndices.push(first + 1);
      }
    }
    /////////////////////////////////////////////////////////

	var vertexBuffer = gl.createBuffer(); // Chunk of memory on GPU that is ready to use.
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // The active buffer is now an ARRAY_BUFFER, vertexBuffer.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereVertices), gl.STATIC_DRAW); 	// This uses whatever buffer is active. Float32Array is needed because webGL only uses 32 bit floats.  gl.STATIC_DRAW means we are sending the information once and not changing it.

	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereIndices), gl.STATIC_DRAW); 

	// Set attributes.
	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	gl.vertexAttribPointer(
		positionAttribLocation, // Atribute Location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE, // Normalization?
		3 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex in bytes.
		0 // Offset from beginning of single vertex to this attribute.
	);
	gl.enableVertexAttribArray(positionAttribLocation);

	/////////////////TEXTURES//////////////////////////////
	// Create texture buffer.
	var texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);

	var textureCoordAttribLocation = gl.getAttribLocation(program, 'textureCoord');
	gl.enableVertexAttribArray(textureCoordAttribLocation);
	gl.vertexAttribPointer(textureCoordAttribLocation, 2, gl.FLOAT, false, 0, 0);

	// Load the textures.
	var initializeTexture = function(texture, imgID){
		var image = new Image()
		image.onload = function(){
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texImage2D(
				gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
				gl.UNSIGNED_BYTE,
				image
			);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
		image.src = imgID;
		return texture;
	}

	// Generate textures for each of the 134 champions' roles.
	var imageArray = [];
	for(var i = 0; i < championData.length; i++){
		console.log(championData[i].key);
		for(var j = 0; j < championData[i].roles.length; j++){
			//imageArray.push("textures/" + championData[i].key);
			imageArray.push("textures/" + championData[i].roles[j].name);
			console.log(j);
		}
	}
	var textureArray = [];
	for(var i = 0; i < imageArray.length; i++){
	 	textureArray.push(gl.createTexture());
	 	initializeTexture(textureArray[i], imageArray[i]);
	}

	// Generate textures for each of the champion icons.
	var iconImageArray = [];
	for(var i = 0; i < championData.length; i++){
		iconImageArray.push("textures/" + championData[i].key);
	}
	var iconTextureArray = [];
	for(var i = 0; i < iconImageArray.length; i++){
	 	iconTextureArray.push(gl.createTexture());
	 	initializeTexture(iconTextureArray[i], iconImageArray[i]);
	}

	var roleImageArray = ["textures/ADC","textures/Middle","textures/Jungle","textures/Support", "textures/Top"];
	var roleTextureArray = [];
	for(var i = 0; i < iconImageArray.length; i++){
	 	roleTextureArray.push(gl.createTexture());
	 	initializeTexture(roleTextureArray[i], roleImageArray[i]);
	}

	///////////////////////////////////////////////////////

	var vertColor = gl.getUniformLocation(program, 'vertColor');
	var mWorldLoc = gl.getUniformLocation(program, 'mWorld');
	var mViewLoc = gl.getUniformLocation(program, 'mView');
	var mProjLoc = gl.getUniformLocation(program, 'mProj');

	// These are all initiliazed to 0.
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);

	var yPos = 0.0;
	var xPos = 0;
	var zPos = 0;
	var fovY = 45;
	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [xPos, yPos, -50], [xPos,yPos,0], [0,1,0]); // Eye, Point, Up. The camera is initialized using lookAt. I promise I don't use it anywhere else!
 	mat4.perspective(projMatrix, glMatrix.toRadian(fovY), canvas.width / canvas.height, 0.1, 1000.0); // fovy, aspect ratio, near, far

	// This is how we set variables in the shader. second variable must always be FALSE.
	gl.uniformMatrix4fv(mWorldLoc, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(mViewLoc, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(mProjLoc, gl.FALSE, projMatrix);
	
	var identityMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);
	var xzRotationMatrix = new Float32Array(16);
	var rotationMatrix = new Float32Array(16);
	var translationMatrix = new Float32Array(16);
	var scalingMatrix = new Float32Array(16);
	var navigationMatrix = new Float32Array(16);
	var crosshairMatrix = new Float32Array(16);
	
	var tempMatrix = new Float32Array(16);
	
	mat4.identity(identityMatrix);
	mat4.identity(crosshairMatrix);
	
	var heading = 0; // Degrees

	// Begin by resetting.
	yPos = -12;
	xPos = -8 * 10;
	zPos = 0;
	mat4.rotate(rotationMatrix, identityMatrix, glMatrix.toRadian(-heading), [0,1,0]);
	mat4.mul(viewMatrix, rotationMatrix, viewMatrix);
	gl.uniformMatrix4fv(mViewLoc, gl.FALSE, viewMatrix);

	fovY = 45;
	mat4.perspective(projMatrix, glMatrix.toRadian(fovY), canvas.width / canvas.height, 0.1, 1000.0); // fovy, aspect ratio, near, far
	gl.uniformMatrix4fv(mProjLoc, gl.FALSE, projMatrix);
	heading = 0;


	document.onkeydown = function(e){
		e = e || window.event;
		switch(e.keyCode){
			case 78: // n (narrower fov)
				fovY--;
				mat4.perspective(projMatrix, glMatrix.toRadian(fovY), canvas.width / canvas.height, 0.1, 1000.0); // fovy, aspect ratio, near, far
				gl.uniformMatrix4fv(mProjLoc, gl.FALSE, projMatrix);
				break;
			case 87: // wider fov
				fovY++;
				mat4.perspective(projMatrix, glMatrix.toRadian(fovY), canvas.width / canvas.height, 0.1, 1000.0); // fovy, aspect ratio, near, far
				gl.uniformMatrix4fv(mProjLoc, gl.FALSE, projMatrix);
				break;
			case 37: // left
				heading -= 4;
				mat4.rotate(rotationMatrix, identityMatrix, glMatrix.toRadian(-4), [0,1,0]);
				mat4.mul(viewMatrix, rotationMatrix, viewMatrix);
				gl.uniformMatrix4fv(mViewLoc, gl.FALSE, viewMatrix);
				break;
			case 38: // up
				yPos -= 0.25;
				break;
			case 39: // right
				heading += 4;
				mat4.rotate(rotationMatrix, identityMatrix, glMatrix.toRadian(4), [0,1,0]);
				mat4.mul(viewMatrix, rotationMatrix, viewMatrix);
				gl.uniformMatrix4fv(mViewLoc, gl.FALSE, viewMatrix);
				break;
			case 40: // down
				yPos += 0.25
				break; 
			case 82: // r - reset
				yPos = -12;
				xPos = -8 * 10;
				zPos = 0;
				mat4.rotate(rotationMatrix, identityMatrix, glMatrix.toRadian(-heading), [0,1,0]);
				mat4.mul(viewMatrix, rotationMatrix, viewMatrix);
				gl.uniformMatrix4fv(mViewLoc, gl.FALSE, viewMatrix);
			
				fovY = 45;
				mat4.perspective(projMatrix, glMatrix.toRadian(fovY), canvas.width / canvas.height, 0.1, 1000.0); // fovy, aspect ratio, near, far
				gl.uniformMatrix4fv(mProjLoc, gl.FALSE, projMatrix);
				heading = 0;
				break;
			case 73: // i - forward
				zPos -= Math.cos(glMatrix.toRadian(heading));
				xPos += Math.sin(glMatrix.toRadian(heading));
				break;
			case 74: // j - left   -----> negative x
				xPos -= Math.cos(glMatrix.toRadian(heading));
				zPos -= Math.sin(glMatrix.toRadian(heading));
				break;
			case 75: // k - right <----- positive x
				xPos += Math.cos(glMatrix.toRadian(heading));
				zPos += Math.sin(glMatrix.toRadian(heading));
				break;
			case 77: // m - backwards
				zPos += Math.cos(glMatrix.toRadian(heading));
				xPos -= Math.sin(glMatrix.toRadian(heading));
				break;
		}
	}

	var horSpacing = 4;
	var verSpacing = 13;
	var maxRowSize = 70;
	var translationVectors = [];
	var percentPlayed = [];
	console.log(championData.length);
	for(var i = 0; i < championData.length; i++){
		for(var j = 0; j < championData[i].roles.length; j++){
			if(i < maxRowSize){ // Bottom Row
	 			translationVectors.push([horSpacing * i, 5 * j, 0]);
		 		percentPlayed.push(championData[i].roles[j].percentPlayed / 100);
	 		}
	 		else{
	 			translationVectors.push([horSpacing * (i-maxRowSize), 5 * j + verSpacing, 16]);
	 			percentPlayed.push(championData[i].roles[j].percentPlayed / 100);
	 		}
		}
	}

	var iconTranslationVectors = [];
	for(var i = 0; i < championData.length; i++){
		if(i < maxRowSize) // Bottom Row
		 	iconTranslationVectors.push([horSpacing * i, -3, -2]);
		else
			iconTranslationVectors.push([horSpacing*(i-maxRowSize), -3 + verSpacing, 14]);

	}




	var globalScale = 0.2;

	// Render Loop
	var loop = function(){
		gl.clearColor(0.75, 0.85, 0.8, 1.0); // R G B A
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 

		theta = performance.now() / 1000 / 6 *  2 * Math.PI;

		// I use two rotation matrices for a more interesting rotation effect.
		mat4.rotate(xzRotationMatrix, identityMatrix, theta, [1,0,1]); 
		mat4.rotate(yRotationMatrix, identityMatrix, theta/4, [0,1,0]);
		mat4.mul(rotationMatrix, yRotationMatrix, xzRotationMatrix);

		// Navigation - I move the world instead of the camera.
		mat4.translate(navigationMatrix, identityMatrix, [xPos, yPos, zPos]);

		// For each of the champions' roles...
		for(var i = 0; i < translationVectors.length; i++){

			scale = globalScale * percentPlayed[i];

			mat4.scale(scalingMatrix, identityMatrix, [scale,scale,scale]);


			mat4.translate(translationMatrix, identityMatrix, translationVectors[i]);

			// Scale, rotate, translate.
			mat4.identity(worldMatrix);
			mat4.mul(worldMatrix, scalingMatrix, worldMatrix);
			mat4.mul(worldMatrix, rotationMatrix, worldMatrix);
			mat4.mul(worldMatrix, translationMatrix, worldMatrix);
			mat4.mul(worldMatrix, navigationMatrix, worldMatrix);

			
			gl.uniformMatrix4fv(mWorldLoc, gl.FALSE, worldMatrix);


			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, textureArray[i]);
			gl.uniform1i(gl.getUniformLocation(program, 'textureSampler'), 0);
			gl.drawElements(gl.TRIANGLES, sphereIndices.length - indiceOffset , gl.UNSIGNED_SHORT, indiceOffset * 2);

		}
		// Draw each of the icons
		for(var i = 0; i < iconTranslationVectors.length; i++){
			// icons
			mat4.translate(translationMatrix, identityMatrix, iconTranslationVectors[i]);
			mat4.identity(worldMatrix);
			mat4.mul(worldMatrix, translationMatrix, worldMatrix);
			mat4.mul(worldMatrix, navigationMatrix, worldMatrix);
			gl.uniformMatrix4fv(mWorldLoc, gl.FALSE, worldMatrix);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, iconTextureArray[i]);
			gl.uniform1i(gl.getUniformLocation(program, 'textureSampler'), 0);
			gl.drawElements(gl.TRIANGLES, indiceOffset , gl.UNSIGNED_SHORT, 0);
		}

		// Draw each of the role for reference
		for(var i = 0; i < 5; i++){
			mat4.identity(worldMatrix);
			mat4.translate(translationMatrix, identityMatrix, [i*3, 15, 0]);
			mat4.scale(scalingMatrix, identityMatrix, [0.1,0.1,0.1]);
			mat4.mul(worldMatrix, scalingMatrix, worldMatrix);
			mat4.mul(worldMatrix, rotationMatrix, worldMatrix);
			mat4.mul(worldMatrix, translationMatrix, worldMatrix);

			gl.uniformMatrix4fv(mWorldLoc, gl.FALSE, worldMatrix);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, roleTextureArray[i]);
			gl.uniform1i(gl.getUniformLocation(program, 'textureSampler'), 0);
			gl.drawElements(gl.TRIANGLES, sphereIndices.length - indiceOffset , gl.UNSIGNED_SHORT, indiceOffset * 2);

		}

		requestAnimationFrame(loop); 
	}
	requestAnimationFrame(loop);
}