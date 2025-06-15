import React from "react";
export default function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">
        🎓 College Event Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome, Admin</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}
