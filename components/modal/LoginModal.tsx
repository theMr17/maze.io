"use client";

import { useState } from "react";
import { Modal } from "./Modal"; // Assuming Modal is in the same folder
import ActionButton from "../button/ActionButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
    // TODO: Add actual login logic here
    onClose(); // Close after login (if successful)
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 space-y-4">
        <ActionButton
          className="flex items-center justify-center gap-4 w-full bg-secondary text-secondary-foreground border-2 border-border"
          variant="light"
          onClick={() => console.log("Google Login")}
        >
          <img src="google.svg" alt="Google logo" className="h-6 w-6" />
          Login with Google
        </ActionButton>

        <div className="flex items-center gap-2 text-primary-foreground">
          <div className="flex-grow border-t border-border" />
          <span className="text-sm">or</span>
          <div className="flex-grow border-t border-border" />
        </div>

        <label htmlFor="email" className="flex flex-col items-start">
          <span className="text-sm text-primary-foreground">Email:</span>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input"
            aria-label="Email"
          />
        </label>

        <label htmlFor="password" className="flex flex-col items-start">
          <span className="text-sm text-primary-foreground">Password:</span>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input"
            aria-label="Password"
          />
        </label>

        <ActionButton onClick={handleLogin} className="w-full">
          Log In
        </ActionButton>
      </div>
    </Modal>
  );
};

export default LoginModal;
