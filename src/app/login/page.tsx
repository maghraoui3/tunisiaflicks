'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/src/components/ui/alert';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard'); // Redirect to dashboard if logged in
    }
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') {
    return <p>Loading...</p>; // Show a loader while checking auth state
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[50vh] ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] bg-black border border-gray-600 shadow-lg shadow-gray-600/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-600">Login</CardTitle>
            <CardDescription className="text-white/80">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-black border-gray-600 text-white placeholder:text-white/50 focus:border-red-600 focus:ring-red-600"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-black border-gray-600 text-white placeholder:text-white/50 focus:border-red-600 focus:ring-red-600"
                  />
                </div>
              </div>
              {error && (
                <Alert variant="destructive" className="mt-4 bg-red-600/10 border-red-600/50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-600">{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full mt-4 bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 items-center">
            <p className="text-sm text-white/80">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-red-600 hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-sm text-white/80">
              <Link href="/auth/forgot-password" className="text-red-600 hover:underline">
                Forgot your password?
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}