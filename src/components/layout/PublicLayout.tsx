import type { ReactNode } from "react";
import HomeHeader from "../home/HomeHeader";
import Footer from "../home/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HomeHeader />
      {children}
      <Footer />
    </>
  );
}
