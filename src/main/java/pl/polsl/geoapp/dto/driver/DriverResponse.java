package pl.polsl.geoapp.dto.driver;

import pl.polsl.geoapp.model.DriverEntity;

public class DriverResponse {
    private Integer id;

    private String name;

    private String surname;

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

    public static DriverResponse fromEntity(DriverEntity entity) {
        DriverResponse dto = new DriverResponse();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSurname(entity.getSurname());
        return dto;
    }
}
