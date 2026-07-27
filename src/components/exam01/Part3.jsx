import { useState } from "react";
import { Keyboard } from "lucide-react";

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  // Drag and Drop State
  const [draggedOption, setDraggedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Q21-25: Matching
  const fossilCategories = [
    { id: 21, name: "Impression fossils" },
    { id: 22, name: "Cast fossils" },
    { id: 23, name: "Permineralisation fossils" },
    { id: 24, name: "Compaction fossils" },
    { id: 25, name: "Fusain fossils" },
  ];

  const poolOptions1 = [
    "They are a very rare type of plant fossil.",
    "They do not contain any organic matter.",
    "They are found in soft, wet ground.",
    "They can be found far from normal fossil areas.",
    "They are three-dimensional.",
    "They provide information about plant cells.",
  ];

  // Q26-30: Flowchart
  const poolOptions2 = [
    "contamination",
    "vehicle",
    "heat",
    "results",
    "radiation",
    "site",
    "microbes",
    "water",
  ];

  // Helper functions
  const isOptionPlaced = (opt, start, end) => {
    for (let i = start; i <= end; i++) {
      if (answers[String(i)] === opt) return true;
    }
    return false;
  };

  // Drag handlers
  const handleDragStart = (e, opt) => {
    setDraggedOption(opt);
    e.dataTransfer.setData("text/plain", opt);
  };

  const handleDrop = (e, questionId) => {
    e.preventDefault();
    const opt = draggedOption || e.dataTransfer.getData("text/plain");
    if (opt) {
      const prevKey = Object.keys(answers).find((key) => answers[key] === opt);
      if (prevKey) {
        setAnswer(prevKey, "");
      }
      setAnswer(String(questionId), opt);
      setDraggedOption(null);
      setSelectedOption(null);
      if (setCurrentQ) setCurrentQ(questionId);
    }
  };

  const handleDropToPool = (e) => {
    e.preventDefault();
    const opt = draggedOption || e.dataTransfer.getData("text/plain");
    if (opt) {
      const prevKey = Object.keys(answers).find((key) => answers[key] === opt);
      if (prevKey) {
        setAnswer(prevKey, "");
      }
      setDraggedOption(null);
      setSelectedOption(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Click-to-select and place handlers
  const handleOptionClick = (opt) => {
    if (selectedOption === opt) {
      setSelectedOption(null);
    } else {
      setSelectedOption(opt);
    }
  };

  const handleSlotClick = (questionId) => {
    const currentVal = answers[String(questionId)];

    if (selectedOption) {
      const prevKey = Object.keys(answers).find((key) => answers[key] === selectedOption);
      if (prevKey) {
        setAnswer(prevKey, "");
      }
      setAnswer(String(questionId), selectedOption);
      setSelectedOption(null);
    } else if (currentVal) {
      setAnswer(String(questionId), "");
    }

    if (setCurrentQ) setCurrentQ(questionId);
  };

  // Render Slot helper
  const renderSlot = (id, type = "block") => {
    const assignedVal = answers[String(id)];
    const isFocused = currentQ === id;

    const baseClasses = `transition-all flex items-center justify-center cursor-pointer whitespace-nowrap font-sans`;
    let containerClasses = "";
    
    if (type === "block") {
      containerClasses = `flex-1 h-[28px] rounded-[3px] ${baseClasses}`;
    } else if (type === "inline") {
      containerClasses = `inline-flex h-[24px] mx-1 min-w-[70px] px-2 rounded-[3px] align-middle ${baseClasses}`;
    }

    let stateClasses = "";
    if (assignedVal) {
      // Look like the filled option
      stateClasses = "border border-gray-400 bg-white cursor-grab active:cursor-grabbing text-black text-[17px]";
    } else {
      stateClasses = isFocused
        ? "border border-dashed border-[#1a5fb4] text-[#1a5fb4] font-bold text-[17px]"
        : "border border-dashed border-gray-500 text-black font-bold text-[17px]";
    }

    return (
      <div
        ref={(el) => {
          if (el && qRefs) qRefs.current[id] = el;
        }}
        onClick={() => handleSlotClick(id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, id)}
        draggable={!!assignedVal}
        onDragStart={(e) => assignedVal && handleDragStart(e, assignedVal)}
        className={`${containerClasses} ${stateClasses}`}
      >
        {assignedVal || id}
      </div>
    );
  };

  const ThickArrowDown = () => (
    <div className="flex justify-center w-full my-0.5 text-black">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2v12H6l6 8 6-8h-4V2z" />
      </svg>
    </div>
  );

  return (
    <div className="mx-auto w-full px-4 text-[13px] text-black pb-32 font-sans select-none ">
      
      {/* ----------------- Q21-25 ----------------- */}
      <div className="mb-20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-bold text-[17px] mb-1">Questions 21–25</h2>
            <p className="text-[17px]">
              Which feature do the speakers identify for each of the following categories of fossil? Choose the correct answer for each fossil category and move it into the gap.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[13px] text-[#1a5fb4] font-semibold mt-6 cursor-pointer hover:underline">
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex gap-16 items-start mt-6">
          
          {/* Left Column: Fossil Categories */}
          <div className="flex flex-col w-[350px]">
            <div className="font-bold text-[17px] mb-3">Fossil categories</div>
            <div className="flex flex-col gap-[14px]">
              {fossilCategories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2 mb-4 w-full">
                  <span className="text-[17px] whitespace-nowrap">{cat.name}</span>
                  {renderSlot(cat.id, "block")}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Features Pool */}
          <div 
            className="flex flex-col flex-1"
            onDragOver={handleDragOver}
            onDrop={handleDropToPool}
          >
            <div className="font-bold text-[17px] mb-3">Features</div>
            <div className="flex flex-col gap-2 items-start">
              {poolOptions1.map((opt) => {
                const placed = isOptionPlaced(opt, 21, 25);
                const isSelected = selectedOption === opt;

                return (
                  <div
                    key={opt}
                    draggable={!placed}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => !placed && handleOptionClick(opt)}
                    className={`px-2 py-[2px] border text-[17px] rounded-[3px] select-none transition-all w-fit ${
                      placed
                        ? "bg-gray-100 border-gray-200 text-transparent cursor-not-allowed opacity-0"
                        : isSelected
                        ? "bg-[#e3effd] border-[#1a5fb4] cursor-grab"
                        : "bg-white border-gray-400 text-black hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                    }`}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>


      {/* ----------------- Q26-30 ----------------- */}
      <div className="pt-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-bold text-[17px] mb-1">Questions 26–30</h2>
            <p className="text-[17px]">
              Complete the flow-chart. Choose the correct answer and move it into the gap.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[13px] text-[#1a5fb4] font-semibold mt-1 cursor-pointer hover:underline">
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex gap-8 items-start mt-12">
          
          {/* Left Column: Flowchart */}
          <div className="w-[520px]">
            <div className="font-bold text-[20px] mb-2 pl-3">Procedure for detecting life on another planet</div>
            
            <div className="flex flex-col items-center w-[440px]">
              {/* Box 1 */}
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white">
                A spacecraft lands on a planet and sends out a rover.
              </div>
              
              <ThickArrowDown />
              
              {/* Box 2 */}
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center flex-wrap">
                The rover is directed to a {renderSlot(26, "inline")} which has organic material.
              </div>
              
              <ThickArrowDown />
              
              {/* Box 3 */}
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center flex-wrap">
                It collects a sample from below the surface (in order to avoid the effects of {renderSlot(27, "inline")}).
              </div>
              
              <ThickArrowDown />
              
              {/* Box 4 */}
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white">
                The soil and rocks are checked to look for evidence of fossils.
              </div>
              
              <ThickArrowDown />
              
              {/* Box 5 */}
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white">
                The sample is converted to powder.
              </div>
              
              <ThickArrowDown />
              
              {/* Box 6 */}
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center">
                The sample is subjected to {renderSlot(28, "inline")}
              </div>
              
              <ThickArrowDown />
              
              {/* Box 7 */}
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center flex-wrap">
                A mass spectrometer is used to search for potential proof of life, e.g {renderSlot(29, "inline")}
              </div>
              
              <ThickArrowDown />
              
              {/* Box 8 */}
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center flex-wrap">
                The {renderSlot(30, "inline")} are compared with existing data from Earth.
              </div>
            </div>
          </div>

          {/* Right Column: Flowchart Pool Options */}
          <div 
            className="flex flex-col gap-[6px] items-start mt-6"
            onDragOver={handleDragOver}
            onDrop={handleDropToPool}
          >
            {poolOptions2.map((opt) => {
              const placed = isOptionPlaced(opt, 26, 30);
              const isSelected = selectedOption === opt;

              return (
                <div
                  key={opt}
                  draggable={!placed}
                  onDragStart={(e) => handleDragStart(e, opt)}
                  onClick={() => !placed && handleOptionClick(opt)}
                  className={`px-2 py-[1px] border text-[17px] rounded-[3px] select-none transition-all w-fit ${
                    placed
                      ? "bg-gray-100 border-gray-200 text-transparent cursor-not-allowed opacity-0"
                      : isSelected
                      ? "bg-[#e3effd] border-[#1a5fb4] cursor-grab"
                      : "bg-white border-gray-400 text-black hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                  }`}
                >
                  {opt}
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
