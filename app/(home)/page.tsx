import Main from "@/components/Main";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Ecosystem Governance",
  description: "The homepage for CEG",
  openGraph: {
    images: [{ url: "/assets/logo.png" }],
  },
};

export default function Home() {
  return (
    <div className="inset-0 flex min-h-screen w-full flex-col items-center justify-between bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] px-5 dark:bg-darkBg">
      <div className="flex flex-1 items-center justify-center">
        <Main />
      </div>
      <Footer />
    </div>
  );
}
