import React from 'react';
import { ShieldCheck, Lock, ExternalLink, Heart } from 'lucide-react';
import type { ItemCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ItemCategory) => void;
  onOpenSafetyModal: () => void;
  onNavigateTab: (tab: 'home' | 'report' | 'tracker' | 'community' | 'safety') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSafetyModal,
  onNavigateTab
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20 no-print pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-heading">AMANAT</span>
              <span className="text-xs px-2 py-0.5 rounded-sm bg-emerald-950 text-emerald-300 border border-emerald-800/60">امانت</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Kho gaya hai? Agla qadam hum batayenge."
              <br />
              Lost document recovery checklist and progress tracker built for Pakistani citizens.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Zero tracking. Safe local demo storage.</span>
            </div>
          </div>

          {/* Quick Document Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Popular Guides</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onSelectCategory('cnic')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Lost CNIC / NADRA Replacement
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('passport')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Pakistani Passport Duplicate Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('driving_license')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Driving License (DLIMS) Procedure
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('bank_card')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Bank / ATM Card Instant Freeze
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('educational_certificate')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  BISE / Degree Duplicate Sanad
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Official Authorities */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Official Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://id.nadra.gov.pk/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>NADRA Pak-ID Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://dgip.gov.pk/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>DGIP Passports Pakistan</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://dirbs.pta.gov.pk/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>PTA DIRBS (Lost Mobile Portal)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenSafetyModal}
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium text-left"
                >
                  🚨 Emergency First Steps & Helplines
                </button>
              </li>
            </ul>
          </div>

          {/* Cities & Coverage */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Covered Across Pakistan</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Guidance customized for Rawalpindi, Islamabad, Lahore, Karachi, Peshawar, Quetta, Multan, Faisalabad and all districts across Pakistan.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm">Punjab</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm">Sindh</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm">KPK</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm">Balochistan</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm">ICT</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm">AJK / GB</span>
            </div>
          </div>
        </div>

        {/* Legal & Privacy Disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-3">
          <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/50 text-slate-300 flex items-start gap-2.5">
            <span className="text-amber-400 font-bold text-sm shrink-0">⚠️</span>
            <p className="leading-relaxed">
              <strong>Official Disclaimer:</strong> Amanat is an independent information and organization tool created to empower Pakistani citizens. We do NOT collect CNIC numbers, passwords, or official credentials, nor are we affiliated with any government agency. Always verify current fees, office timings, and requirements with the relevant official authority before visiting an office.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
            <p>© {new Date().getFullYear()} AMANAT (امانت) — Built with pride for Pakistan.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={() => onNavigateTab('safety')} className="hover:underline">
                Safety Policy
              </button>
              <span>•</span>
              <button onClick={() => onNavigateTab('community')} className="hover:underline">
                Lost & Found Guidelines
              </button>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <span>Vibe Coding Edition</span>
                <Heart className="w-3 h-3 fill-emerald-400" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
