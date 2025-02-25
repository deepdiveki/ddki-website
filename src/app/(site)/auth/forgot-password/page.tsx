import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ForgotPassword from "@/components/Auth/ForgotPassword";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passwort vergessen? | DeepDiveKI",
  description: "This is Forgot Password page",
  // other metadata
};

const ForgotPasswordPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Passwort vergessen?" />
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
