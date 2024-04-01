package project.const_;

public enum PAYMENT_METHOD {
    COD("Cash On Delivery"),
    ONLINE_PAYMENT("Online Payment");
    public final String val;

    PAYMENT_METHOD(String type) {
        this.val = type;
    }
}
