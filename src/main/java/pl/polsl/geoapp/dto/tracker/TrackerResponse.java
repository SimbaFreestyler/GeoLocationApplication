package pl.polsl.geoapp.dto.tracker;

import pl.polsl.geoapp.model.TrackerEntity;
import javax.validation.constraints.NotNull;

public class TrackerResponse {
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

    public static TrackerResponse fromEntity(TrackerEntity entity){
        TrackerResponse dto = new TrackerResponse();
        dto.setSerialNumber(entity.getSerialNumber());
        dto.setName(entity.getName());
        dto.setType(entity.getType());
        return dto;
    }
}
