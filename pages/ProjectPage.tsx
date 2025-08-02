import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowRightIcon } from '../components/icons';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = PROJECTS.find(p => p.id === Number(id));

    // A ref to target the gallery container for scroll animations
    const galleryRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within the page for a subtle parallax effect
    const { scrollYProgress } = useScroll({
        target: galleryRef,
        offset: ["start end", "end start"]
    });
    
    // Create two different parallax effects to apply alternately
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount
        if (!project) {
            navigate('/works');
        }
    }, [project, navigate, id]);

    if (!project) {
        return null; // or a loading/not-found component
    }

    const otherProjects = PROJECTS.filter(p => p.featured && p.id !== project.id).slice(0, 2);

    return (
        <div className="pt-36 md:pt-48 pb-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Project Header */}
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <p className="text-sm font-semibold text-accent-gold uppercase tracking-wider">{project.category}</p>
                    <h1 className="mt-2 text-4xl md:text-6xl font-bold font-display text-primary-blue">{project.title}</h1>
                    <p className="mt-6 text-lg text-primary-blue/80 leading-relaxed">{project.description}</p>
                </motion.div>

                {/* Main Image Collage using a responsive Masonry layout with CSS columns */}
                {project.gallery.length > 0 && (
                    <div 
                        ref={galleryRef} 
                        className="mt-24 w-full columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8"
                    >
                        {project.gallery.map((image, index) => {
                            // Alternate the parallax effect for a more dynamic feel
                            const y = index % 2 === 0 ? y1 : y2;

                            return (
                                <motion.div
                                    key={index}
                                    className="mb-4 md:mb-8 break-inside-avoid" // Prevents images from breaking across columns
                                    style={{ y }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                >
                                    <img 
                                        src={image} 
                                        alt={`${project.title} gallery image ${index + 1}`} 
                                        className="rounded-2xl shadow-xl w-full" 
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                )}
                
                {/* Other Projects */}
                <div className="mt-24 md:mt-32 border-t border-primary-blue/10 pt-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-center text-primary-blue">Other Featured Projects</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {otherProjects.map(p => (
                            <Link to={`/project/${p.id}`} key={p.id} className="block group">
                                <div className="overflow-hidden rounded-2xl shadow-lg">
                                    <img src={p.image} alt={p.title} className="w-full h-80 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
                                </div>
                                <p className="mt-4 text-sm font-semibold text-accent-gold uppercase tracking-wider">{p.category}</p>
                                <h3 className="mt-1 text-2xl font-bold font-display text-primary-blue group-hover:text-accent-gold transition-colors">{p.title}</h3>
                            </Link>
                        ))}
                    </div>
                     <div className="text-center mt-16">
                        <Link to="/works" className="inline-flex items-center gap-3 bg-primary-blue text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-primary-blue/20 hover:bg-blue-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-blue/40">
                            Explore All Works <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectPage;