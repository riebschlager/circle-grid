import java.util.Iterator;

PImage src;
int circleWidth;

void setup() {
  size(3840, 2160);
  background(0);
  noStroke();
  src = loadImage("https://c1.staticflickr.com/8/7310/27946429080_44d3334ba0_c.jpg");
  src.resize(width, height);
  circleWidth = width / 20;
  int circlesH = floor(width / circleWidth);
  int circlesV = floor(height / circleWidth);
  ArrayList<PVector> points = new ArrayList<PVector>();

  for (int iy = 0; iy < circlesV; iy++) {
    for (int ix = 0; ix < circlesH; ix++) {
      float centerX = ix * circleWidth + circleWidth / 2;
      float centerY = iy * circleWidth + circleWidth / 2;
      points.add(new PVector(centerX, centerY));
    }
  }

  for (Iterator<PVector> p = points.iterator(); p.hasNext(); ) {
    PVector point = p.next();
    float centerX = point.x;
    float centerY = point.y;
    float multiplier = random(1, 4);
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
  save("output/" + System.currentTimeMillis() + ".png");
  exit();
}