import Signup from "@/components/Auth/Signup";
import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeepDiveKI",
  description: "Hier können Sie sich anmelden",
  // other metadata
};

const SignupPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Registrieren" />

      <Signup />
    </>
  );
};

export default SignupPage;
