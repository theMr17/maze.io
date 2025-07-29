"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import ActionButton from "../button/ActionButton";
import { loginWithCredentials } from "@/services/authService"; // Adjust path if different
import { useAuth } from "@/providers/AuthProvider";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthData } = useAuth();

  const handleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await loginWithCredentials(email, password);
      setAuthData(res.data.user);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-94 space-y-4 p-8">
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

        {error && <p className="text-secondary text-sm">{error}</p>}

        <ActionButton
          onClick={handleLogin}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </ActionButton>
      </div>
    </Modal>
  );
};

export default LoginModal;
