package project.dto.search;

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
	private String sortColumn;
	private SORT_DIRECTION sortDirection;
	private Integer page;
	private Integer limit;

	public enum SORT_DIRECTION {
		ASC, DESC
	}

	public enum GLOBAL_OPERATOR {
		AND, OR;
	}

	@Override
	public String toString() {
		return "RequestDto{" +
				"searchRequestDtoList=" + searchRequestDtoList +
				", globalOperator=" + globalOperator +
				", page=" + page +
				", limit=" + limit +
				'}';
	}
}
