
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { HardHat, SendIcon, LightbulbIcon, MessageSquare } from 'lucide-react';
import { getFeatureInfo } from '../featureInfoData';
import FeatureInfo from '../FeatureInfo';

interface AICopilotsProps {
  onShowFeatureInfo: () => void;
}

const AICopilotsSection = ({ onShowFeatureInfo }: AICopilotsProps) => {
  const featureInfo = getFeatureInfo('copilot');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Además de usar el EPP adecuado, es importante seguir las prácticas de seguridad, como trabajar en áreas bien ventiladas, tener acceso a duchas de emergencia y estaciones de lavado de ojos, y recibir capacitación adecuada sobre el manejo seguro de ácidos.',
      timestamp: '37 minutes ago'
    },
    {
      role: 'user',
      content: 'Do hardhats come in multiple sizes?',
      timestamp: '37 minutes ago'
    },
    {
      role: 'assistant',
      content: 'Yes, hardhats do come in multiple sizes to ensure a proper fit for different head sizes, which is crucial for safety in the construction industry. Most hardhats have adjustable suspension systems that allow the wearer to customize the fit.\n\nIt\'s important to select the right size and adjust the suspension correctly to ensure maximum protection. A hardhat that is too loose or too tight can compromise safety by not staying in place or causing discomfort that might lead to improper wear.\n\nAlways follow the manufacturer\'s instructions for fitting and adjusting the hardhat to comply with safety standards and regulations.',
      timestamp: '37 minutes ago'
    },
    {
      role: 'user',
      content: 'what type of clothing do I wear in a chemical facility',
      timestamp: '7 minutes ago'
    },
    {
      role: 'assistant',
      content: 'In a chemical facility, safety is paramount, and the type of clothing you wear is crucial for protection against potential hazards. Here are some general guidelines for personal protective clothing in such environments:\n\n1. **Chemical-Resistant Clothing**: Wear garments made from materials that can resist chemical penetration. This includes coveralls, aprons, and lab coats specifically designed for chemical protection.\n\n2. **Gloves**: Use chemical-resistant gloves appropriate for the chemicals you are handling. Different materials (e.g., nitrile, neoprene) offer protection against different types of chemicals.\n\n3. **Eye and Face Protection**: Safety goggles or face shields should be worn to protect against splashes and fumes.\n\n4. **Footwear**: Chemical-resistant boots are recommended to protect your feet from spills and splashes.\n\n5. **Respiratory Protection**: Depending on the chemicals and the level of exposure, respirators or masks may be necessary to protect against inhalation of harmful substances.\n\n6. **Hard Hats**: If there is a risk of head injury from falling objects or bumping into equipment, a hard hat should be worn.\n\n7. **High-Visibility Clothing**: In areas where visibility is important for safety, high-visibility vests or clothing may be required.\n\nWhen working in a chemical facility, always follow the specific safety protocols and guidelines provided by your employer or the facility\'s safety officer. They will provide information tailored to the specific chemicals and hazards present in your work environment.',
      timestamp: '7 minutes ago'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Safety Copilot</h1>
          <p className="text-gray-400">Ask Paulie about workplace safety, regulations, and best practices</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <LightbulbIcon size={16} />
          Suggest a Feature
        </Button>
      </div>

      <Card className="border border-gray-800 bg-[#0d1117] shadow-xl">
        <CardHeader className="border-b border-gray-800 bg-[#0d1117] p-4">
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-2">
              <span className="font-semibold">P</span>
            </span>
            Ask Paulie
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[550px]">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className="py-4 border-b border-gray-800 last:border-0">
                  <div className="flex items-start gap-3">
                    {message.role === 'assistant' ? (
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                        <HardHat className="h-5 w-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">You</span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-300">
                          {message.role === 'assistant' ? 'Paulie' : 'You'}
                        </span>
                        <span className="text-xs text-gray-500">
                          • {message.timestamp}
                        </span>
                      </div>
                      
                      <div className="text-white text-sm whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-800 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Paulie a safety question..."
                  className="flex-1 bg-[#1a1f29] text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <SendIcon size={18} />
                  <span className="ml-2">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <FeatureInfo featureInfo={featureInfo} />
    </div>
  );
};

export default AICopilotsSection;
