package jeopardyApp.repo;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Game {

    public Game() {
    }

    public Integer getId() {
        return id;
    }

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany
    private List<Player> players;

    public Game(List<Player> players) {
        this.players = players;
    }

    public List<Player> getPlayers() {
        return players;
    }
}
