import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>User Name:</h2>
        <h2>{user.nickname}</h2>
        <h4>Name:</h4>
        <h4>{user.name}</h4>
        <p>Email: {user.email}</p>
        <button >
        <a href="mailto:281212.namaste@gmail.com?Subject=Te%20contacto%20de%20tu%20portafolio">Contact Me</a>
        </button>
      </div>
    )
  );
};