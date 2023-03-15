package jeopardyApp.controller;

public class QuestionResponse {
    private int id;
    private String actualQuestion;
    private int score;

    public QuestionResponse(int id, String actualQuestion, int score) {
        this.id = id;
        this.actualQuestion = actualQuestion;
        this.score = score;
    }

    public QuestionResponse(int id, String actualQuestion) {
        this.id = id;
        this.actualQuestion = actualQuestion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getActualQuestion() {
        return actualQuestion;
    }

    public void setActualQuestion(String actualQuestion) {
        this.actualQuestion = actualQuestion;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
