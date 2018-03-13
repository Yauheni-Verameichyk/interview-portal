package by.interview.portal.repository;

import by.interview.portal.domain.Discipline;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class CandidateRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private DisciplineRepository disciplineRepository;

    @Test
    public void findByDisciplineTest() {
        Discipline discipline = disciplineRepository.getOne(1L);
        System.out.println(discipline);
    }



}
