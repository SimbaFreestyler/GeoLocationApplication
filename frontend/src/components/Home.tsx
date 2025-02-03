import "../css/home.css";

function Home() {
  return (
    <div className="main-container">
      <h1 className="welcome-title">Witaj w GeoApp</h1>
      <p className="text description1">
        GeoApp to aplikacja, która pozwala zarządzać danymi lokalizatorów,
        pojazdów i kierowców w jednym miejscu. Chcesz sprawdzić, jaką trasę
        przebył Twój pojazd lub kierowca? To też oferuje GeoApp.
      </p>
      <p className="text description2">
        Zarejestruj się, aby uzyskać dostęp do aplikacji lub zaloguj się, jeśli
        posiadasz już konto w GeoApp.
      </p>
    </div>
  );
}

export default Home;
