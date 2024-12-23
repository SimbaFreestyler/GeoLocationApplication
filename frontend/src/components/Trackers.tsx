import React, { useEffect, useState } from "react";
import { TrackerResponse } from "../dto/dto";
import AddTrackerForm from "./AddTrackerForm";
import { deleteTracker, getTrackers } from "../actions/trackers";

function Trackers() {
  const [trackers, setTrackers] = useState<TrackerResponse[] | null>(null);

  const [addTrackerFormVisible, setAddTrackerFormVisible] =
    useState<boolean>(false);

  const loadTrackerData = async () => {
    const data = await getTrackers();
    setTrackers(data);
  };

  const handleDelete = async (serialNumber: string) => {
      try {
        await deleteTracker(serialNumber);
        loadTrackerData();
      } catch (err) {
        console.error("Błąd podczas usuwania lokalizatora:", err);
      }
    };

  useEffect(() => {
    loadTrackerData();
  }, []);

  return (
    <>
      {addTrackerFormVisible && (
        <div className="modal-overlay">
          <AddTrackerForm
            onClose={() => {
              setAddTrackerFormVisible(false);
              loadTrackerData();
            }}
          />
        </div>
      )}
      <div className="list">
        <h2 className="label-font">Lista lokalizatorów</h2>
        {trackers?.length ? (
          <ul>
            {trackers.map((tracker: TrackerResponse) => (
              <li key={tracker.serialNumber}>
                <div>
                  <strong>Nazwa:</strong> {tracker.name}
                  <br></br>
                  <strong>Nr seryjny:</strong> {tracker.serialNumber}
                  <br></br>
                  <strong>Typ:</strong> {tracker.type}
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(tracker.serialNumber)}
                >
                  Usuń
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="label-font">Brak lokalizatorów.</p>
        )}
        <button
          className="add-button"
          onClick={() => {
            setAddTrackerFormVisible(true);
          }}
        >
          Dodaj lokalizator
        </button>
      </div>
    </>
  );
}

export default Trackers;
