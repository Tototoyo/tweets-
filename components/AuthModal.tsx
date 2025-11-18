import React, { useState, useEffect } from 'react';
import { supabase, supabaseInitializationError } from '../lib/supabaseClient';
import { CloseIcon, BotIcon } from './icons';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Reset form when modal opens
            setIsSignUp(false);
            setEmail('');
            setPassword('');
            setMessage('');
            setError(supabaseInitializationError); // Pre-populate with init error if it exists
            setLoading(false);
        }
    }, [isOpen]);

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!supabase) {
            setError(supabaseInitializationError || 'Supabase client is not initialized.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setError(error.message);
            } else {
                setMessage('Check your email for the confirmation link!');
                // Do not close on sign up, user needs to see the message
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
            } else {
                onClose(); // Close modal on successful login
            }
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative bg-zinc-800 border border-zinc-700 rounded-2xl shadow-xl w-full max-w-md p-8 text-white">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>

                <div className="text-center mb-6">
                    <BotIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 id="modal-title" className="text-2xl font-bold">
                        {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-zinc-400 mt-2">
                        {isSignUp ? 'to start generating viral content.' : 'Sign in to continue.'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={!!supabaseInitializationError}
                            className="w-full bg-zinc-900 border border-zinc-600 rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"  className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={!!supabaseInitializationError}
                             className="w-full bg-zinc-900 border border-zinc-600 rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 disabled:opacity-50"
                        />
                    </div>
                    
                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                    {message && <p className="text-sm text-green-400 text-center">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading || !!supabaseInitializationError}
                        className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-400 mt-6">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button onClick={() => { setIsSignUp(!isSignUp); setError(supabaseInitializationError); setMessage(''); }} className="font-medium text-red-400 hover:underline ml-1">
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
