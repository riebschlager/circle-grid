PImage src;
int circleWidth = 90;

void setup() {
  background(0);
  noStroke();
  src = loadImage("http://img.ffffound.com/static-data/assets/6/3e12c7ffb88aa2c027e785d937847227443e0df7_m.jpg");
  src.resize(1920, 1080);
  size(src.width, src.height);
  int circlesH = floor(width / circleWidth);
  int circlesV = floor(height / circleWidth);
  ArrayList<PVector> points = new ArrayList<PVector>();

  for (int ix = 0; ix < circlesH; ix++) {
    for (int iy = 0; iy < circlesV; iy++) {
      float centerX = ix * circleWidth + circleWidth / 2;
      float centerY = iy * circleWidth + circleWidth / 2;
      points.add(new PVector(centerX, centerY));
    }
  }

  for (int j = 0; j < 5000; j++) {
    PVector randomPoint = points.get(floor(random(points.size())));
    float centerX = randomPoint.x;
    float centerY = randomPoint.y;
    float multiplier = random(1, 2);
    for (int i = 0; i < circleWidth; i++) {
      int pixel = src.get(floor(centerX), floor(centerY - i / 2));
      fill(pixel);
      ellipse(centerX, centerY, (circleWidth - i) * multiplier, (circleWidth - i) * multiplier);
    }
  }
  for (int ix = 0; ix < circlesH; ix++) {
    for (int iy = 0; iy < circlesV; iy++) {
      noStroke();
      ellipseMode(CENTER);
      float centerX = ix * circleWidth + circleWidth / 2;
      float centerY = iy * circleWidth + circleWidth / 2;
      for (int i = 0; i < circleWidth; i+=15) {
        int pixel = src.get(floor(centerX), floor(centerY - i / 2));
        fill(pixel);
        ellipse(centerX, centerY, (circleWidth - i), (circleWidth - i));
      }
    }
  }
  int randomName = floor(random(10000));
  save("output-" + randomName + ".png");
}

void draw() {
  //
}

