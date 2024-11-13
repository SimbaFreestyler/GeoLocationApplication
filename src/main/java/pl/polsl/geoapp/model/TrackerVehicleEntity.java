package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "tracker_vehicle", schema = "geo")
public class TrackerVehicleEntity {
  @EmbeddedId
  private TrackerVehicleEntityId id;

  @Column
  private LocalDate endDate;

  public TrackerVehicleEntityId getId() {
    return id;
  }

  public void setId(TrackerVehicleEntityId id) {
    this.id = id;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }
}
