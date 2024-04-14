package project.common;

import project.dto.order.OrderDto;
import project.dto.order.OrderItemDto;

import java.time.LocalDate;
import java.util.List;

public class PaymentUtils {

    public static String paypalQrRequestBuilder(OrderDto orderDto) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{")
                .append(detailBuilder())
                .append(invoicerBuilder())
                .append(recipientsBuilder(orderDto.getCustomerName(), orderDto.getCustomerEmail(), orderDto.getCustomerPhone()))
                .append(itemInfoBuilder(orderDto.getOrderItemDtoList()))
                .append(configurationBuilder(orderDto.getTotalPrice()))
                .append(amountBuilder(orderDto.getShippingMethod().shippingPrice))
                .append("}}}");
        return stringBuilder.toString();
    }

    public static StringBuilder detailBuilder() {
        Long num = System.currentTimeMillis();
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("\"detail\": { \"invoice_number\": \"").append(num).append("\", ")
                .append("\"payment_term\": { \"term_type\": \"NET_30\", \"due_date\": \"").append(LocalDate.now().plusDays(30)).append("\"}, ")
                .append("\"currency_code\": \"USD\" }, ");
        return stringBuilder;
    }

    public static StringBuilder invoicerBuilder() {
        return new StringBuilder().append(" \"invoicer\": { \"name\": { \"given_name\": \"QuantumTech\" }, ")
                .append("\"address\": { \"address_line_1\": \"123 Townsend St\", \"address_line_2\": \"Floor 6\", ")
                .append("\"admin_area_2\": \"San Francisco\", \"admin_area_1\": \"CA\", \"postal_code\": \"94107\", \"country_code\": \"US\" }, ")
                .append("\"phones\": [ { \"country_code\": \"001\", \"national_number\": \"4085551234\", \"phone_type\": \"MOBILE\" } ], ")
                .append("\"website\": \"www.quantumtech.com\", \"tax_id\": \"XX-XXXXXXX\", \"logo_url\": \"https://example.com/logo.png\" }, ");
    }

    public static StringBuilder recipientsBuilder(String name, String email, String phone) {
        return new StringBuilder()
                .append("\"primary_recipients\": [ { \"billing_info\": { \"name\": { \"given_name\": ")
                .append(name)
                .append("\" }, ")
                .append("\"address\": { ")
                .append("\"address_line_1\": \"1234 Main Street\", \"admin_area_2\": \"Anytown\", \"admin_area_1\": \"CA\", \"postal_code\": \"98765\", ")
                .append("\"country_code\": \"US\" }, \"email_address\": ").append(email).append('\"')
                .append(", ")
                .append("\"phones\": [ { \"country_code\": \"001\", \"national_number\": \"4884551234\" ")
                .append(", \"phone_type\": \"HOME\" } ] }, ")
                .append("\"shipping_info\": { \"name\": { \"given_name\": ").append(name).append("\" }, ")
                .append("\"address\": { \"address_line_1\": \"1234 Main Street\", \"admin_area_2\": \"Anytown\", \"admin_area_1\": \"CA\", ")
                .append("\"postal_code\": \"98765\", \"country_code\": \"US\" } } } ], ");
    }

    public static StringBuilder itemInfoBuilder(List<OrderItemDto> itemDtoList) {
        StringBuilder stringBuilder = new StringBuilder().append("\"items\": [");

        for (OrderItemDto itemDto : itemDtoList) {
            stringBuilder
                    .append("{ \"name\": ").append(itemDto.getProductName()).append("\", ")
                    .append("\"description\": \"Product\", ")
                    .append("\"quantity\": ").append("\"").append(itemDto.getQuantity()).append("\"").append(", ")
                    .append("\"unit_amount\": { \"currency_code\": \"USD\", ")
                    .append("\"value\": ").append("\"").append(itemDto.getPrice()).append("\"").append(" }, ")
                    .append("\"tax\": { \"name\": \"Sales Tax\", \"percent\": \"7.25\" }, \"discount\": { \"percent\": \"5\" }, \"unit_of_measure\": \"QUANTITY\" } ");
            if (itemDto != itemDtoList.getLast()) {
                stringBuilder.append(", ");
            }
        }

        stringBuilder.append("], ");

        return stringBuilder;
    }

    public static StringBuilder configurationBuilder(double price) {
        return new StringBuilder().append(" \"configuration\": { ")
                .append("\"partial_payment\": { ")
                .append("\"allow_partial_payment\": \"true\", ")
                .append("\"minimum_amount_due\": { ")
                .append("\"currency_code\": \"USD\", ")
                .append("\"value\": ").append("\"").append(price * 20 / 100).append("\"")
                .append(" } }, \"allow_tip\": \"true\", \"tax_calculated_after_discount\": \"true\", \"tax_inclusive\": \"false\" }, ");
    }

    public static StringBuilder amountBuilder(int shippingPrice) {
        return new StringBuilder().append(" \"amount\": {")
                .append("\"breakdown\": {")
                .append("\"custom\": {")
                .append("\"label\": \"Packing Charges\",")
                .append("\"amount\": {")
                .append("\"currency_code\": \"USD\",")
                .append("\"value\": \"10.00\"")
                .append("} ")
                .append("}, ")
                .append("\"shipping\": { ")
                .append("\"amount\": { ")
                .append("\"currency_code\": \"USD\", ")
                .append("\"value\": \"").append(shippingPrice)
                .append("\"}, ")
                .append("\"tax\": { ")
                .append("\"name\": \"Sales Tax\", ")
                .append("\"percent\": \"7.25\", ")
                .append("\"discount\": { ")
                .append("\"invoice_discount\": { ")
                .append("\"percent\": \"5\" ")
                .append("} ")
                .append("} ")
                .append("} }");
    }
}
