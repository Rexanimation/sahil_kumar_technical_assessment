import Canvas from '@/components/Canvas';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserInfo {
  name: string;
  avatar: string;
}

export default function Builder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Check for auth callback params
    const authSuccess = searchParams.get('auth') === 'success';
    const username = searchParams.get('username');
    const avatar = searchParams.get('avatar');

    if (authSuccess) {
      localStorage.setItem('isAuthenticated', 'true');

      if (username) {
        const user = { name: username, avatar: avatar || '' };
        localStorage.setItem('user', JSON.stringify(user));
        setUserInfo(user);
      }

      // Clear query param
      navigate('/builder', { replace: true });
    } else {
      // Load user from local storage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUserInfo(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user info", e);
        }
      }
    }
  }, [searchParams, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-14 border-b border-border bg-card/50 flex items-center justify-between px-4">
        <span className="font-display font-bold">Pipeline Builder</span>

        <div className="flex items-center gap-4">
          {userInfo && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                <AvatarFallback>{userInfo.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{userInfo.name}</span>
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <Canvas />
      </div>
    </div>
  );
}
