import React, { useState } from 'react';
import { motion } from 'framer-motion';

const tierRows = [
  ['Structure', 'Upper / lower', 'Upper / lower', 'Integrated monobloque', 'Integrated monobloque'],
  ['Sliding sash', 'Frameless glazing', 'Full-surround aluminium frame', 'Full-surround aluminium frame', 'Laminated safety glazing'],
  ['Airfoil', 'Steel airfoil', 'Aluminium, fluorocarbon coated', 'Aluminium, fluorocarbon coated', 'Aluminium, PTFE coated'],
  ['Base cabinet', 'Without exhaust', 'With exhaust fan', 'With viewing window', 'PP, with exhaust and window'],
  ['Sash limit and anti-fall protection', '—', 'Optional', 'Standard', 'Standard'],
  ['Splash protection', '—', '—', 'Standard', 'Standard'],
  ['Emergency stop', '—', '—', 'Standard', 'Standard'],
  ['Make-up air', '—', '—', 'Optional', 'Standard, airfoil + column'],
  ['Automatic sash', '—', '—', 'Optional', 'Optional'],
  ['Finish', 'Matte white', 'Matte white', 'Matte white', 'Metallic powder white'],
];

const tierDetails = [
  {
    id: 'core',
    name: 'ARIAS Core',
    label: 'Entry tier',
    description: 'Entry-tier containment for educational laboratories, training centres and basic chemical applications.',
    adds: 'Base configuration for the ARIAS range.',
  },
  {
    id: 'vision',
    name: 'ARIAS Vision',
    label: 'Enhanced',
    description: 'Everything in Core, plus a reinforced sash structure, improved airfoil and cabinet ventilation.',
    adds: 'A reinforced sash structure, improved airfoil and cabinet ventilation.',
  },
  {
    id: 'pro',
    name: 'ARIAS Pro',
    label: 'Integrated',
    description: 'Everything in Vision, plus an integrated monobloque structure and standard safety systems.',
    adds: 'An integrated monobloque structure and standard safety systems.',
  },
  {
    id: 'prime',
    name: 'ARIAS Prime',
    label: 'Premium',
    description: 'Everything in Pro, plus laminated glazing, premium coatings and standard make-up air.',
    adds: 'Laminated glazing, premium coatings and standard make-up air.',
  },
];

const benchTopAirflow = [
  ['1200 mm', '160 m³/h / 94 CFM', '1,016 m³/h / 598 CFM', '610 m³/h / 359 CFM'],
  ['1500 mm', '200 m³/h / 118 CFM', '1,270 m³/h / 747 CFM', '762 m³/h / 448 CFM'],
  ['1800 mm', '240 m³/h / 141 CFM', '1,524 m³/h / 897 CFM', '914 m³/h / 538 CFM'],
  ['2100 mm', '280 m³/h / 165 CFM', '1,778 m³/h / 1,046 CFM', '1,067 m³/h / 628 CFM'],
];

const walkInAirflow = [
  ['1200 mm', '160 m³/h / 94 CFM', '2,178 m³/h / 1,282 CFM'],
  ['1500 mm', '200 m³/h / 118 CFM', '2,722 m³/h / 1,602 CFM'],
  ['1800 mm', '240 m³/h / 141 CFM', '3,267 m³/h / 1,923 CFM'],
  ['2100 mm', '280 m³/h / 165 CFM', '3,811 m³/h / 2,243 CFM'],
];

const walkInRows = [
  ['Front columns', 'Aluminium alloy', 'PVC'],
  ['Rear / front panel', 'Steel, 1.2 mm', 'PP, 8 mm'],
  ['Fixed sash glass', '6 mm tempered', '4 mm tempered'],
  ['Branding', 'Logo included', '—'],
  ['Door movement', 'Linked (optional)', 'Independent (optional)'],
  ['Liner (optional)', 'Phenolic', 'PP'],
];

