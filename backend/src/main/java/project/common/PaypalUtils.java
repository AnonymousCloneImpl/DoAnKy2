package project.common;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import project.dto.order.OrderDto;
import project.dto.order.OrderItemDto;
import project.dto.payment.PaypalRequestDto;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class PaypalUtils {
	@Autowired
	private APIContext apiContext;

	public Payment buildPayment(PaypalRequestDto paypalRequestDto) {
		Double total = BigDecimal.valueOf(paypalRequestDto.getTotal()).setScale(2, RoundingMode.HALF_UP).doubleValue();
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
		return payment;
	}

	public Invoice buildInvoice(OrderDto orderDto) {
		Invoice invoice = new Invoice();
		invoice.setPaymentTerm(paymentTermBuilder());
		invoice.setTotalAmount(new Currency("USD", String.valueOf(orderDto.getTotalPrice())));
		invoice.setMerchantInfo(merchantInfoBuilder());
		invoice.setBillingInfo(billingInfoBuilder(orderDto.getCustomerName(), orderDto.getCustomerEmail(), orderDto.getCustomerPhone()));
		invoice.setShippingInfo(shippingInfoBuilder(orderDto.getCustomerPhone(), orderDto.getShippingAddress()));
		invoice.setAllowPartialPayment(true);
		invoice.setItems(itemInfoBuilder(orderDto.getOrderItemDtoList()));
		invoice.setMinimumAmountDue(new Currency("USD", String.valueOf(orderDto.getTotalPrice() * 20 / 100)));
		invoice.setTaxCalculatedAfterDiscount(true);
		invoice.setTotalAmount(new Currency("USD", String.valueOf(orderDto.getTotalPrice())));
		try {
			invoice.create(apiContext);
		} catch (PayPalRESTException e) {
			throw new RuntimeException(e);
		}
		return invoice;
	}

	private PaymentTerm paymentTermBuilder() {
		PaymentTerm paymentTerm = new PaymentTerm();
		paymentTerm.setTermType("NET_30");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd z");
		ZonedDateTime zonedDateTime = LocalDate.now().plusDays(30).atStartOfDay(ZoneId.systemDefault());
		paymentTerm.setDueDate(zonedDateTime.format(formatter));
		return paymentTerm;
	}

	private MerchantInfo merchantInfoBuilder() {
		MerchantInfo merchantInfo = new MerchantInfo();
		merchantInfo.setBusinessName("Tek Savvy");
		merchantInfo.setAddress(
				new InvoiceAddress()
						.setPhone(new Phone("001", "4085551234"))
		);
		return merchantInfo;
	}

	private List<BillingInfo> billingInfoBuilder(String name, String email, String phone) {
		List<BillingInfo> bills = new ArrayList<>();
		BillingInfo billingInfo = new BillingInfo();
		billingInfo.setPhone(new Phone("001", phone));
		billingInfo.setEmail(email);
		billingInfo.setFirstName(name);
		bills.add(billingInfo);
		return bills;
	}

	private ShippingInfo shippingInfoBuilder(String phone, String address) {
		ShippingInfo shippingInfo = new ShippingInfo();
		shippingInfo.setAddress(
				(InvoiceAddress) new InvoiceAddress()
						.setPhone(new Phone("001", phone))
						.setCountryCode("US")
						.setLine1(address)
						.setPostalCode("98765")
		);
		return shippingInfo;
	}

	private List<InvoiceItem> itemInfoBuilder(List<OrderItemDto> itemDtoList) {
		List<InvoiceItem> items = new ArrayList<>();
		for (OrderItemDto o : itemDtoList) {
			System.out.println(o.toString());
			InvoiceItem invoiceItem = new InvoiceItem();
			invoiceItem.setQuantity(o.getQuantity());
			invoiceItem.setName(o.getProductName() + o.getProductModel());
			invoiceItem.setUnitPrice(new Currency("USD", String.valueOf(o.getPrice())));
			invoiceItem.setTax(new Tax("Sale", 5));
			items.add(invoiceItem);
		}
		return items;
	}
}
