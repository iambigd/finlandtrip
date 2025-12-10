import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import MobileMenu from './components/MobileMenu';
import MobileTabBar from './components/MobileTabBar';
import TonttuTip from './components/TonttuTip';
import CoverSection from './components/CoverSection';
import MapSection from './components/MapSection';
import CitySection from './components/CitySection';
import ArcticSection from './components/ArcticSection';
import SaunaSection from './components/SaunaSection';
import FoodPreview from './components/FoodPreview';
import Footer from './components/Footer';
import RatingModal from './components/RatingModal';
import ViewingModal from './components/ViewingModal';
import PreparationDrawer from './components/PreparationDrawer';
import TaxRefundDrawer from './components/TaxRefundDrawer';
import EmergencyDrawer from './components/EmergencyDrawer';
import FoodDrawer from './components/FoodDrawer';

export interface Comment {
  id: number;
  author: string;
  text: string;
  rating: number;
  date: number;
}

export interface TipConfig {
  title: string;
  text: string;
}

// 定義城市類型
export type CityFilterType = 'all' | 'helsinki' | 'tallinn' | 'porvoo' | 'suomenlinna';

function App() {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const [currentPoiId, setCurrentPoiId] = useState<string | null>(null);
  const [currentPoiName, setCurrentPoiName] = useState('');
  const [activeMapLocation, setActiveMapLocation] = useState('helsinki');
  const [selectedCityFilter, setSelectedCityFilter] = useState<CityFilterType>('all');

  // Drawer states
  const [isPreparationOpen, setIsPreparationOpen] = useState(false);
  const [isTaxRefundOpen, setIsTaxRefundOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isFoodOpen, setIsFoodOpen] = useState(false);

  // Rating Modal Functions
  const openRatingModal = (id: string, name: string) => {
    setCurrentPoiId(id);
    setCurrentPoiName(name);
    setIsRatingModalOpen(true);
  };

  const openViewingModal = (id: string, name: string) => {
    setCurrentPoiId(id);
    setCurrentPoiName(name);
    setIsViewingModalOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  const closeViewingModal = () => {
    setIsViewingModalOpen(false);
  };

  // Utility Functions for Comments
  const loadComments = (poiId: string): Comment[] => {
    const stored = localStorage.getItem(`comments_${poiId}`);
    return stored ? JSON.parse(stored) : [];
  };

  const saveComments = (poiId: string, comments: Comment[]) => {
    localStorage.setItem(`comments_${poiId}`, JSON.stringify(comments));
  };

  const getAverageRating = (poiId: string, round: boolean = false): string => {
    const comments = loadComments(poiId);
    if (comments.length === 0) return '0.0';
    const total = comments.reduce((sum, c) => sum + c.rating, 0);
    const average = total / comments.length;
    return round ? (Math.round(average * 2) / 2).toFixed(1) : average.toFixed(1);
  };

  const renderStars = (rating: number): string => {
    if (rating === 0) return '☆☆☆☆☆';
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 >= 0.25 && rating % 1 < 0.75 ? 1 : 0;
    let result = '★'.repeat(fullStars) + (halfStar ? '½' : '');
    result += '☆'.repeat(5 - fullStars - halfStar);
    return result;
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isRatingModalOpen || isViewingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isRatingModalOpen, isViewingModalOpen]);

  return (
    <div className="relative">
      {/* Texture Overlay */}
      <div className="texture-overlay fixed inset-0 z-40 pointer-events-none" />

      {/* Tonttu Tip System */}
      <TonttuTip />

      {/* Desktop Navigation */}
      <Navigation
        onOpenPreparation={() => setIsPreparationOpen(true)}
        onOpenTaxRefund={() => setIsTaxRefundOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenFood={() => setIsFoodOpen(true)}
      />

      {/* Mobile Navigation */}
      <MobileMenu
        onOpenPreparation={() => setIsPreparationOpen(true)}
        onOpenTaxRefund={() => setIsTaxRefundOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenFood={() => setIsFoodOpen(true)}
      />

      {/* Mobile Tab Bar */}
      <MobileTabBar
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenTaxRefund={() => setIsTaxRefundOpen(true)}
        onOpenFood={() => setIsFoodOpen(true)}
      />

      {/* Main Content */}
      <main className="pb-20 md:pb-0">{/* Add padding-bottom for mobile tab bar */}
        <CoverSection />
        
        <MapSection 
          activeMapLocation={activeMapLocation}
          setActiveMapLocation={setActiveMapLocation}
          setSelectedCityFilter={setSelectedCityFilter}
        />
        
        <CitySection 
          loadComments={loadComments}
          saveComments={saveComments}
          getAverageRating={getAverageRating}
          openRatingModal={openRatingModal}
        />
        
        <ArcticSection
          openRatingModal={openRatingModal}
          openViewingModal={openViewingModal}
          getAverageRating={getAverageRating}
          renderStars={renderStars}
        />
        
        <SaunaSection
          openRatingModal={openRatingModal}
          openViewingModal={openViewingModal}
          getAverageRating={getAverageRating}
          renderStars={renderStars}
        />
        
        <FoodPreview 
          onOpenFoodDrawer={() => setIsFoodOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers */}
      <PreparationDrawer
        isOpen={isPreparationOpen}
        onClose={() => setIsPreparationOpen(false)}
      />
      
      <TaxRefundDrawer
        isOpen={isTaxRefundOpen}
        onClose={() => setIsTaxRefundOpen(false)}
      />
      
      <EmergencyDrawer
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
      
      <FoodDrawer
        isOpen={isFoodOpen}
        onClose={() => setIsFoodOpen(false)}
        openRatingModal={openRatingModal}
        openViewingModal={openViewingModal}
        getAverageRating={getAverageRating}
        renderStars={renderStars}
        loadComments={loadComments}
      />

      {/* Modals */}
      {currentPoiId && (
        <>
          <RatingModal
            isOpen={isRatingModalOpen}
            onClose={closeRatingModal}
            poiId={currentPoiId}
            poiName={currentPoiName}
            loadComments={loadComments}
            saveComments={saveComments}
          />
          
          <ViewingModal
            isOpen={isViewingModalOpen}
            onClose={closeViewingModal}
            poiId={currentPoiId}
            poiName={currentPoiName}
            loadComments={loadComments}
            getAverageRating={getAverageRating}
            renderStars={renderStars}
          />
        </>
      )}
    </div>
  );
}

export default App;