package by.interview.portal.facade;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import by.interview.portal.domain.Role;
import by.interview.portal.dto.FullUserInfoDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;

public interface UserFacade {

    void save(UserDTO user);

    Optional<FullUserInfoDTO> findById(long userId);

    List<UserBaseInfoDTO> findAllByRole(Role role);

    List<UserBaseInfoDTO> findAllUserBaseInfo(Integer page, String searchParameters);

    void delete(Long userId);

    List<UserBaseInfoDTO> findByDisciplineAndTimeRange(LocalDateTime rangeStart, LocalDateTime rangeEnd,
        Long disciplineId);

}
