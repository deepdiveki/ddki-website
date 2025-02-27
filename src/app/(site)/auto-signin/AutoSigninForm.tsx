// app/auto-signin/AutoSigninForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn, getSession, useSession } from 'next-auth/react';

export default function AutoSigninForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const callbackUrl = searchParams.get('callbackUrl') || '/profil';

  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {

  }, [email, callbackUrl]);

  useEffect(() => {
    // Check if the user is logged in
    if (session?.user) {
      // Redirect to the toolbox page once the session is updated
      router.push("/ddki-toolbox");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      await getSession();

      window.location.reload();
      router.push(callbackUrl);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h1>Bitte geben Sie hier Ihr Password ein</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>
          Login
        </button>
      </form>
      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          {error}
        </p>
      )}
    </div>
  );
}
