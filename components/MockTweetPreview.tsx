import React from 'react';
import { TwitterIcon, BotIcon } from './icons';

const mockTweets = [
  {
    author: "AI Insights",
    handle: "ai_insights",
    content: "Just used the new Veo 3 model to generate a cinematic masterpiece from a single prompt. 🤯 The future of filmmaking is here. #AI #VideoGeneration",
  },
  {
    author: "Growth Hacker",
    handle: "growthhacks",
    content: "Thread 🧵: 5 AI tools that will 10x your productivity in 2024. You won't believe #3...",
  },
  {
    author: "Sarah | Designer",
    handle: "sarah_designs",
    content: "Generated 3 perfect tweet variations for my new portfolio launch in seconds. This is a game-changer for creators. 🚀",
  },
  {
    author: "Tech Explorer",
    handle: "techexplore",
    content: "Automating my content workflow with n8n + AI is saving me 10 hours a week. Here's how I did it 👇",
  },
  {
    author: "AI Insights",
    handle: "ai_insights",
    content: "Just used the new Veo 3 model to generate a cinematic masterpiece from a single prompt. 🤯 The future of filmmaking is here. #AI #VideoGeneration",
  },
  {
    author: "Growth Hacker",
    handle: "growthhacks",
    content: "Thread 🧵: 5 AI tools that will 10x your productivity in 2024. You won't believe #3...",
  },
  {
    author: "Sarah | Designer",
    handle: "sarah_designs",
    content: "Generated 3 perfect tweet variations for my new portfolio launch in seconds. This is a game-changer for creators. 🚀",
  },
  {
    author: "Tech Explorer",
    handle: "techexplore",
    content: "Automating my content workflow with n8n + AI is saving me 10 hours a week. Here's how I did it 👇",
  },
];


const MockTweet: React.FC<{ author: string; handle: string; content: string; }> = ({ author, handle, content }) => (
    <div className="flex flex-col gap-4 rounded-xl bg-zinc-800/80 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-zinc-700">
                    <BotIcon className="h-6 w-6 text-red-400" />
                </div>
                <div>
                    <div className="font-bold text-white">{author}</div>
                    <div className="text-sm text-zinc-400">@{handle}</div>
                </div>
            </div>
            <TwitterIcon className="h-6 w-6 text-sky-400" />
        </div>
        <p className="text-zinc-200">{content}</p>
    </div>
);

export const MockTweetPreview: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-sm rounded-2xl bg-zinc-900/50 p-2 ring-1 ring-inset ring-white/10">
      <div className="h-96 overflow-hidden [mask-image:linear-gradient(to_bottom,white,white,transparent)]">
        <div className="animate-scroll-up">
          <div className="flex flex-col gap-4 p-2">
            {mockTweets.map((tweet, index) => (
              <MockTweet key={index} {...tweet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};