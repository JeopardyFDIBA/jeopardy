package jeopardyApp.repo;

import jakarta.persistence.*;

@Entity
public class Question {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String category;
    private String answer;

    private String actualquestion;

    public Question(String category, String answer, String actualquestion, int score) {
        this.category = category;
        this.answer = answer;
        this.actualquestion = actualquestion;
        this.score = score;
    }

    public Question() {

    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    private int score;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getActualquestion() {
        return actualquestion;
    }

    public void setActualquestion(String actualQuestion) {
        this.actualquestion = actualQuestion;
    }

}
