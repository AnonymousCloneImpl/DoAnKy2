package project.dto.payment;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaypalRequestDto implements Serializable {
	private String orderCode;
	private String paymentCode;
	private double total;
	private String currency;
	private String method;
	private String intent;
	private String description;
	private String cancelUrl = "http://localhost:8080/api/payment/paypal/cancel";
	private String successUrl = "http://localhost:3000/payment/success/paypal";

	/*
		- total: Một số thực đại diện cho tổng số tiền của thanh toán. Ví dụ: 50.00.
		- currency: Chuỗi đại diện cho loại tiền tệ được sử dụng trong thanh toán. Ví dụ: "USD" cho đô la Mỹ.
		- method: Chuỗi đại diện cho phương thức thanh toán được sử dụng. Ví dụ: "paypal" cho PayPal.
		- intent: Chuỗi đại diện cho mục đích của thanh toán. Ví dụ: "sale" cho một giao dịch bán hàng.
		- description: Mô tả ngắn gọn của thanh toán, giúp người dùng hiểu rõ hơn về nội dung của giao dịch.
		- cancelUrl: URL mà người dùng sẽ được chuyển đến nếu họ hủy bỏ thanh toán trên trang PayPal.
		- successUrl: URL mà người dùng sẽ được chuyển đến sau khi họ hoàn thành thanh toán trên trang PayPal.
	 */
}
