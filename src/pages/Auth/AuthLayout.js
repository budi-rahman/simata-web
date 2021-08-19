import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-wrapper">
        <img className="auth-logo" src="/img/logo.png" alt="logo" />
        {children}
      </div>
    </div>
  );
}
