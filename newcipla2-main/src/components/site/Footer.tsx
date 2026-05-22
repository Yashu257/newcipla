import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-clay grid place-items-center font-display font-bold text-primary-foreground">C</div>
            <div className="font-display font-bold text-2xl">Ciplo<span className="text-primary-glow">stem</span></div>
          </div>
          <p className="text-sm text-background/70 max-w-md leading-relaxed">
            A first-in-class, standardized, off-the-shelf stem cell therapy for knee osteoarthritis. Pioneering regenerative medicine for a healthier tomorrow.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-background/80">
            <a href="tel:18001234567" className="flex items-center gap-2 hover:text-primary-glow transition"><Phone size={14}/> 1-800-123-4567 (Toll-Free)</a>
            <a href="mailto:info@ciplostem.com" className="flex items-center gap-2 hover:text-primary-glow transition"><Mail size={14}/> info@ciplostem.com</a>
            <span className="flex items-center gap-2"><MapPin size={14}/> Headquarters, Mumbai, India</span>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/about" className="hover:text-primary-glow">About</Link></li>
            <li><Link to="/patients" className="hover:text-primary-glow">For Patients</Link></li>
            <li><Link to="/doctors" className="hover:text-primary-glow">For Doctors</Link></li>
            <li><Link to="/resources" className="hover:text-primary-glow">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Get Involved</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/assessment" className="hover:text-primary-glow">Self-Assessment</Link></li>
            <li><Link to="/contact" className="hover:text-primary-glow">Contact Us</Link></li>
            <li><Link to="/login" className="hover:text-primary-glow">Admin Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 text-xs text-background/50 flex justify-between flex-wrap gap-2">
          <span>© {new Date().getFullYear()} Ciplostem. All rights reserved.</span>
          <span>For informational purposes only. Consult a qualified physician.</span>
        </div>
      </div>
    </footer>
  );
}
