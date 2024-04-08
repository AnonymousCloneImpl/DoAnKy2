package project.const_;

public enum PAYMENT_METHOD {
  COD("Cash On Delivery"),
  PAYPAL("PayPal"),
  VNPAY("VN Pay"),
  MOMO("MoMo");
  public final String val;

  PAYMENT_METHOD(String type) {
    this.val = type;
  }
}
