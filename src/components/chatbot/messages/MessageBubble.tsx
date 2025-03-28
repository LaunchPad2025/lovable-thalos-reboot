
import React from 'react';
import { Message } from '../types';
import { Avatar } from '@/components/ui/avatar';
import { HardHat, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import FeedbackButtons from './FeedbackButtons';
import { useChatFeedback } from '../hooks/feedback/useChatFeedback';

interface MessageBubbleProps {
  message: Message;
  allMessages: Message[];
}

const MessageBubble = ({ message, allMessages }: MessageBubbleProps) => {
  const isUserMessage = message.role === 'user';
  
  const {
    feedbackSubmitted,
    showFeedbackForm,
    feedbackNotes,
    currentMessageId,
    setFeedbackNotes,
    handleFeedbackClick,
    submitFeedbackWithNotes,
    setShowFeedbackForm
  } = useChatFeedback();
  
  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUserMessage && (
        <div className="mr-3 mt-1">
          <Avatar className="h-8 w-8 bg-yellow-500">
            <HardHat className="h-5 w-5 text-white" />
          </Avatar>
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUserMessage ? 'order-1' : 'order-2'}`}>
        <div
          className={`rounded-lg p-3 ${
            isUserMessage
              ? 'bg-blue-900/30 text-white'
              : 'bg-gray-800 text-gray-100'
          }`}
        >
          {message.content.startsWith('http') ? (
            <img
              src={message.content}
              alt="Uploaded image"
              className="max-w-full rounded"
            />
          ) : (
            <ReactMarkdown
              className="prose prose-invert prose-sm max-w-none"
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="mb-3 last:mb-0" />
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="list-disc pl-5 mb-3" />
                ),
                ol: ({ node, ...props }) => (
                  <ol {...props} className="list-decimal pl-5 mb-3" />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="mb-1" />
                ),
                code: ({ node, ...props }) => (
                  <code
                    {...props}
                    className="bg-gray-700 px-1 py-0.5 rounded text-sm"
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    {...props}
                    className="bg-gray-900 p-3 rounded-md overflow-x-auto mb-3"
                  />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        
        <div className="mt-1 text-xs text-gray-500 flex justify-between">
          <span>
            {formatDistanceToNow(new Date(message.timestamp), {
              addSuffix: true,
            })}
          </span>
          
          {!isUserMessage && (
            <FeedbackButtons
              messageId={message.id}
              messages={allMessages}
              feedbackSubmitted={feedbackSubmitted}
              showFeedbackForm={showFeedbackForm}
              currentMessageId={currentMessageId}
              feedbackNotes={feedbackNotes}
              onFeedbackClick={handleFeedbackClick}
              onNotesChange={setFeedbackNotes}
              onSubmitNotes={submitFeedbackWithNotes}
              onCancelFeedback={() => setShowFeedbackForm(false)}
            />
          )}
        </div>
      </div>
      
      {isUserMessage && (
        <div className="ml-3 mt-1">
          <Avatar className="h-8 w-8 bg-blue-700">
            <User className="h-5 w-5 text-white" />
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
