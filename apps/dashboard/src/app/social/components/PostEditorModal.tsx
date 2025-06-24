'use client';

import { useState } from 'react';
import { useSocialAgent, SocialPostData } from '../../../lib/hooks/useSocialAgent';

interface PostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostEditorModal({ isOpen, onClose }: PostEditorModalProps) {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<('facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube')[]>(['instagram']);
  const [scheduledTime, setScheduledTime] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  const {
    schedulePost,
    publishPost,
    optimizeContent,
    isSchedulingPost,
    isPublishingPost,
    isOptimizingContent,
    error,
    clearError
  } = useSocialAgent();

  const platforms = [
    { id: 'instagram' as const, name: 'Instagram', color: 'bg-pink-600' },
    { id: 'twitter' as const, name: 'Twitter', color: 'bg-blue-500' },
    { id: 'linkedin' as const, name: 'LinkedIn', color: 'bg-blue-700' },
    { id: 'facebook' as const, name: 'Facebook', color: 'bg-blue-600' },
  ];

  const togglePlatform = (platformId: typeof platforms[0]['id']) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const addHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags(prev => [...prev, hashtagInput.trim()]);
      setHashtagInput('');
    }
  };

  const removeHashtag = (hashtag: string) => {
    setHashtags(prev => prev.filter(h => h !== hashtag));
  };

  const handleOptimizeContent = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;

    setIsGeneratingContent(true);
    try {
      for (const platform of selectedPlatforms) {
        const result = await optimizeContent({
          content: { text: content, hashtags },
          platform,
          audience: { demographics: [], interests: [] },
          goals: { engagement: true, reach: true }
        });
        
        if (result.data?.optimizedContent) {
          setContent(result.data.optimizedContent);
        }
        if (result.data?.suggestedHashtags) {
          setHashtags(prev => [...new Set([...prev, ...result.data.suggestedHashtags])]);
        }
        break; // Use first platform's optimization
      }
    } catch (error) {
      console.error('Content optimization failed:', error);
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || selectedPlatforms.length === 0) {
      return;
    }

    clearError();

    try {
      const postData: SocialPostData = {
        platform: selectedPlatforms[0], // For now, use the first platform
        content: {
          text: content,
          hashtags: hashtags.length > 0 ? hashtags : undefined,
        },
        scheduling: {
          publishNow: !scheduledTime,
          scheduledAt: scheduledTime ? new Date(scheduledTime) : undefined,
          timezone: 'UTC',
        },
        settings: {
          enableComments: true,
          crossPost: selectedPlatforms.length > 1 ? selectedPlatforms.slice(1) : undefined,
        },
      };

      if (scheduledTime) {
        await schedulePost(postData);
      } else {
        await publishPost(postData);
      }

      // Success - close modal and reset form
      setContent('');
      setSelectedPlatforms(['instagram']);
      setScheduledTime('');
      setHashtags([]);
      onClose();
    } catch (error) {
      console.error('Failed to create/schedule post:', error);
    }
  };

  if (!isOpen) return null;

  const isLoading = isSchedulingPost || isPublishingPost || isGeneratingContent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-dark-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Create New Post</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg">
            <p className="text-sm text-red-300">{error}</p>
            <button
              onClick={clearError}
              className="mt-1 text-xs text-red-400 hover:text-red-300 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-neutral-200">
                Post Content
              </label>
              <button
                type="button"
                onClick={handleOptimizeContent}
                disabled={!content.trim() || isGeneratingContent}
                className="text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white px-2 py-1 rounded transition-colors"
              >
                {isGeneratingContent ? 'Optimizing...' : 'AI Optimize'}
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Use AI Optimize to enhance your content..."
              className="w-full h-32 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
              disabled={isLoading}
            />
            <div className="mt-2 text-right text-sm text-neutral-400">
              {content.length}/280
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-2">
              Hashtags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                placeholder="Add hashtag (without #)"
                className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={addHashtag}
                disabled={isLoading}
                className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 disabled:opacity-50 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-900 text-blue-200 text-sm rounded-full"
                >
                  #{hashtag}
                  <button
                    type="button"
                    onClick={() => removeHashtag(hashtag)}
                    disabled={isLoading}
                    className="text-blue-300 hover:text-blue-100 disabled:opacity-50"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-3">
              Select Platforms
            </label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => togglePlatform(platform.id)}
                  disabled={isLoading}
                  className={`p-3 rounded-lg border-2 transition-all disabled:opacity-50 ${
                    selectedPlatforms.includes(platform.id)
                      ? `${platform.color} border-transparent text-white`
                      : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-neutral-600'
                  }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-2">
              Add Media (Optional)
            </label>
            <div className="border-2 border-dashed border-neutral-700 rounded-lg p-6 text-center hover:border-neutral-600 transition-colors">
              <div className="text-neutral-400">
                <p>Drag & drop images here, or click to browse</p>
                <p className="text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input type="file" className="hidden" accept="image/*" multiple disabled={isLoading} />
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-2">
              Schedule Post (Optional)
            </label>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim() || selectedPlatforms.length === 0 || isLoading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? (scheduledTime ? 'Scheduling...' : 'Publishing...')
                : (scheduledTime ? 'Schedule Post' : 'Publish Now')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}