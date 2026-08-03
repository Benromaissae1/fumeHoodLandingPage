import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wind, Layout, FlaskConical, ShieldAlert, Zap, Cpu, 
  Eye, Sun, Activity, ShieldCheck 
} from 'lucide-react';

const featureList = [
  { icon: <Wind />, title: 'Reliable containment airflow', desc: 'Consistent face velocity supports operator safety and effective vapor capture.' },
  { icon: <FlaskConical />, title: 'Chemical-resistant surfaces', desc: 'Durable interior finishes help withstand routine chemical exposure.' },
  { icon: <ShieldAlert />, title: 'Tempered safety glass sash', desc: 'Impact-resistant glazing supports visibility and operator protection.' },
  { icon: <Layout />, title: 'Ergonomic working opening', desc: 'Balanced sash movement and clear access support efficient daily use.' },
  { icon: <Zap />, title: 'Integrated service utilities', desc: 'Built-in gas, water, and electrical connections are designed for lab workflows.' },
  { icon: <Sun />, title: 'LED lighting', desc: 'Bright, uniform illumination improves visibility without excessive heat.' },
  { icon: <Activity />, title: 'Audio/visual airflow alarms', desc: 'Operator alerts help identify low-flow conditions and airflow deviations.' },
  { icon: <Cpu />, title: 'Multiple width options', desc: 'Available in a range of dimensions to suit different bench layouts and tasks.' },
  { icon: <ShieldCheck />, title: 'Optional filtration', desc: 'A filtration upgrade can support additional capture and exhaust flexibility.' },
  { icon: <Eye />, title: 'Easy maintenance access', desc: 'Service access is designed to simplify routine inspection and upkeep.' },
];

const FeatureIcon = ({ icon }) => (
  <div className="w-full aspect-[16/10] rounded-lg relative overflow-hidden group/icon mb-6 flex items-center justify-center bg-[#0f1720] border border-white/10 transition-all duration-300 hover:border-cyan-400/30">
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent"></div>

    <div className="relative z-10 text-slate-200 transition-transform duration-300 group-hover/icon:scale-[1.04]">
      {React.cloneElement(icon, { size: 42, strokeWidth: 1.5, className: "text-slate-200" })}
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
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
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0b1016] to-transparent pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-cyan-300 text-[10px] tracking-[0.35em] uppercase mb-4 font-bold">Safety Features</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-5">Built for reliable laboratory performance</h3>
          <p className="text-gray-400 font-light text-sm md:text-base">Designed to support safe operations, durable materials, and practical daily use in active laboratory environments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {featureList.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              viewport={{ once: true }}
              className="group"
            >
              <FeatureIcon icon={f.icon} />
              <div className="px-1">
                 <h4 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">{f.title}</h4>
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
