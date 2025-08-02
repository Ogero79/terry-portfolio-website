import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PROJECTS, SERVICES } from '../constants';
import ProjectCard from '../components/ProjectCard';
import { ArrowRightIcon, FacebookIcon, InstagramIcon, WhatsAppIcon, SparklesIcon } from '../components/icons';
import { GoogleGenAI } from '@google/genai';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// A reusable animation variant for smooth fade-in effects on scroll
const fadeInAnimation = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        }
    }
};

// --- Helper Icon Components for the Button ---
// You can move these to your 'icons.tsx' file later if you like
const LoaderIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// New type for our button's state
type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const HomePage: React.FC = () => {
    const { hash } = useLocation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isRefining, setIsRefining] = useState(false);
    const [refineError, setRefineError] = useState('');
    const [formStatus, setFormStatus] = useState('');
    const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

    // Ref for the "About" section to target for parallax effect
    const aboutSectionRef = useRef<HTMLElement>(null);

    // Hooks for parallax scrolling effect on the "About" image
    const { scrollYProgress: aboutScrollY } = useScroll({
        target: aboutSectionRef,
        offset: ["start end", "end start"]
    });
    const imageParallaxY = useTransform(aboutScrollY, [0, 1], ["-20%", "20%"]);

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                const timer = setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [hash]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRefineIdea = async () => {
        if (!formData.message.trim()) {
            setRefineError("Please enter your idea first.");
            return;
        }
        setIsRefining(true);
        setRefineError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
            const prompt = `You are a helpful creative assistant for a design agency. A potential client has written a project idea. Your task is to refine this idea into a slightly more structured and professional-sounding message. Do not add any conversational text, preambles, or markdown formatting. Just output the refined message directly, ready to be sent. Client's message: "${formData.message}"`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const refinedText = response.text;
            if (refinedText) {
                setFormData({ ...formData, message: refinedText });
            } else {
                throw new Error("Received an empty response from the AI.");
            }
        } catch (error) {
            console.error("AI refinement failed:", error);
            setRefineError("Couldn't refine the idea right now. Please try again.");
        } finally {
            setIsRefining(false);
        }
    };

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent multiple submissions
    if (submissionState !== 'idle') return;

    setSubmissionState('submitting');
    setFormStatus(''); // Clear previous status messages

    const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString('en-KE', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'Africa/Nairobi'
        })
    };

    emailjs.send(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.EMAILJS_PUBLIC_KEY!
    )
    .then((result) => {
        console.log('SUCCESS!', result.text);
        setSubmissionState('success');
        setFormStatus('Message Sent! Thank you.');
        setFormData({ name: '', email: '', message: '' });
    }, (error) => {
        console.log('FAILED...', error.text);
        setSubmissionState('error');
        setFormStatus('Failed to send. Please try again.');
    })
    .finally(() => {
        // Reset the button and status message after 3 seconds
        setTimeout(() => {
            setSubmissionState('idle');
            setFormStatus('');
        }, 3000);
    });
};
const buttonContentVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
};

    const featuredProjects = PROJECTS.filter(p => p.featured);

    return (
        <div className="overflow-x-hidden pt-24 md:pt-16 pb-24">
            {/* Section 1: Hero */}
<section className="relative min-h-screen flex items-center justify-center text-center">
    <div className="container mx-auto px-6">
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="
                text-5xl
                sm:text-6xl
                lg:text-7xl
                xl:text-8xl
                font-extrabold font-display text-primary-blue max-w-5xl mx-auto leading-tight
            "
        >
            Bringing Creativity to Life, One Design at a Time
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="
                mt-6 text-base
                md:text-lg
                text-primary-blue/80 max-w-2xl mx-auto
            "
        >
            Hi, I'm Terry Masese. I craft innovative and visually stunning designs that connect brands with their audiences. Let's create something extraordinary together.
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
            <a href="https://wa.me/254700902124" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 bg-accent-gold text-primary-blue font-bold py-3 px-8 md:py-4 md:px-10 rounded-full shadow-lg shadow-accent-gold/20 hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-gold/40">
                Let's Collaborate <ArrowRightIcon className="w-5 h-5" />
            </a>
        </motion.div>
    </div>
</section>

            {/* Section 2: Featured Projects */}
            <section>
                <div className="container mx-auto px-6">
                    <motion.h2
                        variants={fadeInAnimation}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-display text-center text-primary-blue">
                        Selected Works
                    </motion.h2>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        variants={fadeInAnimation}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-center mt-16">
                        <Link to="/works" className="inline-block bg-primary-blue text-white font-bold py-4 px-12 rounded-full shadow-lg shadow-primary-blue/20 hover:bg-blue-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-blue/40">
                            Explore All Works
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Section: Services */}
            <section id="services" className="container mx-auto px-6">
                <motion.div
                    variants={fadeInAnimation}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-primary-blue">What I Do</h2>
                    <p className="mt-4 text-lg text-primary-blue/80 max-w-2xl mx-auto">I offer a range of design services to bring your vision to life.</p>
                </motion.div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="text-center p-8 bg-white/60 rounded-3xl shadow-lg border-2 border-transparent hover:border-accent-gold/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-accent-gold/20 text-accent-gold mb-6">
                                <service.icon className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-bold font-display text-primary-blue">{service.title}</h3>
                            <p className="mt-3 text-primary-blue/80">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Section 3: About Me with Parallax Image */}
