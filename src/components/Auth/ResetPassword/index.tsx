"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Loader from "@/components/Common/Loader";

const ResetPasswordSection = ({
  handleSubmit,
  handleChange,
  data,
  loader,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: { newPassword: string; ReNewPassword: string };
  loader: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <section className="pb-17.5 pt-17.5 lg:pb-22.5 xl:pb-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="wow fadeInUp rounded-3xl bg-white/[0.05]">
          <div className="flex">
            <div className="hidden w-full lg:block lg:w-1/2">
              <div className="relative py-20 pl-17.5 pr-22">
                <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-white/0 via-white/20 to-white/0"></div>
                <h2 className="mb-10 max-w-[292px] text-heading-4 font-bold text-white">
                  Login DeepDiveKI ToolBox
                </h2>
                <div className="relative aspect-[61/50] w-full max-w-[427px]">
                  <Image src="/images/signin/sigin.svg" alt="signin" fill />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="flex h-full flex-col justify-center py-8 pl-8 pr-8 sm:py-20 sm:pl-21 sm:pr-20">
                <form onSubmit={handleSubmit}>
                  {/* New Password Input */}
                  <div className="relative mb-5">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_368_6544)">
                                <path
                                  d="M14.0752 1.92501C13.1252 0.975012 11.8502 0.450012 10.5002 0.450012C9.1502 0.450012 7.8502 0.975012 6.9002 1.92501C5.6252 3.20001 5.1252 5.00001 5.5752 6.75001L0.725195 11.575C0.550195 11.75 0.450195 12 0.450195 12.275V14.6C0.450195 15.125 0.875195 15.575 1.4252 15.575H3.7502C4.0002 15.575 4.2502 15.475 4.4502 15.3L5.0252 14.725C5.2252 14.525 5.3502 14.225 5.3002 13.925V13.875L5.6002 13.85C6.0752 13.8 6.4252 13.45 6.4752 12.975L6.5002 12.675H6.5502C6.8252 12.7 7.1002 12.625 7.3252 12.425C7.5252 12.25 7.6502 11.975 7.6502 11.7V11.5H7.8252C8.0752 11.5 8.3252 11.4 8.5002 11.225L9.3252 10.425C11.0502 10.85 12.8502 10.375 14.1002 9.12501C16.0502 7.12501 16.0502 3.90001 14.0752 1.92501ZM13.2752 8.30001C12.2502 9.32501 10.7252 9.70001 9.3002 9.22501C9.1002 9.15001 8.8752 9.20001 8.7252 9.35001L7.7252 10.35H7.0502C6.7502 10.35 6.4752 10.6 6.4752 10.925V11.525L6.0252 11.475C5.8752 11.45 5.7252 11.5 5.6002 11.6C5.4752 11.7 5.4002 11.825 5.4002 11.975L5.3252 12.725L4.5752 12.8C4.4252 12.825 4.2752 12.9 4.2002 13C4.1002 13.125 4.0502 13.275 4.0752 13.425L4.1502 13.975L3.6752 14.45H1.5752V12.35L6.6002 7.32501C6.7502 7.17501 6.8002 6.95001 6.7252 6.75001C6.2752 5.32501 6.6252 3.80001 7.6752 2.75001C8.4252 2.00001 9.4002 1.60001 10.4752 1.60001C11.5252 1.60001 12.5252 2.00001 13.2752 2.75001C14.8252 4.25001 14.8252 6.75001 13.2752 8.30001Z"
                                  fill="#918EA0"
                                />
                                <path
                                  d="M11.3498 2.875C10.8748 2.875 10.4248 3.05 10.0748 3.4C9.3748 4.1 9.3748 5.225 10.0748 5.925C10.4248 6.275 10.8748 6.45 11.3498 6.45C11.8248 6.45 12.2748 6.275 12.6248 5.925C12.9748 5.575 13.1498 5.125 13.1498 4.65C13.1498 4.175 12.9748 3.725 12.6248 3.375C12.2748 3.05 11.8248 2.875 11.3498 2.875ZM11.8248 5.125C11.5748 5.375 11.1248 5.375 10.8748 5.125C10.6248 4.875 10.6248 4.45 10.8748 4.175C10.9998 4.05 11.1748 3.975 11.3498 3.975C11.5248 3.975 11.6998 4.05 11.8248 4.175C11.9498 4.3 12.0248 4.475 12.0248 4.65C12.0248 4.825 11.9498 5 11.8248 5.125Z"
                                  fill="#918EA0"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_368_6544">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={data.newPassword}
                        name="newPassword"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-white/[0.12] bg-transparent py-3.5 pl-14.5 pr-14 font-medium text-white outline-none focus:border-purple focus-visible:shadow-none"
                      />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                      {showPassword ? (
                      // Eye-off icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 26 26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >

                        <circle cx="13" cy="12" r="3" />
                        <line x1="6" y1="5" x2="22" y2="21" />
                        <path d="M2 12c3.81-5 8.19-7.5 12-7.5s8.19 2.5 12 7.5c-3.81 5-8.19 7.5-12 7.5S5.81 17 2 12z" />
                      </svg>
                    ) : (
                      // Eye icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 26 26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="13" cy="12" r="3" />
                        <path d="M2 12c3.81-5 8.19-7.5 12-7.5s8.19 2.5 12 7.5c-3.81 5-8.19 7.5-12 7.5S5.81 17 2 12z" />
                      </svg>
                    )}
                  </button>
                  </div>

                  {/* Re-enter New Password Input */}
                  <div className="relative mb-5">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_368_6544)">
                                <path
                                  d="M14.0752 1.92501C13.1252 0.975012 11.8502 0.450012 10.5002 0.450012C9.1502 0.450012 7.8502 0.975012 6.9002 1.92501C5.6252 3.20001 5.1252 5.00001 5.5752 6.75001L0.725195 11.575C0.550195 11.75 0.450195 12 0.450195 12.275V14.6C0.450195 15.125 0.875195 15.575 1.4252 15.575H3.7502C4.0002 15.575 4.2502 15.475 4.4502 15.3L5.0252 14.725C5.2252 14.525 5.3502 14.225 5.3002 13.925V13.875L5.6002 13.85C6.0752 13.8 6.4252 13.45 6.4752 12.975L6.5002 12.675H6.5502C6.8252 12.7 7.1002 12.625 7.3252 12.425C7.5252 12.25 7.6502 11.975 7.6502 11.7V11.5H7.8252C8.0752 11.5 8.3252 11.4 8.5002 11.225L9.3252 10.425C11.0502 10.85 12.8502 10.375 14.1002 9.12501C16.0502 7.12501 16.0502 3.90001 14.0752 1.92501ZM13.2752 8.30001C12.2502 9.32501 10.7252 9.70001 9.3002 9.22501C9.1002 9.15001 8.8752 9.20001 8.7252 9.35001L7.7252 10.35H7.0502C6.7502 10.35 6.4752 10.6 6.4752 10.925V11.525L6.0252 11.475C5.8752 11.45 5.7252 11.5 5.6002 11.6C5.4752 11.7 5.4002 11.825 5.4002 11.975L5.3252 12.725L4.5752 12.8C4.4252 12.825 4.2752 12.9 4.2002 13C4.1002 13.125 4.0502 13.275 4.0752 13.425L4.1502 13.975L3.6752 14.45H1.5752V12.35L6.6002 7.32501C6.7502 7.17501 6.8002 6.95001 6.7252 6.75001C6.2752 5.32501 6.6252 3.80001 7.6752 2.75001C8.4252 2.00001 9.4002 1.60001 10.4752 1.60001C11.5252 1.60001 12.5252 2.00001 13.2752 2.75001C14.8252 4.25001 14.8252 6.75001 13.2752 8.30001Z"
                                  fill="#918EA0"
                                />
                                <path
                                  d="M11.3498 2.875C10.8748 2.875 10.4248 3.05 10.0748 3.4C9.3748 4.1 9.3748 5.225 10.0748 5.925C10.4248 6.275 10.8748 6.45 11.3498 6.45C11.8248 6.45 12.2748 6.275 12.6248 5.925C12.9748 5.575 13.1498 5.125 13.1498 4.65C13.1498 4.175 12.9748 3.725 12.6248 3.375C12.2748 3.05 11.8248 2.875 11.3498 2.875ZM11.8248 5.125C11.5748 5.375 11.1248 5.375 10.8748 5.125C10.6248 4.875 10.6248 4.45 10.8748 4.175C10.9998 4.05 11.1748 3.975 11.3498 3.975C11.5248 3.975 11.6998 4.05 11.8248 4.175C11.9498 4.3 12.0248 4.475 12.0248 4.65C12.0248 4.825 11.9498 5 11.8248 5.125Z"
                                  fill="#918EA0"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_368_6544">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                    <input
                      type={showRePassword ? "text" : "password"}
                      placeholder="Re-enter new password"
                      value={data.ReNewPassword}
                      name="ReNewPassword"
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/[0.12] bg-transparent py-3.5 pl-14.5 pr-14 font-medium text-white outline-none focus:border-purple focus-visible:shadow-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRePassword(!showRePassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showRePassword ? (
                      // Eye-off icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 26 26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >

                        <circle cx="13" cy="12" r="3" />
                        <line x1="6" y1="5" x2="22" y2="21" />
                        <path d="M2 12c3.81-5 8.19-7.5 12-7.5s8.19 2.5 12 7.5c-3.81 5-8.19 7.5-12 7.5S5.81 17 2 12z" />
                      </svg>
                    ) : (
                      // Eye icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 26 26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="13" cy="12" r="3" />
                        <path d="M2 12c3.81-5 8.19-7.5 12-7.5s8.19 2.5 12 7.5c-3.81 5-8.19 7.5-12 7.5S5.81 17 2 12z" />
                      </svg>
                    )}
                  </button>
                  </div>

                  <button
                    type="submit"
                    className="hero-button-gradient flex w-full items-center justify-center rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
                  >
                    {loader ? <Loader /> : "Reset Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResetPassword = ({ token }: { token: string }) => {
  const [data, setData] = useState({ newPassword: "", ReNewPassword: "" });
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({ email: "" });
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post(`/api/forgot-password/verify-token`, { token });

        if (res.status === 200) {
          setUser({ email: res.data.email });
        }
      } catch (error: any) {
        toast.error(error.response?.data || "Invalid or expired token.");
        router.push("/auth/forgot-password");
      }
    };

    verifyToken();
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    if (data.newPassword === "") {
      toast.error("Please enter your password.");
      setLoader(false);
      return;
    }

    if (data.newPassword !== data.ReNewPassword) {
      toast.error("Passwords do not match.");
      setLoader(false);
      return;
    }

    if (data.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setLoader(false);
      return;
    }

    try {
      const res = await axios.post(`/api/forgot-password/update`, {
        email: user?.email,
        password: data.newPassword,
      });

      if (res.status === 200) {
        toast.success(res.data.message || "Password updated successfully.");
        setData({ newPassword: "", ReNewPassword: "" });
        router.push("/auth/signin");
      }
    } catch (error: any) {
      toast.error(error.response?.data || "An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <ResetPasswordSection
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      data={data}
      loader={loader}
    />
  );
};

export default ResetPassword;
