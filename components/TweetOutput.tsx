import React, { useState } from 'react';
import { CopyIcon, CheckIcon, TwitterIcon, LightBulbIcon } from './icons';
import { OutputType } from '../types';

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
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
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

interface TweetOutputProps {
  tweets: string[] | null;
  isLoading: boolean;
  error: string | null;
  outputType: OutputType;
  isSaved: boolean;
}

export const TweetOutput: React.FC<TweetOutputProps> = ({ tweets, isLoading, error, outputType, isSaved }) => {
  if (isLoading) {
    return (
      <div className="w-full h-full bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 flex flex-col space-y-4 animate-pulse-fast">
        <div className="flex space-x-4">
            <div className="rounded-full bg-zinc-700 h-10 w-10"></div>
            <div className="flex-1 space-y-3 py-1">
                <div className="h-2 bg-zinc-700 rounded"></div>
                <div className="h-2 bg-zinc-700 rounded"></div>
            </div>
        </div>
        <div className="h-20 bg-zinc-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-red-900/20 rounded-xl p-6 border border-red-500 text-center">
        <h3 className="font-bold text-red-400 mb-2">Generation Failed</h3>
        <p className="text-red-300 text-sm">{error}</p>
      </div>
    );
  }
  
  if (!tweets) {
    return (
       <div className="w-full h-full bg-zinc-800/50 rounded-xl p-6 border border-dashed border-zinc-700 flex flex-col items-center justify-center text-center">
        <LightBulbIcon className="h-10 w-10 text-zinc-500 mb-3" />
        <h3 className="font-semibold text-zinc-300">Your generated content will appear here</h3>
        <p className="text-sm text-zinc-500 mt-1">Fill in the details on the left and click "Generate".</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-800/50 rounded-xl p-4 sm:p-6 border border-zinc-700 flex flex-col">
      <div className="flex-grow">
        <div className="flex flex-col space-y-4">
          {tweets.map((tweet, index) => (
            <TweetCard 
              key={index} 
              text={tweet} 
              isLast={index === tweets.length - 1} 
              outputType={outputType}
            />
          ))}
        </div>
      </div>
       {isSaved && (
          <div className="mt-4 pt-4 border-t border-zinc-700/50 flex items-center justify-center text-sm text-green-400">
              <CheckIcon className="h-4 w-4 mr-2" />
              <span>Automatically saved to your history.</span>
          </div>
        )}
    </div>
  );
};
