package service;

import controller.CheckAnswerResponse;
import repo.Player;
import repo.PlayerRepo;
import repo.Question;
import repo.QuestionsRepo;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

@Service
public class JeopardyService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private QuestionsRepo questionsRepo;

    @Autowired
    private PlayerRepo playerRepo;

    private static final String uselessWords = "before beneath below above on in at the a an after with under toward through within" +
            "inside near out off from until to by about for since between without along across beyond except but around down up" +
            " into her his my their our your";
    private List<String> uselessWordsList;

    @Autowired
    public JeopardyService() {
        uselessWordsList = new ArrayList<>(List.of(uselessWords.split(" ")));
    }

    public List<Integer> savePlayers(String[] usernames) {
        List<Integer> ids = new ArrayList<>();
        for (String username : usernames) {
            ids.add(playerRepo.save(new Player(username, 0)).getId());
        }
        return ids;
    }

    public Question getOpeningQuestion() {
        int number = getRandomIdInDatabase();
        return questionsRepo.findById(number);
    }

    public List<String> getCategories() {
        return null;
    }

    private int getRandomIdInDatabase() {
        int questionAmount = (int) questionsRepo.count();
        Random random = new Random();
        return random.nextInt(questionAmount);
    }

    public List<Question> getQuestions(String category) {
        return null;
    }

    public List<Player> getHighScores() {
        return null;
    }

    public void updateScores(int id, int score) {

    }

    public CheckAnswerResponse checkAnswer(String playerAnswer, int id) {
        Question question = questionsRepo.findById(id);
        boolean whenToRemovePrepositions = !question.getActualQuestion().toLowerCase(Locale.ROOT).contains("preposition")
                && !question.getActualQuestion().toLowerCase(Locale.ROOT).contains("word");
        String realAnswer = question.getAnswer();
        playerAnswer = playerAnswer.toLowerCase(Locale.ROOT);
        CheckAnswerResponse checkAnswerResponse = new CheckAnswerResponse(realAnswer, false);
        realAnswer = realAnswer.toLowerCase();
        List<String> realAnswerWords = new ArrayList<>(List.of(realAnswer.split(" ")));

        if (whenToRemovePrepositions) {
            for (String uselessWord : uselessWordsList) {
                realAnswerWords.remove(uselessWord);
            }
        }

            int playerMustMatchWords = realAnswerWords.size() / 2 + realAnswerWords.size() % 2;
            String[] playerAnswerWords = playerAnswer.split(" ");
            int wordMatchCounter = 0;

            for (String word : playerAnswerWords) {
                if (realAnswerWords.contains(word)) {
                    wordMatchCounter++;
                }
            }

            if (wordMatchCounter >= playerMustMatchWords) {
                checkAnswerResponse.setCorrect(true);
            }
            return checkAnswerResponse;
    }

}
