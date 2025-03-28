
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircleQuestion, X, HardHat } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import ChatInterface from './ChatInterface';

interface ChatPopupProps {
  title?: string;
}

const ChatPopup = ({ title = "Paulie - Safety Assistant" }: ChatPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg"
      >
        <MessageCircleQuestion size={24} />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md h-[500px] p-0 flex flex-col border-gray-700 bg-[#0d1117]">
          <DialogHeader className="px-4 py-2 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-white flex items-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2">
                  <HardHat className="h-4 w-4 text-white" />
                </div>
                {title}
              </DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <X size={18} />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-4">
            <ChatInterface isPopup={true} onClose={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatPopup;
