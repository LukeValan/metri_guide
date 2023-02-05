class goal {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.occupied = false
  }
  
  show() {
    push()
    fill(100, 255, 150)
    rect(this.pos.x-25, this.pos.y-25, 50, 50)
    fill(100, 150, 255)
    ellipse(this.pos.x, this.pos.y, 50)
    strokeWeight(5)
    stroke(255, 100, 150)
    line(this.pos.x-10, this.pos.y-15, this.pos.x-10, this.pos.y+15)
    line(this.pos.x+10, this.pos.y-15, this.pos.x+10, this.pos.y+15)
    line(this.pos.x-11, this.pos.y, this.pos.x+11, this.pos.y)
    pop()
  }
}