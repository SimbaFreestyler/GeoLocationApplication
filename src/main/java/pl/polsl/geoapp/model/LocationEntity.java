package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "location", schema = "geo")
public class LocationEntity {
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "location_generator")
  @SequenceGenerator(
      name = "location_generator",
      sequenceName = "location_seq",
      schema = "geo",
      allocationSize = 1)
  private Integer id;

  @Column
  private LocalDateTime timestamp;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }
}
