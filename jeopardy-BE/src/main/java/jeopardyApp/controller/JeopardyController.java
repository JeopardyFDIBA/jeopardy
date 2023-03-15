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

    @PostMapping("baseURL/saveUsers")
    public ResponseEntity<Object> savePlayers (@RequestBody String[] usernames) {
        return ResponseEntity.ok(jeopardyService.savePlayers(usernames));
    }

    @GetMapping("baseURL/opening")
    public ResponseEntity<Object> getOpeningQuestion() {
        return ResponseEntity.ok(jeopardyService.getOpeningQuestion());
    }

    @GetMapping("baseURL/question/{category}")
    public ResponseEntity<Object> getQuestions(@PathVariable String category) {
        return ResponseEntity.ok(jeopardyService.getQuestions(category));
    }

    @GetMapping("baseURL/category")
    public ResponseEntity<Object> getCategories() {
        return ResponseEntity.ok(jeopardyService.getCategories());
    }

    @GetMapping("highscores")
    public ResponseEntity<Object> getHighscores() {
        return ResponseEntity.ok(jeopardyService.getHighScores());
    }

    @PostMapping("updatescore")
    public ResponseEntity<Object> updateScores(@RequestBody UpdateScoreRequest updateScoreRequest) {
        jeopardyService.updateScores(updateScoreRequest.getId(), updateScoreRequest.getScore());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("checkAnswer")
    public ResponseEntity<Object> checkAnswer(@RequestBody CheckAnswerRequest checkAnswerRequest) {
        return ResponseEntity.ok(jeopardyService.checkAnswer(checkAnswerRequest.getAnswer(), checkAnswerRequest.getId()));
    }

}