import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../css/form.css";
import { DriverRequest } from "../dto/dto";
import { createDriver } from "../actions/drivers";

type FormState = {
  name: string;
  surname: string;
};

type Props = {
  onClose: () => void;
};

function AddDriverForm({ onClose }: Props) {
  const [formState, setFormState] = useState<string>("addDriver");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>();

  const onAddDriverSubmit: SubmitHandler<FormState> = async (data) => {
    const driverRequest: DriverRequest = {
          name: data.name,
          surname: data.surname,
      };
    
      const createdDriver = await createDriver(driverRequest);
    
      if (createdDriver) {
          console.log("Driver created successfully:", createdDriver);
          onClose();
          reset();
      } else {
          console.error("Failed to create driver.");
      
      };
  };

  return (
    formState === "addDriver" && (
      <div className="form-container">
        <div className="form-box">
          <h1 className="form-title">Dodaj nowego kierowcę</h1>
          <form onSubmit={handleSubmit(onAddDriverSubmit)}>
            <label className="form-label" htmlFor="name">
              Imię
            </label>
            <input
              className="form-input"
              id="name"
              {...register("name", {
                required: "Imię jest wymagane",
              })}
            />
            <label className="form-label" htmlFor="surname">
              Nazwisko
            </label>
            <input
              className="form-input"
              id="surname"
              {...register("surname", {
                required: "Nazwisko jest wymagane",
              })}
            />
            <input
              className="form-btn add"
              type="submit"
              value="Dodaj kierowcę"
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
    )
  );
}

export default AddDriverForm;
