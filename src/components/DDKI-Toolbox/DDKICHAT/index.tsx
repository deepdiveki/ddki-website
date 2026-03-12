"use client";
import Link from "next/link";
import ChatbotToolAnimation from "@/components/animations/ChatbotToolAnimation";

const DDKIChat = () => {
  const text =
    "DeepChat ist dein All-in-One Tool für den Unterricht und schulische Organisation. Von der Unterrichtsplanung bis zur Verwaltung – alles in einem Chat.";

  return (
    <section className="relative flex items-center justify-center pt-20">
      <div className="relative z-20 mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col items-center text-center">
          <div className="sw-card-glow relative w-full rounded-3xl border border-border-tertiary bg-white/65 shadow-sm backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-3xl p-10 xl:p-15 flex flex-col items-center text-center">
              <span className="sw-glass relative mb-4 inline-flex items-center gap-2 rounded-full border border-border-tertiary px-4.5 py-2 text-sm font-medium text-primary-darker shadow-sm">
                All-in-One KI-Chat
              </span>
              <h3
                id="ddki-toolbox"
                className="mb-4.5 text-display-sm -tracking-[0.96px] text-text-primary lg:text-display-lg"
              >
                DeepChat
              </h3>
              <p className="mb-10 max-w-[700px] min-h-[100px] text-md font-light text-text-secondary">
                {text}
              </p>
              <Link
                href="https://toolbox.deepdive-ki.de/"
              >
                <div className="relative z-30 mb-10 flex w-full cursor-pointer items-center justify-center">
                  <ChatbotToolAnimation />
                </div>
              </Link>
              <Link
                href="https://toolbox.deepdive-ki.de/"
                className="relative z-30 inline-flex items-center gap-1.5 rounded-full bg-primary-darker px-6 py-3 text-sm text-white duration-300 ease-in hover:bg-primary-dark"
              >
                DeepChat
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DDKIChat;
