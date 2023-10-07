import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { PrivacyPolicyV2 } from "./pages/PrivacyPolicyV2";
import { Contacts } from "./pages/Contacts";
import { ErrorPage } from "./pages/ErrorPage";
import { AdminLogin } from "./pages/AdminLogin";
import { Admin } from "./pages/Admin";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyV2 />
  },
  {
    path: "/contacts",
    element: <Contacts />
  },
  {
    path: "/admin-login",
    element: <AdminLogin />
  },
  {
    path: "/admin",
    element: <Admin />
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
