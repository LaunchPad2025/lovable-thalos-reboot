
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import FeedbackButtons from './FeedbackButtons';
import { Message } from '../types';
import { useChatFeedback } from '../hooks/feedback/useChatFeedback';

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
  allMessages: Message[];
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, allMessages }) => {
  const isUser = message.role === 'user';
  const { 
    feedbackSubmitted, 
    showFeedbackForm, 
    currentMessageId, 
    feedbackNotes, 
    isSubmitting,
    error,
    handleFeedbackClick, 
    submitFeedbackWithNotes, 
    setFeedbackNotes, 
    cancelFeedback 
  } = useChatFeedback();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 last:mb-2`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${isUser ? 'ml-2 bg-blue-600' : 'mr-2 bg-gray-700'}`}>
          {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
        </div>
        
        <div className={`px-4 py-2 rounded-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'}`}>
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <>
              <ReactMarkdown 
                components={{
                  a: ({ node, ...props }) => (
                    <a 
                      {...props} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:underline"
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc pl-5 my-2" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="list-decimal pl-5 my-2" />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="my-1" />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="my-2" />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre {...props} className="bg-gray-900 p-2 rounded my-2 overflow-x-auto" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
              
              {!isUser && (
                <FeedbackButtons
                  messageId={message.id}
                  messages={allMessages}
                  feedbackSubmitted={feedbackSubmitted}
                  showFeedbackForm={showFeedbackForm}
                  currentMessageId={currentMessageId}
                  feedbackNotes={feedbackNotes}
                  isSubmitting={isSubmitting}
                  error={error}
                  onFeedbackClick={handleFeedbackClick}
                  onNotesChange={setFeedbackNotes}
                  onSubmitNotes={submitFeedbackWithNotes}
                  onCancelFeedback={cancelFeedback}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
