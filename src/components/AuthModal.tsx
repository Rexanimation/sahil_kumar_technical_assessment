import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Github, Chrome } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'signin' }: AuthModalProps) {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async (provider: string) => {
        // Redirect to backend for OAuth
        if (provider === 'google' || provider === 'github') {
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
            window.location.href = `${apiUrl}/auth/login/${provider}`;
            return;
        }

        // Manual Registration
        if (provider === 'manual') {
            if (!username || !password) {
                toast({
                    title: "Validation Error",
                    description: "Please enter both username and password.",
                    variant: "destructive",
                });
                return;
            }

            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
                const response = await fetch(`${apiUrl}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (response.status === 400) {
                    toast({
                        title: "Account Exists",
                        description: "User already has an account. Please sign in instead.",
                        variant: "destructive",
                    });
                    return;
                }

                if (!response.ok) {
                    throw new Error('Registration failed');
                }

                // Success
                toast({
                    title: "Success",
                    description: "Account created! Logging you in...",
                });

                // Save user info
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify({ name: username, avatar: '' }));
                navigate('/builder');
                onClose();

            } catch (error) {
                console.error("Registration error:", error);
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // ... existng code ...

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold font-display">
                        Welcome to Pipeline
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Sign in to your account to continue building
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={defaultTab} className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin" className="space-y-4 mt-4">
                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full h-11 justify-start gap-3 text-base font-normal hover:bg-secondary/50"
                                onClick={() => handleAuth('google')}
                            >
                                <Chrome className="w-5 h-5" />
                                Continue with Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-11 justify-start gap-3 text-base font-normal hover:bg-secondary/50"
                                onClick={() => handleAuth('github')}
                            >
                                <Github className="w-5 h-5" />
                                Continue with GitHub
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full h-11 justify-start gap-3 text-base font-normal hover:bg-secondary/50"
                                    onClick={() => handleAuth('google')}
                                >
                                    <Chrome className="w-5 h-5" />
                                    Sign up with Google
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full h-11 justify-start gap-3 text-base font-normal hover:bg-secondary/50"
                                    onClick={() => handleAuth('github')}
                                >
                                    <Github className="w-5 h-5" />
                                    Sign up with GitHub
                                </Button>
                                <Button
                                    className="w-full h-11"
                                    onClick={() => handleAuth('manual')}
                                >
                                    Create Account
                                </Button>

                                <div className="pt-2 border-t border-border mt-4">
                                    <DeleteAccountDialog
                                        username={username}
                                        password={password}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

function DeleteAccountDialog({ username, password }: { username?: string, password?: string }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleDelete = async (provider: 'manual' | 'google' | 'github') => {
        if (provider === 'google' || provider === 'github') {
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
            window.location.href = `${apiUrl}/auth/login/${provider}?action=delete`;
            return;
        }

        if (provider === 'manual') {
            if (!username || !password) {
                toast({
                    title: "Credentials Required",
                    description: "Please enter username and password in the form above to delete account.",
                    variant: "destructive"
                });
                setOpen(false);
                return;
            }

            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
                const response = await fetch(`${apiUrl}/auth/delete`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error('Failed');
                }

                // Clear local session just in case
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('user');

                toast({
                    title: "Account Deleted",
                    description: "Your account has been deleted.",
                });
                window.location.reload(); // simple reload to reset

            } catch (error) {
                toast({
                    title: "Error",
                    description: "Invalid credentials or user not found.",
                    variant: "destructive"
                });
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full h-9 text-destructive hover:text-destructive hover:bg-destructive/10 text-sm"
                >
                    Delete existing account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                        This will permanently delete the account.
                        <br />
                        For <b>Manual</b> accounts, please fill in the Username/Password first.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 py-4">
                    <Button variant="outline" onClick={() => handleDelete('github')}>
                        <Github className="w-4 h-4 mr-2" />
                        verify & delete with GitHub
                    </Button>
                    <Button variant="outline" onClick={() => handleDelete('google')}>
                        <Chrome className="w-4 h-4 mr-2" />
                        verify & delete with Google
                    </Button>
                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or Manual</span>
                        </div>
                    </div>
                    <Button variant="destructive" onClick={() => handleDelete('manual')}>
                        Delete using entered credentials
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
