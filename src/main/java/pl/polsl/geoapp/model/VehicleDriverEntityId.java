package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Embeddable
public class VehicleDriverEntityId {
  @ManyToOne
  @JoinColumn(name = "vehicle_id", referencedColumnName = "registration_number")
  private VehicleEntity vehicle;

  @ManyToOne
  @JoinColumn(name = "driver_id", referencedColumnName = "id")
  private DriverEntity driver;

  @Column
  private LocalDate startDate;

  public VehicleEntity getVehicle() {
    return vehicle;
  }

  public void setVehicle(VehicleEntity vehicle) {
    this.vehicle = vehicle;
  }

  public DriverEntity getDriver() {
    return driver;
  }

  public void setDriver(DriverEntity driver) {
    this.driver = driver;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate endDate) {
    this.startDate = endDate;
  }
}
