package pl.polsl.geoapp.dto.user;

import jakarta.persistence.Column;

public class UserDriverRequest {

    private String email;

    private String password;

    private String name;

    private String surname;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
