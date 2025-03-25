
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1117] text-white">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-6xl font-bold mb-2 text-red-500">404</h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-2xl font-medium mb-2">Page Not Found</p>
          <p className="text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-gray-700"
            onClick={goBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={goHome}
          >
            <HomeIcon className="h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
