import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from "@/redux/user/ReduxProvider";

export const metadata: Metadata = {
  title: "Sleepant",
  description: "Sleepant social network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body
          className={`antialiased`}
        >
          <Header />
          <div className="pt-16">{children}</div>
          <ToastContainer />
        </body>
      </html>
    </ReduxProvider>
  );
}
