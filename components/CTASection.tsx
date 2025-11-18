import React from 'react';

export const CTASection: React.FC = () => {
    const handleScrollToDemo = () => {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="relative isolate overflow-hidden bg-zinc-900 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1">
                    <div className="max-w-xl lg:max-w-lg text-center mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Start Tweeting Smarter Today.</h2>
                        <p className="mt-4 text-lg leading-8 text-zinc-400">
                            No sign-up required. Just type a topic and go. Your next viral hit is just one click away.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                onClick={handleScrollToDemo}
                                className="rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
                            >
                                Generate My First Tweet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#f43f5e] to-[#ef4444] opacity-20"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </section>
    );
};