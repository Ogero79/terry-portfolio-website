import React, { useState, useEffect } from 'react';
import { PROJECTS, CATEGORIES } from '../constants';
import { Project, ProjectCategory } from '../types';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

const WorksPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(PROJECTS);
    } else {
      setFilteredProjects(PROJECTS.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="pt-36 md:pt-48 pb-24">
      {/* Section 1: Portfolio Header */}
      <section className="container mx-auto px-6 text-center">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold font-display text-primary-blue">
            My Works
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mt-4 text-lg text-primary-blue/80 max-w-2xl mx-auto">
            A collection of projects showcasing my passion for design and creativity.
        </motion.p>
      </section>

      {/* Section 2: Project Filtering Controls */}
      <section className="container mx-auto px-6 mt-16">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex justify-center flex-wrap gap-3 md:gap-4">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 font-bold font-display rounded-full text-sm transition-colors duration-300 transform focus:outline-none ${
                activeCategory !== category
                  ? 'bg-white/80 text-primary-blue hover:bg-accent-gold/20 hover:-translate-y-0.5'
                  : 'text-primary-blue'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-accent-gold rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>
      </section>

      {/* Section 3: The Project Grid */}
      <section className="container mx-auto px-6 mt-16">
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              layout
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                 <ProjectCard project={project} />
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default WorksPage;
