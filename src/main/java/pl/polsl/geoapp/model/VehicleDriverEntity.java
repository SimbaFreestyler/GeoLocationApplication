package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "vehicle_driver", schema = "veh")
public class VehicleDriverEntity {
  @EmbeddedId
  private VehicleDriverEntityId id;

  @Column
  private LocalDate endDate;

  public VehicleDriverEntityId getId() {
    return id;
  }

  public void setId(VehicleDriverEntityId id) {
    this.id = id;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }
}
