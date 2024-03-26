package project.search.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto implements Serializable {
	private List<SearchRequestDto> searchRequestDtoList;
	private GLOBAL_OPERATOR globalOperator;
	private Integer page;
	private Integer limit;

	public enum GLOBAL_OPERATOR {
		AND, OR;
	}
}
