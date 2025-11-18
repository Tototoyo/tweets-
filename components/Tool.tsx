import React, { useState, useCallback } from 'react';
import { TweetOutput } from './TweetOutput';
import { SparklesIcon, BotIcon } from './icons';
import { generateTweetContent } from '../services/geminiService';
import { saveGeneration } from '../services/supabaseService';
import { OutputType } from '../types';
import { useAuth } from '../contexts/AuthContext';

const exampleTopics = [
  'How to create cinematic AI video with Veo',
  'Automating workflows with n8n and AI agents',
  'Using Perplexity AI for smarter research',
  'Generating surreal images with Midjourney v6',
];

interface ToolProps {
  onLoginClick: () => void;
}

const Tool: React.FC<ToolProps> = ({ onLoginClick }) => {
  const { user, loading: authLoading } = useAuth();
  const [topic, setTopic] = useState<string>('');
  const [outputType, setOutputType] = useState<OutputType>(OutputType.Single);
  const [generatedTweets, setGeneratedTweets] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate content.');
      return;
    }
    if (!user) {
      setError('You must be logged in to generate content.');
      onLoginClick();
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedTweets(null);
    setIsSaved(false);

    try {
      const tweets = await generateTweetContent(topic, outputType);
      setGeneratedTweets(tweets);
      
      if (user) {
          await saveGeneration(user.id, topic, outputType, tweets);
          setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, outputType, user, onLoginClick]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
    if (error) setError(null);
    setIsSaved(false);
  };

  const handleExampleClick = (exampleTopic: string) => {
    setTopic(exampleTopic);
    if (error) setError(null);
    setIsSaved(false);
  };

  const handleOutputTypeChange = (newType: OutputType) => {
    setOutputType(newType);
    setIsSaved(false);
  };

  return (
    <div className="bg-zinc-900 font-sans rounded-xl">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input */}
          <div className="relative flex flex-col space-y-6">
            {!authLoading && !user && (
              <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-10 rounded-xl flex flex-col items-center justify-center text-center p-4">
                <BotIcon className="h-10 w-10 text-red-400 mb-4" />
                <h3 className="text-lg font-bold text-white">Unlock the Generator</h3>
                <p className="text-zinc-400 text-sm mb-6 max-w-xs">Create an account to generate tweets, save your history, and more.</p>
                <button 
                  onClick={onLoginClick}
                  className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
                >
                  Sign Up / Login
                </button>
              </div>
            )}
            <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <label htmlFor="topic" className="block text-sm font-medium text-zinc-300 mb-2">
                1. Enter your topic
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={handleTopicChange}
                placeholder="e.g., Automating video creation with AI"
                className="w-full h-32 bg-zinc-900 border border-zinc-600 rounded-lg p-3 text-zinc-100 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 resize-none"
              />
               <div className="mt-4">
                <p className="text-xs font-medium text-zinc-400 mb-3">Or try an example:</p>
                <div className="flex flex-wrap gap-2">
                    {exampleTopics.map((example, index) => (
                        <button
                            key={index}
                            onClick={() => handleExampleClick(example)}
                            className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm hover:bg-zinc-600 hover:text-white transition-colors duration-200"
                        >
                            {example}
                        </button>
                    ))}
                </div>
            </div>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
              <h2 className="text-sm font-medium text-zinc-300 mb-3">2. Choose output type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleOutputTypeChange(OutputType.Single)}
                  className={`w-full py-3 px-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    outputType === OutputType.Single
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300'
                  }`}
                >
                  Single Tweet
                </button>
                <button
                  onClick={() => handleOutputTypeChange(OutputType.Thread)}
                  className={`w-full py-3 px-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    outputType === OutputType.Thread
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300'
                  }`}
                >
                  Thread
                </button>
                 <button
                  onClick={() => handleOutputTypeChange(OutputType.Variations)}
                  className={`w-full py-3 px-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    outputType === OutputType.Variations
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300'
                  }`}
                >
                  3 Variations
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim() || !user}
              className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Generate Content
                </>
              )}
            </button>
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col">
            <TweetOutput tweets={generatedTweets} isLoading={isLoading} error={error} outputType={outputType} isSaved={isSaved} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tool;
