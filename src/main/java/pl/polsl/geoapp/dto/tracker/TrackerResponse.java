package pl.polsl.geoapp.dto.tracker;

import pl.polsl.geoapp.model.TrackerEntity;

public class TrackerResponse {
    private Integer id;

    private String name;

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

    public static TrackerResponse fromEntity(TrackerEntity entity){
        TrackerResponse dto = new TrackerResponse();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }
}
