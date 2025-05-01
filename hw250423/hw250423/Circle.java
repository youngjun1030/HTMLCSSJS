package hw250423;

public class Circle {
    int radius;

    public Circle(int radius) {
        this.radius = radius;
    }

    void show() {
        System.out.println("반지름이 " + radius + "인 원이다.");
    }
}

class ColorCircle extends Circle {
    String color;

    public ColorCircle(int radius, String color) {
        super(radius);
        this.color = color;
    }

    @Override
    void show() {
        System.out.println("반지름이 " + radius + "인 " + color + "색 원이다.");
    }
}


