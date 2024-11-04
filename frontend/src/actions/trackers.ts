import { TrackerRequest, TrackerResponse } from "../dto/dto";

function createTracker(body: TrackerRequest) {
    fetch("http://localhost:8080/tracker")
}