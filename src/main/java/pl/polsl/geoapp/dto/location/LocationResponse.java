package pl.polsl.geoapp.dto.location;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

public class LocationResponse {
    private Integer id;

    private LocalDateTime timestamp;

    @JsonProperty("coords")
    private Point coords;

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

    public Point getCoords() {
        return coords;
    }

    public void setCoords(Point coords) {
        this.coords = coords;
    }
}
