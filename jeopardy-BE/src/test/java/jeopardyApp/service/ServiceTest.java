package jeopardyApp.service;

import jeopardyApp.controller.CheckAnswerResponse;
import jeopardyApp.controller.PlayerScoresResponse;
import jeopardyApp.controller.QuestionResponse;
import jeopardyApp.repo.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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
    private GameRepo gameRepo;

    @Mock
    private Player player;

    @Mock
    private Question question;

    private List<Integer> ids;

    public List<Player> players;

    public List<Player> sortedPlayers;
    @BeforeEach
    public void setUp() {
        ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);
        ids.add(3);
        question.setActualquestion("actualQuestion");
        question.setAnswer("answer");
        question.setCategory("category");
        question.setScore(0);
        players = new ArrayList<>();
        sortedPlayers = new ArrayList<>();
        Player player1 = new Player("Ivan", 100);
        player1.setId(1);
        Player player2 = new Player("Jordan", 300);
        player2.setId(2);
        Player player3 = new Player("Alexei", 500);
        player3.setId(3);
        Player player4 = new Player("Todor", 600);
        player4.setId(4);
        Player player5 = new Player("Vasil", 1000);
        player5.setId(5);
        Player player6 = new Player("Kris", 400);
        player6.setId(6);
        players.add(player1);
        players.add(player2);
        players.add(player3);
        players.add(player4);
        players.add(player5);
        players.add(player6);
        sortedPlayers.add(player5);
        sortedPlayers.add(player4);
        sortedPlayers.add(player3);
        sortedPlayers.add(player6);
        sortedPlayers.add(player2);
    }
    @Test
    public void savePlayersTest() {
        String[] users = new String[]{"1", "2", "3"};
        when(player.getId()).thenReturn(1, 2, 3);
        when(playerRepo.save(any(Player.class))).thenReturn(player);

        List<Integer> actual = service.savePlayers(users);

        // Assert
        Assertions.assertEquals(actual, ids);
    }

    @Test
    public void getOpeningQuestionsTest() {
        when(questionsRepo.count()).thenReturn(1L);
        when(questionsRepo.findById(1)).thenReturn((question));

        QuestionResponse actual = service.getOpeningQuestion();

        // Assert
        Assertions.assertEquals(actual.getActualQuestion(), question.getActualquestion());
        Assertions.assertEquals(actual.getScore(), question.getScore());
    }

    @Test
    public void getCategoriesTest() {
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

    @Test
    public void getHighScoresTest() {
        when(gameRepo.findById(1)).thenReturn(new Game(players));
        List<PlayerScoresResponse> returnedPlayers = service.getHighScores(1);

        for (int i = 0; i < sortedPlayers.size(); i++) {
            Assertions.assertEquals(sortedPlayers.get(i).getScore(), returnedPlayers.get(i).getScore());
        }
    }

    @Test
    public void updateScoreTest() {
        Player player1 = players.get(0);
        when(playerRepo.findById(1)).thenReturn(player1);
        int currentScore = player1.getScore();
        int scoreToBeAdded = 100;
        service.updateScores(1, scoreToBeAdded);

        Assertions.assertEquals(currentScore + scoreToBeAdded, player1.getScore());
    }

    @Test
    public void checkRightAnswerTest() {
        when(questionsRepo.findById(1)).thenReturn(new Question("HISTORY", "Mongol Empire",
                "What was the largest empire in ancient history", 500));
        CheckAnswerResponse response = service.checkAnswer("The Mongol Empire", 1);
        Assertions.assertTrue(response.isCorrect());
    }

    @Test
    public void checkWrongAnswerTest() {
        when(questionsRepo.findById(1)).thenReturn(new Question("HISTORY", "Mongol Empire",
                "What was the largest empire in ancient history", 500));
        CheckAnswerResponse response = service.checkAnswer("The Roman Empire", 1);
        Assertions.assertFalse(response.isCorrect());
    }

}