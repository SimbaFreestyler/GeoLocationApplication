package pl.polsl.geoapp.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user", schema = "adm")
public class UserEntity {
  @Id
  @Column
  private String email;

  @Column
  private String password;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private Set<DriverEntity> driver;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private Set<TrackerEntity> tracker;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private Set<VehicleEntity> vehicle;

  public String getEmail() {
    return email;
  }

  public void setEmail(String username) {
    this.email = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<DriverEntity> getDriver() {
    return driver;
  }

  public void setDriver(Set<DriverEntity> driver) {
    this.driver = driver;
  }

  public Set<TrackerEntity> getTracker() {
    return tracker;
  }

  public void setTracker(Set<TrackerEntity> tracker) {
    this.tracker = tracker;
  }

  public Set<VehicleEntity> getVehicle() {
    return vehicle;
  }

  public void setVehicle(Set<VehicleEntity> vehicle) {
    this.vehicle = vehicle;
  }
}
