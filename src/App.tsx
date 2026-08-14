import { useState, useEffect } from 'react';
import type { LostItemRecord, CommunityPost, ItemCategory } from './types';
import { INITIAL_DEMO_ITEMS, INITIAL_COMMUNITY_POSTS } from './data/demoData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ReportWizard } from './components/ReportWizard';
import { RecoveryPlanView } from './components/RecoveryPlanView';
import { RecoveryTracker } from './components/RecoveryTracker';
import { CommunityBoard } from './components/CommunityBoard';
import { SafetyView } from './components/SafetyView';
import { FoundCelebrationModal } from './components/FoundCelebrationModal';
import { SafetyGuideModal } from './components/SafetyGuideModal';
import { Toast } from './components/Toast';

export function App() {
  // Load saved items from localStorage or fallback to initial Pakistani demo items
  const [items, setItems] = useState<LostItemRecord[]>(() => {
    try {
      const saved = localStorage.getItem('amanat_lost_items_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved items:', e);
    }
    return INITIAL_DEMO_ITEMS;
  });

  // Load saved community posts
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('amanat_community_posts_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved posts:', e);
    }
    return INITIAL_COMMUNITY_POSTS;
  });

  // Active view state
  const [activeTab, setActiveTab] = useState<'home' | 'report' | 'plan' | 'tracker' | 'community' | 'safety'>('home');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [wizardCategory, setWizardCategory] = useState<ItemCategory>('cnic');

  // Modals & toast state
  const [foundModalItem, setFoundModalItem] = useState<LostItemRecord | null>(null);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('amanat_lost_items_v1', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving items:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('amanat_community_posts_v1', JSON.stringify(communityPosts));
    } catch (e) {
      console.error('Error saving posts:', e);
    }
  }, [communityPosts]);

  // Show Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  // Start new report wizard
  const handleStartNewReport = (category?: ItemCategory) => {
    if (category) {
      setWizardCategory(category);
    } else {
      setWizardCategory('cnic');
    }
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Plan created handler
  const handlePlanCreated = (newRecord: LostItemRecord) => {
    setItems(prev => [newRecord, ...prev]);
    setSelectedItemId(newRecord.id);
    setActiveTab('plan');
    showToast(`Recovery Plan generated for ${newRecord.category.toUpperCase()}!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update item
  const handleUpdateItem = (updatedItem: LostItemRecord) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recovery record from your tracker?')) {
      setItems(prev => prev.filter(item => item.id !== id));
      if (selectedItemId === id) {
        setSelectedItemId(null);
        setActiveTab('tracker');
      }
      showToast('Record deleted from tracker.');
    }
  };

  // Select demo item
  const handleSelectDemoItem = (item: LostItemRecord) => {
    setSelectedItemId(item.id);
    setActiveTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Recover item resolution
  const handleConfirmRecovered = (itemId: string, closePlan: boolean, notes?: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const now = new Date().toISOString();
        return {
          ...item,
          status: 'recovered',
          recoveredAt: now,
          notes: notes ? `${item.notes ? item.notes + ' | ' : ''}Resolved: ${notes}` : item.notes,
          recoverySteps: item.recoverySteps.map(s => ({ ...s, completed: true, completedAt: s.completedAt || now }))
        };
      }
      return item;
    }));
    showToast('🎉 Mubarak! Item marked as recovered.');
    if (closePlan) {
      setActiveTab('tracker');
    }
  };

  // Active plan lookup
  const activePlanItem = items.find(i => i.id === selectedItemId) || items[0];

  // Active in-progress items count for badge
  const activeItemsCount = items.filter(i => i.status !== 'recovered').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab === 'plan' ? 'tracker' : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeItemsCount={activeItemsCount}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onStartNewReport={() => handleStartNewReport()}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onStartReport={handleStartNewReport}
            onSelectDemoItem={handleSelectDemoItem}
            demoItems={items.slice(0, 3)}
            onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
            onNavigateTracker={() => {
              setActiveTab('tracker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'report' && (
          <ReportWizard
            initialCategory={wizardCategory}
            onPlanCreated={handlePlanCreated}
            onCancel={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'plan' && activePlanItem && (
          <RecoveryPlanView
            item={activePlanItem}
            onUpdateItem={handleUpdateItem}
            onOpenFoundModal={(item) => setFoundModalItem(item)}
            onBackToTracker={() => {
              setActiveTab('tracker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'tracker' && (
          <RecoveryTracker
            items={items}
            onSelectItem={handleSelectDemoItem}
            onAddNewReport={() => handleStartNewReport()}
            onDeleteItem={handleDeleteItem}
            onOpenFoundModal={(item) => setFoundModalItem(item)}
          />
        )}

        {activeTab === 'community' && (
          <CommunityBoard
            posts={communityPosts}
            onAddPost={(newPost) => setCommunityPosts(prev => [newPost, ...prev])}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyView
            onShowToast={showToast}
            onStartReport={() => handleStartNewReport()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => handleStartNewReport(cat)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals & Floating Notifications */}
      <FoundCelebrationModal
        item={foundModalItem}
        isOpen={Boolean(foundModalItem)}
        onClose={() => setFoundModalItem(null)}
        onConfirmRecovered={handleConfirmRecovered}
      />

      <SafetyGuideModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
        onViewAllHelplines={() => {
          setActiveTab('safety');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}

export default App;
