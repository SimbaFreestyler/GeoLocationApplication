package pl.polsl.geoapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "vehicle_driver", schema = "veh")
public class VehicleDriverEntity {
  @EmbeddedId
  private VehicleDriverEntityId id;

  @ManyToOne
  @JoinColumn(name = "vehicle_id", insertable = false, updatable = false)
  private VehicleEntity vehicle;

  @ManyToOne
  @JoinColumn(name = "driver_id", insertable = false, updatable = false)
  private DriverEntity driver;

  @Column
  private LocalDate endDate;

  public VehicleDriverEntityId getId() {
    return id;
  }

  public void setId(VehicleDriverEntityId id) {
    this.id = id;
  }

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

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }
}
