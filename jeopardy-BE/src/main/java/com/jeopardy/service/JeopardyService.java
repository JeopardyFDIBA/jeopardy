package com.jeopardy.service;

import com.jeopardy.repo.Player;
import com.jeopardy.repo.Question;
import com.jeopardy.repo.QuestionsRepo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class JeopardyService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private QuestionsRepo questionsRepo;

    public Question getOpeningQuestion() {
        int number = getRandomIdInDatabase();
        return questionsRepo.findById(number);
    }

    public List<String> getCategories() {
        return null;
    }

    private int getRandomIdInDatabase() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.jeopardy.service");
        entityManager = emf.createEntityManager();

        int questionAmount = (Integer) entityManager.createQuery("SELECT count(id) FROM Question").getSingleResult();
        Random random = new Random();
        return random.nextInt(questionAmount);
    }

    public List<Question> getQuestions(String category) {
        return null;
    }

    public List<Player> getHighScores() {
        return null;
    }

    public void updateScores(int id, int score) {

    }
}
