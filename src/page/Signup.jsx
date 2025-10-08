import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { Navigate } from 'react-router-dom';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "@/components/ui/button";

// Importing image for background
import herossectionImage from "../images/herossection-image.avif";

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

  // Custom theme for Supabase Auth UI
  const customTheme = {
    default: {
      colors: {
        brand: '#8b5cf6',
        brandAccent: '#7c3aed',
        brandButtonText: 'white',
        defaultButtonBackground: '#1f2937',
        defaultButtonBackgroundHover: '#374151',
        defaultButtonBorder: '#6366f1',
        defaultButtonText: 'white',
        dividerBackground: '#4b5563',
        inputBackground: 'rgba(51, 65, 85, 0.5)',
        inputBorder: 'rgba(139, 92, 246, 0.3)',
        inputBorderHover: '#8b5cf6',
        inputBorderFocus: '#a855f7',
        inputText: 'white',
        inputLabelText: '#e5e7eb',
        inputPlaceholder: '#9ca3af',
        messageText: '#10b981',
        messageTextDanger: '#ef4444',
        anchorTextColor: '#60a5fa',
        anchorTextHoverColor: '#93c5fd',
      },
      space: {
        spaceSmall: '4px',
        spaceMedium: '8px',
        spaceLarge: '16px',
        labelBottomMargin: '8px',
        anchorBottomMargin: '4px',
        emailInputSpacing: '4px',
        socialAuthSpacing: '4px',
        buttonPadding: '10px 15px',
        inputPadding: '10px 15px',
      },
      fontSizes: {
        baseBodySize: '13px',
        baseInputSize: '14px',
        baseLabelSize: '14px',
        baseButtonSize: '14px',
      },
      fonts: {
        bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
        buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
        inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
        labelFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
      },
      borderWidths: {
        buttonBorderWidth: '1px',
        inputBorderWidth: '1px',
      },
      radii: {
        borderRadiusButton: '8px',
        buttonBorderRadius: '8px',
        inputBorderRadius: '8px',
      },
    },
  };

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-[5]"></div>

      {/* Auth Container */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🎓 Welcome Back
          </h1>
          <p className="text-gray-300 text-lg">
            Sign in to access your college event portal
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8 backdrop-blur-sm">
          <Auth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              extend: false,
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
                label: 'auth-label',
              },
              variables: customTheme.default
            }}
            redirectTo={`${import.meta.VITE_APP_URL}`}
            theme="default"
          />
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            🔒 Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;

