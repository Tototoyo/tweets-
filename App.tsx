/// <reference types="vite/client" />

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import Tool from './components/Tool';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import { supabaseInitializationError } from './lib/supabaseClient';
import { AboutPage } from './components/AboutPage';
import { TermsPage } from './components/TermsPage';
import { ContactPage } from './components/ContactPage';
import { AdSenseUnit } from './components/AdSenseUnit';
import { HistoryPage } from './components/HistoryPage';
import Analytics from './components/Analytics';

type Page = 'home' | 'about' | 'terms' | 'contact' | 'history';

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openaiInitializationError = !openaiApiKey
  ? 'OpenAI API key is missing. Please set VITE_OPENAI_API_KEY to run the application.' 
  : null;


const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'terms':
        return <TermsPage />;
      case 'contact':
        return <ContactPage />;
      case 'history':
        return <HistoryPage />;
      case 'home':
      default:
        return (
          <>
            <HeroSection />
            <main>
              <FeaturesSection />
              <section id="demo" className="py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Try the Demo
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
                      No sign-up required. Just type a topic and let our AI craft viral content for you.
                    </p>
                  </div>
                  <div className="mt-16">
                    <div className="relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-2xl shadow-2xl shadow-zinc-900/50 overflow-hidden p-1">
                      <Tool onLoginClick={() => setIsAuthModalOpen(true)} />
                    </div>
                  </div>
                </div>
              </section>
              <TestimonialsSection />
              <AdSenseUnit />
              <CTASection />
            </main>
          </>
        );
    }
  };

  return (
    <>
      <Analytics />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <div className="bg-zinc-900 text-zinc-100 font-sans antialiased overflow-x-hidden">
        {supabaseInitializationError && (
          <div className="bg-red-800 text-white p-3 text-center font-semibold text-sm">
            {supabaseInitializationError}
          </div>
        )}
        {openaiInitializationError && (
          <div className="bg-red-800 text-white p-3 text-center font-semibold text-sm">
            {openaiInitializationError}
          </div>
        )}
        {/* Background decorative gradients */}
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/30 rounded-full blur-3xl -z-10 opacity-70"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 w-[40rem] h-[40rem] bg-rose-600/20 rounded-full blur-3xl -z-10 opacity-70"></div>
        
        <Header onLoginClick={() => setIsAuthModalOpen(true)} onNavigate={setCurrentPage} />
        
        {renderPage()}
        
        <Footer onNavigate={setCurrentPage} />
      </div>
    </>
  );
};

export default App;