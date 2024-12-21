import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { request, setAuthToken } from "./requestConfig";
import { useNavigate } from "react-router-dom";
import "../login.css";

type Props = {
  loggedState: string;
  SetLoggedState: (state: string) => void;
}

type FormState = {
  email: string;
  password: string;
  name: string;
  surname: string;
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
      password: data.password
    }).then((response) => { 
      console.log(response.status);
      setAuthToken(response.data.token);
      props.SetLoggedState("loggedIn");
      navigate("/account");
    })
  };

  const onRegisterSubmit: SubmitHandler<FormState> = (data) => {
    request("POST", "/register", {
      email: data.email,
      password: data.password,
    });
  };

  const handleSwitchForm = (targetForm: string) => {
    setFormState(targetForm);
    reset();
  };

  return (
    formState === "login" && (
      <div className="login-container">
        <div className="login-box">
          <h1 className="title">Zaloguj się na swoje konto</h1>
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <label className="label-font" htmlFor="email">
              Email
            </label>
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
            <label className="label-font" htmlFor="password">
              Hasło
            </label>
            <input
            type="password"
              className="deep-input"
              id="password"
              {...register("password", { required: true })}
            />
            <input className="btn btn-primary" type="submit" value="Zaloguj" />
            <button
            type="button"
            onClick={() => handleSwitchForm("register")}
            className="register-link">
              Nie masz jeszcze konta? Zarejestruj się
            </button>
          </form>
        </div>
      </div>
    ) ||
    formState === "register" && (<div className="login-container">
      <div className="login-box">
        <h1 className="title">Utwórz nowe konto</h1>
        <form onSubmit={handleSubmit(onRegisterSubmit)}>
          <label className="label-font" htmlFor="email">
            Email
          </label>
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
          <label className="label-font" htmlFor="password">
            Hasło
          </label>
          <input
            type="password"
            className="deep-input"
            id="password"
            {...register("password", { required: true })}
          />
          <input className="btn btn-primary" type="submit" value="Zarejestruj się" />
          <button
          type="button"
          onClick={() => handleSwitchForm("login")} 
          className="register-link">
            Masz już konto? Zaloguj się
          </button>
        </form>
      </div>
    </div>)
  );
}

export default LoginForm;
