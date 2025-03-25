
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  imageUrl?: string;
}
