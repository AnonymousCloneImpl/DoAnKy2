package project.const_;

public enum SHIPPING_METHOD {
    STANDARD_SHIPPING(50), FAST_SHIPPING(100);
    public final int val;

    SHIPPING_METHOD(int val) {
        this.val = val;
    }
}
