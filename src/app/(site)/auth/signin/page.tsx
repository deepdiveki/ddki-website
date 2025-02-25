import Signin from "@/components/Auth/SignIn";
import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeepDiveKI",
  description: "Hier können Sie sich anmelden",
  // other metadata
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Login" />

      <Signin />
    </>
  );
};

export default SigninPage;
