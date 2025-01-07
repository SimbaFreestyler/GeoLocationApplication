import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    SetLoggedState: (state: string) => void;
  }

function Logout(props: Props) {
    const navigate = useNavigate();
  const handleLogout = () => {
    props.SetLoggedState("loggedOut");
    navigate("/");
  };

  useEffect(() => {
    handleLogout();
  }, [])

  return null
}

export default Logout
