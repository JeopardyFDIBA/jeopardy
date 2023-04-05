package jeopardyApp.service;

import jeopardyApp.controller.QuestionResponse;
import jeopardyApp.repo.Player;
import jeopardyApp.repo.PlayerRepo;
import jeopardyApp.repo.Question;
import jeopardyApp.repo.QuestionsRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ServiceTest {

    @InjectMocks
    private JeopardyService service;

    @Mock
    private PlayerRepo playerRepo;

    @Mock
    private QuestionsRepo questionsRepo;

    @Mock
    private Player player;

    @Mock
    private Question question;

    @Test
    public void savePlayersTest() {
        List<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);
        ids.add(3);
        String[] users = new String[]{"1", "2", "3"};
        when(player.getId()).thenReturn(1, 2, 3);
        when(playerRepo.save(any(Player.class))).thenReturn(player);

        List<Integer> actual = service.savePlayers(users);

        // Assert
        Assertions.assertEquals(actual, ids);
    }

    @Test
    public void getOpeningQuestionsTest() {
        question.setActualquestion("actualQuestion");
        question.setAnswer("answer");
        question.setCategory("category");
        question.setScore(0);
        when(questionsRepo.count()).thenReturn(1L);
        when(questionsRepo.findById(1)).thenReturn((question));

        QuestionResponse actual = service.getOpeningQuestion();

        // Assert
        Assertions.assertEquals(actual.getActualQuestion(), question.getActualquestion());
        Assertions.assertEquals(actual.getScore(), question.getScore());
    }

    @Test
    public void getCategoriesTest() {
        question.setActualquestion("actualQuestion");
        question.setAnswer("answer");
        question.setCategory("category");
        question.setScore(0);
        when(questionsRepo.count()).thenReturn(1L);
        when(questionsRepo.findById(1)).thenReturn((question));
        List<Question> questionsInCategory = new ArrayList<>();
        questionsInCategory.add(question);
        when(questionsRepo.findAllByCategoryAndScore(question.getCategory(), 100)).thenReturn(questionsInCategory);
        when(questionsRepo.findAllByCategoryAndScore(question.getCategory(), 200)).thenReturn(questionsInCategory);
        when(questionsRepo.findAllByCategoryAndScore(question.getCategory(), 300)).thenReturn(questionsInCategory);
        when(questionsRepo.findAllByCategoryAndScore(question.getCategory(), 400)).thenReturn(questionsInCategory);
        when(questionsRepo.findAllByCategoryAndScore(question.getCategory(), 500)).thenReturn(questionsInCategory);

        List<String> actual = service.getCategories();

        // Assert
        Assertions.assertEquals(actual.get(0), question.getCategory());
    }

    @Test
    public void getQuestionsTest() {
        question.setActualquestion("actualQuestion");
        question.setAnswer("answer");
        question.setCategory("category");
        question.setScore(0);
        List<Question> questionsInCategory = new ArrayList<>();
        questionsInCategory.add(question);
        when(questionsRepo.findAllByCategoryAndScore(question.getActualquestion(), 100)).thenReturn(questionsInCategory);
        when(questionsRepo.findAllByCategoryAndScore(question.getActualquestion(), 200)).thenReturn(questionsInCategory);
        when(questionsRepo.findAllByCategoryAndScore(question.getActualquestion(), 300)).thenReturn(questionsInCategory);
        when(questionsRepo.findAllByCategoryAndScore(question.getActualquestion(), 400)).thenReturn(questionsInCategory);
        when(questionsRepo.findAllByCategoryAndScore(question.getActualquestion(), 500)).thenReturn(questionsInCategory);

        List<QuestionResponse> actual = service.getQuestions(question.getCategory());

        // Assert
        Assertions.assertEquals(actual.get(0).getActualQuestion(), question.getActualquestion());
    }
}