import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const InviteDialog = ({ isOpen, onOpenChange, roomId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#1e1e1e] border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            Invite to Room
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Share this code with others to join your coding session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-lg border border-blue-700">
            <p className="text-xs text-gray-300 mb-2">ROOM CODE</p>
            <p className="text-2xl font-mono font-bold text-blue-200 text-center mb-4">
              {roomId}
            </p>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Code
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Share this code on any platform - email, Slack, Discord, WhatsApp,
            etc.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
