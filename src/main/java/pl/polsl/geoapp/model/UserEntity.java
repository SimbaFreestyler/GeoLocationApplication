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
}
