package repo;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuestionsRepo extends CrudRepository<Question, Integer> {
    Question findById(int id);

    List<Question> findAllByCategoryAndScore(String category, int score);
}
