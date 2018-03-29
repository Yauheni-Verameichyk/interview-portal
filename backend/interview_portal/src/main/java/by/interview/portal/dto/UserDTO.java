package by.interview.portal.dto;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    private String name;

    private String surname;

    private String password;

    private String phoneNumber;

    private String login;

    private String email;

    private Map<Role, List<Discipline>> roleDisciplines;
}
