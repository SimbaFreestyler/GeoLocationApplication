package pl.polsl.geoapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "driver", schema = "adm")
public class DriverEntity {
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "driver_generator")
  @SequenceGenerator(
      name = "driver_generator",
      sequenceName = "driver_seq",
      schema = "adm",
      allocationSize = 1)
  private Integer id;

  @Column
  private String name;

  @Column
  private String surname;

  @OneToOne
  @JoinColumn(name = "user_id")
  UserEntity user;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSurname() {
    return surname;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }
}
