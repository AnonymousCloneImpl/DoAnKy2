package project.const_;

public enum ORDER_STATUS {
    WAITING("Waiting for order confirmation"),
    PREPARING("Preparing orders"),
    DELIVERY("Delivery"),
    COMPLETE("Complete the order");
    public final String val;

    ORDER_STATUS(String type) {
        this.val = type;
    }
}
