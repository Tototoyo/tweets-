import React from 'react';
import { TwitterIcon, BotIcon } from './icons';

interface FooterProps {
    onNavigate: (page: 'home' | 'about' | 'terms' | 'contact' | 'history') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-zinc-900 border-t border-zinc-800">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
                <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
                    <div className="pb-6">
                        <button onClick={() => onNavigate('about')} className="text-sm leading-6 text-zinc-400 hover:text-white">About</button>
                    </div>
                    <div className="pb-6">
                        <button onClick={() => onNavigate('terms')} className="text-sm leading-6 text-zinc-400 hover:text-white">Terms</button>
                    </div>
                    <div className="pb-6">
                        <button onClick={() => onNavigate('contact')} className="text-sm leading-6 text-zinc-400 hover:text-white">Contact</button>
                    </div>
                </nav>
                <div className="mt-10 flex justify-center space-x-10">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-sky-400">
                        <span className="sr-only">Twitter</span>
                        <TwitterIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                </div>
                <div className="mt-10 text-center text-xs leading-5 text-zinc-500 flex items-center justify-center space-x-2">
                     <BotIcon className="h-4 w-4" />
                     <span>Built by creators, for creators.</span>
                </div>
            </div>
        </footer>
    );
};
