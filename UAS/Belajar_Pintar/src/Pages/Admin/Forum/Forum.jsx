import React, { useReducer, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Search, MessageSquare, ArrowBigUp, ArrowBigDown, 
  Filter, Plus, CheckCircle2, Pin, MoreVertical, X 
} from 'lucide-react';
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import { forumData, forumCategories, forumTags, dummyUser } from "@/Data/Dummy";
import { toastSuccess } from "@/Utils/Helper/ToastHelpers";

const forumReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(item => 
        item.id === action.id ? { ...item, votes: item.votes + action.val } : item
      );
    case 'ADD_POST':
      return [action.payload, ...state];
    default: return state;
  }
};

const Forum = () => {
  const [discussions, dispatch] = useReducer(forumReducer, forumData);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Programming', tags: '' });

  const { isLoading } = useQuery({
    queryKey: ['discussions-list'], 
    queryFn: () => new Promise(res => setTimeout(() => res(discussions), 500))
  });

  const filteredData = discussions.filter(item => {
    const matchesTag = filterTag === 'All' || item.tags.includes(filterTag);
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleVote = (id, val) => dispatch({ type: 'VOTE', id, val });

  const handleSubmitPost = (e) => {
    e.preventDefault();
    
    const payload = {
      id: Date.now(),
      author: dummyUser.name, 
      role: dummyUser.role,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      tags: [newPost.tags || "General"], 
      votes: 0,
      replies: 0,
      isSolved: false,
      isPinned: false,
      createdAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_POST', payload });
    setIsModalOpen(false);
    setNewPost({ title: '', content: '', category: 'Programming', tags: '' });
    toastSuccess("Diskusi kamu berhasil dipublikasikan! 🚀");
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen space-y-6 animate-fadeIn">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Forum Belajar Pintar 💬</h1>
          <p className="text-gray-500 font-medium tracking-wide">Tanya jawab dan diskusi seputar kurikulum kuliah kamu.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 shadow-xl shadow-indigo-100 !rounded-2xl py-4 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Mulai Diskusi Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="space-y-6">
          <Card className="!p-6 !rounded-3xl border-none shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Filter size={18}/> Filter Tag</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilterTag('All')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filterTag === 'All' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
              >
                # SEMUA
              </button>
              {forumTags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filterTag === tag ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  # {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-800 to-indigo-950 text-white !p-6 !rounded-3xl border-none shadow-xl">
            <h3 className="font-bold text-lg mb-1 tracking-tight">Poin Kontribusi</h3>
            <p className="text-xs text-indigo-300 mb-6">Jawabanmu membantu orang lain!</p>
            <div className="flex items-end justify-between">
               <div>
                  <p className="text-[10px] uppercase font-black text-indigo-400">Total XP</p>
                  <p className="text-3xl font-black">{dummyUser.points}</p>
               </div>
               <div className="text-[10px] bg-white/10 border border-white/20 px-3 py-1.5 rounded-full font-black uppercase">Expert 🏆</div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Cari pertanyaan atau kata kunci..."
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-transparent shadow-sm rounded-2xl focus:border-indigo-600 outline-none transition-all font-medium text-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest animate-pulse">Menghubungkan ke forum...</div>
          ) : filteredData.length > 0 ? filteredData.map(post => (
            <div key={post.id} className="bg-white p-7 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex gap-8 group">
              <div className="flex flex-col items-center gap-1 bg-gray-50 p-2 rounded-2xl h-fit border border-gray-100">
                <button onClick={() => handleVote(post.id, 1)} className="text-gray-400 hover:text-indigo-600 transition-colors"><ArrowBigUp size={30}/></button>
                <span className="font-black text-gray-800 text-lg">{post.votes}</span>
                <button onClick={() => handleVote(post.id, -1)} className="text-gray-400 hover:text-red-500 transition-colors"><ArrowBigDown size={30}/></button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {post.isPinned && <div className="bg-orange-100 text-orange-600 p-1 rounded-lg"><Pin size={14} fill="currentColor" /></div>}
                    {post.isSolved && <div className="bg-green-100 text-green-600 p-1 rounded-lg"><CheckCircle2 size={14} /></div>}
                    <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{post.category}</span>
                  </div>
                  <button className="text-gray-300 hover:text-gray-600"><MoreVertical size={20}/></button>
                </div>
                
                <h2 className="text-2xl font-black text-gray-800 group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h2>
                <p className="text-gray-500 font-medium line-clamp-2">{post.content}</p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(t => <span key={t} className="text-[10px] font-bold text-gray-400">#{t.toUpperCase()}</span>)}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-100">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-800">{post.author}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{post.role} • Baru saja</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-black">
                    <MessageSquare size={16} /> {post.replies} BALASAN
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200 text-gray-400 font-bold">
               TIDAK ADA DISKUSI YANG SESUAI PENCARIAN
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-indigo-950/40 backdrop-blur-sm">
          <Card className="max-w-2xl !p-0 !rounded-[2.5rem] overflow-hidden shadow-2xl animate-scaleIn">
            <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
               <h2 className="text-2xl font-black">Mulai Diskusi Baru ✍️</h2>
               <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSubmitPost} className="p-8 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Apa Pertanyaanmu?</label>
                <input 
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold transition-all"
                  placeholder="Contoh: Bagaimana cara debug React Query?"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Kategori</label>
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold appearance-none"
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  >
                    {forumCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pilih Tag Utama</label>
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold appearance-none"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  >
                    <option value="">-- Pilih Tag --</option>
                    {forumTags.map(t => <option key={t} value={t}>#{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Penjelasan Detail</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-medium transition-all"
                  placeholder="Jelaskan kendala kamu di sini..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 shadow-lg shadow-indigo-100 !rounded-2xl py-4 font-black tracking-widest">
                  POSTING SEKARANG 🚀
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Forum;