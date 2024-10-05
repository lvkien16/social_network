import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from "@/redux/user/ReduxProvider";
import dynamic from "next/dynamic";

const PrivateRoute = dynamic(

  () => import("@/components/PrivateRoute"),
  {
    ssr: false,
  }
);

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
          className={`antialiased bg-third`}
        > 
          <PrivateRoute>
            <Header />
            <div className="pt-20 lg:pt-24 px-4 xl:px-44">{children}</div>
            <ToastContainer />
          </PrivateRoute>
        </body>
      </html>
    </ReduxProvider>
  );
}