<section id="about" ref={aboutSectionRef} className="container mx-auto px-6 scroll-mt-24">
    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        
        {/* --- Image Container --- */}
        {/* We now control the size and shape with aspect-ratio and max-width */}
        <div className="relative w-full max-w-md mx-auto md:max-w-sm">
            <motion.div style={{ y: imageParallaxY }}>
                <div className="relative aspect-square"> {/* <-- This creates the square shape */}
                    <div className="absolute -top-4 -left-4 w-full h-full bg-accent-gold/20 rounded-3xl transform -rotate-3"></div>
                    <img 
                        src="/images/myphoto.jpeg" 
                        alt="Terry Masese" 
                        className="relative w-full h-full object-cover rounded-3xl shadow-2xl" 
                    /> {/* <-- These classes make the image fill the square */}
                </div>
            </motion.div>
        </div>

        {/* --- Text Content (remains the same) --- */}
                    <motion.div
                        variants={fadeInAnimation}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-primary-blue">A Little About Me</h2>
                        <p className="mt-6 text-primary-blue/80 leading-relaxed text-lg">
                            I am a passionate and dedicated designer with a keen eye for detail and a love for storytelling. My journey into design began with a simple curiosity and has grown into a full-fledged career focused on creating meaningful and impactful visual experiences. I believe that great design is not just about aesthetics, but about solving problems and communicating ideas effectively.
                        </p>
                        <a href="https://wa.me/254700902124" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 bg-accent-gold text-primary-blue font-bold py-4 px-10 rounded-full shadow-lg shadow-accent-gold/20 hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-gold/40">
                            Let's Create Together
                        </a>
                    </motion.div>
    </div>
