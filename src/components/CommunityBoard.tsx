import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  PlusCircle, 
  ShieldCheck, 
  X, 
  MessageSquare
} from 'lucide-react';
import type { CommunityPost, ItemCategory } from '../types';
import { PAKISTAN_CITIES, CATEGORIES_DATA } from '../data/categories';
import { CategoryIcon } from './CategoryIcon';

interface CommunityBoardProps {
  posts: CommunityPost[];
  onAddPost: (newPost: CommunityPost) => void;
  onShowToast: (message: string) => void;
}

export const CommunityBoard: React.FC<CommunityBoardProps> = ({
  posts,
  onAddPost,
  onShowToast
}) => {
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPostForContact, setSelectedPostForContact] = useState<CommunityPost | null>(null);

  // New Post Form State
  const [newType, setNewType] = useState<'lost' | 'found'>('found');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ItemCategory>('cnic');
  const [newCity, setNewCity] = useState<string>('Rawalpindi');
  const [newArea, setNewArea] = useState<string>('Saddar');
  const [newDesc, setNewDesc] = useState<string>('');
  const [newContactHint, setNewContactHint] = useState<string>('Deposited at local security desk / contact via police');
  const [privacyError, setPrivacyError] = useState<string | null>(null);

  // Privacy checker for CNIC / sensitive digits
  const checkPrivacyCompliance = (text: string): boolean => {
    // Regex for CNIC pattern: 5 digits - 7 digits - 1 digit or 13 straight digits
    const cnicPattern = /\b\d{5}[-\s]?\d{7}[-\s]?\d{1}\b/;
    const bankCardPattern = /\b(?:\d[ -]*?){13,16}\b/;
    
    if (cnicPattern.test(text)) {
      setPrivacyError('⚠️ Error: You cannot enter full 13-digit CNIC numbers. Use generic terms (e.g. "Found CNIC in green wallet").');
      return false;
    }
    if (bankCardPattern.test(text)) {
      setPrivacyError('⚠️ Error: Do not include full payment card digits.');
      return false;
    }
    setPrivacyError(null);
    return true;
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArea.trim() || !newDesc.trim()) return;

    if (!checkPrivacyCompliance(newTitle) || !checkPrivacyCompliance(newDesc) || !checkPrivacyCompliance(newContactHint)) {
      return;
    }

    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      type: newType,
      itemTitle: newTitle.trim(),
      category: newCategory,
      city: newCity,
      area: newArea.trim(),
      date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }),
      genericDescription: newDesc.trim(),
      contactHint: newContactHint.trim(),
      isVerifiedSafe: true
    };

    onAddPost(post);
    setIsModalOpen(false);
    onShowToast('Listing published safely to Community Board!');
    
    // Reset form
    setNewTitle('');
    setNewDesc('');
    setPrivacyError(null);
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCity = cityFilter === 'all' || post.city === cityFilter;
    const matchesType = typeFilter === 'all' || post.type === typeFilter;
    const matchesSearch = 
      post.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.genericDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesType && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Community Lost & Found
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              Privacy-Protected
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Anonymous community board to connect citizens who found misplaced items with owners across Pakistani cities.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 transition-all shadow-sm flex items-center justify-center gap-2 self-start sm:self-center shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Found / Lost Item</span>
        </button>
      </div>

      {/* Strict Privacy Rule Notice */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Strict Privacy Standard:</strong>
          <p className="mt-0.5 leading-relaxed">
            Never post sensitive document numbers, CNIC numbers, passport numbers, or full bank digits publicly. All listings are monitored to protect citizen identity.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              typeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Listings
          </button>
          <button
            onClick={() => setTypeFilter('found')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              typeFilter === 'found' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            🟢 Items Found
          </button>
          <button
            onClick={() => setTypeFilter('lost')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              typeFilter === 'lost' ? 'bg-rose-700 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            🔴 Items Lost
          </button>
        </div>

        {/* City Filter & Search Input */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
          >
            <option value="all">All Pakistani Cities</option>
            {PAKISTAN_CITIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="relative flex-1 md:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wallet, keys, city..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-700">No community listings found</p>
          <p className="text-xs text-slate-500">Try changing your city or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between shadow-2xs hover:shadow-md ${
                post.type === 'found' ? 'border-emerald-200' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    post.type === 'found'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {post.type === 'found' ? '🟢 Found Item' : '🔴 Lost Report'}
                  </span>

                  <span className="text-[11px] text-slate-400 font-medium">
                    {post.date}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <CategoryIcon category={post.category} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {post.itemTitle}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{post.area}, {post.city}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {post.genericDescription}
                </p>

                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <span className="font-bold text-slate-700">Location / Deposit:</span>
                  <p>{post.contactHint}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedPostForContact(post)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>This looks like mine / Contact hint</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Post New Lost / Found Item */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">Post to Community Board</h3>
                <p className="text-xs text-slate-500">Public anonymous notice for found or lost items</p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPrivacyError(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-4">
              {/* Type Switch */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNewType('found')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                    newType === 'found'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  🟢 I Found an Item
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('lost')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                    newType === 'lost'
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  🔴 I Lost an Item
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Generic Item Title * (No numbers)
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    checkPrivacyCompliance(e.target.value);
                  }}
                  placeholder='e.g. "Found CNIC & ATM card in Saddar" or "Lost car keys in Gulberg"'
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              {/* Category & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ItemCategory)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    {CATEGORIES_DATA.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white font-medium"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Area / Bazaar / Sector *
                </label>
                <input
                  type="text"
                  required
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  placeholder="e.g. Saddar near Bank Road, Gulberg III, DHA Phase 5"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              {/* Generic Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Generic Description (No confidential numbers) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newDesc}
                  onChange={(e) => {
                    setNewDesc(e.target.value);
                    checkPrivacyCompliance(e.target.value);
                  }}
                  placeholder='e.g. "Found card in dark holder near photostat counter. Handed to security guard."'
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              {/* Safe Contact Hint */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  How can the owner claim it safely? *
                </label>
                <input
                  type="text"
                  required
                  value={newContactHint}
                  onChange={(e) => setNewContactHint(e.target.value)}
                  placeholder='e.g. "Deposited with Metro Lost & Found counter" or "Call shopkeeper at 03XX-XXXXXXX"'
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              {/* Privacy Error Banner */}
              {privacyError && (
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-800 font-semibold">
                  {privacyError}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={Boolean(privacyError)}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-xl shadow-xs"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Claim / Contact Information */}
      {selectedPostForContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">Recovery & Claim Instructions</h3>
              <button
                onClick={() => setSelectedPostForContact(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900">{selectedPostForContact.itemTitle}</h4>
                <p className="text-slate-500 mt-0.5">{selectedPostForContact.area}, {selectedPostForContact.city}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">Claim Location / Instruction:</span>
                <p className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 font-medium">
                  {selectedPostForContact.contactHint}
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                <strong className="block font-bold">Safety Verification Tip:</strong>
                <p className="leading-relaxed text-[11px]">
                  When claiming your lost item, bring an alternate form of verification (e.g. proof of address, matching relative CNIC, or police DDR slip). Never pay unverified rewards upfront.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPostForContact(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
