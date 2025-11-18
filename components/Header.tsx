import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { BotIcon, HistoryIcon } from './icons';

interface HeaderProps {
    onLoginClick: () => void;
    onNavigate: (page: 'home' | 'about' | 'terms' | 'contact' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onNavigate }) => {
    const { user, loading } = useAuth();

    const handleLogout = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    return (
        <header className="bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button onClick={() => onNavigate('home')} className="flex items-center space-x-2" aria-label="Go to homepage">
                         <BotIcon className="h-7 w-7 text-red-500" />
                         <span className="font-bold text-lg text-white">Viral Tweet Generator</span>
                    </button>
                    <div className="flex items-center space-x-4">
                        {loading ? (
                            <div className="h-8 w-24 bg-zinc-700 rounded-md animate-pulse"></div>
                        ) : user ? (
                            <>
                                 <button
                                    onClick={() => onNavigate('history')}
                                    className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
                                    aria-label="View generation history"
                                >
                                    <HistoryIcon className="h-4 w-4" />
                                    <span>History</span>
                                </button>
                                <span className="text-sm text-zinc-400 hidden sm:block">{user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