</section>

            {/* New CTA Section */}
            <section className="bg-primary-blue text-white">
                <div className="container mx-auto px-6 py-24 text-center">
                    <motion.h2
                        variants={fadeInAnimation}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-display">
                        Have a project in mind?
                    </motion.h2>
                    <motion.p
                        variants={fadeInAnimation}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                        Let's turn your idea into a digital reality. I'm here to help you create something truly special.
                    </motion.p>
                    <motion.div
                        variants={fadeInAnimation}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-8 inline-flex items-center gap-3 bg-accent-gold text-primary-blue font-bold py-4 px-10 rounded-full shadow-lg shadow-accent-gold/20 hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-gold/40">
                            Get In Touch
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Section 4: Contact */}
            <section id="contact" className="container mx-auto px-6 text-center scroll-mt-24 pb-24">
                <motion.h2
                    variants={fadeInAnimation}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold font-display text-primary-blue">
                    Contact Me
                </motion.h2>
                <motion.p
                    variants={fadeInAnimation}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="mt-4 text-primary-blue/80 max-w-xl mx-auto">
                    Have a project in mind or just want to say hello? Fill out the form or use my AI assistant to refine your idea.
                </motion.p>
                <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-primary-blue/80 mb-2">Your Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" required className="block w-full bg-white/80 border-2 border-primary-blue/10 rounded-xl p-4 placeholder-primary-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-primary-blue/80 mb-2">Your Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" required className="block w-full bg-white/80 border-2 border-primary-blue/10 rounded-xl p-4 placeholder-primary-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300" />
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="message" className="block text-sm font-semibold text-primary-blue/80 mb-2">Your Idea or Message</label>
                        <textarea id="message" name="message" rows={8} value={formData.message} onChange={handleInputChange} placeholder="Describe your project idea here..." required className="block w-full bg-white/80 border-2 border-primary-blue/10 rounded-xl p-4 placeholder-primary-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 resize-none"></textarea>
                        <div className="absolute bottom-3 right-3">
                            <button type="button" onClick={handleRefineIdea} disabled={isRefining || !formData.message} className="group flex items-center gap-2 text-sm font-semibold text-primary-blue/70 hover:text-accent-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white/90 hover:bg-accent-gold/10 p-2 rounded-full shadow-sm">
                                <span className="hidden lg:inline group-hover:inline transition-all">Refine with AI</span>
                                <SparklesIcon className={`w-5 h-5 ${isRefining ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                        {refineError && <p className="text-red-500 text-sm mt-2">{refineError}</p>}
                    </div>
<div className="text-center pt-4">
    <motion.button 
        type="submit" 
        disabled={submissionState !== 'idle'}
        className={`w-full md:w-auto font-bold py-4 px-16 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed
            ${submissionState === 'success' ? 'bg-green-500 text-white shadow-green-500/30' : ''}
            ${submissionState === 'error' ? 'bg-red-500 text-white shadow-red-500/30' : ''}
            ${submissionState === 'idle' ? 'bg-primary-blue text-white shadow-primary-blue/20 hover:bg-blue-900 hover:shadow-xl hover:shadow-primary-blue/40' : ''}
            ${submissionState === 'submitting' ? 'bg-primary-blue/80 text-white' : ''}
        `}
        whileTap={{ scale: submissionState === 'idle' ? 0.95 : 1 }}
    >
        <AnimatePresence mode="wait">
            {submissionState === 'idle' && 
                <motion.span key="idle" variants={buttonContentVariants} initial="initial" animate="animate" exit="exit">
                    Send Message
                </motion.span>
            }
            {submissionState === 'submitting' && 
                <motion.div key="submitting" variants={buttonContentVariants} initial="initial" animate="animate" exit="exit" className="flex justify-center items-center">
                    <LoaderIcon className="h-6 w-6" />
                </motion.div>
            }
            {submissionState === 'success' && 
                <motion.div key="success" variants={buttonContentVariants} initial="initial" animate="animate" exit="exit" className="flex justify-center items-center">
                    <CheckIcon className="h-6 w-6"/>
                </motion.div>
            }
            {submissionState === 'error' && 
                <motion.span key="error" variants={buttonContentVariants} initial="initial" animate="animate" exit="exit">
                    Try Again
                </motion.span>
            }
        </AnimatePresence>
    </motion.button>
</div>
{formStatus && 
    <p className={`text-center font-semibold mt-4 transition-colors ${submissionState === 'error' ? 'text-red-500' : 'text-green-600'}`}>
        {formStatus}
    </p>
}
                </form>
                <div className="mt-16 flex justify-center space-x-6">
                    <a href="#" aria-label="Facebook" className="text-primary-blue hover:text-accent-gold transition-colors"><FacebookIcon className="h-8 w-8" /></a>
                    <a href="https://www.instagram.com/terrydesigns21?igsh=M2twbnRvc2NyZWpn" target="_blank" aria-label="Instagram" className="text-primary-blue hover:text-accent-gold transition-colors"><InstagramIcon className="h-8 w-8" /></a>
                    <a href="https://wa.me/254700902124" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-primary-blue hover:text-accent-gold transition-colors"><WhatsAppIcon className="h-8 w-8" /></a>
                </div>
            </section>
        </div>
    );
};

export default HomePage;