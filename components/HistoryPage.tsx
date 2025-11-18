import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getGenerations } from '../services/supabaseService';
import { Generation, OutputType } from '../types';
import { CopyIcon, CheckIcon, TwitterIcon, HistoryIcon, LightBulbIcon } from './icons';

interface TweetCardProps {
    text: string;
    isLast: boolean;
    outputType: OutputType;
}

const TweetCard: React.FC<TweetCardProps> = ({ text, isLast, outputType }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative pl-12">
            <div className="absolute left-3 top-0 flex h-full flex-col items-center">
                <TwitterIcon className="h-6 w-6 text-sky-400" />
                {outputType === OutputType.Thread && !isLast && (
                    <div className="mt-2 w-0.5 grow bg-zinc-700" />
                )}
            </div>
            <div className="ml-2 flex-1 rounded-lg bg-zinc-800 p-4 relative group">
                <p className="whitespace-pre-wrap text-zinc-200 leading-relaxed">
                    {text}
                </p>
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-zinc-700 text-zinc-400 hover:bg-zinc-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Copy tweet"
                >
                    {copied ? (
                        <CheckIcon className="h-4 w-4 text-green-400" />
                    ) : (
                        <CopyIcon className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
};

const GenerationCard: React.FC<{ generation: Generation }> = ({ generation }) => {
    const formattedDate = new Date(generation.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
            <div className="border-b border-zinc-700 pb-4 mb-4">
                <p className="text-sm text-zinc-400 mb-1">Topic:</p>
                <h3 className="font-semibold text-white">{generation.topic}</h3>
                <div className="flex items-center justify-between text-xs text-zinc-500 mt-2">
                    <span>{formattedDate}</span>
                    <span className="capitalize bg-zinc-700 px-2 py-0.5 rounded-full">{generation.output_type}</span>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                {generation.tweets.map((tweet, index) => (
                    <TweetCard
                        key={index}
                        text={tweet}
                        isLast={index === generation.tweets.length - 1}
                        outputType={generation.output_type}
                    />
                ))}
            </div>
        </div>
    );
};

export const HistoryPage: React.FC = () => {
    const { user } = useAuth();
    const [generations, setGenerations] = useState<Generation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const data = await getGenerations(user.id);
                setGenerations(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 animate-pulse">
                            <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-zinc-700 rounded w-1/2 mb-6"></div>
                            <div className="h-20 bg-zinc-700 rounded"></div>
                        </div>
                    ))}
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-900/20 rounded-xl p-6 border border-red-500 text-center">
                    <h3 className="font-bold text-red-400 mb-2">Failed to Load History</h3>
                    <p className="text-red-300 text-sm">{error}</p>
                </div>
            );
        }

        if (generations.length === 0) {
            return (
                <div className="text-center py-16 border-2 border-dashed border-zinc-700 rounded-2xl">
                     <LightBulbIcon className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No History Yet</h3>
                    <p className="text-zinc-400 mt-2">Your generated tweets will be saved and shown here.</p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {generations.map((gen) => (
                    <GenerationCard key={gen.id} generation={gen} />
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center mb-12">
                <HistoryIcon className="h-12 w-12 text-red-500 mx-auto" />
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">
                    Generation History
                </h1>
                <p className="mt-4 text-lg text-zinc-400">
                    Review and reuse your past creations.
                </p>
            </div>
            {renderContent()}
        </div>
    );
};
