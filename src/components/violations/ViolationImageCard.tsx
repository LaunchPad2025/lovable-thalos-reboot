
import React, { useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Save, AlertCircle, HardHat, FlagTriangleLeft, Clock } from 'lucide-react';
import { TestResult } from '@/hooks/model-testing/types';
import { getSeverityBadgeClass } from './utils/violationHelpers';
import { generateRemediationSteps } from './utils/violationHelpers';

interface ViolationImageCardProps {
  results: TestResult;
  violationsCount: number;
  onSave: () => void;
}

const ViolationImageCard = ({ results, violationsCount, onSave }: ViolationImageCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Add remediation steps to detections if needed
  const enhancedDetections = results?.detections?.map(detection => {
    if (!detection.remediationSteps && detection.label) {
      return {
        ...detection,
        remediationSteps: generateRemediationSteps(detection.label)
      };
    }
    return detection;
  });
  
  // Draw violation annotations on the canvas
  useEffect(() => {
    if (canvasRef.current && results?.imagePreview && results?.detections && results.detections.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const img = new Image();
      img.src = results.imagePreview;
      
      img.onload = () => {
        try {
          // Set canvas dimensions to match the image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw the image
          ctx.drawImage(img, 0, 0, img.width, img.height);
          
          // Draw bounding boxes for detections with improved styling
          results.detections.forEach((detection, index) => {
            if (detection.bbox) {
              const [x, y, width, height] = detection.bbox;
              
              // Determine if this is a critical violation
              const isCritical = detection.label?.includes('missing') || 
                                detection.label?.includes('critical') || 
                                detection.confidence > 0.85;
              
              // Draw the rectangle with distinctive styling
              ctx.lineWidth = 4;
              ctx.strokeStyle = isCritical ? '#e11d48' : '#f59e0b'; // red for critical, amber for others
              ctx.strokeRect(x, y, width, height);
              
              // Add diagonal hash pattern for emphasis
              ctx.beginPath();
              ctx.lineWidth = 1.5;
              if (isCritical) {
                // More dense pattern for critical
                for (let i = 0; i < width; i += 15) {
                  ctx.moveTo(x + i, y);
                  ctx.lineTo(Math.min(x + i + height, x + width), Math.min(y + height, y + height));
                }
              } else {
                // Less dense pattern for normal violations
                for (let i = 0; i < width; i += 30) {
                  ctx.moveTo(x + i, y);
                  ctx.lineTo(Math.min(x + i + height, x + width), Math.min(y + height, y + height));
                }
              }
              ctx.stroke();
              
              // Create label background with enhanced styling
              ctx.fillStyle = isCritical ? 'rgba(225, 29, 72, 0.85)' : 'rgba(245, 158, 11, 0.85)';
              
              // Calculate text width to make background appropriate size
              const labelText = detection.label ? 
                detection.label.replace(/_/g, ' ') : 
                `Violation ${index + 1}`;
                
              ctx.font = 'bold 16px Arial';
              const textWidth = ctx.measureText(labelText).width;
              
              // Draw label background with consistent positioning
              const labelHeight = 28;
              const labelY = y > 30 ? y - labelHeight - 6 : y + height + 6;
              ctx.fillRect(x, labelY, textWidth + 16, labelHeight);
              
              // Add label text
              ctx.fillStyle = 'white';
              ctx.fillText(labelText, x + 8, labelY + 19);
              
              // Add regulation citation if available
              if (results.regulationIds && results.regulationIds[index]) {
                const regText = results.regulationIds[index].substring(0, 20);
                ctx.font = '12px Arial';
                const regWidth = ctx.measureText(regText).width;
                
                // Draw regulation citation badge
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.fillRect(x, y + height + 2, regWidth + 16, 22);
                
                ctx.fillStyle = '#a3e635'; // Light green text for regulation
                ctx.fillText(regText, x + 8, y + height + 17);
              }
              
              // Add confidence percentage if available
              if (detection.confidence) {
                const confidenceText = `${(detection.confidence * 100).toFixed(0)}%`;
                ctx.font = 'bold 12px Arial';
                const confWidth = ctx.measureText(confidenceText).width;
                
                // Draw confidence badge
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.fillRect(x + width - confWidth - 16, y, confWidth + 16, 24);
                
                // Color based on confidence level
                if (detection.confidence > 0.8) {
                  ctx.fillStyle = '#ef4444'; // Red for high confidence
                } else if (detection.confidence > 0.6) {
                  ctx.fillStyle = '#f59e0b'; // Amber for medium confidence
                } else {
                  ctx.fillStyle = '#3b82f6'; // Blue for lower confidence
                }
                
                ctx.fillText(confidenceText, x + width - confWidth - 8, y + 17);
              }
              
              // Add ID number to make violations easier to reference
              const idText = `#${index + 1}`;
              ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
              const idWidth = ctx.measureText(idText).width + 10;
              const idHeight = 24;
              
              // Create circular or pill shape for the ID
              ctx.beginPath();
              ctx.arc(x + idWidth/2, y + idHeight/2, idHeight/2, 0, Math.PI * 2);
              ctx.fill();
              
              ctx.fillStyle = 'white';
              ctx.fillText(idText, x + 5, y + 17);
              
              // Add a hazard icon for visual emphasis
              if (isCritical) {
                ctx.fillStyle = 'rgba(225, 29, 72, 0.9)';
                ctx.beginPath();
                ctx.arc(x + width - 15, y + 15, 12, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw exclamation mark
                ctx.fillStyle = 'white';
                ctx.font = 'bold 16px Arial';
                ctx.fillText("!", x + width - 18, y + 20);
              }
            }
          });
        } catch (error) {
          console.error("Error rendering detection overlay:", error);
        }
      };
      
      // Handle image loading errors
      img.onerror = () => {
        console.error("Failed to load image for annotation");
        
        // Draw a placeholder with error message
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 400, 300);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText("Error loading image", 20, 150);
      };
    }
  }, [results]);
  
  const downloadImage = () => {
    if (canvasRef.current) {
      try {
        const link = document.createElement('a');
        link.download = `safety-violation-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  // Format date to display in a readable format
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 overflow-hidden">
      <CardHeader className="bg-[#0f1419] border-b border-gray-800 flex flex-row items-center justify-between p-4">
        <div>
          <CardTitle className="text-white flex items-center">
            <span className="bg-yellow-500 text-[#0f1419] rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
              <HardHat className="h-4 w-4" />
            </span>
            Violation Analysis
          </CardTitle>
          <div className="flex flex-wrap mt-1 gap-2 text-sm text-gray-400">
            <span className="flex items-center">
              Industry: {results.industry || 'Construction'}
            </span>
            <span className="flex items-center ml-3">
              <Clock className="h-3 w-3 mr-1 opacity-70" />
              {formatDate()}
            </span>
            <span className="flex items-center ml-3">
              Location: {results.location || 'Work Area'}
            </span>
          </div>
        </div>
        <div>
          <Badge className={`${violationsCount > 0 ? getSeverityBadgeClass(results.severity) : 'bg-green-900/50 text-green-300 border border-green-800'}`}>
            {violationsCount > 0 ? `${violationsCount} ${violationsCount === 1 ? 'Violation' : 'Violations'} Detected` : 'No Violations'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          {results.detections && results.detections.length > 0 ? (
            <div className="relative rounded-md border border-gray-700 overflow-hidden">
              <canvas 
                ref={canvasRef}
                className="w-full h-auto max-h-[500px] object-contain"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute bottom-2 right-2 border-gray-700 text-gray-300"
                onClick={downloadImage}
              >
                <Download size={16} className="mr-1" />
                Download
              </Button>
            </div>
          ) : (
            <div className="relative rounded-md border border-gray-700 overflow-hidden">
              <img 
                src={results.imagePreview || ''} 
                alt="Analyzed image" 
                className="w-full h-auto max-h-[500px] object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="text-center p-4">
                  <AlertCircle size={40} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-white font-medium">No violations detected</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Analysis Summary</h3>
          <p className="text-gray-400 mb-4">{results.description || 'No safety violations were detected in this image.'}</p>
          
          {results.detections && results.detections.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Identified Violations:</h4>
              <ul className="space-y-3">
                {results.detections.map((detection, index) => (
                  <li key={index} className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                    <div className="flex items-start text-sm">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-700 text-white text-xs mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-200 font-medium">
                          {detection.label ? detection.label.replace(/_/g, ' ') : 'Violation'}
                        </p>
                        <div className="flex flex-wrap items-center mt-1 space-x-3">
                          {results.regulationIds && results.regulationIds[index] && (
                            <Badge variant="outline" className="text-green-400 border-green-800 bg-green-900/20">
                              <FlagTriangleLeft className="mr-1 h-3 w-3" />
                              {results.regulationIds[index]}
                            </Badge>
                          )}
                          {detection.confidence && (
                            <Badge className={`${detection.confidence > 0.8 ? 'bg-red-900/30 border-red-800' : detection.confidence > 0.6 ? 'bg-yellow-900/30 border-yellow-800' : 'bg-blue-900/30 border-blue-800'}`}>
                              Confidence: {(detection.confidence * 100).toFixed(0)}%
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 text-gray-400 text-sm">
                          {detection.remediationSteps || generateRemediationSteps(detection.label || '')}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-5 pt-5 border-t border-gray-800">
          <div className="flex items-center mb-3">
            <HardHat className="mr-2 h-4 w-4 text-yellow-500" />
            <h4 className="text-sm font-medium text-yellow-300">Recommended Actions</h4>
          </div>
          
          <ul className="text-sm text-gray-400 space-y-2 mb-6 ml-6 list-disc">
            <li>Immediately address all high and critical violations</li>
            <li>Document corrective actions taken with photos</li>
            <li>Conduct safety briefing with all workers</li>
            <li>Schedule follow-up inspection within 48 hours</li>
          </ul>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="border-gray-700 text-gray-300" onClick={downloadImage}>
              <Download size={16} className="mr-1" />
              Export Report
            </Button>
            
            {results.detections && results.detections.length > 0 && (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={onSave}>
                <Save size={16} className="mr-1" />
                Create Remediation Task
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationImageCard;
