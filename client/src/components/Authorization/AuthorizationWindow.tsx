import React, { FC } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface IAuthorizationWindow {
  title: string;
}

const AuthorizationWindow: FC<IAuthorizationWindow> = ({ title }) => {
  return (
    <div className="basket__auth">
      <p className="basket__auth-title">{title}</p>
      <div className="basket__auth-wrapper">
        <div className="basket__auth-borders">
          <LoginForm></LoginForm>
        </div>
        <div className="basket__auth-borders">
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationWindow;
