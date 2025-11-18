import React from 'react';
import { BotIcon } from './icons';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-zinc-300">
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 sm:p-12">
        <div className="text-center mb-8">
            <BotIcon className="h-12 w-12 text-red-500 mx-auto" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">About Viral Tweet Generator</h1>
            <p className="mt-4 text-lg text-zinc-400">Go Viral in 1 Click.</p>
        </div>
        <div className="prose prose-invert prose-lg max-w-none mx-auto text-zinc-400 leading-relaxed space-y-6">
            <p>
                In the fast-paced world of social media, standing out is everything. For tech creators, developers, and entrepreneurs, crafting content that cuts through the noise on platforms like X (formerly Twitter) is not just a goal—it's a necessity for growth. That's where Viral Tweet Generator comes in.
            </p>
            <p>
                We are a team of creators, marketers, and AI enthusiasts who experienced the pain of writer's block and the endless hours spent trying to craft the perfect tweet. We knew there had to be a better way. We envisioned a tool that could harness the power of artificial intelligence, trained on the specific patterns and styles that make content go viral in the tech community.
            </p>
            <h2 className="text-2xl font-bold text-white !mt-12">Our Mission</h2>
            <p>
                Our mission is simple: to empower creators to share their knowledge and build their audience faster. We believe that great ideas deserve to be heard, and we provide the tool to give those ideas the impact they deserve. By automating the most time-consuming parts of content creation, we free you up to do what you do best: innovate, build, and share your passion with the world.
            </p>
            <p>
                Thank you for being a part of our community. Let's make your next tweet a viral hit.
            </p>
        </div>
      </div>
    </div>
  );
};
