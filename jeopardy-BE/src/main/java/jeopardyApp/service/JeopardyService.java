package jeopardyApp.service;

import jeopardyApp.controller.CheckAnswerResponse;
import jeopardyApp.controller.PlayerScoresResponse;
import jeopardyApp.controller.QuestionResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jeopardyApp.repo.Player;
import jeopardyApp.repo.PlayerRepo;
import jeopardyApp.repo.Question;
import jeopardyApp.repo.QuestionsRepo;

import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Service
public class JeopardyService {

    @Autowired
    private QuestionsRepo questionsRepo;

    @Autowired
    private PlayerRepo playerRepo;

    private static final int NUMBER_OF_CATEGORIES = 5;

    private static final Integer[] TYPES_OF_QUESTIONS_BY_POINTS = {100, 200, 300, 400, 500};

    private final Random random = new Random();

    private final List<Integer> activePlayerIds = new ArrayList<>();

    private static final String USELESS_WORDS = "before beneath below above on in at the a an after with under toward through within" +
            "inside near out off from until to by about for since between without along across beyond except but around down up" +
            " into her his my their our your";
    private final List<String> uselessWordsList;

    private final static String FILE_WITH_QUESTIONS_NAME = "JEOPARDY_QUESTIONS1.json";

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
        // ensures the selected category has at least one question for each value
        int numberOfCategoriesToBeGenerated = NUMBER_OF_CATEGORIES;
        outer:
        for (int i = 0; i < numberOfCategoriesToBeGenerated; i++) {
            String category = questionsRepo.findById(getRandomIdInDatabase()).getCategory();
            for (int score : TYPES_OF_QUESTIONS_BY_POINTS) {
                if (questionsRepo.findAllByCategoryAndScore(category, score).isEmpty()) {
                    numberOfCategoriesToBeGenerated++;
                    continue outer;
                }
            }
            categories.add(category);
        }
        return categories;
    }

    private int getRandomIdInDatabase() {
        int questionAmount = (int) questionsRepo.count();
        return random.nextInt(questionAmount) + 1;
    }

    public List<QuestionResponse> getQuestions(String category) {
        List<QuestionResponse> allQuestionsInCategory = new ArrayList<>();
        List<Question> currentQuestions;
        for (int score : TYPES_OF_QUESTIONS_BY_POINTS) {
            currentQuestions = questionsRepo.findAllByCategoryAndScore(category, score);
            Question question = currentQuestions.get(random.nextInt(currentQuestions.size()));
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
        Player player = playerRepo.findById(id);
        player.addScore(score);
        playerRepo.save(player);
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

    public void fillDatabaseWithQuestionsFromFile(int numberOfQuestions) {

        JSONParser parser = new JSONParser();
        JSONArray a;
        try {
            List<Integer> possibleValues = Arrays.asList(TYPES_OF_QUESTIONS_BY_POINTS);
            List<Integer> newValues = new ArrayList<>();
            a = (JSONArray) parser.parse(new FileReader("jeopardy-BE/" + FILE_WITH_QUESTIONS_NAME));
            int counter = 0;
            for (Object o : a) {
                JSONObject questions = (JSONObject) o;

                String category = (String) questions.get("category");
                System.out.println(category);

                String question = (String) questions.get("question");
                System.out.println(question);
                if (question.length() > 255) continue;

                String value = (String) questions.get("value");
                if (value == null) continue;
                value = value.replace(",", "");
                value = value.replace(".", "");
                value = value.replace("$", "");
                int questionValue = Integer.parseInt(value);
                System.out.println(value);

                // different question value mapping magic
                if (possibleValues.size() <= newValues.size() && newValues.contains(questionValue)) {
                    questionValue = possibleValues.get(newValues.indexOf(questionValue) % 5);
                } else if (!possibleValues.contains(questionValue)) {
                    if (newValues.isEmpty()) newValues.add(questionValue);
                    if (newValues.get(newValues.size() - 1) < questionValue) newValues.add(questionValue);
                    for (int i = 0, newValuesSize = newValues.size(); i < newValuesSize; i++) {
                        int newValue = newValues.get(i);
                        if (questionValue < newValue) newValues.add(newValues.indexOf(newValue), questionValue);
                    }
                    continue;
                }

                String answer = (String) questions.get("answer");
                System.out.println(answer);
                questionsRepo.save(new Question(category, answer, question, questionValue));
                if (counter >= numberOfQuestions) break;
                counter++;
            }
        } catch (IOException file) {
            System.out.println("File with questions not present at the given path");
        } catch (ParseException e) {
            System.out.println("File could not be parsed");
        }
    }
}
