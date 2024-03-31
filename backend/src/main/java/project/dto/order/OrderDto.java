package project.dto.order;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto implements Serializable {
	private String orderCode;
	private LocalDateTime orderDate;
	private String customerName;
	private String customerPhone;
	private String customerEmail;
	private String shippingAddress;
	private List<OrderItemDto> orderItemDtoList;
	private long totalPrice;
}
