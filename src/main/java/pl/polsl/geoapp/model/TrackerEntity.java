package pl.polsl.geoapp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tracker", schema = "geo")
public class TrackerEntity {
    @Id
    @Column(name = "serial_number")
    private String serialNumber;

    @Column
    private String name;

    @Column
    private String type;

    @OneToMany(mappedBy = "tracker", fetch = FetchType.LAZY)
    private List<LocationEntity> locations;

    @OneToMany(mappedBy = "tracker", fetch = FetchType.LAZY)
    private List<VehicleTrackerEntity> vehicleTrackers;

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
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

    public List<LocationEntity> getLocations() {
        return locations;
    }

    public void setLocations(List<LocationEntity> locations) {
        this.locations = locations;
    }

    public List<VehicleTrackerEntity> getVehicleTrackers() {
        return vehicleTrackers;
    }

    public void setVehicleTrackers(List<VehicleTrackerEntity> vehicleTrackers) {
        this.vehicleTrackers = vehicleTrackers;
    }
}