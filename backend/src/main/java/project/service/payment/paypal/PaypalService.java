package project.service.payment.paypal;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.dto.payment.PaypalRequestDto;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j(topic = "PAYPAL-SERVICE")
public class PaypalService {

	@Autowired
	private APIContext apiContext;

	public Payment createPayment(PaypalRequestDto paypalRequestDto) {
		Double total = new BigDecimal(paypalRequestDto.getTotal()).setScale(2, RoundingMode.HALF_UP).doubleValue();
		Amount amount = new Amount();
		amount.setCurrency(paypalRequestDto.getCurrency());
		amount.setTotal(String.valueOf(total));

		Transaction transaction = new Transaction();
		transaction.setDescription(paypalRequestDto.getDescription());
		transaction.setAmount(amount);

		List<Transaction> transactions = new ArrayList<>();
		transactions.add(transaction);

		Payer payer = new Payer();
		payer.setPaymentMethod(paypalRequestDto.getMethod());

		Payment payment = new Payment();
		payment.setIntent(paypalRequestDto.getIntent());
		payment.setPayer(payer);
		payment.setTransactions(transactions);
		RedirectUrls redirectUrls = new RedirectUrls();
		redirectUrls.setCancelUrl(paypalRequestDto.getCancelUrl());
		redirectUrls.setReturnUrl(paypalRequestDto.getSuccessUrl());
		payment.setRedirectUrls(redirectUrls);

		try {
			return payment.create(apiContext);
		} catch (PayPalRESTException e) {
			throw new RuntimeException(e);
		}
	}

	public Payment executePayment(String paymentId, String payerId) {
		Payment payment = new Payment();
		try {
			payment.setId(paymentId);
			PaymentExecution paymentExecute = new PaymentExecution();
			paymentExecute.setPayerId(payerId);
			return payment.execute(apiContext, paymentExecute);
		} catch (PayPalRESTException e) {
			log.warn("Payment failed : " + e.getMessage());
		}
		return payment;
	}
}
