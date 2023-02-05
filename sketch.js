let planes = [];
let goals = []
let colors = [{r:255, b:0, g:0}, {r:0, b:255, g:100}, {r:0, b:0, g:255}, {r:255, b:0, g:255}, {r:255, b:255, g:0}, {r:0, b:255, g:255}, {r:255, b:255 , g:255}]
let cr = 0;
let lr = 0;
let s = 40

let pc = 0;
let t;
let sp = 2

function preload() {

}

function setup() {
  createCanvas(600, 600);
  t = 0
  for(let i = 0; i < 1; i ++) {
    goals.push(new goal(random(200, 400), random(400,600)))
  }
  
  for(let i = 0; i < 1; i ++) {
    
    planes.push(new plane(randPos().x, randPos().y, i))
    planes[planes.length-1].definePath([{x:300, y:300}])
    planes[i].focus = false
  }
  
}
setInterval(function() {
  t++
},1000)
setInterval(function() {
  if(planes.length < 7) {
    planes.push(new plane(randPos().x, randPos().y, planes.length-1))
    let i = planes.length-1;
    planes[i].definePath([{x:300, y:300}])
    planes[i].focus = false
  }
},15000)
setInterval(function() {
  if(goals.length < 1) {
    goals.push(new goal(random(200, 400), random(400,600)))
  }
},30000)

function draw() {
  background(1);
  grid()
  // Control Goals
  for(let i = 0; i < goals.length; i++) {
    goals[i].show()
  }
  // Control Planes
  
  for (let i = 0; i < planes.length; i++) {
    planes[i].followPath(sp)
    if (planes[i].focus == true) {
      planes[i].updatePath({x:mouseX, y:mouseY})
      planes[i].show(1)
    }else{
      planes[i].show()
    }
    if (planes[i].colliding(planes).if == true) {
      planes[planes[i].colliding(planes).i[0]].die()
      planes[i].die()
      
      cr++
      cr++
    }
    if(planes[i].outSide() == true) {
      planes[i].die()
    }
    for(let e = 0; e < goals.length; e ++) {
      if(planes[i].distFrom(goals[e].pos.x, goals[e].pos.y) < s) {
        if(goals[e].occupied == false) {
          planes[i].die()
          lr++
        }
      }
    }
  }
    
  hud()
}

function grid() {
  for(let i = -200; i < 300; i = i + 15) {
    push()
    stroke(255, 255, 255, 150)
    line(i*2, 0, i*2, 600)
    pop()
  }
  for(let i = -200; i < 300; i = i + 15) {
    push()
    stroke(255, 255, 255, 150)
    line(0, i*2, 600, i*2)
    pop()
  }
}

function randPos() {
  let side = ceil(random(4))
    let x,y;
    if(side == 1) {
      x = random(-600,-300)
      y = random(0,600)
      
    }else if(side == 2) {
      x = random(1200, 900)
      y = random(0,600)
      
    }else if(side == 3) {
      x = random(0,600)
      y = random(-600,-300)
      
    }else {
      x = random(0,600)
      y = random(1200,900)
      
    }
  return createVector(x, y)
}

function anglebetween(pos, pos2) {
  return ((Math.atan2(pos.y - pos2.y, pos.x - pos2.x) * 180) / Math.PI);
}

function mousePressed() {
  for(let i = 0; i < planes.length; i++) {
    planes[i].focus = false
    if(planes[i].distFrom(mouseX, mouseY) < s) {
      planes[i].definePath([])
      planes[i].focus = true
    }
  }
}

function hud(n) {
  push()
  textSize(24)
  fill(255, 150, 200)
  text("Crashes: "+cr, 15, 195)
  text("Landings: "+lr, 15, 78)
  text("Planes: "+pc, 15, 117)
  text("Flights: "+planes.length, 15, 156)
  text("Score: "+(lr/(cr+1))*((t+1)/10), 15, 39)
  text("Time: "+t, 15, 234)
  pop()
}

function randColorOf () {
  let e = floor(random(0, colors.length))
  let c = colors[e]
  colors.splice(e, 1)
  return c
}