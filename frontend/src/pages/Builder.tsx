import Canvas from '@/components/Canvas';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserInfo {
  name: string;
  avatar: string;
}

export default function Builder() {
  const { user, logout } = useAuth();

  // Note: Local state management for user is no longer needed 
  // as it is handled by AuthContext via /auth/me


  return (
    <div className="h-screen flex flex-col">
      <div className="h-14 border-b border-border bg-card/50 flex items-center justify-between px-4">
        <span className="font-display font-bold">Pipeline Builder</span>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={""} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
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
