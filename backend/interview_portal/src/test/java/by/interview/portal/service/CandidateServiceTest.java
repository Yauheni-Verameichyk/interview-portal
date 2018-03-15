package by.interview.portal.service;

import by.interview.portal.domain.Candidate;
import by.interview.portal.repository.CandidateRepository;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.repository.EducationCandidateRepository;
import by.interview.portal.repository.WorkCandidateRepository;

import by.interview.portal.service.impl.CandidateServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.hamcrest.CoreMatchers.equalTo;

import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.Arrays;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CandidateServiceTest {

    @Mock
    private CandidateRepository candidateRepository;
    @Mock
    private DisciplineRepository disciplineRepository;
    @Mock
    private EducationCandidateRepository educationCandidateRepository;
    @Mock
    private WorkCandidateRepository workCandidateRepository;

    @InjectMocks
    private CandidateServiceImpl candidateService = new CandidateServiceImpl();

    @Test
    public void findAll() {
        Page<Candidate> page = new PageImpl<Candidate>(Arrays.asList(new Candidate(), new Candidate()));
        when(candidateRepository.findAll(PageRequest.of(0, 10))).thenReturn(page);
        assertThat(candidateService.findAll(0).size(), equalTo(2));
    }
}
