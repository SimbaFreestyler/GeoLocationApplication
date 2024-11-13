package pl.polsl.geoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

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
}
