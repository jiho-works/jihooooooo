
import React from 'react';
import { FeaturedMedia } from '../types';

interface HomeProps {
  featured: FeaturedMedia[];
}

const Home: React.FC<HomeProps> = ({ featured }) => {
  return (
    <div className="space-y-24 animate-in fade-in duration-700">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none">
            Moments <br />
            <span className="italic font-serif">Captured</span>
          </h1>
          <p className="max-w-sm text-gray-500 font-light leading-relaxed">
            A visual and sonic diary of daily life, exploration, and the subtle beauty in the ordinary.
          </p>
        </div>
        
        <div className="space-y-16">
          {featured.map((item) => (
            <div key={item.id} className="group overflow-hidden">
              {item.type === 'image' ? (
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-black overflow-hidden relative">
                   <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${item.url}?autoplay=0&mute=0&controls=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="mt-4 flex justify-between items-baseline">
                <p className="text-xs uppercase tracking-[0.2em] font-medium">{item.title || 'Untitled'}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
