
import { Facebook, Twitter, Linkedin, Instagram, Coffee, Github, Youtube, BarChart, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/5a805dc9-0c39-4d9c-a444-578cb8bdd9d2.png" 
                alt="CodingCats Logo" 
                className="h-14 mr-2" 
              />
            </div>
            <p className="text-gray-400 mb-4">
              Bridging the Gap Between Engineers and Talent Teams with a Purr-fect Platform!
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/hishamp3/codingcats" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://x.com/Solo_Level_27" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/hisham86" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://buymeacoffee.com/hishamcato" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors" aria-label="Buy Me a Coffee">
                <Coffee size={20} />
              </a>
              <a href="tel:+60122803585" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors" aria-label="Phone">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="/analytics" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                <BarChart size={16} />
                Analytics
              </a></li>
              <li><a href="tel:+60122803585" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                <Phone size={16} />
                +6012-280-3585
              </a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} CodingCats. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
