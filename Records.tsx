
import React, { useState } from 'react';
import { Record } from '../types';

interface RecordsProps {
  records: Record[];
}

const Records: React.FC<RecordsProps> = ({ records }) => {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-20">
        <h2 className="text-4xl font-light tracking-tighter border-b border-black inline-block pb-2">Records</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {records.map((record) => (
          <div 
            key={record.id} 
            className="group cursor-pointer"
            onClick={() => setSelectedRecord(record)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100">
              <img 
                src={record.imageUrl} 
                alt={record.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium tracking-tight">{record.title}</h3>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{record.date}</span>
              </div>
              <p className="text-sm text-gray-500 font-light line-clamp-2 leading-relaxed">
                {record.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/95 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => setSelectedRecord(null)}
            className="absolute top-10 right-10 text-black hover:opacity-50 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 overflow-y-auto max-h-[85vh]">
            <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
              <img 
                src={selectedRecord.imageUrl} 
                alt={selectedRecord.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">{selectedRecord.date}</span>
                <h2 className="text-4xl font-light tracking-tighter">{selectedRecord.title}</h2>
              </div>
              <p className="text-lg leading-relaxed font-light text-gray-600 whitespace-pre-line">
                {selectedRecord.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;
