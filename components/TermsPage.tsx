import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-zinc-300">
       <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-center mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-lg max-w-none mx-auto text-zinc-400 leading-relaxed space-y-6">
            <p>Last updated: October 26, 2023</p>
            <p>
                Please read these terms and conditions carefully before using Our Service.
            </p>
            
            <h2 className="text-xl font-bold text-white !mt-10">Interpretation and Definitions</h2>
            <p>
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h2 className="text-xl font-bold text-white !mt-10">Acknowledgment</h2>
            <p>
                These are the Terms of Service governing the use of this Service and the agreement that operates between You and the Company. These Terms of Service set out the rights and obligations of all users regarding the use of the Service. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms of Service.
            </p>

            <h2 className="text-xl font-bold text-white !mt-10">User Accounts</h2>
            <p>
                When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
            </p>
            
            <h2 className="text-xl font-bold text-white !mt-10">Content</h2>
            <p>
                Our Service allows You to generate content. You are responsible for the content that You generate, including its legality, reliability, and appropriateness. The AI-generated content is provided for assistance and inspiration; the final responsibility for the published content lies with you.
            </p>
            
            <h2 className="text-xl font-bold text-white !mt-10">Changes to These Terms of Service</h2>
            <p>
                We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
        </div>
       </div>
    </div>
  );
};