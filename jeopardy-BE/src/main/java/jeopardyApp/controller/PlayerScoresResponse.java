package jeopardyApp.controller;

public class PlayerScoresResponse {
    private int id;
    private int score;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;

    public PlayerScoresResponse(int id, int score, String name) {
        this.id = id;
        this.score = score;
        this.name = name;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
