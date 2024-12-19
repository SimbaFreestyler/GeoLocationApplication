package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.time.LocalDate;

@Embeddable
public class VehicleTrackerEntityId {
  @Column(name = "vehicle_id")
  private String vehicleId;

  @Column(name = "tracker_id")
  private String trackerId;

  @Column(name = "start_date")
  private LocalDate startDate;

  public String getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(String vehicleId) {
    this.vehicleId = vehicleId;
  }

  public String getTrackerId() {
    return trackerId;
  }

  public void setTrackerId(String trackerId) {
    this.trackerId = trackerId;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate endDate) {
    this.startDate = endDate;
  }
}
