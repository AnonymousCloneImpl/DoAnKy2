package project.dto.search;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class SearchRequestDto implements Serializable {
	private String column;
	private String value;
	private OPERATOR operator;

	public enum OPERATOR {
		EQUAL, LIKE, IN, GREATER_THAN, LESS_THAN, BETWEEN;
	}

	@Override
	public String toString() {
		return "SearchRequestDto{" +
				"column='" + column + '\'' +
				", value='" + value + '\'' +
				", operator=" + operator +
				'}';
	}
}
