package project.search.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchRequestDto {
    private String column;
    private String value;
    private OPERATOR operator;

    public enum OPERATOR {
        EQUAL, LIKE, IN, GREATER_THAN, LESS_THAN, BETWEEN;
    }
}
