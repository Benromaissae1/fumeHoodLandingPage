import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, ShieldCheck, Zap, Activity } from 'lucide-react';
import { fetchFeatures } from '../api';

const iconMap = {
  Wind: <Wind className="w-8 h-8 text-cyan-400" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-purple-400" />,
  Zap: <Zap className="w-8 h-8 text-blue-400" />,
  Activity: <Activity className="w-8 h-8 text-green-400" />
};

const Features = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const loadFeatures = async () => {
      const data = await fetchFeatures();
      setFeatures(data);
    };
    loadFeatures();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-32 relative bg-dark-900 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Excellence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Our fume hoods incorporate cutting-edge sensoring and fluid dynamics to provide uncompromised laboratory safety profiles.
          </motion.p>
        </div>

        {features.length > 0 && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                variants={itemVariants}
                className="glass-panel p-8 rounded-2xl relative group overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-2xl z-0 pointer-events-none opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[feature.icon]}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
      
      {/* Decorative blurry spheres */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 mix-blend-screen blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 mix-blend-screen blur-[100px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default Features;
