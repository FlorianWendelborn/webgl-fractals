var startTime

var gl

var vertexShader, fragmentShader

var buffer

var program

var positionLocation

var width, height

window.onload = function init() {
	var canvas = document.getElementById('canvas')

	gl = canvas.getContext('experimental-webgl')

	updateDimensions()

	startTime = new Date().getTime()

	vertexShader = createShaderFromScriptElement(gl, 'header-vertex-shader')
	fragmentShader = createShaderFromScriptElement(gl, 'header-fragment-shader')

	program = createProgram(gl, [vertexShader, fragmentShader])
	gl.useProgram(program)

	positionLocation = gl.getAttribLocation(program, 'a_position')

	// Create a buffer and put a single clipspace rectangle in
	// it (2 triangles)
	buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
			-1.0,
			-1.0,
			1.0,
			-1.0,
			-1.0,
			1.0,
			-1.0,
			1.0,
			1.0,
			-1.0,
			1.0,
			1.0,
		]),
		gl.STATIC_DRAW
	)
	gl.enableVertexAttribArray(positionLocation)
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

	render()
}

window.onresize = updateDimensions

function render() {
	var time = new Date().getTime() - startTime
	gl.uniform1f(gl.getUniformLocation(program, 'time'), time / 1000)
	gl.uniform2f(gl.getUniformLocation(program, 'resolution'), width, height)
	// draw
	gl.drawArrays(gl.TRIANGLES, 0, 6)

	requestAnimationFrame(render)
}

function updateDimensions() {
	height = document.documentElement.clientHeight
	width = document.documentElement.clientWidth
	canvas.height = height
	canvas.width = width
	gl.viewport(0, 0, width, height)
}
