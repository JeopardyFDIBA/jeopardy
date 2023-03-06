package controller;

public class UpdateScoreRequest {
    private int id;
    private int score;

    public UpdateScoreRequest() {
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
