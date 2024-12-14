package pl.polsl.geoapp.dto.driver;

import pl.polsl.geoapp.dto.user.UserResponse;
import pl.polsl.geoapp.model.UserEntity;

public class DriverResponse {
    private Integer id;

    private String name;

    private String surname;

    UserResponse user;

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

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }
}
