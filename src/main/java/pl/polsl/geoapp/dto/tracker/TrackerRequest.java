package pl.polsl.geoapp.dto.tracker;

import javax.validation.constraints.NotNull;

public class TrackerRequest {
    @NotNull
    private String serialNumber;

    @NotNull
    private String name;

    @NotNull
    private String type;

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
}
