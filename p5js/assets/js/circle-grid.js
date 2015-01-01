var s = function(p5) {

  p5._pixelDensity = 1;
  var saveId = 0;

  var colorSrc;

  var customBg = {
    src: undefined,
    x: 0,
    y: 0,
    width: undefined,
    height: undefined
  };

  p5.doSave = function() {
    saveId++;
    p5.save('circle-grid-' + saveId + '.png');
  };

  p5.chooseColor = function(x, y, w) {
    if (!customBg.src) {
      p5.fill(p5.random(255));
    } else {
      var rCx = x + parseInt(p5.random(-w, w));
      var rCy = y + parseInt(p5.random(-w, w));
      var r = colorSrc.pixels[4 * (rCy * colorSrc.width + rCx)];
      var g = colorSrc.pixels[4 * (rCy * colorSrc.width + rCx) + 1];
      var b = colorSrc.pixels[4 * (rCy * colorSrc.width + rCx) + 2];
      p5.fill(r, g, b);
    }
  };

  p5.loadBgImage = function(img) {
    customBg.src = p5.loadImage(img, function(success) {
      if (customBg.src.width <= customBg.src.height) {
        customBg.width = p5.width;
        customBg.height = customBg.src.height * (p5.width / customBg.src.width);
      } else if (customBg.src.width >= customBg.src.height) {
        customBg.height = p5.height;
        customBg.width = customBg.src.width * (p5.height / customBg.src.height);
      }
      customBg.x = p5.width / 2 - customBg.width / 2;
      customBg.y = p5.height / 2 - customBg.height / 2;
      var nX = customBg.x + p5.width / 2;
      var nY = customBg.y + p5.height / 2;
      colorSrc.background(0);
      colorSrc.imageMode(p5.CENTER);
      colorSrc.image(customBg.src, nX, nY, customBg.width, customBg.height);
      colorSrc.loadPixels();
      p5.render();
    });
  };

  p5.render = function() {
    p5.background(0);
    p5.noStroke();
    p5.ellipseMode(p5.CENTER);

    var points = [];
    var circlesH = Math.ceil(document.getElementById('number-of-circles').value);
    var circlesV = Math.ceil(circlesH * (p5.width / p5.height));
    var circleWidth = Math.ceil(p5.width / circlesH);
    var innerCircles = p5.map(document.getElementById('number-of-inner-circles').value, 1, 100, 1, circleWidth);
    var innerCircleStep = Math.ceil(circleWidth / innerCircles);

    // Populate the points array

    for (var ix = 0; ix < circlesH; ix++) {
      for (var iy = 0; iy < circlesV; iy++) {
        var centerX = ix * circleWidth + circleWidth / 2;
        var centerY = iy * circleWidth + circleWidth / 2;
        points.push(p5.createVector(centerX, centerY));
      }
    }

    // Draw base layer

    for (var j = 0; j < points.length * 2; j++) {
      var rp = points[p5.floor(p5.random(points.length))];
      var mult = p5.random(1.5, 4);
      for (var i = 0; i < circleWidth * mult; i += innerCircleStep) {
        p5.chooseColor(parseInt(rp.x), parseInt(rp.y), circleWidth * mult);
        p5.ellipse(rp.x, rp.y, (circleWidth * mult - i), (circleWidth * mult - i));
      }
    }

    // Draw circle grid

    for (var jx = 0; jx < circlesH; jx++) {
      for (var jy = 0; jy < circlesV; jy++) {
        var cX = jx * circleWidth + circleWidth / 2;
        var cY = jy * circleWidth + circleWidth / 2;
        for (var k = 0; k < circleWidth; k += innerCircleStep) {
          p5.chooseColor(parseInt(cX), parseInt(cY), circleWidth);
          p5.ellipse(cX, cY, (circleWidth - k), (circleWidth - k));
        }
      }
    }

  };

  p5.setup = function() {
    var canvas = p5.createCanvas(1140, 760);
    canvas.parent('canvas-container');
    colorSrc = p5.createGraphics(p5.width, p5.height);
    p5.render();
  };

  p5.draw = function() {
    //p5.background(0);
  };
};

var sketch = new p5(s);

var onInputChange = function(elem) {
  var reader = new FileReader();
  if (elem.files && elem.files[0]) {
    reader.readAsDataURL(elem.files[0]);
  }
  reader.onloadend = function() {
    var filetypes = ['image/jpeg', 'image/gif', 'image/png'];
    var filetype = reader.result.split(':')[1].split(';')[0];
    if (filetypes.indexOf(filetype) !== -1) {
      sketch.loadBgImage(reader.result);
    } else {
      alert('The image must be a JPG, GIF or PNG');
    }
  };
};

var triggerUpload = function() {
  document.getElementById('file-upload').click();
};