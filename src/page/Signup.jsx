import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function Signin() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div className="bg-[#000] w-100 mx-auto rounded-xl p-10 mt-7">
      <Auth 
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        redirectTo={`${import.meta.VITE_APP_URL}/dashboard`}
        theme="default"
      />
      </div>
    );
  }

  return (
    <div className="flex bg-[#000] flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-white">You are signed in!</h2>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Signin;

