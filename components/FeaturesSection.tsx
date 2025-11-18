import React from 'react';
import { BrainCircuitIcon, ListBulletIcon, RocketLaunchIcon } from './icons';

const features = [
  {
    name: 'AI Writing Engine',
    description: 'Converts any idea, topic, or link into a viral-ready tweet or thread in the style of top creators.',
    icon: BrainCircuitIcon,
  },
  {
    name: 'Structured Thread Templates',
    description: 'Generates perfectly structured threads with a strong hook, valuable content, and a clear call-to-action.',
    icon: ListBulletIcon,
  },
  {
    name: 'Instant Results',
    description: 'No more writer\'s block or wasted time. Get high-quality content in seconds, not hours.',
    icon: RocketLaunchIcon,
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:text-center">
          <p className="text-base font-semibold leading-7 text-red-400">Everything you need</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Go Viral, Faster
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Our AI is trained on thousands of viral tweets to give you an unfair advantage.
          </p>
        </div>
        <div className="mt-16 max-w-2xl mx-auto sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon className="h-6 w-6 flex-none text-red-400" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};