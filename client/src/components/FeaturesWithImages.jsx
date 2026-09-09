import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wind, Layout, FlaskConical, ShieldAlert, Zap, Cpu, 
  Eye, Sun, Activity, ShieldCheck 
} from 'lucide-react';

const featureList = [
  { icon: <Wind />, title: 'Stable face velocity', tag: 'Operator protection', desc: 'Consistent face velocity for operator protection and reliable capture.' },
  { icon: <ShieldAlert />, title: 'Tempered safety glass sash', tag: 'Safety visibility', desc: 'Impact-resistant sash with smooth counterbalance for safe access.' },
  { icon: <FlaskConical />, title: 'Chemical-resistant surfaces', tag: 'Chemical durability', desc: 'Interior finishes resist routine chemical exposure and wear.' },
  { icon: <Layout />, title: 'Ergonomic working opening', tag: 'Daily ergonomics', desc: 'Optimized sash travel and reach for comfortable daily use.' },
  { icon: <Activity />, title: 'Airflow alarm system', tag: 'Low-flow warning', desc: 'Integrated alarms alert operators to low-flow or unsafe conditions.' },
  { icon: <Zap />, title: 'Integrated service utilities', tag: 'Service ready', desc: 'Factory-ready service connections for gas, water, and power.' },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  {f.tag && (
                   <span className="inline-block text-[10px] text-gray-200 bg-white/6 px-2 py-0.5 rounded-sm uppercase tracking-wider font-medium mb-2">{f.tag}</span>
                  )}
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
