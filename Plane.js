class plane {
  constructor(x, y, e) {
    this.pos = createVector(x, y)
    this.bornIn = createVector(x, y)
    this.angle = p5.Vector.fromAngle(0)
    //this.color = {r:random(255), g:random(255), b:random(255)}
    this.color = randColorOf()
    this.path = 0;
    this.focus = true
    this.term = false
    this.parked = {b:false, i:0}
    this.index = e
    pc++
  }
  
  show(sc) {
    push()
    if (sc) {
      fill(this.color.r, this.color.g, this.color.b, 255)
      stroke(200, 200, 200)
    }else {
      fill(this.color.r, this.color.g, this.color.b, 200)
      stroke(255, 255, 255)
    }
    ellipse(this.pos.x, this.pos.y, s)
    pop()
  }
  
  moveBy(x, y, a) {
    if (a) {
      let ang = p5.Vector.fromAngle((radians(a)))
      this.pos.y = this.pos.y + (ang.y*y)
      this.pos.x = this.pos.x + (ang.x*x)
      
      
    }else {
      this.pos.x = this.pos.x + x
      this.pos.y = this.pos.y + y
    }
  }
  
  moveTowards(x, y, s) {
    let angBet = anglebetween(this.pos, createVector(x, y))
    this.moveBy(-s, -s, angBet)
  }
  
  definePath(pts) {
    this.path = pts
  }
  
  followPath(s) {  
    if (this.path[0]) {
      push()
      strokeWeight(2)
      stroke(this.color.r, this.color.g, this.color.b)
      line(this.pos.x, this.pos.y, this.path[0].x, this.path[0].y)
      pop()
      this.moveTowards(this.path[0].x, this.path[0].y, s)

      if(this.pos.x-s < this.path[0].x && this.pos.x+s > this.path[0].x && this.pos.y-s < this.path[0].y && this.pos.y+s > this.path[0].y) {
        this.path.shift()
        this.term = true
      }else {this.term = false}
    
      for(let i = 0; i < this.path.length; i++) {
        if (this.path[i+1]) {
          push()
          strokeWeight(2)
          stroke(this.color.r, this.color.g, this.color.b)
          line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y)
          pop()
        }
      }
      
    }else{
      if (this.focus == false) {
        let p = p5.Vector.fromAngle((anglebetween(this.pos, createVector(this.bornIn.x, this.bornIn.y))))
        this.moveTowards(this.bornIn.x, this.bornIn.y, -s)
      }
    }
  }
  
  updatePath(pts) {
    this.path.push(pts)
  }
  
  distFrom(e, f) {
    return((dist(this.pos.x, this.pos.y, e, f)))
    
  }
  
  colliding(items) {
    let no = 0
    let id = []
    for(let i = 0; i < items.length; i++) {
      if(this.distFrom(items[i].pos.x, items[i].pos.y) < s) {
        no++
        if(this.index != i) {
          id.push(i)
        }
      }
    }
    if(no > 1) {return {if:true, i:id}}else{return false}
  }
  
  outSide() {
    if(this.pos.x > 1220 || this.pos.x < -620 || this.pos.y > 1220 || this.pos.y < -620) {
      return true
    }
  }
  
  die() {
    this.definePath([{x:random(200, 400), y:random(200,400)}])
    this.focus = false
    this.parked = {b:false, i:0}
    this.pos.x = randPos().x
    this.pos.y = randPos().y
    this.bornIn.x = this.pos.x
    this.bornIn.y = this.pos.y
    pc++
  }
  
  park(where) {
    
  }
}