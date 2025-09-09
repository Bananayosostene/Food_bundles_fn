// src/app/hooks/useAuthUser.ts
"use client";
import { useEffect, useState, useCallback } from "react";
import { authService } from "@/app/services/authService";

export type AppUser = {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  location?: string;
  role?: string;
  // add any other fields your backend returns
};

export function useAuthUser() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadFromStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const refresh = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const me = await authService.getCurrentUser(); // should return user object
      if (me) {
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
      }
    } catch {
      // if /me fails (401), clear storage so UI reflects logged-out state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromStorage(); // show cached user immediately
    refresh();         // then verify/refresh from API
  }, [loadFromStorage, refresh]);

  const updateLocalUser = (partial: Partial<AppUser>) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...partial } as AppUser;
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  return { user, loading, refresh, updateLocalUser };
}
