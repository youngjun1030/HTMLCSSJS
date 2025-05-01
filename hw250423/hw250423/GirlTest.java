package hw250423;

public class GirlTest {
    public static void main(String[] args) {
        Girl g1 = new Girl("갑순이");
        Girl g2 = new GoodGirl("콩쥐");
        GoodGirl gg = new BestGirl("황진이");

        // g2.show();
        g1.show();
        g2.show();
        gg.show();
    }
}

