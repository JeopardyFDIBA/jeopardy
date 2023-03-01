package com.jeopardy.repo;

import org.springframework.data.repository.CrudRepository;

public interface PlayerRepo extends CrudRepository<Player, Integer> {
    Player findById(int id);
}
