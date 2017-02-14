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

	////////////////// Sphere generation. ///////////////////
	var sphereVertices = [];
    var normalData = [];
    var textureCoordData = [];
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
    var sphereIndices = []; 
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
    console.log(textureCoordData);
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

	var vertColor = gl.getUniformLocation(program, 'vertColor');
	var mWorldLoc = gl.getUniformLocation(program, 'mWorld');
	var mViewLoc = gl.getUniformLocation(program, 'mView');
	var mProjLoc = gl.getUniformLocation(program, 'mProj');

	// These are all initiliazed to 0.
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);

	var posY = 0.0;
	var fovY = 45;
	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, posY, -50], [0.0,posY,0], [0,1,0]); // Eye, Point, Up. The camera is initialized using lookAt. I promise I don't use it anywhere else!
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
	
	var crosshairOn = 0;
	var heading = 0; // Degrees
	var colorOffset = 0;
	var xPos = 0;
	var zPos = 0;
	var yPos = 0;

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
				yPos = 0;
				xPos = 0;
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
			case 187: // + - crosshair
				if(crosshairOn)
					crosshairOn = 0;
				else
					crosshairOn = 1;
				break;
		}
	}

	var translationVectors = [
		[ 0, 0, 0],
		[ 20, 0, 0]
	]

	var scale = 1;

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

		// Each cube is scaled by the same amount.
		mat4.scale(scalingMatrix, identityMatrix, [scale,scale,scale]);

		for(var i = 0; i < translationVectors.length; i++){
			mat4.translate(translationMatrix, identityMatrix, translationVectors[i]);

			// Scale, rotate, translate.
			mat4.identity(worldMatrix);
			mat4.mul(worldMatrix, scalingMatrix, worldMatrix);
			mat4.mul(worldMatrix, rotationMatrix, worldMatrix);
			mat4.mul(worldMatrix, translationMatrix, worldMatrix);
			mat4.mul(worldMatrix, navigationMatrix, worldMatrix);
			
			gl.uniformMatrix4fv(mWorldLoc, gl.FALSE, worldMatrix);
//		 	gl.uniform4fv(vertColor, getColor(i));
			gl.drawElements(gl.TRIANGLES, sphereIndices.length , gl.UNSIGNED_SHORT, 0);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, textureArray[i]);
			gl.uniform1i(gl.getUniformLocation(program, 'textureSampler'), 0);

		}
		requestAnimationFrame(loop); 
	}
	requestAnimationFrame(loop);
}