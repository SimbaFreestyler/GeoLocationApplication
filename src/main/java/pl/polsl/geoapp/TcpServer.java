package pl.polsl.geoapp;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

@Component
public class TcpServer implements Runnable {

    private final int port;

    public TcpServer() {
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
            byte[] buffer = new byte[4096]; // Zwiększony rozmiar bufora

            int bytesRead;
            int totalBytesRead = 0; // Licznik całkowitej liczby odebranych bajtów

            // Odbieranie danych do momentu, gdy nie będzie już więcej danych
            while ((bytesRead = in.read(buffer)) != -1) {
                totalBytesRead += bytesRead;
                String inputLine = new String(buffer, 0, bytesRead, StandardCharsets.UTF_8);
                request.append(inputLine);

                // Debugowanie odbieranych danych
                System.out.println("Received (" + totalBytesRead + " bytes): " + inputLine);
            }

            // Wydrukowanie pełnego zapytania po zakończeniu odbioru

            // Echo odpowiedzi
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

}