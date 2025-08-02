import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon } from './icons';

const Logo: React.FC = () => (
    <NavLink to="/" className="block text-center my-logo transition-transform duration-300 hover:scale-105">
        <div className="text-4xl my-logo-primary leading-tight">Terry</div>
        <div className="text-[10px] text-accent-gold -mt-1">Digital Agency</div>
    </NavLink>
);

const NavItem: React.FC<{ to?: string; onClick?: () => void; children: React.ReactNode; isButton?: boolean; className?: string }> = ({ to, onClick, children, isButton, className }) => {
    const navLinkClasses = `relative font-display text-primary-blue font-semibold hover:text-accent-gold transition-colors duration-300 group ${className}`;
    const activeNavLinkClasses = "text-accent-gold";

    const content = (
        <>
            {children}
            <span className={`absolute bottom-[-6px] left-0 block h-1 bg-accent-gold transition-all duration-400 ease-out group-hover:w-full w-0`}></span>
        </>
    );

    if (isButton) {
        return (
            <button onClick={onClick} className={navLinkClasses}>
                {content}
            </button>
        )
    }

    return (
        <NavLink
            to={to!}
            end // Ensures "Home" is not active on other routes
            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
        >
            {({ isActive }) => (
                <>
                    {children}
                    <span className={`absolute bottom-[-6px] left-0 block h-1 bg-accent-gold transition-all duration-400 ease-out group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`}></span>
                </>
            )}
        </NavLink>
    );
}

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (hash: string) => {
        setIsMenuOpen(false);
        if (location.pathname === '/') {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/${hash}`);
        }
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-bg/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
                <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
                    <Logo />
                    <div className="hidden md:flex items-center space-x-10">
                        <NavItem to="/">Home</NavItem>
                        <NavItem to="/works">Works</NavItem>
                        <NavItem onClick={() => handleNavClick('#about')} isButton>About</NavItem>
                        <NavItem onClick={() => handleNavClick('#contact')} isButton>Contact</NavItem>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(true)} className="text-primary-blue p-2">
                            <MenuIcon className="w-8 h-8" />
                        </button>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute top-0 right-0 h-full w-4/5 bg-brand-bg shadow-2xl p-8 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-end">
                                <button onClick={() => setIsMenuOpen(false)} className="text-primary-blue p-2">
                                    <XIcon className="w-8 h-8" />
                                </button>
                            </div>
                            <nav className="flex flex-col items-center justify-center flex-grow space-y-8">
                                <NavItem to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl">Home</NavItem>
                                <NavItem to="/works" onClick={() => setIsMenuOpen(false)} className="text-2xl">Works</NavItem>
                                <NavItem onClick={() => handleNavClick('#about')} isButton className="text-2xl">About</NavItem>
                                <NavItem onClick={() => handleNavClick('#contact')} isButton className="text-2xl">Contact</NavItem>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;