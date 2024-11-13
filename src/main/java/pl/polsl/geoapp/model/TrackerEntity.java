package pl.polsl.geoapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tracker", schema = "geo")
public class TrackerEntity {
    @Id
    private Integer serialNumber;

    @Column
    private String name;

    @Column
    private String type;

    public Integer getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(Integer serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}