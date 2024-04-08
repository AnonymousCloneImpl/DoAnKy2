package project.test_momo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import project.common.GenerateCodeUtils;
import project.const_.LANG;

import java.util.Objects;

@RestController
@RequestMapping("/api/payment/momo")
@CrossOrigin(origins = "*")
public class MomoOneTimePaymentController {
  @Autowired
  private MomoConfig momoConfig;

  @PostMapping("/create")
  public ResponseEntity<String> createPayment(@RequestBody MomoOrderData orderData) {
    MomoOneTimePaymentRequest paymentRequest = MomoOneTimePaymentRequest.builder()
      .partnerCode(momoConfig.getPartnerCode())
      .requestId(GenerateCodeUtils.getRandomId())
      .amount(Math.round(orderData.getTotalPrice() * 24740.0 * 100))
      .orderId(orderData.getOrderCode())
      .orderInfo("")
      .redirectUrl(momoConfig.getReturnUrl())
      .ipnUrl(momoConfig.getIpnUrl())
      .requestType("captureWallet")
      .extraData("")
      .lang(LANG.VN.val)
      .build();

    String signature = paymentRequest.makeSignature(momoConfig.getAccessKey(), momoConfig.getSecretKey());

    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    body.add("partnerCode", paymentRequest.getPartnerCode());
    body.add("accessKey", momoConfig.getAccessKey());
    body.add("requestId", paymentRequest.getRequestId());
    body.add("orderId", orderData.getOrderCode());
    body.add("orderInfo", "");
    body.add("redirectUrl", paymentRequest.getRedirectUrl());
    body.add("ipnUrl", paymentRequest.getIpnUrl());
    body.add("requestType", "captureWallet");
    body.add("amount", paymentRequest.getAmount());
    body.add("extraData", "");
    body.add("lang", LANG.VN.val);
    body.add("signature", signature);

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<?> httpEntity = new HttpEntity<>(body, httpHeaders);

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<MomoOneTimePaymentResponse> res =
      restTemplate.exchange(momoConfig.getPaymentUrl(), HttpMethod.POST, httpEntity, MomoOneTimePaymentResponse.class);
    return ResponseEntity.ok(Objects.requireNonNull(res.getBody()).toString());
  }
}
