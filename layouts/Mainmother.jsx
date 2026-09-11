"use client";

import Navbar from "@/components/Navbar";
import SecondaryNavbar from "@/components/SecondaryNavbar";
import Footer from "@/components/Footer";

function Mainmother({ children }) {
  return (
    <div className="site-shell min-h-screen flex flex-col">
      <Navbar />
      <SecondaryNavbar />
      <main className="flex-1">
          {children}
      </main>
      <Footer />
    </div>
  );
}

export default Mainmother;
