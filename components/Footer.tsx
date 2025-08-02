import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, GithubIcon } from './icons';

const FooterLogo: React.FC = () => (
    <NavLink to="/" className="block text-center my-logo transition-transform duration-300 hover:scale-105">
        <div className="text-[54px] my-logo-primary leading-tight">Terry</div>
        <div className="text-xs text-accent-gold -mt-1">Digital Agency</div>
    </NavLink>
);


const Footer: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const developerWhatsApp = "https://wa.me/254759776864";
    const developerGitHub = "https://github.com/Ogero79"; // Example GitHub URL


    const handleNavClick = (hash: string) => {
        if (location.pathname === '/') {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/${hash}`);
        }
    };

    return (
        <footer className="bg-brand-bg/80 backdrop-blur-sm border-t border-primary-blue/10">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                    
                    {/* Column 1: Logo and Brand Statement */}
                    <div className="md:col-span-2">
                        <div className="flex justify-center md:justify-start mb-4">
                            <FooterLogo />
                        </div>
                        <p className="text-primary-blue/80 text-sm max-w-md mx-auto md:mx-0">
                            Crafting innovative and visually stunning designs that connect brands with their audiences.
                        </p>
                    </div>
                    
                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold font-display text-lg text-primary-blue mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm font-medium text-primary-blue/90">
                            <li><NavLink to="/" className="hover:text-accent-gold transition-colors">Home</NavLink></li>
                            <li><NavLink to="/works" className="hover:text-accent-gold transition-colors">Works</NavLink></li>
                            <li><button onClick={() => handleNavClick('#about')} className="hover:text-accent-gold transition-colors">About</button></li>
                            <li><button onClick={() => handleNavClick('#contact')} className="hover:text-accent-gold transition-colors">Contact</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Social Links */}
                    <div>
                        <h4 className="font-bold font-display text-lg text-primary-blue mb-4">Connect</h4>
                        <div className="flex justify-center md:justify-start mt-4 space-x-5">
                            <a href="#" aria-label="Facebook" className="text-primary-blue hover:text-accent-gold transition-colors"><FacebookIcon className="h-6 w-6" /></a>
                            <a href="https://www.instagram.com/terrydesigns21?igsh=M2twbnRvc2NyZWpn" target="_blank" aria-label="Instagram" className="text-primary-blue hover:text-accent-gold transition-colors"><InstagramIcon className="h-6 w-6" /></a>
                            <a href="https://wa.me/254700902124" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-primary-blue hover:text-accent-gold transition-colors"><WhatsAppIcon className="h-6 w-6" /></a>
                        </div>
                    </div>

                </div>
                <div className="mt-16 border-t border-primary-blue/10 pt-8 text-center text-primary-blue/70 text-sm space-y-2">
                   <p>&copy; {new Date().getFullYear()} Terry Designs. All Rights Reserved.</p>
                   <p className="flex items-center justify-center gap-2">
                     Developed by 
                     <a href={developerWhatsApp} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-blue hover:text-accent-gold transition-colors">
                       Brian Ogero
                     </a>
                     <a href={developerGitHub} target="_blank" rel="noopener noreferrer" aria-label="Developer's GitHub" className="text-primary-blue hover:text-accent-gold transition-colors">
                        <GithubIcon className="h-4 w-4" />
                     </a>
                   </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;