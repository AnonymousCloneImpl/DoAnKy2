package project.test_momo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MomoOneTimePaymentResponse {
	private String partnerCode;
	private String orderId;
	private String requestId;
	private int amount;
	private long responseTime;
	private String message;
	private int resultCode;
	private String payUrl;
	private String deeplink;
	private String applink;
	private String deeplinkMiniApp;
	private String signature;
}
