package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.time.LocalDate;

@Embeddable
public class VehicleDriverEntityId {
  @Column(name = "vehicle_id")
  private String vehicleId;

  @Column(name = "driver_id")
  private Integer driverId;

  @Column(name = "start_date")
  private LocalDate startDate;

  public String getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(String vehicleId) {
    this.vehicleId = vehicleId;
  }

  public Integer getDriverId() {
    return driverId;
  }

  public void setDriverId(Integer driverId) {
    this.driverId = driverId;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate endDate) {
    this.startDate = endDate;
  }
}
