import React from 'react';
import { MockTweetPreview } from './MockTweetPreview';
import { Avatar1Icon, Avatar2Icon, Avatar3Icon, Avatar4Icon } from './icons';

export const HeroSection: React.FC = () => {
    const handleScrollToDemo = () => {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <header className="relative isolate pt-12 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="text-center lg:text-left lg:col-span-7 lg:self-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Go Viral in 1 Click.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-zinc-300">
                            Generate high-impact tweets & threads instantly with AI. Stop guessing, start growing.
                        </p>
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                            <button
                                onClick={handleScrollToDemo}
                                className="rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
                            >
                                Try it Free
                            </button>
                        </div>
                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-x-2">
                            <div className="flex -space-x-2 overflow-hidden">
                                <Avatar1Icon className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-800" />
                                <Avatar2Icon className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-800" />
                                <Avatar3Icon className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-800" />
                                <Avatar4Icon className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-800" />
                            </div>
                            <p className="text-sm text-zinc-400">
                                Used by <span className="font-bold text-white">10k+</span> creators
                            </p>
                        </div>
                    </div>
                    <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-5">
                        <MockTweetPreview />
                    </div>
                </div>
            </div>
        </header>
    );
};