package jeopardyApp.repo;

import org.springframework.data.repository.CrudRepository;

public interface GameRepo extends CrudRepository<Game, Integer> {

    Game findById(int id);
}
