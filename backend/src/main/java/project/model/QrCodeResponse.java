package project.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QrCodeResponse {
	private String price;
	private float tax;
	private String qrCode;
}
