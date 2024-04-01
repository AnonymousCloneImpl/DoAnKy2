package project.const_;

public enum PAYMENT_METHOD {
    COD("Cash On Delivery"),
    PAYPAL("Online Payment");
    public final String val;

    PAYMENT_METHOD(String type) {
        this.val = type;
    }
}
