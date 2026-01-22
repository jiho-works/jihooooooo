
import React, { useState } from 'react';
import { Record, FeaturedMedia } from '../types';
import { ADMIN_PASSWORD } from '../constants';

interface AdminProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  records: Record[];
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
  featured: FeaturedMedia[];
  setFeatured: React.Dispatch<React.SetStateAction<FeaturedMedia[]>>;
}

const Admin: React.FC<AdminProps> = ({ isAdmin, setIsAdmin, records, setRecords, featured, setFeatured }) => {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Form states for new record
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');

  // Form states for home featured
  const [newFeaturedTitle, setNewFeaturedTitle] = useState('');
  const [newFeaturedUrl, setNewFeaturedUrl] = useState('');
  const [newFeaturedType, setNewFeaturedType] = useState<'image' | 'video'>('image');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem('studi_ho_admin', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('studi_ho_admin');
  };

  const addRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newRec: Record = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      imageUrl: newImage || 'https://picsum.photos/800/1200',
      date: new Date().toISOString().split('T')[0]
    };
    setRecords(prev => [newRec, ...prev]);
    setNewTitle('');
    setNewContent('');
    setNewImage('');
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const addFeatured = (e: React.FormEvent) => {
    e.preventDefault();
    let url = newFeaturedUrl;
    if (newFeaturedType === 'video') {
      // Basic YT ID extraction
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&]+)/);
      if (match) url = match[1];
    }
    
    const newFeat: FeaturedMedia = {
      id: Date.now().toString(),
      type: newFeaturedType,
      url: url,
      title: newFeaturedTitle
    };
    setFeatured(prev => [newFeat, ...prev]);
    setNewFeaturedTitle('');
    setNewFeaturedUrl('');
  };

  const deleteFeatured = (id: string) => {
    setFeatured(prev => prev.filter(f => f.id !== id));
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-500">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-light tracking-tighter">Admin Access</h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Enter access key to manage content</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 text-center text-lg tracking-[1em] focus:outline-none focus:border-black transition-colors"
            />
            {loginError && <p className="text-center text-[10px] text-red-500 uppercase tracking-widest">Incorrect Access Key</p>}
            <button 
              type="submit"
              className="w-full py-3 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-gray-900 transition-colors"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b border-black pb-4">
        <h1 className="text-3xl font-light tracking-tighter uppercase">Management</h1>
        <button 
          onClick={handleLogout}
          className="text-[10px] uppercase tracking-widest hover:underline"
        >
          Logout Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Section: Manage Featured Home Content */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl font-medium tracking-tight">Home Feed</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Add images or music videos to the main page</p>
          </div>
          
          <form onSubmit={addFeatured} className="space-y-4 p-6 border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={() => setNewFeaturedType('image')}
                className={`py-2 text-[10px] uppercase tracking-widest border transition-all ${newFeaturedType === 'image' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-100'}`}
              >
                Image
              </button>
              <button 
                type="button" 
                onClick={() => setNewFeaturedType('video')}
                className={`py-2 text-[10px] uppercase tracking-widest border transition-all ${newFeaturedType === 'video' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-100'}`}
              >
                Music Video
              </button>
            </div>
            <input 
              value={newFeaturedTitle}
              onChange={e => setNewFeaturedTitle(e.target.value)}
              placeholder="Title (optional)" 
              className="w-full px-4 py-3 bg-gray-50 text-sm focus:outline-none"
            />
            <input 
              value={newFeaturedUrl}
              onChange={e => setNewFeaturedUrl(e.target.value)}
              required
              placeholder={newFeaturedType === 'image' ? "Image URL" : "YouTube Video URL"} 
              className="w-full px-4 py-3 bg-gray-50 text-sm focus:outline-none"
            />
            <button type="submit" className="w-full py-3 bg-black text-white text-[10px] uppercase tracking-widest">Add to Home</button>
          </form>

          <div className="space-y-4">
            {featured.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-3 border border-gray-50 hover:border-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gray-100 overflow-hidden flex-shrink-0">
                  {item.type === 'image' ? (
                    <img src={item.url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={`https://img.youtube.com/vi/${item.url}/default.jpg`} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium truncate">{item.title || 'Untitled'}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">{item.type}</p>
                </div>
                <button onClick={() => deleteFeatured(item.id)} className="text-gray-300 hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Manage Records */}
        <section className="space-y-8">
           <div className="space-y-1">
            <h2 className="text-xl font-medium tracking-tight">Records Board</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Create new album-style entries</p>
          </div>

          <form onSubmit={addRecord} className="space-y-4 p-6 border border-gray-100">
            <input 
              required
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Record Title" 
              className="w-full px-4 py-3 bg-gray-50 text-sm focus:outline-none"
            />
             <input 
              value={newImage}
              onChange={e => setNewImage(e.target.value)}
              placeholder="Main Photo URL" 
              className="w-full px-4 py-3 bg-gray-50 text-sm focus:outline-none"
            />
            <textarea 
              required
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="What's the story?" 
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 text-sm focus:outline-none resize-none"
            />
            <button type="submit" className="w-full py-3 bg-black text-white text-[10px] uppercase tracking-widest">Publish Record</button>
          </form>

          <div className="space-y-4">
            {records.map(rec => (
              <div key={rec.id} className="flex items-center gap-4 p-3 border border-gray-50 hover:border-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gray-100 overflow-hidden flex-shrink-0">
                  <img src={rec.imageUrl} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium truncate">{rec.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">{rec.date}</p>
                </div>
                <button onClick={() => deleteRecord(rec.id)} className="text-gray-300 hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
