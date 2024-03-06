package project.search.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto {
    private List<SearchRequestDto> searchRequestDtoList;

    private GLOBAL_OPERATOR globalOperator;

    public enum GLOBAL_OPERATOR {
        AND, OR;
    }
}
