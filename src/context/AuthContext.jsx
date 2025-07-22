import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const currentUser = session?.user || null;
    setUser(currentUser);

    if (currentUser) {
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", currentUser.id)
        .single();

      if (!error && data) {
        setRole(data.role);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getUserData();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUserData();
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  console.log(role);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);
