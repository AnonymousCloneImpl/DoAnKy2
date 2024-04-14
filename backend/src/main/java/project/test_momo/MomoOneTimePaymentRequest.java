package project.test_momo;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import project.common.Encode_Decode;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class MomoOneTimePaymentRequest {
    private String partnerCode;
    private String requestType;
    private String requestId;
    private String ipnUrl;
    private String redirectUrl;
    private String orderId;
    private String orderInfo;
    private Long amount;
    private String lang;
    private Boolean autoCapture;
    private String extraData;
    private String signature;

    public String makeSignature(String accessKey, String secretKey) {
        StringBuilder rawHash = new StringBuilder();
        rawHash.append("accessKey=").append(accessKey)
                .append("&amount=").append(this.amount)
                .append("&extraData=").append(this.extraData)
                .append("&ipnUrl=").append(this.ipnUrl)
                .append("&orderId=").append(this.orderId)
                .append("&orderInfo=").append(this.orderInfo)
                .append("&partnerCode=").append(this.partnerCode)
                .append("&redirectUrl=").append(this.redirectUrl)
                .append("&requestId=").append(this.requestId)
                .append("&requestType=").append(this.requestType);
        String hash = rawHash.toString();
        System.err.println(hash);
        try {
            this.signature = Encode_Decode.hmacSHA256(hash, secretKey);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return signature;
    }
}
