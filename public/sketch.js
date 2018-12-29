const dotCount = 4
const r_move = 0.08
const size = 10
let dot = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  background(255)

  for (let i = 0; i < dotCount; i++) {
    let e = new Dot(width / 2, height / 2, size, r_move)
    dot.push(e)
  }
}

function draw() {
  background(255)

  for (let i = 0; i < dot.length; i++) {
    dot[i].update()
    dot[i].render()
  }

  for (let i = 0; i < dot.length; i++) {
    let d1 = dot[i].getPos()
    let d2 = dot[(i + 1) % dot.length].getPos()
    let d3 = dot[(i + 2) % dot.length].getPos()
    stroke(dot[i].clr)
    fill(dot[i].clr)
    triangle(d1["x"], d1["y"], d2["x"], d2["y"], d3["x"], d3["y"])
  }
  noStroke()

}

function mousePressed() {
  for (let i = 0; i < dot.length; i++) {
    dot[i].setTarget(mouseX, mouseY)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

class Dot {
  constructor(xpos, ypos, size, round_move) {
    this.x = xpos
    this.y = ypos
    this.targetX = this.x
    this.targetY = this.y
    this.size = size
    this.round_move = round_move
    this.alpha = 80
    this.clr = color(random(0, 255), random(0, 255), random(0, 255), this.alpha)
  }

  render() {
    fill(this.clr)
    ellipse(this.x, this.y, this.size, this.size)
  }

  getPos() {
    return {
      "x": this.x,
      "y": this.y
    }
  }

  update() {
    let dx = this.targetX - this.x
    let dy = this.targetY - this.y
    if (abs(dx) > 0.1 || abs(dy) > 0.1) {
      this.x += dx * this.round_move
      this.y += dy * this.round_move
    } else {
      this.setRandomTarget()
    }
  }

  setTarget(xpos, ypos) {
    this.targetX = xpos
    this.targetY = ypos
  }

  setRandomTarget() {
    this.clr = color(random(0, 255), random(0, 255), random(0, 255), this.alpha)
    this.targetX = random(0, width)
    this.targetY = random(0, height)
  }
}
