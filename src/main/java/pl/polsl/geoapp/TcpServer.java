package pl.polsl.geoapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.polsl.geoapp.model.LocationEntity;
import pl.polsl.geoapp.model.TrackerEntity;
import pl.polsl.geoapp.repository.LocationRepository;
import pl.polsl.geoapp.repository.TrackerRepository;
import pl.polsl.geoapp.service.LocationService;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Component
public class TcpServer implements Runnable {

    private final int port;

    @Autowired
    private final LocationRepository locationRepository;

    @Autowired
    private final TrackerRepository trackerRepository;

    @Autowired
    private final LocationService locationService;


    public TcpServer(LocationRepository locationRepository, TrackerRepository trackerRepository,
                     LocationService locationService) {
        this.locationRepository = locationRepository;
        this.trackerRepository = trackerRepository;
        this.locationService = locationService;
        this.port = 8080;
    }

    @Override
    public void run() {
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("TCP Server listening on port " + port);

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("New connection accepted: " + clientSocket.getInetAddress());

                new Thread(() -> handleClient(clientSocket)).start();
            }
        } catch (Exception e) {
            System.err.println("Error in TCP server: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void handleClient(Socket clientSocket) {
        try {
            InputStream in = clientSocket.getInputStream();
            OutputStream out = clientSocket.getOutputStream();
            StringBuilder request = new StringBuilder();
            byte[] buffer = new byte[4096];

            int bytesRead;
            int totalBytesRead = 0;

            while ((bytesRead = in.read(buffer)) != -1) {
                totalBytesRead += bytesRead;
                String inputLine = new String(buffer, 0, bytesRead, StandardCharsets.UTF_8);
                request.append(inputLine);

                System.out.println("Received (" + totalBytesRead + " bytes): " + inputLine);

                if (inputLine.contains("#")) {
                    saveGpsData(inputLine);
                }
            }

            String response = "Echo: " + request.toString();
            out.write(response.getBytes());

        } catch (Exception e) {
            System.err.println("Error handling client: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                clientSocket.close();
            } catch (Exception e) {
                System.err.println("Error closing client socket: " + e.getMessage());
            }
        }
    }

    private void saveGpsData(String data) {
        try {
            if (data.startsWith("*HQ")) {
                String[] parts = data.split(",");
                String deviceId = parts[1];
                Double latitude = Double.parseDouble(parts[5]) / 100;
                Double longitude = Double.parseDouble(parts[7]) / 100;
                String dateStr = parts[11];
                String timeStr = parts[3];
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("ddMMyy");
                LocalDate date = LocalDate.parse(dateStr, dateFormatter);
                DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");
                LocalTime time = LocalTime.parse(timeStr, timeFormatter);
                LocalDateTime timestamp = LocalDateTime.of(date, time);
                Optional<TrackerEntity> tracker = trackerRepository.findById(deviceId);
                if (tracker.isPresent()) {
                    LocationEntity location = new LocationEntity();
                    location.setTracker(tracker.get());
                    location.setTimestamp(timestamp);
                    location.setCoords(locationService.createPoint(latitude, longitude));
                    locationRepository.save(location);
                }
            }
        } catch (Exception e) {
            System.err.println("Error parsing GPS data: " + e.getMessage());
            e.printStackTrace();
        }
    }

}