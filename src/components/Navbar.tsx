
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, User, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="relative w-full bg-white shadow-sm backdrop-blur-sm z-50 py-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/5a805dc9-0c39-4d9c-a444-578cb8bdd9d2.png" 
              alt="CodingCats Logo" 
              className="h-14 md:h-20 mr-2" 
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-800 hover:text-brand-primary transition-colors font-medium">
            Features
          </a>
          <a href="#pricing" className="text-gray-800 hover:text-brand-primary transition-colors font-medium">
            Pricing
          </a>
          <a href="#testimonials" className="text-gray-800 hover:text-brand-primary transition-colors font-medium">
            Testimonials
          </a>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-800 font-medium">
                {user.email?.split('@')[0]}
              </span>
              <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut size={16} />
                Sign out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" className="ml-2 border-gray-300">
                  Log in
                </Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
          <div className="flex flex-col px-4 py-6 space-y-4">
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 hover:text-brand-primary transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 hover:text-brand-primary transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 hover:text-brand-primary transition-colors font-medium"
            >
              Testimonials
            </a>
            
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-gray-800 font-medium">
                  {user.email?.split('@')[0]}
                </span>
                <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
                  <LogOut size={16} />
                  Sign out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-gray-300">
                    Log in
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
