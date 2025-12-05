import React, { useState } from 'react';

const App = () => {
    // ═══════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════
    const [serviceType, setServiceType] = useState('bundle');
    const [projectTier, setProjectTier] = useState('standard');
    const [vocalTuning, setVocalTuning] = useState(false);
    const [tuningTracks, setTuningTracks] = useState(1);
    const [editingLevel, setEditingLevel] = useState(0);
    const [additionalRecording, setAdditionalRecording] = useState(false);
    const [additionalProduction, setAdditionalProduction] = useState(false);
    const [stemDelivery, setStemDelivery] = useState(false);
    const [rushDelivery, setRushDelivery] = useState(false);
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [projectNotes, setProjectNotes] = useState('');
    const [showQuoteModal, setShowQuoteModal] = useState(false);

    // ═══════════════════════════════════════════════════════════════
    // PRICING
    // ═══════════════════════════════════════════════════════════════
    const TIERS = {
        simple: { 
            label: 'Inst + Acapella', 
            desc: '2 stems', 
            mix: 130, 
            master: 50, 
            bundle: 180 
        },
        small: { 
            label: '3–8 tracks', 
            desc: 'Small production', 
            mix: 200, 
            master: 80, 
            bundle: 280 
        },
        standard: { 
            label: '9–24 channels', 
            desc: 'Standard production', 
            mix: 280, 
            master: 100, 
            bundle: 380 
        },
        complex: { 
            label: '25+ channels', 
            desc: 'Large production', 
            mix: 420, 
            master: 150, 
            bundle: 550 
        }
    };

    const EDITING_LEVELS = [
        { label: 'None', desc: 'Session is clean', price: 0 },
        { label: 'Light', desc: 'Minor fixes needed', price: 40 },
        { label: 'Medium', desc: 'Some cleanup work', price: 80 },
        { label: 'Heavy', desc: 'Significant editing', price: 150 }
    ];

    const EXTRAS = {
        tuningPerTrack: 50,
        stemDelivery: 75,
        rushMultiplier: 0.5
    };

    const SERVICE_LABELS = {
        mix: 'MIXING',
        master: 'MASTERING',
        bundle: 'MIX + MASTER'
    };

    // ═══════════════════════════════════════════════════════════════
    // CALCULATIONS
    // ═══════════════════════════════════════════════════════════════
    const calculateTotal = () => {
        let base = TIERS[projectTier][serviceType];
        let extras = 0;
        let customQuoteNeeded = false;

        // Vocal tuning
        if (vocalTuning) extras += EXTRAS.tuningPerTrack * tuningTracks;
        
        // Editing
        extras += EDITING_LEVELS[editingLevel].price;
        
        // Stem delivery
        if (stemDelivery) extras += EXTRAS.stemDelivery;
        
        // Custom quote items
        if (additionalRecording || additionalProduction) customQuoteNeeded = true;

        let subtotal = base + extras;
        
        // Rush delivery (+50%)
        let rushFee = 0;
        if (rushDelivery) {
            rushFee = Math.round(subtotal * EXTRAS.rushMultiplier);
            subtotal += rushFee;
        }

        return { 
            base, 
            extras, 
            rushFee,
            total: subtotal, 
            customQuoteNeeded,
            timeline: rushDelivery ? '48 hours' : (projectTier === 'simple' ? '3–5 days' : projectTier === 'complex' ? '7–10 days' : '5–7 days')
        };
    };

    const quote = calculateTotal();

    // ═══════════════════════════════════════════════════════════════
    // WHATSAPP
    // ═══════════════════════════════════════════════════════════════
    const handleWhatsApp = () => {
        const customItems = [];
        if (additionalRecording) customItems.push('Additional Recording');
        if (additionalProduction) customItems.push('Additional Production');

        const message = `*QUOTE REQUEST — SONIDO IGNACIO*

Name: ${clientName || '—'}
Email: ${clientEmail || '—'}

*PROJECT DETAILS*
Service: ${SERVICE_LABELS[serviceType]}
Size: ${TIERS[projectTier].label} (${TIERS[projectTier].desc})
${vocalTuning ? `Vocal Tuning: ${tuningTracks} track(s) (+$${tuningTracks * EXTRAS.tuningPerTrack})` : ''}
${editingLevel > 0 ? `Editing: ${EDITING_LEVELS[editingLevel].label} (+$${EDITING_LEVELS[editingLevel].price})` : ''}
${stemDelivery ? `Stem Delivery: Yes (+$${EXTRAS.stemDelivery})` : ''}
${rushDelivery ? `48hr Rush: Yes (+$${quote.rushFee})` : ''}
${customItems.length > 0 ? `\n*NEEDS CUSTOM QUOTE:*\n${customItems.join(', ')}` : ''}

*ESTIMATED TOTAL: $${quote.total} USD*
Timeline: ${quote.timeline}

Notes: ${projectNotes || '—'}`;
        
        window.open(`https://wa.me/573001234567?text=${encodeURIComponent(message)}`, '_blank');
        setShowQuoteModal(false);
    };

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    // ═══════════════════════════════════════════════════════════════
    // ICONS
    // ═══════════════════════════════════════════════════════════════
    const MixIcon = () => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/>
            <line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/>
            <line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/>
            <line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>
        </svg>
    );

    const MasterIcon = () => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
        </svg>
    );

    const BundleIcon = () => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20"/><path d="M2 12h20"/>
        </svg>
    );

    const MicIcon = () => (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
    );

    return (
        <div className="min-h-screen bg-slate-200 flex justify-center p-2 md:p-6">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Permanent+Marker&display=swap');
                
                .font-marker { font-family: 'Permanent Marker', cursive; }
                .font-hand { font-family: 'Kalam', cursive; }
                
                .paper-bg {
                    background-color: #fff;
                    background-image: 
                        linear-gradient(90deg, transparent 79px, #ef4444 79px, #ef4444 81px, transparent 81px),
                        linear-gradient(#cbd5e1 1px, transparent 1px);
                    background-size: 100% 100%, 100% 2rem;
                }
                
                .tape {
                    background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%);
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                
                .polaroid { background: white; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                .sticky-note { background: linear-gradient(135deg, #fef08a 0%, #fde047 100%); box-shadow: 2px 3px 10px rgba(0,0,0,0.15); }
                .sketch-border { border-radius: 2px 255px 3px 255px / 255px 3px 255px 3px; }
                
                input[type=range] { -webkit-appearance: none; background: transparent; }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none; height: 18px; width: 18px; border-radius: 50%;
                    background: #1e293b; border: 2px solid white; cursor: pointer; margin-top: -7px;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%; height: 4px; background: #1e293b; border-radius: 2px;
                }
            `}</style>

            {/* Main Notebook */}
            <main className="w-full max-w-4xl bg-white paper-bg shadow-2xl sketch-border flex flex-col md:flex-row min-h-screen font-hand text-slate-800">
                
                {/* Spiral */}
                <div className="hidden md:flex w-12 flex-col items-center py-6 border-r border-slate-300 bg-slate-50 flex-shrink-0">
                    {[...Array(18)].map((_, i) => (
                        <div key={i} className="w-8 h-5 rounded-full bg-slate-800 my-2 ring-2 ring-slate-300 shadow-inner" />
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 md:p-8 md:pl-12 relative">

                    {/* Sticky Nav */}
                    <div className="absolute top-3 right-3 md:top-6 md:right-6 z-20">
                        <div className="sticky-note p-3 w-32 transform rotate-2 hover:rotate-0 transition-transform relative">
                            <div className="tape absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 rounded-sm" />
                            <ul className="space-y-1 font-marker text-[11px] text-slate-800 mt-1">
                                <li onClick={() => scrollTo('menu')} className="cursor-pointer hover:text-blue-600">→ The Goods</li>
                                <li onClick={() => scrollTo('calculator')} className="cursor-pointer hover:text-blue-600">◈ Estimator</li>
                                <li onClick={() => scrollTo('about')} className="cursor-pointer hover:text-blue-600">● The Why</li>
                            </ul>
                        </div>
                    </div>

                    {/* Header */}
                    <header className="mb-10 mt-4 md:mt-0">
                        <h1 className="text-4xl md:text-5xl font-marker text-slate-900 tracking-tight transform -rotate-1">
                            SONIDO IGNACIO
                        </h1>
                        <div className="flex items-center gap-2 text-slate-500 text-xs ml-1 mt-1">
                            <span>est. 2025</span>
                            <span>·</span>
                            <span>the anti-studio</span>
                        </div>
                    </header>

                    {/* Intro */}
                    <section className="mb-14 max-w-lg">
                        <p className="text-xl md:text-2xl leading-relaxed">
                            I <span className="bg-yellow-200 px-1">built these tools</span> for myself because standard studios felt soulless. Now I'm sharing them.
                        </p>
                    </section>

                    {/* Services */}
                    <section id="menu" className="mb-14">
                        <h2 className="text-2xl font-marker border-b-4 border-yellow-400 inline-block mb-6 transform -rotate-1">
                            THE GOODS
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Mixing */}
                            <div className="polaroid p-2 pb-3 transform rotate-1 hover:rotate-0 transition-transform relative">
                                <div className="tape absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-sm" />
                                <div className="aspect-square bg-slate-50 mb-2 flex items-center justify-center border border-slate-200 text-slate-600">
                                    <MixIcon />
                                </div>
                                <h3 className="font-marker text-sm text-center mb-0.5">MIXING</h3>
                                <p className="text-center text-slate-500 text-[10px] mb-0.5">The glue. The vibe.</p>
                                <p className="text-center font-bold text-blue-600 text-xs">$130 – $420</p>
                            </div>

                            {/* Mastering */}
                            <div className="polaroid p-2 pb-3 transform -rotate-1 hover:rotate-0 transition-transform relative">
                                <div className="tape absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-sm" />
                                <div className="aspect-square bg-slate-50 mb-2 flex items-center justify-center border border-slate-200 text-slate-600">
                                    <MasterIcon />
                                </div>
                                <h3 className="font-marker text-sm text-center mb-0.5">MASTERING</h3>
                                <p className="text-center text-slate-500 text-[10px] mb-0.5">Loud. Clear. Ready.</p>
                                <p className="text-center font-bold text-blue-600 text-xs">$50 – $150</p>
                            </div>

                            {/* Bundle */}
                            <div className="polaroid p-2 pb-3 transform rotate-1 hover:rotate-0 transition-transform relative">
                                <div className="tape absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-sm" />
                                <div className="absolute top-3 right-1.5 bg-red-500 text-white text-[8px] font-marker px-1 py-0.5 transform rotate-12">DEAL!</div>
                                <div className="aspect-square bg-slate-50 mb-2 flex items-center justify-center border border-slate-200 text-slate-600">
                                    <BundleIcon />
                                </div>
                                <h3 className="font-marker text-sm text-center mb-0.5">MIX + MASTER</h3>
                                <p className="text-center text-slate-500 text-[10px] mb-0.5">The full package.</p>
                                <p className="text-center font-bold text-blue-600 text-xs">$180 – $550</p>
                            </div>
                        </div>
                    </section>

                    {/* Calculator */}
                    <section id="calculator" className="mb-14 relative">
                        <div className="absolute -left-2 -top-2 w-full h-full border-2 border-slate-200 rounded-xl transform rotate-1 pointer-events-none" />
                        
                        <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-5 relative shadow-sm">
                            {/* Paper Clip */}
                            <div className="absolute -top-3 right-5 w-6 hidden md:block">
                                <svg viewBox="0 0 50 100" fill="none" stroke="#64748b" strokeWidth="3">
                                    <path d="M25 0 V 70 A 15 15 0 0 1 10 55 V 15" />
                                    <path d="M25 0 V 80 A 10 10 0 0 0 45 80 V 10" />
                                </svg>
                            </div>

                            <h2 className="text-xl font-marker mb-5">PROJECT WORKSHEET</h2>

                            <div className="flex flex-col lg:flex-row gap-5">
                                {/* Form */}
                                <div className="flex-1 space-y-4">
                                    
                                    {/* Q1: Service */}
                                    <div>
                                        <h4 className="text-blue-700 font-bold text-sm mb-2">1. What service?</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['mix', 'master', 'bundle'].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => setServiceType(s)}
                                                    className={`px-3 py-1.5 rounded-md border-2 text-xs font-medium transition-all ${
                                                        serviceType === s 
                                                            ? 'border-slate-800 bg-slate-800 text-white' 
                                                            : 'border-slate-300 hover:border-slate-400'
                                                    }`}
                                                >
                                                    {SERVICE_LABELS[s]}
                                                    {s === 'bundle' && <span className="ml-1 text-red-400">★</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Q2: Project Size */}
                                    <div>
                                        <h4 className="text-blue-700 font-bold text-sm mb-2">2. Project size?</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {Object.entries(TIERS).map(([key, tier]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => setProjectTier(key)}
                                                    className={`p-2 rounded-md border-2 text-center transition-all ${
                                                        projectTier === key 
                                                            ? 'border-slate-800 bg-slate-800 text-white' 
                                                            : 'border-slate-300 hover:border-slate-400'
                                                    }`}
                                                >
                                                    <div className="font-bold text-xs">{tier.label}</div>
                                                    <div className="text-[10px] opacity-70">{tier.desc}</div>
                                                    <div className={`text-xs font-bold mt-0.5 ${projectTier === key ? 'text-yellow-300' : 'text-blue-600'}`}>
                                                        ${tier[serviceType]}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Q3: Extras */}
                                    <div>
                                        <h4 className="text-blue-700 font-bold text-sm mb-2">3. Extras</h4>
                                        <div className="space-y-2">
                                            
                                            {/* Vocal Tuning */}
                                            <div className={`p-2 rounded-md border transition-colors ${vocalTuning ? 'border-slate-400 bg-slate-50' : 'border-slate-200'}`}>
                                                <label className="flex items-center justify-between cursor-pointer text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            onClick={() => setVocalTuning(!vocalTuning)}
                                                            className={`w-4 h-4 border-2 border-slate-800 rounded flex items-center justify-center text-[10px] ${vocalTuning ? 'bg-slate-800 text-white' : ''}`}
                                                        >
                                                            {vocalTuning && '✓'}
                                                        </div>
                                                        <span className="font-medium">Vocal Tuning</span>
                                                    </div>
                                                    <span className="text-slate-500 text-xs">$50/track</span>
                                                </label>
                                                {vocalTuning && (
                                                    <div className="mt-2 flex items-center gap-2 ml-6">
                                                        <span className="text-xs text-slate-500">Tracks:</span>
                                                        <div className="flex gap-1">
                                                            {[1,2,3,4,5].map(n => (
                                                                <button
                                                                    key={n}
                                                                    onClick={() => setTuningTracks(n)}
                                                                    className={`w-6 h-6 rounded text-xs font-bold ${tuningTracks === n ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}
                                                                >
                                                                    {n}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-blue-600 font-bold">+${tuningTracks * 50}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Editing Level */}
                                            <div className="p-2 rounded-md border border-slate-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-sm">Editing needed?</span>
                                                    <span className="text-xs text-slate-500">Non-linear editing complexity</span>
                                                </div>
                                                <div className="grid grid-cols-4 gap-1">
                                                    {EDITING_LEVELS.map((level, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setEditingLevel(i)}
                                                            className={`p-1.5 rounded text-center transition-all ${
                                                                editingLevel === i 
                                                                    ? 'bg-slate-800 text-white' 
                                                                    : 'bg-slate-100 hover:bg-slate-200'
                                                            }`}
                                                        >
                                                            <div className="text-[10px] font-bold">{level.label}</div>
                                                            <div className={`text-[9px] ${editingLevel === i ? 'text-yellow-300' : 'text-blue-600'}`}>
                                                                {level.price > 0 ? `+$${level.price}` : '—'}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-1 text-center">{EDITING_LEVELS[editingLevel].desc}</p>
                                            </div>

                                            {/* Toggle Extras */}
                                            <div className="grid grid-cols-2 gap-2">
                                                {/* Stem Delivery */}
                                                <label className="flex items-center justify-between p-2 rounded-md border border-slate-200 hover:border-slate-300 cursor-pointer text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            onClick={() => setStemDelivery(!stemDelivery)}
                                                            className={`w-4 h-4 border-2 border-slate-800 rounded flex items-center justify-center text-[10px] ${stemDelivery ? 'bg-slate-800 text-white' : ''}`}
                                                        >
                                                            {stemDelivery && '✓'}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-xs">Stem Delivery</div>
                                                            <div className="text-[9px] text-slate-400">Grouped stems</div>
                                                        </div>
                                                    </div>
                                                    <span className="text-slate-500 text-[10px]">+$75</span>
                                                </label>

                                                {/* Rush Delivery */}
                                                <label className="flex items-center justify-between p-2 rounded-md border border-slate-200 hover:border-slate-300 cursor-pointer text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            onClick={() => setRushDelivery(!rushDelivery)}
                                                            className={`w-4 h-4 border-2 border-slate-800 rounded flex items-center justify-center text-[10px] ${rushDelivery ? 'bg-slate-800 text-white' : ''}`}
                                                        >
                                                            {rushDelivery && '✓'}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-xs">48hr Rush</div>
                                                            <div className="text-[9px] text-slate-400">Priority delivery</div>
                                                        </div>
                                                    </div>
                                                    <span className="text-slate-500 text-[10px]">+50%</span>
                                                </label>
                                            </div>

                                            {/* Custom Quote Items */}
                                            <div className="border-t border-dashed border-slate-300 pt-2">
                                                <p className="text-[10px] text-slate-500 mb-1.5">Need custom quote:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                                                        <div 
                                                            onClick={() => setAdditionalRecording(!additionalRecording)}
                                                            className={`w-3.5 h-3.5 border-2 border-slate-600 rounded flex items-center justify-center text-[8px] ${additionalRecording ? 'bg-slate-600 text-white' : ''}`}
                                                        >
                                                            {additionalRecording && '✓'}
                                                        </div>
                                                        <span>Additional Recording</span>
                                                    </label>
                                                    <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                                                        <div 
                                                            onClick={() => setAdditionalProduction(!additionalProduction)}
                                                            className={`w-3.5 h-3.5 border-2 border-slate-600 rounded flex items-center justify-center text-[8px] ${additionalProduction ? 'bg-slate-600 text-white' : ''}`}
                                                        >
                                                            {additionalProduction && '✓'}
                                                        </div>
                                                        <span>Additional Production</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Estimate */}
                                <div className="w-full lg:w-48">
                                    <div className="sticky-note p-3 transform rotate-1 relative">
                                        <div className="tape absolute -top-1 left-1/2 -translate-x-1/2 w-14 h-3 rounded-sm" />
                                        
                                        <div className="text-center mb-2 pt-1">
                                            <h3 className="font-marker text-base">ESTIMATE</h3>
                                            <p className="text-[9px] text-slate-500 font-mono">SONIDO IGNACIO // 2025</p>
                                        </div>

                                        <div className="border-t border-b border-dashed border-slate-400 py-2 space-y-0.5 mb-2 font-mono text-[10px]">
                                            <div className="flex justify-between">
                                                <span>{SERVICE_LABELS[serviceType]}</span>
                                                <span>${TIERS[projectTier][serviceType]}</span>
                                            </div>
                                            <div className="text-slate-500 text-[9px]">{TIERS[projectTier].label}</div>
                                            {vocalTuning && (
                                                <div className="flex justify-between">
                                                    <span>Tuning ×{tuningTracks}</span>
                                                    <span>+${tuningTracks * 50}</span>
                                                </div>
                                            )}
                                            {editingLevel > 0 && (
                                                <div className="flex justify-between">
                                                    <span>Editing</span>
                                                    <span>+${EDITING_LEVELS[editingLevel].price}</span>
                                                </div>
                                            )}
                                            {stemDelivery && (
                                                <div className="flex justify-between">
                                                    <span>Stems</span>
                                                    <span>+$75</span>
                                                </div>
                                            )}
                                            {rushDelivery && (
                                                <div className="flex justify-between text-red-600">
                                                    <span>48hr Rush</span>
                                                    <span>+${quote.rushFee}</span>
                                                </div>
                                            )}
                                        </div>

                                        {quote.customQuoteNeeded && (
                                            <p className="text-[9px] text-orange-600 mb-2 text-center">+ items need custom quote</p>
                                        )}

                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-bold text-xs">TOTAL:</span>
                                            <span className="font-marker text-xl text-red-600">${quote.total}</span>
                                        </div>

                                        <div className="text-[9px] text-slate-500 text-center mb-2">
                                            ⏱ {quote.timeline}
                                        </div>

                                        <button 
                                            onClick={() => setShowQuoteModal(true)}
                                            className="w-full bg-blue-900 text-white font-marker text-xs py-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md"
                                        >
                                            LET'S WORK
                                        </button>
                                        
                                        <p className="text-[9px] text-center text-slate-500 mt-1.5">
                                            2 revisions included
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About */}
                    <section id="about" className="border-t-2 border-red-500 pt-6 pb-6">
                        <div className="flex flex-col md:flex-row items-start gap-5">
                            <div className="polaroid p-2 pb-3 w-32 flex-shrink-0 transform -rotate-2 relative">
                                <div className="tape absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-sm" />
                                <div className="aspect-square bg-slate-50 mb-1 flex items-center justify-center border border-slate-200 text-slate-500">
                                    <MicIcon />
                                </div>
                                <h4 className="font-marker text-[10px] text-center text-slate-800">THE CRAFTSMAN</h4>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-marker mb-2 text-slate-900">THE WHY</h2>
                                
                                <p className="text-sm leading-relaxed text-slate-700 mb-3">
                                    We exist to serve <span className="bg-yellow-200 px-0.5 font-bold">unique talents</span> that feel the need to create something special. Music business is human business. <span className="italic">Return on emotion</span> is the metric.
                                </p>
                                
                                <p className="text-sm leading-relaxed text-slate-700 mb-3">
                                    We help you go from <span className="line-through text-slate-400">confused/frustrated</span> to <span className="font-bold">unique and valuable</span>.
                                </p>

                                <div className="bg-slate-100 p-2.5 rounded-md mb-3">
                                    <h4 className="font-marker text-xs text-blue-700 mb-0.5">OUR PROMISE</h4>
                                    <p className="text-xs text-slate-700">
                                        The mentality is 80% of the outcome. I treat every track like it's my own record.
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                                    <span className="text-slate-500 text-xs">Hit me up:</span>
                                    <a href="mailto:ignacio@sonidoignacio.com" className="font-marker text-sm text-blue-700 hover:text-blue-500 underline decoration-wavy">
                                        IGNACIO@SONIDOIGNACIO.COM
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            {/* Coffee Stain */}
            <div className="fixed bottom-0 right-0 w-36 h-36 opacity-10 pointer-events-none translate-x-1/3 translate-y-1/3 rounded-full border-[10px] border-amber-900 blur-sm" />

            {/* Modal */}
            {showQuoteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-lg p-4 max-w-sm w-full shadow-2xl relative font-hand">
                        <button onClick={() => setShowQuoteModal(false)} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-xs">
                            ✕
                        </button>
                        
                        <h3 className="font-marker text-lg mb-3">FINALIZE QUOTE</h3>
                        
                        <div className="space-y-2.5 mb-3">
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-0.5">Your name</label>
                                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Name" className="w-full px-3 py-1.5 border-2 border-slate-200 rounded-md focus:border-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-0.5">Email</label>
                                <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="you@email.com" className="w-full px-3 py-1.5 border-2 border-slate-200 rounded-md focus:border-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-0.5">Project notes</label>
                                <textarea value={projectNotes} onChange={(e) => setProjectNotes(e.target.value)} placeholder="Tell me about your project..." rows={2} className="w-full px-3 py-1.5 border-2 border-slate-200 rounded-md focus:border-blue-500 outline-none resize-none text-sm" />
                            </div>
                        </div>
                        
                        <div className="sticky-note p-2.5 mb-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs">Estimated total</span>
                                <span className="font-marker text-lg text-red-600">${quote.total} USD</span>
                            </div>
                            {quote.customQuoteNeeded && (
                                <p className="text-[9px] text-orange-600 mt-1">+ items need custom pricing</p>
                            )}
                        </div>
                        
                        <button 
                            onClick={handleWhatsApp}
                            disabled={!clientName || !clientEmail}
                            className="w-full bg-green-600 text-white font-marker py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            SEND VIA WHATSAPP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
