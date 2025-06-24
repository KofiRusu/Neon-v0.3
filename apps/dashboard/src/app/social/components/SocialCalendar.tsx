'use client';

import { useState } from 'react';
import { api } from '../../../utils/trpc';

interface CalendarEvent {
  id: string;
  title: string;
  platform: string;
  time: string;
  status: 'scheduled' | 'published' | 'draft';
  scheduledAt?: Date;
}

export function SocialCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get scheduled posts from tRPC
  const { data: scheduledPosts, isLoading } = api.social.getScheduledPosts.useQuery({
    startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
  });

  // Convert scheduled posts to calendar events
  const events: CalendarEvent[] = scheduledPosts?.posts.map(post => ({
    id: post.id,
    title: post.content.text.substring(0, 20) + '...',
    platform: post.platform,
    time: new Date(post.scheduledAt!).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    }),
    status: post.status as 'scheduled' | 'published' | 'draft',
    scheduledAt: new Date(post.scheduledAt!)
  })) || [];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      if (!event.scheduledAt) return false;
      const eventDate = new Date(event.scheduledAt);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading calendar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-200">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-neutral-400">
            {day}
          </div>
        ))}
        
        {/* Empty days */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-2 h-16"></div>
        ))}
        
        {/* Month days */}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          
          return (
            <div
              key={day}
              className="p-2 h-16 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <div className="text-sm text-neutral-300 mb-1">{day}</div>
              {dayEvents.length > 0 && (
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-2 py-1 rounded text-white ${
                        event.status === 'scheduled' ? 'bg-blue-600' :
                        event.status === 'published' ? 'bg-green-600' :
                        'bg-yellow-600'
                      }`}
                      title={`${event.title} - ${event.platform} at ${event.time}`}
                    >
                      {event.title.length > 8 ? event.title.substring(0, 8) + '...' : event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-neutral-500">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upcoming Events */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-neutral-200 mb-3">Upcoming Posts</h4>
        <div className="space-y-2">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-neutral-200">{event.title}</p>
                <p className="text-xs text-neutral-400 capitalize">{event.platform} • {event.time}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                event.status === 'scheduled' ? 'bg-blue-600 text-white' :
                event.status === 'published' ? 'bg-green-600 text-white' :
                'bg-yellow-600 text-black'
              }`}>
                {event.status}
              </span>
            </div>
          ))}
          {events.length === 0 && (
            <div className="text-center py-8">
              <p className="text-neutral-500">No upcoming posts scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}