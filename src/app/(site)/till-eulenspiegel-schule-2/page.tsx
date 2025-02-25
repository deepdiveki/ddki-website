import React, { useState } from 'react';

export default function ProtectedPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Replace 'yourPassword' with the actual password you want to use.
  const secretPassword = 'hktJ)cZ%xy!hh#B-';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === secretPassword) {
      setIsAuthorized(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  if (isAuthorized) {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>This is the secret text only visible to authorized users.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter the password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
