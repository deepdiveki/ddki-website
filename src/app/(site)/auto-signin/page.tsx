// app/auto-signin/page.tsx
'use client';
import { Suspense } from 'react';
import AutoSigninForm from './AutoSigninForm';

export default function AutoSigninPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AutoSigninForm />
    </Suspense>
  );
}
