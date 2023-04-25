package jeopardyApp.controller;

import jeopardyApp.service.JeopardyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class JeopardyController {
    @Autowired
    private final JeopardyService jeopardyService;

    @Autowired
    public JeopardyController(JeopardyService jeopardyService) {
        this.jeopardyService = jeopardyService;
    }

    @CrossOrigin
    @PostMapping("saveUsers")
    public ResponseEntity<Object> savePlayers(@RequestBody String[] usernames) {
        return ResponseEntity.ok(jeopardyService.savePlayers(usernames));
    }

    @CrossOrigin
    @GetMapping("opening")
    public ResponseEntity<Object> getOpeningQuestion() {
        return ResponseEntity.ok(jeopardyService.getOpeningQuestion());
    }

    @CrossOrigin
    @GetMapping("players")
    public ResponseEntity<Object> getActivePlayers() {
        return ResponseEntity.ok(jeopardyService.getPlayers());
    }

    @CrossOrigin
    @GetMapping("question/{category}")
    public ResponseEntity<Object> getQuestions(@PathVariable String category) {
        return ResponseEntity.ok(jeopardyService.getQuestions(category));
    }

    @CrossOrigin
    @GetMapping("category")
    public ResponseEntity<Object> getCategories() {
        return ResponseEntity.ok(jeopardyService.getCategories());
    }

    @CrossOrigin
    @GetMapping("highscores/{gameId}")
    public ResponseEntity<Object> getHighscores(@PathVariable int gameId) {
        return ResponseEntity.ok(jeopardyService.getHighScores(gameId));
    }

    @CrossOrigin
    @GetMapping("highscores")
    public ResponseEntity<Object> getHighscores() {
        return ResponseEntity.ok(jeopardyService.getCurrentHighScores());
    }

    @CrossOrigin
    @PostMapping("updatescore")
    public ResponseEntity<Object> updateScores(@RequestBody UpdateScoreRequest updateScoreRequest) {
        jeopardyService.updateScores(updateScoreRequest.getId(), updateScoreRequest.getScore());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("checkAnswer")
    public ResponseEntity<Object> checkAnswer(@RequestBody CheckAnswerRequest checkAnswerRequest) {
        return ResponseEntity.ok(jeopardyService.checkAnswer(checkAnswerRequest.getAnswer(), checkAnswerRequest.getId()));
    }

    @CrossOrigin
    @PostMapping("fillNewQuestions/{numberOfQuestions}")
    public ResponseEntity<Object> fillWithNewQuestions(@PathVariable int numberOfQuestions) {
        jeopardyService.fillDatabaseWithQuestionsFromFile(numberOfQuestions);
        return ResponseEntity.ok(HttpStatus.OK);
    }


}
