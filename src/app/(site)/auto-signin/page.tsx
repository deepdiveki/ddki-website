// app/auto-signin/page.tsx
'use client';
import { Suspense } from 'react';
import AutoSigninForm from './AutoSigninForm';
import Breadcrumb from "@/components/Breadcrumb";

export default function AutoSigninPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Breadcrumb pageTitle="Account Verification" />
      <AutoSigninForm />
    </Suspense>
  );
}
