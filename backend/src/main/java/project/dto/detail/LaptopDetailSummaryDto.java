package project.dto.detail;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LaptopDetailSummaryDto {
	private String cpuType;
	private String ram;
	private String screenSize;
	private String graphicsCard;
}
