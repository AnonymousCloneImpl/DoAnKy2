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
    private String sortColumn;
    private SORT_DIRECTION sortDirection;
    private Integer page;
    private Integer limit;

    @Override
    public String toString() {
        return "RequestDto{" +
                "searchRequestDtoList=" + searchRequestDtoList +
                ", page=" + page +
                ", limit=" + limit +
                '}';
    }

    public enum SORT_DIRECTION {
        ASC, DESC
    }
}
