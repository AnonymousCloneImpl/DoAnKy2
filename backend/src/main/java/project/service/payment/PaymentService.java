package project.service.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import project.const_.PAYMENT_METHOD;
import project.dto.order.OrderDto;
import project.entity.order.Order;
import project.entity.payment.PaymentTbl;
import project.repository.PaymentTblRepository;

import java.time.LocalDateTime;

@Service
public class PaymentService {
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

		paymentRepo.save(payment);
	}

	public Long getByOrderCode(String orderCode) {
		PaymentTbl paymentTbl = paymentRepo.findByOrderCode(orderCode);
		return paymentTbl.getId();
	}

	public void updatePaymentByOrderCode(String paymentCode, String orderCode) {
		Long id = getByOrderCode(orderCode);
		System.out.println(id + " " + paymentCode);
		paymentRepo.updatePaymentCodeById(id, paymentCode, LocalDateTime.now());
	}

	public void updatePayment(String paymentCode, String status) {
		paymentRepo.updatePaymentCodeById(paymentCode, status, LocalDateTime.now());
	}

	public void updatePayment(String paymentCode, String status, String detail) {
		paymentRepo.updatePaymentCodeById(paymentCode, status, detail, LocalDateTime.now());
	}
}
