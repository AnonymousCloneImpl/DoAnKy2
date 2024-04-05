package project.service.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import project.const_.PAYMENT_METHOD;
import project.dto.order.OrderDto;
import project.entity.order.Order;
import project.entity.payment.PaymentTbl;
import project.repository.PaymentTblRepository;
import project.service.payment.paypal.PaypalService;

@Service
public class PaymentService {
    @Autowired
    private PaypalService paypalService;
    @Autowired
    private PaymentTblRepository paymentRepo;

    public void createPaymentTbl(OrderDto orderDto, Order order) {
        PAYMENT_METHOD paymentMethod = orderDto.getPaymentMethod();
        System.err.println(paymentMethod);

        PaymentTbl payment = PaymentTbl.builder()
            .orderCode(order.getOrderCode())
            .state("PENDING")
            .paymentMethod(paymentMethod)
            .build();

        switch (paymentMethod) {
            case COD -> paymentRepo.save(payment);
            case PAYPAL -> paypalService.save(payment);
//            case VNPAY ->
//            case MOMO ->
        }
    }

    public PAYMENT_METHOD getPaymentMethodByOrderCode(String code) {
        return paymentRepo.getPaymentMethodByOrderCode(code);
    }
}
