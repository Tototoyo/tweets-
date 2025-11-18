import React from 'react';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-zinc-300">
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 sm:p-12">
        <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Contact Us</h1>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
                We'd love to hear from you! Whether you have a question, feedback, or a partnership inquiry, please don't hesitate to reach out.
            </p>
        </div>
        
        <div className="mt-12 max-w-lg mx-auto">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-white">General Inquiries</h2>
                <p className="mt-2 text-zinc-400">
                    For all general questions and feedback, please email us at:
                </p>
                <a href="mailto:support@viraltweetgen.com" className="mt-2 inline-block text-red-400 font-medium hover:text-red-300 text-lg">
                    support@viraltweetgen.com
                </a>
            </div>
            
            <div className="text-center mt-10">
                <h2 className="text-xl font-semibold text-white">Social Media</h2>
                <p className="mt-2 text-zinc-400">
                    Follow us and send us a DM on X (formerly Twitter):
                </p>
                <a href="https://twitter.com/ViralTweetGenAI" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-red-400 font-medium hover:text-red-300 text-lg">
                    @ViralTweetGenAI
                </a>
            </div>
             <p className="text-center text-sm text-zinc-500 mt-12">
                We do our best to respond to all inquiries within 48 business hours.
            </p>
        </div>
      </div>
    </div>
  );
};