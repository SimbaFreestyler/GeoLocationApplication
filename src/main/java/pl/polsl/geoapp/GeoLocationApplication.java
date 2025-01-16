package pl.polsl.geoapp;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GeoLocationApplication {

	@Autowired
	private TcpServer tcpServer;

	public static void main(String[] args) {
		SpringApplication.run(GeoLocationApplication.class, args);
	}

	@PostConstruct
	public void startTcpServer() {
		new Thread(tcpServer).start();
	}
}
