package pl.polsl.geoapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "vehicle_tracker", schema = "geo")
public class VehicleTrackerEntity {
  @EmbeddedId
  private VehicleTrackerEntityId id;

  @ManyToOne
  @JoinColumn(name = "vehicle_id", insertable = false, updatable = false)
  private VehicleEntity vehicle;

  @ManyToOne
  @JoinColumn(name = "tracker_id", insertable = false, updatable = false)
  private TrackerEntity tracker;

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

  public VehicleEntity getVehicle() {
    return vehicle;
  }

  public void setVehicle(VehicleEntity vehicle) {
    this.vehicle = vehicle;
  }

  public TrackerEntity getTracker() {
    return tracker;
  }

  public void setTracker(TrackerEntity tracker) {
    this.tracker = tracker;
  }
}
