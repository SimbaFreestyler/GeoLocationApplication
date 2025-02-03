import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../css/form.css";
import { createTracker } from "../actions/trackers";
import { TrackerRequest } from "../dto/dto";
import HelpDialog from "./HelpDialog";

type FormState = {
  name: string;
  serialNumber: string;
  type: string;
};

type Props = {
  onClose: () => void;
};

function AddTrackerForm({ onClose }: Props) {
  const [formState, setFormState] = useState<string>("addTracker");
  const [isHelpVisible, setIsHelpVIsible] = useState(false);
  const onHelpClose = () => {
    setIsHelpVIsible(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>();

  const onAddVehicleSubmit: SubmitHandler<FormState> = async (data) => {
    const trackerRequest: TrackerRequest = {
      serialNumber: data.serialNumber,
      name: data.name,
      type: data.type,
    };

    const createdTracker = await createTracker(trackerRequest);

    if (createdTracker) {
      console.log("Tracker created successfully:", createdTracker);
      onClose();
      reset();
    } else {
      console.error("Failed to create tracker.");
    }
  };

  return (
    formState === "addTracker" && (
      <>
        {isHelpVisible && <HelpDialog onClose={onHelpClose} />}
        <div className="form-container">
          <div className="form-box">
            <h1 className="form-title">Dodaj nowy lokalizator</h1>
            <form onSubmit={handleSubmit(onAddVehicleSubmit)}>
              <label className="form-label" htmlFor="name">
                Nazwa
              </label>
              <input
                className="form-input"
                id="name"
                {...register("name", { required: "Nazwa jest wymagana" })}
              />
              {errors.name && (
                <p className="form-error form-validation-text">
                  {errors.name.message}
                </p>
              )}

              <label className="form-label" htmlFor="serialNumber">
                Numer seryjny
              </label>
              <input
                className="form-input"
                id="serialNumber"
                {...register("serialNumber", {
                  required: "Numer seryjny jest wymagany",
                })}
              />
              {errors.serialNumber && (
                <p className=" form-errorform-validation-text">
                  {errors.serialNumber.message}
                </p>
              )}

              <label className="form-label" htmlFor="type">
                Typ
              </label>
              <input
                className="form-input"
                id="type"
                {...register("type", { required: "Typ jest wymagany" })}
              />
              {errors.type && (
                <p className=" form-errorform-validation-text">
                  {errors.type.message}
                </p>
              )}

              <input
                className="form-btn help"
                type="button"
                value="Instrukcja - konfiguracja lokalizatora"
                onClick={() => setIsHelpVIsible(true)}
              />
              <input
                className="form-btn add"
                type="submit"
                value="Dodaj Lokalizator"
              />
              <input
                className="form-btn delete"
                type="button"
                value="Anuluj"
                onClick={() => onClose()}
              />
            </form>
          </div>
        </div>
      </>
    )
  );
}

export default AddTrackerForm;
