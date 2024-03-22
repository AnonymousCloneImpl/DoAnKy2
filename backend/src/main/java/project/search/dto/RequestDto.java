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

	public enum GLOBAL_OPERATOR {
		AND, OR;
	}

	@Override
	public String toString() {
		return "RequestDto{" +
				"searchRequestDtoList=" + searchRequestDtoList +
				", globalOperator=" + globalOperator +
				'}';
	}
}
