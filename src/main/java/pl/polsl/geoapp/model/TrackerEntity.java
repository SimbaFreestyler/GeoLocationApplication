package pl.polsl.geoapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tracker", schema = "geo")
public class TrackerEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tracker_generator")
    @SequenceGenerator(
            name = "tracker_generator",
            sequenceName = "tracker_seq",
            schema = "geo",
            allocationSize = 1)
    private Integer id;

    @Column(name = "name")
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}