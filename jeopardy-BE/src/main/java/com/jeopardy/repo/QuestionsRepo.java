package com.jeopardy.repo;

import org.springframework.data.repository.CrudRepository;

public interface QuestionsRepo extends CrudRepository<Question, Integer> {
    Question findById(int id);

    Question findByCategory(String category);
}
