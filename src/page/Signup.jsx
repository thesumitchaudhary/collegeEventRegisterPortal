import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { Navigate } from 'react-router-dom';
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

  if (session) return <Navigate to="/" replace />;

  // if (session) {
  //   return (
  //   <div className="flex bg-[#000] flex-col items-center justify-center h-screen">
  //     <h2 className="text-2xl font-semibold mb-4 text-white">You are signed in!</h2>
  //     <button
  //       onClick={handleSignOut}
  //       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  //     >
  //       Sign Out
  //     </button>
  //   </div>
  // );
  // }
  
    return (
      <div className="bg-[#000] w-100 mx-auto rounded-xl p-10 mt-7">
      <Auth 
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
         redirectTo={`${import.meta.VITE_APP_URL}`}
        //  redirectTo="http://localhost:517  3"
        theme="default"
      />
      </div>
    );
}

export default Signin;

