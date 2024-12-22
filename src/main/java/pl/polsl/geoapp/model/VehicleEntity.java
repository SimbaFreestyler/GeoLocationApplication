package pl.polsl.geoapp.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "vehicle", schema = "veh")
public class VehicleEntity {
  @Id
  @Column(name = "registration_number")
  private String registrationNumber;

  @Column(name = "vin_number")
  private String vinNumber;

  @Column
  private String brand;

  @Column
  private String model;

  @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
  private Set<VehicleDriverEntity> vehicleDrivers;

  @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
  private Set<VehicleTrackerEntity> vehicleTrackers;

  public String getRegistrationNumber() {
    return registrationNumber;
  }

  public void setRegistrationNumber(String registrationNumber) {
    this.registrationNumber = registrationNumber;
  }

  public String getVinNumber() {
    return vinNumber;
  }

  public void setVinNumber(String vinNumber) {
    this.vinNumber = vinNumber;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getModel() {
    return model;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public Set<VehicleDriverEntity> getVehicleDrivers() {
    return vehicleDrivers;
  }

  public void setVehicleDrivers(Set<VehicleDriverEntity> vehicleDrivers) {
    this.vehicleDrivers = vehicleDrivers;
  }

  public Set<VehicleTrackerEntity> getVehicleTrackers() {
    return vehicleTrackers;
  }

  public void setVehicleTrackers(Set<VehicleTrackerEntity> vehicleTrackers) {
    this.vehicleTrackers = vehicleTrackers;
  }
}
