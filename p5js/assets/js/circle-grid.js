var s = function(p5) {

  p5.setup = function() {
    var canvas = p5.createCanvas(600, 400);
    canvas.parent('canvas-container');
  };

  p5.draw = function() {
    p5.background(0);
  };
};

var sketch = new p5(s);