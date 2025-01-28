import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { request, setAuthToken } from "./requestConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../login.css";

type Props = {
  loggedState: string;
  SetLoggedState: (state: string) => void;
};

type FormState = {
  email: string;
  password: string;
  name?: string;
  surname?: string;
};

function LoginForm(props: Props) {
  const [formState, setFormState] = useState<string>("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>();
  const navigate = useNavigate();

  const onLoginSubmit: SubmitHandler<FormState> = (data) => {
    request("POST", "/login", {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        setAuthToken(response.data.token);
        props.SetLoggedState("loggedIn");
        toast.success("Logowanie udane! Przekierowanie...");
        setTimeout(() => navigate("/account"), 1500);
      })
      .catch(() => {
        toast.error("Błąd logowania. Sprawdź dane i spróbuj ponownie.");
      });
  };

  const onRegisterSubmit: SubmitHandler<FormState> = (data) => {
    request("POST", "/register", {
      email: data.email,
      password: data.password,
    })
      .then(() => {
        toast.success("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
        setTimeout(() => setFormState("login"), 1500);
      })
      .catch(() => {
        toast.error("Błąd rejestracji. Spróbuj ponownie później.");
      });
  };

  const handleSwitchForm = (targetForm: string) => {
    setFormState(targetForm);
    reset();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">
          {formState === "login" ? "Zaloguj się na swoje konto" : "Utwórz nowe konto"}
        </h1>
        <form onSubmit={handleSubmit(formState === "login" ? onLoginSubmit : onRegisterSubmit)}>
          <label className="label-font" htmlFor="email">Email</label>
          <input
            className="deep-input"
            id="email"
            {...register("email", {
              required: "Adres e-mail jest wymagany",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Nieprawidłowy adres e-mail",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <label className="label-font" htmlFor="password">Hasło</label>
          <input
            type="password"
            className="deep-input"
            id="password"
            {...register("password", { required: "Hasło jest wymagane" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <input
            className="btn btn-primary"
            type="submit"
            value={formState === "login" ? "Zaloguj" : "Zarejestruj się"}
          />
          <button
            type="button"
            onClick={() => handleSwitchForm(formState === "login" ? "register" : "login")}
            className="register-link"
          >
            {formState === "login" ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
    </div>
  );
}

export default LoginForm;
