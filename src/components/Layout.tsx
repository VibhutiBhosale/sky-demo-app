import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">NextSkyDemo</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-4 text-sm">© NextSkyDemo</div>
      </footer>
    </div>
  );
};

export default Layout;
