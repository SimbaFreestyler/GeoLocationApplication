package pl.polsl.geoapp.dto.driver;

import pl.polsl.geoapp.model.UserEntity;

public class DriverRequest {
    private String name;

    private String surname;

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
}
