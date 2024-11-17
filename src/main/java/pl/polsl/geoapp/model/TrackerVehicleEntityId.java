package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Embeddable
public class TrackerVehicleEntityId {
  @ManyToOne
  @JoinColumn(name = "vehicle_id")
  private VehicleEntity vehicle;

  @ManyToOne
  @JoinColumn(name = "tracker_id")
  private TrackerEntity tracker;

  @Column
  private LocalDate startDate;

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

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate endDate) {
    this.startDate = endDate;
  }
}
