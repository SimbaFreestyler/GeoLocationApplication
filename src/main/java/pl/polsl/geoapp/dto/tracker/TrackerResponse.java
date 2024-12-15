package pl.polsl.geoapp.dto.tracker;

import pl.polsl.geoapp.model.TrackerEntity;

public class TrackerResponse {
    private Integer serialNumber;

    private String name;

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

    public static TrackerResponse fromEntity(TrackerEntity entity){
        TrackerResponse dto = new TrackerResponse();
        dto.setSerialNumber(entity.getSerialNumber());
        dto.setName(entity.getName());
        dto.setType(entity.getType());
        return dto;
    }
}
