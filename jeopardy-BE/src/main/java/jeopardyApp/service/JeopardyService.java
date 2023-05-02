package jeopardyApp.service;

import jeopardyApp.controller.CheckAnswerResponse;
import jeopardyApp.controller.PlayerScoresResponse;
import jeopardyApp.controller.QuestionResponse;
import jeopardyApp.repo.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Service
public class JeopardyService {

    @Autowired
    private QuestionsRepo questionsRepo;

    @Autowired
    private PlayerRepo playerRepo;

    @Autowired
    private GameRepo gameRepo;

    private static final int NUMBER_OF_CATEGORIES = 5;

    private static final int NUMBER_OF_SHOWN_HIGHSCORES = 5;

    private static final Integer[] TYPES_OF_QUESTIONS_BY_POINTS = {100, 200, 300, 400, 500};

    private final Random random = new Random();

    private final List<Player> activePlayers = new ArrayList<>();

    private int gameId = -1;

    private static final String USELESS_WORDS = "before beneath below above on in at the a an after with under toward through within" +
            "inside near out off from until to by about for since between without along across beyond except but around down up" +
            " into her his my their our your";
    private final List<String> uselessWordsList;

    private static final String FILE_WITH_QUESTIONS_NAME = "JEOPARDY_QUESTIONS1.json";

    @Autowired
    public JeopardyService() {
        uselessWordsList = new ArrayList<>(List.of(USELESS_WORDS.split(" ")));
    }

    public List<Integer> savePlayers(String[] usernames) {
        List<Integer> playerIds = new ArrayList<>();
        for (String username : usernames) {
            Player currentPlayer = new Player(username, 0);
            activePlayers.add(playerRepo.save(currentPlayer));
        }
        for (Player player : activePlayers) {
            playerIds.add(player.getId());
        }
        Game game = new Game(activePlayers);
        gameRepo.save(game);
        gameId = game.getId();

        return playerIds;
    }

    public List<PlayerScoresResponse> getPlayers() {
        List<PlayerScoresResponse> players = new ArrayList<>();
        List<Player> currentPlayers = gameRepo.findById(gameId).getPlayers();
        for (Player player : currentPlayers) {
            players.add(new PlayerScoresResponse(player.getId(), player.getScore(), player.getName()));
        }
        return players;
    }

    public QuestionResponse getOpeningQuestion() {
        Question question;
        int randomQuestionId;
        do {
            randomQuestionId = getRandomIdInDatabase();
            question = questionsRepo.findById(randomQuestionId);
        } while (question == null);
        return new QuestionResponse(randomQuestionId, question.getActualquestion());
    }

    public List<String> getCategories() {
        List<String> categories = new ArrayList<>();
        // ensures the selected category has at least one question for each value
        int numberOfCategoriesToBeGenerated = NUMBER_OF_CATEGORIES;
        outer:
        for (int i = 0; i < numberOfCategoriesToBeGenerated; i++) {
            Question question = questionsRepo.findById(getRandomIdInDatabase());
            if (question == null) {
                numberOfCategoriesToBeGenerated++;
                continue;
            }
            String category = question.getCategory();
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

    public List<PlayerScoresResponse> getHighScores(int gameId) {
        List<PlayerScoresResponse> players = new ArrayList<>();
        Game game = gameRepo.findById(gameId);
        // sort players
        Player[] topPlayerScoresInGame = sortPlayersByHighScores(game.getPlayers());
        for (Player player : topPlayerScoresInGame) {
            players.add(new PlayerScoresResponse(player.getId(), player.getScore(), player.getName()));
        }
        return players;
    }

    private Player[] sortPlayersByHighScores(List<Player> players) {
        int numberOfHighScores;
        if (players.size() > 5) {
            numberOfHighScores = NUMBER_OF_SHOWN_HIGHSCORES;
        }
        else {
            numberOfHighScores = players.size();
        }
        Player[] topPlayerScoresInGame = new Player[numberOfHighScores];

        outer:
        for (Player player : players) {
            for (int i = 0; i < numberOfHighScores; i++) {
                if (topPlayerScoresInGame[i] == null) {
                    topPlayerScoresInGame[i] = player;
                    continue outer;
                }
                if (topPlayerScoresInGame[i].getScore() < player.getScore()) {
                    int counter = numberOfHighScores - 1;
                    while (counter > i) {
                        topPlayerScoresInGame[counter] = topPlayerScoresInGame[counter - 1];
                        counter--;
                    }
                    topPlayerScoresInGame[i] = player;
                    continue outer;
                }
            }
        }
        return topPlayerScoresInGame;
    }

    public List<PlayerScoresResponse> getCurrentHighScores() {
        List<PlayerScoresResponse> players = new ArrayList<>();
        List<Player> currentPlayers = gameRepo.findById(gameId).getPlayers();
        Player[] topPlayerScoresInGame = sortPlayersByHighScores(currentPlayers);
        for (Player player : topPlayerScoresInGame) {
            players.add(new PlayerScoresResponse(player.getId(), player.getScore(), player.getName()));
        }
        return players;
    }

    public List<PlayerScoresResponse> getAllTimeHighScores() {
        List<PlayerScoresResponse> players = new ArrayList<>();
        List<Player> topPlayerScores = playerRepo.findFirst5ByOrderByScoreDesc();
        for (Player player : topPlayerScores) {
            players.add(new PlayerScoresResponse(player.getId(), player.getScore(), player.getName()));
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
        int playerMustMatchWords;
        if (realAnswerWords.size() == 2) {
            playerMustMatchWords = realAnswerWords.size() / 2 + 1;
        }
        else {
            playerMustMatchWords = realAnswerWords.size() / 2 + realAnswerWords.size() % 2;
        }
        String[] playerAnswerWords = playerAnswer.split(" ");
        int wordMatchCounter = 0;

        for (String word : playerAnswerWords) {
            for (String correctWord : realAnswerWords) {
                if (calculateLevenshteinDistance(word, correctWord) <= 0.33 * correctWord.length()) {
                    wordMatchCounter++;
                }
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
            // Try adding "jeopardy-BE/" + if it does not work locally
            a = (JSONArray) parser.parse(new FileReader(FILE_WITH_QUESTIONS_NAME));
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

    private int calculateLevenshteinDistance(String x, String y) {
        if (x.isEmpty()) {
            return y.length();
        }

        if (y.isEmpty()) {
            return x.length();
        }

        int substitution = calculateLevenshteinDistance(x.substring(1), y.substring(1))
                + costOfSubstitution(x.charAt(0), y.charAt(0));
        int insertion = calculateLevenshteinDistance(x, y.substring(1)) + 1;
        int deletion = calculateLevenshteinDistance(x.substring(1), y) + 1;

        return min(substitution, insertion, deletion);
    }

    private int costOfSubstitution(char a, char b) {
        return a == b ? 0 : 1;
    }

    private int min(int... numbers) {
        return Arrays.stream(numbers)
                .min().orElse(Integer.MAX_VALUE);
    }

}
