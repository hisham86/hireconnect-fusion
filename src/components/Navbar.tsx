
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative w-full bg-white/80 backdrop-blur-sm z-50 py-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-brand-primary">
            Cato<span className="text-brand-secondary">Hub</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-700 hover:text-brand-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-brand-primary transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-brand-primary transition-colors">
            Testimonials
          </a>
          <Button variant="outline" className="ml-2">
            Log in
          </Button>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 focus:outline-none"
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
              className="text-gray-700 hover:text-brand-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-brand-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-brand-primary transition-colors"
            >
              Testimonials
            </a>
            <Button variant="outline" className="w-full">
              Log in
            </Button>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
