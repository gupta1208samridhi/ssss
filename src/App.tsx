import React, { useState } from 'react';
import { Rocket, Star, Plane as Planet, Code2, Satellite } from 'lucide-react';

interface Level {
  task: string;
  solution: string;
  hint: string;
  explanation: string;
}

function App() {
  const [userInput, setUserInput] = useState('');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const levels: Level[] = [
    {
      task: "Create an image element that points to 'mars-surface.jpg' to begin your space exploration!",
      solution: '<img src="mars-surface.jpg">',
      hint: "Use the 'img' tag with 'src' attribute",
      explanation: "The img tag creates an image element, and the src attribute specifies the image source file. This is essential for displaying images in your space mission interface."
    },
    {
      task: "Add an 'alt' attribute to describe the image as 'Mysterious Mars landscape with ancient alien artifacts'",
      solution: '<img src="mars-surface.jpg" alt="Mysterious Mars landscape with ancient alien artifacts">',
      hint: "The 'alt' attribute provides alternative text for images",
      explanation: "The alt attribute ensures your mission data is accessible to all crew members and backup systems when visual data transmission fails."
    },
    {
      task: "Create a hyperspace link to 'station.html' by wrapping the Mars surface image",
      solution: '<a href="station.html"><img src="mars-surface.jpg" alt="Mysterious Mars landscape with ancient alien artifacts"></a>',
      hint: "Use the 'a' tag with 'href' attribute",
      explanation: "The anchor (a) tag creates hyperspace navigation links in your mission interface, allowing crew members to jump between different sections of the spacecraft's systems."
    },
    {
      task: "Add a title attribute that shows 'Initiate Landing Sequence' when hovering over the link",
      solution: '<a href="station.html" title="Initiate Landing Sequence"><img src="mars-surface.jpg" alt="Mysterious Mars landscape with ancient alien artifacts"></a>',
      hint: "The 'title' attribute creates a tooltip for mission instructions",
      explanation: "The title attribute provides additional mission context through tooltips, helping crew members understand the purpose of each interface element."
    },
    {
      task: "Set the viewport dimensions to 500 pixels using the width attribute for optimal mission display",
      solution: '<a href="station.html" title="Initiate Landing Sequence"><img src="mars-surface.jpg" alt="Mysterious Mars landscape with ancient alien artifacts" width="500"></a>',
      hint: "Use the 'width' attribute on the img tag to set viewport dimensions",
      explanation: "The width attribute ensures consistent display dimensions across all spacecraft viewing terminals, maintaining mission interface standards."
    }
  ];

  const checkSolution = () => {
    const cleanInput = userInput.replace(/\s+/g, ' ').trim().toLowerCase();
    const cleanSolution = levels[currentLevel].solution.toLowerCase();
    
    if (cleanInput === cleanSolution) {
      if (currentLevel === levels.length - 1) {
        setMessage('🚀 Mission Accomplished! You\'ve mastered the spacecraft\'s HTML control systems!');
        setShowSolution(false);
      } else {
        setMessage('✨ System Check Passed! Proceeding to next mission phase...');
        setCurrentLevel(prev => prev + 1);
        setUserInput('');
        setShowHint(false);
        setShowSolution(false);
      }
    } else {
      setMessage('⚠️ System Error Detected. Review the correct syntax below!');
      setShowSolution(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-300 mb-2 flex items-center justify-center gap-2">
            <Rocket className="w-8 h-8" />
            Space Station HTML Quest
          </h1>
          <p className="text-purple-200">Master the HTML Control Systems for Interstellar Navigation</p>
          <p className="text-sm text-purple-400 mt-2">Mission Phase {currentLevel + 1} of {levels.length}</p>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6 border border-purple-500">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Satellite className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-purple-300">Mission Phase {currentLevel + 1}</h2>
            </div>
            <p className="text-gray-300">{levels[currentLevel].task}</p>
          </div>

          <div className="mb-4">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full h-32 p-4 border rounded-lg font-mono text-sm bg-slate-900 text-purple-300 border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Input HTML commands here..."
              spellCheck="false"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={checkSolution}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Planet className="w-4 h-4" />
              Run System Check
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="bg-slate-700 hover:bg-slate-600 text-purple-300 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              {showHint ? 'Hide Mission Hint' : 'Request Hint'}
            </button>
          </div>

          {showHint && (
            <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-purple-500">
              <p className="text-purple-300">💫 Mission Hint: {levels[currentLevel].hint}</p>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-4 rounded-lg ${message.includes('⚠️') ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'} border border-purple-500`}>
              {message}
              {message.includes('🚀') && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">Elite Space Navigator</span>
                </div>
              )}
            </div>
          )}

          {showSolution && (
            <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-purple-500">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-purple-300">Correct Command Sequence:</h3>
              </div>
              <pre className="bg-slate-800 p-3 rounded border border-purple-500 text-sm font-mono text-purple-300 mb-2 overflow-x-auto">
                {levels[currentLevel].solution}
              </pre>
              <p className="text-purple-200 text-sm">
                <strong>Mission Log:</strong> {levels[currentLevel].explanation}
              </p>
            </div>
          )}
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-purple-500">
          <h3 className="text-lg font-semibold text-purple-300 mb-2 flex items-center gap-2">
            <Satellite className="w-5 h-5" />
            Mission Display Terminal
          </h3>
          <div 
            className="border-2 border-dashed border-purple-500 rounded-lg p-4 min-h-[200px] bg-slate-900 text-purple-300"
            dangerouslySetInnerHTML={{ __html: userInput }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;