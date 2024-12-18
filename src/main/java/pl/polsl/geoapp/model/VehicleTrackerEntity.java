package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "vehicle_tracker", schema = "geo")
public class VehicleTrackerEntity {
  @EmbeddedId
  private VehicleTrackerEntityId id;

  @Column
  private LocalDate endDate;

  public VehicleTrackerEntityId getId() {
    return id;
  }

  public void setId(VehicleTrackerEntityId id) {
    this.id = id;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }
}