const DataTable = ({ headers, rows, highlightedColumns = [] }) => (
  <div className="overflow-x-auto rounded-xl border border-white/10">
    <table className="min-w-[760px] w-full border-collapse text-left">
      <thead>
        <tr className="bg-white/[0.03]">
          {headers.map((header, index) => (
            <th key={header} className={`px-4 py-4 text-[10px] uppercase tracking-widest text-cyan-200 border-b border-white/10 ${index > 0 ? 'text-center border-l border-white/5' : ''} ${highlightedColumns.includes(index) ? 'bg-cyan-300/[0.06]' : ''}`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-b border-white/[0.06] last:border-b-0">
            {row.map((cell, index) => (
              <td key={`${row[0]}-${index}`} className={`px-4 py-4 text-sm ${index === 0 ? 'text-gray-300 font-medium' : 'text-gray-200 text-center border-l border-white/5'} ${highlightedColumns.includes(index) ? 'bg-cyan-300/[0.04] text-cyan-50 font-semibold' : ''}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TierComparison = () => {
  const [activeTier, setActiveTier] = useState(0);
  const tier = tierDetails[activeTier];

  return (
    <div className="border border-white/10 bg-[#0b1219]">
      <div className="flex items-center justify-between gap-6 border-b border-white/10 px-4 py-4 md:px-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-300">Select a tier</div>
          <div className="mt-1 text-xs text-gray-500">Compare the defining upgrade at each stage.</div>
        </div>
        <div className="hidden text-[10px] uppercase tracking-[0.2em] text-gray-600 sm:block">{String(activeTier + 1).padStart(2, '0')} / 04</div>
      </div>

      <div className="overflow-x-auto border-b border-white/10">
        <div className="flex min-w-max p-2" role="tablist" aria-label="ARIAS product tiers">
          {tierDetails.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeTier === index}
              onClick={() => setActiveTier(index)}
              className={`min-w-[128px] border px-4 py-3 text-left transition-colors md:min-w-[160px] ${activeTier === index ? 'border-cyan-300/70 bg-cyan-300/[0.08] text-white' : 'border-transparent text-gray-500 hover:border-white/15 hover:text-gray-200'}`}
            >
              <span className="block text-[10px] uppercase tracking-[0.18em]">{item.label}</span>
              <span className="mt-1 block text-sm font-semibold">{item.name.replace('ARIAS ', '')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-w-0 gap-8 p-5 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.6fr)] md:p-7">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300">{tier.label}</div>
          <h4 className="mt-2 text-2xl font-black text-white md:text-3xl">{tier.name}</h4>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">{tier.description}</p>
          <div className="mt-6 border-l-2 border-cyan-300/70 bg-cyan-300/[0.05] px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-200">What this tier adds</div>
            <p className="mt-2 text-sm leading-relaxed text-gray-200">{tier.adds}</p>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-4 border border-white/10 bg-[#0a1016]" aria-label="Tier progression">
            {tierDetails.map((item, index) => (
              <button key={item.id} type="button" onClick={() => setActiveTier(index)} className={`border-r border-white/10 px-2 py-3 text-center text-[10px] uppercase tracking-[0.16em] last:border-r-0 ${activeTier === index ? 'text-cyan-200' : 'text-gray-600'}`}>
                <span className={`mx-auto mb-2 block h-2 w-2 border ${activeTier === index ? 'border-cyan-300 bg-cyan-300' : 'border-gray-600'}`}></span>
                {item.name.replace('ARIAS ', '')}
              </button>
            ))}
          </div>

          <div className="mt-6 min-w-0 border border-white/10">
            <div className="grid grid-cols-[minmax(150px,0.8fr)_minmax(0,1fr)] border-b border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] uppercase tracking-[0.2em]">
              <span className="min-w-0 text-gray-500">Specification</span>
              <span className="min-w-0 break-words text-right text-cyan-200">{tier.name}</span>
            </div>
            {tierRows.map((row) => (
              <div key={row[0]} className="grid grid-cols-[minmax(150px,0.8fr)_minmax(0,1fr)] gap-4 border-b border-white/[0.06] px-4 py-3 last:border-b-0">
                <span className="min-w-0 text-xs leading-relaxed text-gray-500">{row[0]}</span>
                <span className="min-w-0 break-words text-right text-sm leading-relaxed text-gray-100">{row[activeTier + 1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Specifications = () => {
  return (
    <section className="py-16 bg-dark-900 relative overflow-hidden">
      {/* Muted background wordmark (reduced) */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none">
        <div className="absolute -top-6 -left-6 text-[3.5rem] font-black leading-none text-white/6">TECH</div>
        <div className="absolute -bottom-6 -right-6 text-[3.5rem] font-black leading-none text-white/6">SPEC</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-glow-cyan text-[10px] tracking-[0.5em] uppercase mb-2 font-bold">Technical Overview</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Tier comparison</h3>
          <p className="text-sm text-gray-300 mb-8">Explore each performance tier individually. Every tier includes the configuration before it, plus its defining upgrades.</p>
          <TierComparison />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <div className="rounded-xl border border-white/10 p-6 bg-white/[0.02]">
              <h4 className="text-xl font-bold text-white mb-2">ARIAS Chem</h4>
              <p className="text-sm text-gray-400">A dedicated chemical-resistant line built for aggressive acids and corrosive vapours, with PP/PVC construction throughout instead of steel or aluminium panels.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/[0.02]">
              <h4 className="text-xl font-bold text-white mb-2">ARIAS Walk-in</h4>
              <p className="text-sm text-gray-400">A large-format platform for bulky equipment, reactors and pilot-scale work, available in general-purpose or full-PP construction.</p>
            </div>
          </div>

          <h4 className="text-[10px] text-cyan-200 tracking-[0.35em] uppercase font-bold mt-12 mb-4">Walk-in construction comparison</h4>
          <DataTable headers={['Feature', 'Walk-in', 'Walk-in Chem']} rows={walkInRows} highlightedColumns={[2]} />

          <div className="mt-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Airflow performance</h3>
            <p className="text-sm text-gray-300 mb-8">Airflow is controlled between two reference states: sash closed and sash fully open, at a face velocity of 0.5 m/s. A reduced 0.3 m/s setting is available on bench-top units for energy-saving operation.</p>
            <h4 className="text-[10px] text-cyan-200 tracking-[0.35em] uppercase font-bold mb-4">Bench-top tiers — Core, Vision, Pro, Prime, Chem</h4>
            <DataTable headers={['Width', 'Closed / idle exchange', 'Open 500 mm / 0.5 m/s', 'Open 500 mm / 0.3 m/s']} rows={benchTopAirflow} />
            <h4 className="text-[10px] text-cyan-200 tracking-[0.35em] uppercase font-bold mt-10 mb-4">Walk-in — General & Chem</h4>
            <DataTable headers={['Width', 'Closed / idle exchange', 'Fully open / 0.5 m/s']} rows={walkInAirflow} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Specifications;
