package project.test_momo;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class MomoConfig {
    @Value("${momo.partnerCode}")
    private String partnerCode;
    @Value("${momo.returnUrl}")
    private String returnUrl;
    @Value("${momo.paymentUrl}")
    private String paymentUrl;
    @Value("${momo.ipnUrl}")
    private String ipnUrl;
    @Value("${momo.accessKey}")
    private String accessKey;
    @Value("${momo.secretKey}")
    private String secretKey;
}
