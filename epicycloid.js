var gui

function setup() {
	createCanvas(windowWidth, windowHeight, P2D)

	guiOptions = createGui("Options")
	guiOptions.setPosition(10, 10);

	sliderRange(0, 500, 0.1)
	guiOptions.addGlobals("R")
	sliderRange(0, 500, 0.1)
	guiOptions.addGlobals("r")
	sliderRange(0, 1000, 0.0001)
	guiOptions.addGlobals("phMax_")

	guiVisual = createGui("Visual")
	guiVisual.setPosition(10, 210);

	guiVisual.addGlobals("enablePoints")
	guiVisual.addGlobals("enableCircle1")
	guiVisual.addGlobals("enableCircle2")

	guiAnimation = createGui("Animation")
	guiAnimation.setPosition(10, 410);

	guiAnimation.addGlobals("enableAnim")

}

var c = 1

var R = 100
var r = 100
var ph = 0
var phMax_ = 6.28

var enablePoints = false
var enableCircle1 = true
var enableCircle2 = true

var enableAnim = true

function draw() {
	background(0)

	let windowCenterX = windowWidth / 2
	let windowCenterY = windowHeight / 2

	let oldX
	let oldY

	noFill()

	if (enableCircle1) {
		stroke(255, 255 , 255)
		strokeWeight(1)
		circle(windowCenterX, windowCenterY, R * 2)
	}

	let x
	let y

	let x1 
	let y1

	let max = phMax_

	if (enableAnim) {
		c = (c + 0.01 * (deltaTime / 100)) % 1
		max = phMax_ * c
	}


	for (ph = 0; ph < max; ph += 0.05) {
		
		let k = R / r

		x = r * (k + 1) * (cos(ph) - (cos((k + 1) * ph) / (k + 1)))
		y = r * (k + 1) * (sin(ph) - (sin((k + 1) * ph) / (k + 1)))

		x += windowCenterX
		y += windowCenterY

		stroke(255, 0 , 0)
		strokeWeight(1)
		line(x, y, oldX, oldY)

		if (enablePoints) {
			stroke(255, 255 , 255)
			strokeWeight(3)
			point(x, y)
		}

		oldX = x
		oldY = y

		x1 = cos(ph) * (R + r) + windowCenterX
		y1 = sin(ph) * (R + r) + windowCenterY

	}

	if (enableCircle2) {
		stroke(255, 255 , 255)
		strokeWeight(1)
		line(x, y, x1, y1)

		noFill()
		stroke(255, 255 , 255)
		strokeWeight(1)
		circle(x1, y1, r * 2)

		stroke(255, 255 , 255)
		strokeWeight(3)
		point(x, y)

		stroke(255, 255 , 255)
		strokeWeight(3)
		point(x1, y1)
	}	
}
