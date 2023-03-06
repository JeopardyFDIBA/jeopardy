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

    @Autowired
    private QuestionsRepo questionsRepo;

    @Autowired
    private PlayerRepo playerRepo;

    private static final int NUMBER_OF_CATEGORIES = 5;

    private static final int[] TYPES_OF_QUESTIONS_BY_POINTS = {100,200,300,400,500};

    private final Random random = new Random();

    private List<Integer> activePlayerIds = new ArrayList<>();

    private static final String USELESS_WORDS = "before beneath below above on in at the a an after with under toward through within" +
            "inside near out off from until to by about for since between without along across beyond except but around down up" +
            " into her his my their our your";
    private List<String> uselessWordsList;

    @Autowired
    public JeopardyService() {
        uselessWordsList = new ArrayList<>(List.of(USELESS_WORDS.split(" ")));
    }

    public List<Integer> savePlayers(String[] usernames) {
        for (String username : usernames) {
            activePlayerIds.add(playerRepo.save(new Player(username, 0)).getId());
        }
        return activePlayerIds;
    }

    public Question getOpeningQuestion() {
        int number = getRandomIdInDatabase();
        return questionsRepo.findById(number);
    }

    public List<String> getCategories() {
        List<String> categories = new ArrayList<>();
        for(int i = 0; i < NUMBER_OF_CATEGORIES; i++) {
            categories.add(questionsRepo.findById(getRandomIdInDatabase()).getCategory());
        }
        return categories;
    }

    private int getRandomIdInDatabase() {
        int questionAmount = (int) questionsRepo.count();
        return random.nextInt(questionAmount);
    }

    public List<Question> getQuestions(String category) {
        List<Question> allQuestionsInCategory = new ArrayList<>();
        List<Question> currentQuestions;
        for (int score : TYPES_OF_QUESTIONS_BY_POINTS) {
            currentQuestions = questionsRepo.findAllByCategoryAndScore(category, score);
            allQuestionsInCategory.add(currentQuestions.get(random.nextInt(currentQuestions.size() - 1)));
        }
        return allQuestionsInCategory;
    }

    public List<Player> getHighScores() {
        List<Player> players = new ArrayList<>();
        for (int id : activePlayerIds) {
            players.add(playerRepo.findById(id));
        }
        return players;
    }

    public void updateScores(int id, int score) {
        playerRepo.findById(id).addScore(score);
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
