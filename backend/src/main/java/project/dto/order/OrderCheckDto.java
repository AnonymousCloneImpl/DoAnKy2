package project.dto.order;

import lombok.*;
import project.const_.ORDER_STATUS;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderCheckDto implements Serializable {
	private String orderCode;
	private LocalDateTime createdAt;
	private ORDER_STATUS status;
	private List<OrderItemDto> orderItemDtoList;
	private double totalPrice;
}
