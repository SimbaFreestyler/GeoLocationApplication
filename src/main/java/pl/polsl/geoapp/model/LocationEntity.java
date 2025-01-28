package pl.polsl.geoapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.locationtech.jts.geom.Point;

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

  @ManyToOne
  @JoinColumn(name = "tracker_id", referencedColumnName = "serial_number")
  private TrackerEntity tracker;

  @Column(columnDefinition = "geography(Point,4326)")
  private Point coords;

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

  public TrackerEntity getTracker() {
    return tracker;
  }

  public void setTracker(TrackerEntity tracker) {
    this.tracker = tracker;
  }

  public Point getCoords() {
    return coords;
  }

  public void setCoords(Point coords) {
    this.coords = coords;
  }
}
