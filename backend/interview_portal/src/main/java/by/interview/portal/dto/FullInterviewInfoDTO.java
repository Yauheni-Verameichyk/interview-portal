package by.interview.portal.dto;

import by.interview.portal.domain.DisciplineMark;
import by.interview.portal.domain.InterviewStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullInterviewInfoDTO {

    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private CandidateDTO candidate;

    private String place;

    private Byte finalMark;

    private String feedback;

    private InterviewStatus status;

    private Set<UserBaseInfoDTO> interviewerSet;

    private Set<DisciplineDTO> disciplineSet;

    private List<DisciplineMark> markList;

}
