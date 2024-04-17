package project.test_momo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import project.common.Encode_Decode;
import project.common.GenerateCodeUtils;
import project.const_.LANG;

import java.util.Objects;

@RestController
@RequestMapping("/payment/momo")
@CrossOrigin(origins = "*")
@Slf4j(topic = "MOMO_PAYMENT")
public class MomoOneTimePaymentController {
    @Autowired
    private MomoConfig momoConfig;

    @PostMapping("/create")
    public ResponseEntity<String> createPayment(@RequestBody MomoOrderData orderData) {
        String jsonData = "{\"user\": \"luu\"}";

        MomoOneTimePaymentRequest paymentRequest = MomoOneTimePaymentRequest.builder()
                .partnerCode(momoConfig.getPartnerCode())
                .requestId(GenerateCodeUtils.getRandomId())
                .amount(Math.round(orderData.getTotalPrice() * 24740 * 100))
                .orderId(orderData.getOrderCode())
                .orderInfo("test")
                .redirectUrl(momoConfig.getRedirectUrl())
                .ipnUrl(momoConfig.getIpnUrl())
                .requestType("captureWallet")
                .extraData(Encode_Decode.encode64(jsonData))
                .lang(LANG.VN.val)
                .autoCapture(true)
                .build();

        String signature = paymentRequest.makeSignature(momoConfig.getAccessKey(), momoConfig.getSecretKey());
        System.err.println(paymentRequest);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("partnerCode", paymentRequest.getPartnerCode());
        body.add("requestId", paymentRequest.getRequestId());
        body.add("amount", paymentRequest.getAmount());
        body.add("orderId", paymentRequest.getOrderId());
        body.add("orderInfo", paymentRequest.getOrderInfo());
        body.add("redirectUrl", paymentRequest.getRedirectUrl());
        body.add("ipnUrl", paymentRequest.getIpnUrl());
        body.add("requestType", paymentRequest.getRequestType());
        body.add("extraData", paymentRequest.getExtraData());
        body.add("lang", paymentRequest.getLang());
        body.add("signature", signature);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<?> httpEntity = new HttpEntity<>(body, httpHeaders);

        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<MomoOneTimePaymentResponse> res =
                    restTemplate.exchange(momoConfig.getPaymentUrl(),
                            HttpMethod.POST, httpEntity, MomoOneTimePaymentResponse.class);
            return ResponseEntity.ok(Objects.requireNonNull(res.getBody()).toString());
        } catch (HttpClientErrorException.BadRequest ex) {
            String responseBody = ex.getResponseBodyAsString();
            log.error("Error response from Momo: {}", responseBody);
        }
        return ResponseEntity.ofNullable("");
    }
}
