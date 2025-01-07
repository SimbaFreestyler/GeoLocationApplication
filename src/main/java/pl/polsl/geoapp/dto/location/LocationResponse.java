package pl.polsl.geoapp.dto.location;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.locationtech.jts.geom.Point;
import pl.polsl.geoapp.model.LocationEntity;

import java.time.LocalDateTime;

public class LocationResponse {
    private Integer id;

    private LocalDateTime timestamp;

    private Double latitude;

    private Double longitude;

    private String trackerId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getTrackerId() {
        return trackerId;
    }

    public void setTrackerId(String trackerId) {
        this.trackerId = trackerId;
    }

    public static LocationResponse fromEntity(LocationEntity entity) {
        LocationResponse response = new LocationResponse();
        response.setId(entity.getId());
        response.setLatitude(entity.getCoords().getX());
        response.setLongitude(entity.getCoords().getY());
        response.setTimestamp(entity.getTimestamp());
        response.setTrackerId(entity.getTracker().getSerialNumber());
        return response;
    }
}
