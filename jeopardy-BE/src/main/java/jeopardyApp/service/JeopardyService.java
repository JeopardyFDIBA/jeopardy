package jeopardyApp.service;

import jeopardyApp.controller.CheckAnswerResponse;
import jeopardyApp.controller.PlayerScoresResponse;
import jeopardyApp.controller.QuestionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jeopardyApp.repo.Player;
import jeopardyApp.repo.PlayerRepo;
import jeopardyApp.repo.Question;
import jeopardyApp.repo.QuestionsRepo;

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

    public QuestionResponse getOpeningQuestion() {
        int randomQuestionId = getRandomIdInDatabase();
        Question question = questionsRepo.findById(randomQuestionId);
        return new QuestionResponse(randomQuestionId, question.getActualquestion());
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

    public List<QuestionResponse> getQuestions(String category) {
        List<QuestionResponse> allQuestionsInCategory = new ArrayList<>();
        List<Question> currentQuestions;
        for (int score : TYPES_OF_QUESTIONS_BY_POINTS) {
            currentQuestions = questionsRepo.findAllByCategoryAndScore(category, score);
            Question question = currentQuestions.get(random.nextInt(currentQuestions.size() - 1));
            allQuestionsInCategory.add(new QuestionResponse(question.getId(), question.getActualquestion(), score));
        }
        return allQuestionsInCategory;
    }

    public List<PlayerScoresResponse> getHighScores() {
        List<PlayerScoresResponse> players = new ArrayList<>();
        for (int id : activePlayerIds) {
            int playerScore = playerRepo.findById(id).getScore();
            players.add(new PlayerScoresResponse(id, playerScore));
        }
        return players;
    }

    public void updateScores(int id, int score) {
        playerRepo.findById(id).addScore(score);
    }

    public CheckAnswerResponse checkAnswer(String playerAnswer, int id) {
        Question question = questionsRepo.findById(id);
        boolean whenToRemovePrepositions = !question.getActualquestion().toLowerCase(Locale.ROOT).contains("preposition")
                && !question.getActualquestion().toLowerCase(Locale.ROOT).contains("word");
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
