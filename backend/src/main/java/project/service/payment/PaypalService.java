package project.service.payment;

import com.paypal.api.payments.Image;
import com.paypal.api.payments.Invoice;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.common.PaypalUtils;
import project.const_.PAYMENT_METHOD;
import project.dto.order.OrderDto;
import project.dto.payment.PaypalRequestDto;
import project.entity.payment.PaymentTbl;
import project.model.QrCodeResponse;

@Service
@Slf4j(topic = "PAYPAL-SERVICE")
public class PaypalService {
	@Autowired
	private APIContext apiContext;
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private PaypalUtils paypalUtils;

	public Payment createPaypalPayment(PaypalRequestDto paypalRequestDto) {
		Payment payment = paypalUtils.buildPayment(paypalRequestDto);
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
			payment.setState("PAYMENT_ALREADY_DONE");
			log.warn("Payment failed : " + e.getMessage());
		}
		return payment;
	}

	// TẠO HÓA ĐƠN
	public String createInvoice(OrderDto orderDto, String orderCode) {
		String id = null;
		try {
			Invoice invoice = paypalUtils.buildInvoice(orderDto);
			id = invoice.getId();
			if (id != null) {
				invoice.send(apiContext);
				PaymentTbl paymentTbl = PaymentTbl.builder()
						.state("Create Invoice")
						.paymentCode(id)
						.orderCode(orderCode)
						.paymentMethod(PAYMENT_METHOD.QRCODE_PAYPAL)
						.detail(invoice.toJSON())
						.build();
				paymentService.save(paymentTbl);
			}
		} catch (Exception e) {
			log.warn("Error while create invoice");
		}
		return id;
	}

	public QrCodeResponse createQrCode(String id) {
		QrCodeResponse qrCodeResponse = new QrCodeResponse();
		try {
			String qrCode = paymentService.getPaymentLink(id);
			if (qrCode == null) {
				Image invoice = Invoice.qrCode(apiContext, id, null);
				qrCode = invoice.getImage();
			}
			Invoice invoice1 = Invoice.get(apiContext, id);
			qrCodeResponse.setQrCode(qrCode);
			qrCodeResponse.setPrice(invoice1.getTotalAmount().getValue());
			qrCodeResponse.setTax(invoice1.getItems().getFirst().getTax().getPercent());
			paymentService.updatePaymentQrCode(id, "Create Qr Code", qrCode);
			return qrCodeResponse;
		} catch (Exception e) {
			log.error("Error while create QR Code!");
		}
		return qrCodeResponse;
	}

}
