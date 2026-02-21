import React, { useState } from 'react';
import { getDB, currentUser, saveDB } from '../db';
import { ChatBubbleLeftRightIcon, HandThumbUpIcon, PlusIcon, ChatBubbleOvalLeftEllipsisIcon, FlagIcon } from '@heroicons/react/24/outline';

export const Community: React.FC = () => {
  const db = getDB();
  const [posts, setPosts] = useState(db.posts);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostContent) return;
    const newPost = { id: Date.now().toString(), userId: currentUser.id, userName: currentUser.name, title: newPostTitle, content: newPostContent, likes: 0, replies: 0, createdAt: new Date().toISOString(), category: 'General' };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    saveDB({ ...db, posts: updatedPosts });
    setNewPostTitle(''); setNewPostContent(''); setShowForm(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold dark:text-white">Community Forum</h1><p className="text-slate-500">Connect, share, and grow with other students</p></div>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none"><PlusIcon className="h-5 w-5 mr-2" />New Discussion</button>
      </header>
      {showForm && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-blue-100 dark:border-slate-700 animate-fade-in shadow-xl">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Start a Conversation</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Topic title..." value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none focus:border-blue-400" />
            <textarea placeholder="What's on your mind?..." rows={4} value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none focus:border-blue-400 resize-none" />
            <div className="flex justify-end space-x-3"><button onClick={() => setShowForm(false)} className="px-6 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-all">Cancel</button><button onClick={handleCreatePost} className="px-8 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg">Post to Forum</button></div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3"><img src={`https://picsum.photos/seed/${post.userId}/40/40`} className="h-10 w-10 rounded-full" /><div><h4 className="font-bold text-slate-900 dark:text-white">{post.title}</h4><p className="text-xs text-slate-500">Posted by <span className="text-blue-600 font-bold">{post.userName}</span></p></div></div>
                <div className="bg-blue-50 dark:bg-slate-700 px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest">{post.category}</div>
              </div>
              <div className="mt-4 text-slate-600 dark:text-slate-300 text-sm line-clamp-3">{post.content}</div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-50 dark:border-slate-700 pt-4">
                <div className="flex items-center space-x-6"><button className="flex items-center text-slate-400 hover:text-blue-600 transition-colors"><HandThumbUpIcon className="h-5 w-5 mr-1" /><span className="text-xs font-bold">{post.likes}</span></button><button className="flex items-center text-slate-400 hover:text-blue-600 transition-colors"><ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 mr-1" /><span className="text-xs font-bold">{post.replies} Replies</span></button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
