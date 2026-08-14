import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Trash2, 
  PartyPopper
} from 'lucide-react';
import type { LostItemRecord } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface RecoveryTrackerProps {
  items: LostItemRecord[];
  onSelectItem: (item: LostItemRecord) => void;
  onAddNewReport: () => void;
  onDeleteItem: (id: string) => void;
  onOpenFoundModal: (item: LostItemRecord) => void;
}

export const RecoveryTracker: React.FC<RecoveryTrackerProps> = ({
  items,
  onSelectItem,
  onAddNewReport,
  onDeleteItem,
  onOpenFoundModal
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = 
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.identifyingDetails && item.identifyingDetails.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  // Calculate statistics
  const totalCount = items.length;
  const inProgressCount = items.filter(i => i.status === 'in_progress').length;
  const recoveredCount = items.filter(i => i.status === 'recovered').length;
  const lostCount = items.filter(i => i.status === 'lost').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in space-y-8">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              My Recovery Tracker
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {totalCount} Items
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track your ongoing recovery plans, mark completed tasks, and monitor replacement progress.
          </p>
        </div>

        <button
          onClick={onAddNewReport}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 transition-all shadow-sm shadow-emerald-700/25 flex items-center justify-center gap-2 self-start sm:self-center shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Lost Item</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Tracked</span>
          <p className="text-2xl font-extrabold text-slate-900 font-heading">{totalCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs space-y-1 bg-gradient-to-b from-white to-amber-50/20">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">In Progress</span>
          <p className="text-2xl font-extrabold text-amber-700 font-heading">{inProgressCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-2xs space-y-1 bg-gradient-to-b from-white to-emerald-50/20">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Recovered</span>
          <p className="text-2xl font-extrabold text-emerald-700 font-heading">{recoveredCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200/80 shadow-2xs space-y-1 bg-gradient-to-b from-white to-rose-50/20">
          <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Awaiting Steps</span>
          <p className="text-2xl font-extrabold text-rose-700 font-heading">{lostCount}</p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => setFilterStatus('in_progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterStatus === 'in_progress'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            🟡 In Progress ({inProgressCount})
          </button>

          <button
            onClick={() => setFilterStatus('lost')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterStatus === 'lost'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            🔴 Lost ({lostCount})
          </button>

          <button
            onClick={() => setFilterStatus('recovered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterStatus === 'recovered'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            🟢 Recovered ({recoveredCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, item, notes..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-600 bg-slate-50"
          />
        </div>
      </div>

      {/* Items List Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            📋
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-800">No items match your filter</h3>
            <p className="text-xs text-slate-500 mt-1">
              Start by reporting a lost document or change your search query.
            </p>
          </div>
          <button
            onClick={onAddNewReport}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Recovery Plan</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => {
            const completedCount = item.recoverySteps.filter(s => s.completed).length;
            const totalSteps = item.recoverySteps.length;
            const percent = Math.round((completedCount / totalSteps) * 100);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between shadow-2xs hover:shadow-md ${
                  item.status === 'recovered'
                    ? 'border-emerald-200 bg-gradient-to-b from-white to-emerald-50/20'
                    : item.status === 'in_progress'
                    ? 'border-amber-200/80'
                    : 'border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Category Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 text-emerald-800 flex items-center justify-center shrink-0 border border-slate-200/80">
                        <CategoryIcon category={item.category} className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 capitalize">
                          {item.customCategoryName || item.category.replace('_', ' ')}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-700" />
                          <span>{item.area}, {item.city}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                      item.status === 'recovered'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : item.status === 'in_progress'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {item.status === 'recovered' ? '🟢 Recovered' : item.status === 'in_progress' ? '🟡 In Progress' : '🔴 Lost'}
                    </span>
                  </div>

                  {/* Date & copy meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Lost: {item.lostDate}</span>
                    </span>
                    {item.hasPhotoOrCopy && (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-medium text-[11px]">
                        Copy on file
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">Recovery Steps</span>
                      <span className="font-bold text-slate-900">{completedCount} of {totalSteps} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          percent === 100 ? 'bg-emerald-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {item.notes && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2">
                      {item.notes}
                    </p>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectItem(item)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>View Recovery Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {item.status !== 'recovered' && (
                    <button
                      onClick={() => onOpenFoundModal(item)}
                      title="Mark as Recovered"
                      className="p-2 rounded-xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shrink-0"
                    >
                      <PartyPopper className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    title="Delete record"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
