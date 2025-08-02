import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowRightIcon } from '../components/icons';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = PROJECTS.find(p => p.id === Number(id));

    // State to track the currently selected image for the lightbox
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!project) {
            navigate('/works');
        }
    }, [project, navigate, id]);

    if (!project) {
        return null;
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

                {/* --- Stable Masonry Grid --- */}
                {project.gallery.length > 0 && (
                    <div className="mt-24 w-full columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
                        {project.gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                className="mb-4 md:mb-6 break-inside-avoid cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                onClick={() => setSelectedImage(image)}
                            >
                                <motion.img 
                                    src={image} 
                                    alt={`${project.title} gallery image ${index + 1}`} 
                                    className="rounded-2xl shadow-xl w-full transition-all duration-300 hover:shadow-2xl hover:brightness-90"
                                    layoutId={`project-image-${image}`}
                                />
                            </motion.div>
                        ))}
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

            {/* --- Lightbox Modal --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                        animate={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
                        exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            src={selectedImage}
                            alt="Enlarged project view"
                            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
                            layoutId={`project-image-${selectedImage}`}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            // This prevents the click on the image from closing the modal
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectPage;