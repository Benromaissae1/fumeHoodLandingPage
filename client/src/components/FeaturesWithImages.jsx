import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wind, Layout, FlaskConical, ShieldAlert, Zap, Cpu, 
  Eye, Sun, Activity, ShieldCheck 
} from 'lucide-react';

const featureList = [
  { icon: <Wind />, title: 'Advanced Airflow', desc: 'Precision fluid dynamics for maximum containment and safety.' },
  { icon: <Layout />, title: 'Smart LCD Panel', desc: 'Touch-enabled interface for real-time environmental monitoring.' },
  { icon: <FlaskConical />, title: 'Chemical Defense', desc: 'Epoxy-steel build resistant to 200+ corrosive substances.' },
  { icon: <ShieldAlert />, title: 'Safety Watch', desc: 'Triple-redundancy alarms for flow and sash levels.' },
  { icon: <Zap />, title: 'Energy VAC', desc: 'Eco-mode reduces lab HVAC costs by up to 40% annually.' },
  { icon: <Cpu />, title: 'Precision Build', desc: 'Robotic assembly ensuring millimeter-perfect engineering.' },
  { icon: <Eye />, title: 'Intelligent Auto-Sash', desc: 'IR sensors automatically adjust sash height based on user presence.' },
  { icon: <Sun />, title: 'Spectral-Pure LED', desc: 'High-CRI flicker-free lighting with adjustable color temperatures.' },
  { icon: <Activity />, title: 'Vibration Isolation', desc: 'Specialized mounting to stabilize sensitive analytical measurements.' },
  { icon: <ShieldCheck />, title: 'VOC Active Guardian', desc: 'Integrated sensors trigger high-purge modes if vapors are detected.' },
];

const FeatureIcon = ({ icon, gradient }) => (
  <div className={`w-full aspect-[16/10] rounded-2xl relative overflow-hidden group/icon mb-8 flex items-center justify-center bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-500`}>
    <div className={`absolute inset-0 opacity-0 group-hover/icon:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${gradient}`}></div>
    
    {/* Animated background rings */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-32 h-32 rounded-full border border-white/5 group-hover/icon:scale-[2] group-hover/icon:opacity-0 transition-all duration-1000"></div>
      <div className="w-24 h-24 rounded-full border border-white/5 group-hover/icon:scale-[1.5] group-hover/icon:opacity-0 transition-all duration-700 delay-100"></div>
    </div>

    <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-500">
      {React.cloneElement(icon, { size: 48, strokeWidth: 1.5, className: "text-white/80 group-hover:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" })}
    </div>

    {/* Bottom Glow */}
    <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-50`}></div>
  </div>
);

const FeaturesWithImages = () => {
  const gradients = [
    'from-blue-500 to-cyan-500', 
    'from-purple-500 to-pink-500', 
    'from-cyan-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-blue-500',
    'from-gray-400 to-gray-600',
    'from-cyan-400 to-blue-600',
    'from-yellow-400 to-orange-500',
    'from-blue-200 to-blue-400',
    'from-emerald-400 to-teal-600'
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      {/* Top Blend Gradient */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-dark-900 to-transparent pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-glow-purple text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">Unrivaled Capability</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Built for the <br/> Modern Laboratory</h3>
          <p className="text-gray-400 font-light">Precision engineering combined with intelligent interaction design.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {featureList.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <FeatureIcon icon={f.icon} gradient={gradients[i % gradients.length]} />
              <div className="px-1">
                 <h4 className="text-lg font-bold text-white group-hover:text-glow-cyan transition-colors mb-3 leading-tight">{f.title}</h4>
                 <p className="text-gray-500 text-xs leading-relaxed font-light">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesWithImages;
