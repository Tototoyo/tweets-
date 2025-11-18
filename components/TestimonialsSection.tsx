import React from 'react';
import { TwitterIcon, Avatar1Icon, Avatar2Icon } from './icons';

const testimonials = [
    {
        author: 'GrowthNinja',
        handle: 'GrowthNinja',
        avatar: Avatar1Icon,
        content: "Generated 3 viral threads in 1 day. This tool is 🔥 I've never seen engagement like this. An absolute must-have for anyone serious about growing on X.",
    },
    {
        author: 'SaaS Guru',
        handle: 'SaaSGuru',
        avatar: Avatar2Icon,
        content: "Honestly better than most ghostwriters. It perfectly captures the tech creator voice. Saved me hours of brainstorming and writing.",
    }
]

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-zinc-900 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-red-400">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by top creators
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-zinc-800/50 p-8 text-sm leading-6 border border-zinc-700">
                  <blockquote className="text-zinc-200">
                    <p>{`“${testimonial.content}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <testimonial.avatar className="h-10 w-10 rounded-full bg-zinc-700" />
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-zinc-400">{`@${testimonial.handle}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
             <div className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl hidden lg:block bg-zinc-800/50 p-8 text-sm leading-6 border border-zinc-700">
                    <blockquote className="text-zinc-400 text-center">
                        <p>Your testimonial could be here next!</p>
                        <TwitterIcon className="h-6 w-6 mx-auto mt-4 text-sky-400"/>
                    </blockquote>
                </figure>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};