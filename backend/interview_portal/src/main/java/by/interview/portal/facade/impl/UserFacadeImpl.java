package by.interview.portal.facade.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.dto.FullUserInfoDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.facade.UserFacade;
import by.interview.portal.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserFacadeImpl implements UserFacade {

    @Autowired
    private UserService userService;

    @Autowired
    @Qualifier("userDTOConverter")
    private Converter<User, UserDTO> userDTOConverter;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void save(UserDTO userDTO) {
        userService.save(userDTOConverter.convertToEntity(userDTO));
    }

    @Override
    public Optional<FullUserInfoDTO> findById(long userId) {
        return userService.findById(userId).map(userDTOConverter::convertToDTO)
                .map(userDTO -> getFullUserInfoDTO(userDTO));
    }

    private FullUserInfoDTO getFullUserInfoDTO(UserDTO userDTO) {
        FullUserInfoDTO fullUserInfoDTO = modelMapper.map(userDTO, FullUserInfoDTO.class);
        return fullUserInfoDTO;
    }

    @Override
    public List<UserBaseInfoDTO> findAllByRole(Role role) {
        return userService.findAllByRole(role).stream().filter(Objects::nonNull)
                .map(userDTOConverter::convertToDTO).map(userDTO -> getUserBaseInfo(userDTO))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserBaseInfoDTO> findAllUserBaseInfo(Integer page, String searchParameters) {
        return userService.findAll(page, searchParameters).stream().filter(Objects::nonNull)
                .map(userDTOConverter::convertToDTO).map(userDTO -> getUserBaseInfo(userDTO))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long userId) {
        userService.delete(userId);
    }

    @Override
    public List<UserBaseInfoDTO> findByDisciplineAndTimeRange(LocalDateTime rangeStart,
        LocalDateTime rangeEnd, Long disciplineId) {
        return userService.findByDisciplineAndTimeRange(rangeStart, rangeEnd, disciplineId).stream()
            .filter(Objects::nonNull).map(userDTOConverter::convertToDTO).map(userDTO -> getUserBaseInfo(userDTO))
            .collect(Collectors.toList());
    }

    private UserBaseInfoDTO getUserBaseInfo(UserDTO userDTO) {
        UserBaseInfoDTO userBaseInfoDTO = modelMapper.map(userDTO, UserBaseInfoDTO.class);
        userBaseInfoDTO.setRoles(userDTO.getRoleDisciplines().keySet());
        return userBaseInfoDTO;
    }
}
