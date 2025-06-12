import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "../supabase-client";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  signInWithGitHub: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signInWithGitHub: () => {
    supabase.auth.signInWithOAuth({ provider: "github" });
  },
  signOut: () => {
    supabase.auth.signOut();
  },
}));
