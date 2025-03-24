
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthMessageProps {
  message: string | null;
}

export function AuthMessage({ message }: AuthMessageProps) {
  if (!message) return null;
  
  const isSuccess = message.includes("successful");
  
  return (
    <Alert className={`${isSuccess ? "bg-green-900/20 border-green-900/50" : "bg-red-900/20 border-red-900/50"} text-white`}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
