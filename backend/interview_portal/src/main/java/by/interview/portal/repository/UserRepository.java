package by.interview.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}