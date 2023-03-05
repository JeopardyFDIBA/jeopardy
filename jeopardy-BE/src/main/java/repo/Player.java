package repo;

import jakarta.persistence.*;

@Entity
public class Player {
    public Player() {
    }

    public Integer getId() {
        return id;
    }

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public Player(String name, int score) {
        this.name = name;
        this.score = score;
    }

    private String name;

    private int score;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
