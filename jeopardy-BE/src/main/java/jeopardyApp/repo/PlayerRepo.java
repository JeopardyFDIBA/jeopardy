package jeopardyApp.repo;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlayerRepo extends CrudRepository<Player, Integer> {
    Player findById(int id);
    List<Player> findFirst5ByOrderByScoreDesc();
}
