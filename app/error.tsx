import React from 'react';
import Link from 'next/link';

export default function GlobalError({ error }: { error?: Error | null }) {
  // You can enhance this to read query params or reset state
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <main className="max-w-xl p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
          <p className="mb-6">We encountered an unexpected error. Please try again.</p>
          {error && (
            <details className="text-sm text-muted mb-6">
              <summary>Details</summary>
              <pre>{String(error.message)}</pre>
            </details>
          )}
          <div className="flex justify-center gap-4">
            <Link href="/">Go home</Link>
            <Link href="/login">Sign in</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
