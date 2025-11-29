import axios from 'axios';
import { LoaderCircle, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

export default function CreatePost() {
    axios.defaults.baseURL=import.meta.env.VITE_BLOG_URL
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading,setLoading]=useState(false)

  const onSubmit = async (data) => {
    try {
        setLoading(true)
        await axios.post('create-blog',data,{
            withCredentials:true
        })

        toast.success('Published successfully')
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to publish")
        setLoading(false)
    }
    setLoading(false)
    reset();
  };

  const isPublished = watch("publish");

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Link to="/all-post" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-playfair text-white">New Entry</h1>
          </div>
        </div>

        {/* Blog Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-3xl font-playfair text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
              placeholder="Give your memory a name..."
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">Story</label>
            <textarea
              {...register("content", { required: true })}
              rows="12"
              className="w-full px-6 py-6 bg-white/5 border border-white/10 rounded-2xl text-lg font-inter text-gray-200 placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none leading-relaxed"
              placeholder="What's on your mind today?"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            {/* Publish Toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  {...register("publish")}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-white/10 rounded-full peer-checked:bg-white transition-colors duration-300" />
                <div className="absolute top-1 left-1 w-4 h-4 bg-gray-400 rounded-full transition-transform duration-300 peer-checked:translate-x-6 peer-checked:bg-black" />
              </div>
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                {isPublished ? 'Public' : 'Private'}
              </span>
            </label>

            {/* Submit */}
            <button 
              disabled={loading}
              type="submit"
              className="px-8 py-3 flex items-center justify-center text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                  <LoaderCircle className='animate-spin w-5 h-5' />
              ) : ('Publish Entry')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
