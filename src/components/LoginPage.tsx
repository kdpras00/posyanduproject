import { useState } from 'react';
import { Eye, EyeOff, Heart, Shield, Users, Activity, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  onRegisterClick?: () => void;
}

export const LoginPage = ({ onLogin, onRegisterClick }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Username dan password harus diisi');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onLogin(username, password);
    } catch (err) {
      setError('Username atau password salah');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero content */}
        <div className="space-y-8 animate-fade-in">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-full">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  POSYANDU SEHAT
                </h1>
                <p className="text-muted-foreground">
                  Sistem Informasi Posyandu
                </p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Sistem terintegrasi untuk pengelolaan data kesehatan balita, 
              imunisasi, dan monitoring pertumbuhan anak
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-lg shadow-soft">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Data Balita</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola data lengkap balita
                </p>
              </div>
              
              <div className="text-center p-4 bg-card rounded-lg shadow-soft">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Imunisasi</h3>
                <p className="text-sm text-muted-foreground">
                  Tracking jadwal imunisasi
                </p>
              </div>
              
              <div className="text-center p-4 bg-card rounded-lg shadow-soft">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Pantau pertumbuhan anak
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="animate-slide-in-right">
          <Card className="w-full max-w-md mx-auto shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Masuk ke Sistem
              </CardTitle>
              <CardDescription>
                Silakan masukkan username dan password Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="transition-all duration-300 focus:shadow-soft"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 transition-all duration-300 focus:shadow-soft"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert className="border-destructive/50 text-destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-button transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
                
                {onRegisterClick && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={onRegisterClick}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Registrasi Pengguna Baru
                  </Button>
                )}
              </form>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Demo Account:</p>
                <p>Username: admin | Password: admin</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};