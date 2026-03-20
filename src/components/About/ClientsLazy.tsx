"use client";

import dynamic from "next/dynamic";

const Clients = dynamic(() => import("@/components/About/Kunden"), { ssr: false });

export default Clients;
