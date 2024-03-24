package project.product.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomePageData implements Serializable {
	private String type;
	private Integer page;
	private Integer limit;
}
