package project.controller.payment;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.dto.payment.VnpayCheckoutDto;
import project.service.payment.VnpayService;

import java.io.IOException;

@RestController
@RequestMapping("/api/payment/vnpay")
@CrossOrigin(origins = "*")
public class VnPayController {
    @Autowired
    private VnpayService vnpayService;

    @PostMapping("/create")
    public String createPayment(@RequestParam(name = "amount") Double amount, @RequestParam(name = "orderCode") String orderCode) {
        return vnpayService.createPaymentApi(amount, orderCode);
    }

    @PostMapping("/checkPayment")
    public ResponseEntity<String> checkPayment(@RequestBody VnpayCheckoutDto checkoutDto, HttpServletRequest req) throws IOException {
        return ResponseEntity.ok(vnpayService.checkPayment(checkoutDto, req));
    }
}
