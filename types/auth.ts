export interface User {
  id: string;
  email: string | null;
  name: string | null;
  password: string | null;
  isGuest: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
}
