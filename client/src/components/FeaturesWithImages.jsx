import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Layout, FlaskConical, ShieldAlert, Zap, Cpu } from 'lucide-react';

const featureList = [
  { icon: <Wind />, title: 'Advanced Airflow', desc: 'Precision fluid dynamics system for maximum containment.', ph: 'Airflow Diagram Here' },
  { icon: <Layout />, title: 'Smart LCD Panel', desc: 'Touch-enabled interface for real-time environmental monitoring.', ph: 'Control Panel UI Here' },
  { icon: <FlaskConical />, title: 'Chemical Defense', desc: 'Epoxy-steel build resistant to over 200 corrosive substances.', ph: 'Material Close-up Here' },
  { icon: <ShieldAlert />, title: 'Safety Watch', desc: 'Triple-redundancy alarm systems for flow and sash levels.', ph: 'Safety Indicators Here' },
  { icon: <Zap />, title: 'Energy VAC', desc: 'Eco-mode reduces lab HVAC costs by up to 40% annually.', ph: 'Efficiency Visual Here' },
  { icon: <Cpu />, title: 'Precision Build', desc: 'Robotic assembly ensuring millimeter-perfect engineering.', ph: 'Product Detail Here' },
];

const FeaturePlaceholder = ({ text }) => (
  <div className="w-full aspect-video rounded-xl relative overflow-hidden group/ph mb-6">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-3xl animate-pulse"></div>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
    <div className="absolute inset-0 flex items-center justify-center border border-white/10 rounded-xl group-hover/ph:border-white/30 transition-colors">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-40">
          <FlaskConical className="w-5 h-5 text-glow-cyan" />
        </div>
        <span className="text-[10px] text-gray-500 tracking-[0.4em] uppercase font-mono">{text}</span>
      </div>
    </div>
    {/* Rainbow edge highlight */}
    <div className="absolute -inset-[1px] bg-gradient-to-r from-glow-blue/20 via-glow-purple/20 to-glow-cyan/20 opacity-0 group-hover/ph:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl"></div>
  </div>
);

const FeaturesWithImages = () => {
  return (
    <section className="py-32 bg-dark-800/50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-glow-purple text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">Unrivaled Capability</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Built for the <br/> Modern Laboratory</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featureList.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-default"
            >
              <FeaturePlaceholder text={f.ph} />
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-white/5 rounded-lg text-glow-cyan group-hover:scale-110 transition-transform">
                  {React.cloneElement(f.icon, { size: 20 })}
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-glow-cyan transition-colors">{f.title}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesWithImages;
