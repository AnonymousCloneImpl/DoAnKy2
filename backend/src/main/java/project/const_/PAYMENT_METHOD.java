package project.const_;

public enum PAYMENT_METHOD {
	COD("Cash On Delivery"),
	PAYPAL("PayPal"),
	QRCODE_PAYPAL("Qr Code Paypal"),
	VNPAY("VN Pay"),
	MOMO("MoMo");
	public final String val;

	PAYMENT_METHOD(String type) {
		this.val = type;
	}
}
