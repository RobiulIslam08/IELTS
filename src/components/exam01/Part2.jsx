import { useState } from "react";
import { Keyboard } from "lucide-react";

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  // Drag and Drop State
  const [draggedOption, setDraggedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Q11-15: Matching
  const people = [
    { id: 11, name: "Mary Brown" },
    { id: 12, name: "John Stevens" },
    { id: 13, name: "Alison Jones" },
    { id: 14, name: "Tim Smith" },
    { id: 15, name: "Jenny James" },
  ];

  const poolOptions1 = [
    "Finance",
    "Food",
    "Health",
    "Kids' Counselling",
    "Organisation",
    "Rooms",
    "Sport",
    "Trips",
  ];

  // Q16-20: Map Slots (Coordinates adjusted to match the SVG floorplan precisely)
  const mapSlots = [
    { id: 18, label: "18", top: "5.4%", left: "22.2%", width: "135px", height: "28px" },
    { id: 19, label: "19", top: "10.1%", left: "48.2%", width: "135px", height: "28px" },
    { id: 16, label: "16", top: "35.8%", left: "30.8%", width: "135px", height: "28px" },
    { id: 20, label: "20", top: "48.3%", left: "47.2%", width: "135px", height: "28px" },
    { id: 17, label: "17", top: "48.3%", left: "10.5%", width: "135px", height: "28px" },
  ];

  const poolOptions2 = [
    "Cookery room",
    "Games room",
    "Kitchen",
    "Pottery room",
    "Sports complex",
    "Staff accommodation",
  ];

  // Check if option is placed in Q11-20
  const isOptionPlaced = (opt) => {
    for (let i = 11; i <= 20; i++) {
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
      const prevKey = Object.keys(answers).find(key => answers[key] === opt);
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
      const prevKey = Object.keys(answers).find(key => answers[key] === opt);
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
      const prevKey = Object.keys(answers).find(key => answers[key] === selectedOption);
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

  return (
    <div className="mx-auto w-full  px-4 text-[15px] text-black pb-32 font-sans select-none">
      
      {/* ----------------- Q11-15 ----------------- */}
      <div className="mb-16">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="font-bold text-[16px] mb-1">Questions 11–15</h2>
            <p className="text-[17px] ">Who is responsible for each area? Choose the correct answer for each person and move it into the gap.</p>
          </div>
          <button className="flex items-center gap-1 text-[13px] text-[#1a5fb4] hover:underline font-semibold mt-1">
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>

        {/* Layout Grid */}
        <div className="flex gap-8 items-start">
          
          {/* People list column */}
          <div className="flex flex-col gap-4">
            <div className="font-bold text-[17px] mb-1">People</div>
            {people.map((person) => {
              const assignedVal = answers[String(person.id)];
              const isFocused = currentQ === person.id;

              return (
                <div 
                  key={person.id}
                  className="flex items-center gap-2 h-[32px]"
                >
                  <span className=" text-[17px] text-black">{person.name}</span>
                  
                  {/* Drop Slot */}
                  <div
                    ref={(el) => {
                      if (el && qRefs) qRefs.current[person.id] = el;
                    }}
                    onClick={() => handleSlotClick(person.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, person.id)}
                    draggable={!!assignedVal}
                    onDragStart={(e) => assignedVal && handleDragStart(e, assignedVal)}
                    className={`h-[24px] w-[120px] rounded-md transition-all flex items-center justify-center cursor-pointer text-[17px] whitespace-nowrap ${
                      assignedVal
                        ? "border-2 border-[#1a5fb4] bg-white   px-2 cursor-grab active:cursor-grabbing"
                        : `border border-dashed bg-white ${
                            isFocused 
                              ? "border-2 border-dashed border-[#1a5fb4]" 
                              : "border-gray-500 text-gray-800 font-bold"
                          }`
                    }`}
                  >
                    {assignedVal || person.id}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Options pool column */}
          <div 
            className="flex flex-col gap-3"
            onDragOver={handleDragOver}
            onDrop={handleDropToPool}
          >
            <div className="font-semibold text-[17px] mb-1">Staff Responsibilities</div>
            <div className="flex flex-col gap-2 w-[180px]">
              {poolOptions1.map((opt) => {
                const placed = isOptionPlaced(opt);
                const isSelected = selectedOption === opt;

                return (
                  <div
                    key={opt}
                    draggable={!placed}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => !placed && handleOptionClick(opt)}
                    className={`px-2.5 py-0.2 border border-gray-600 text-[14px] rounded-[4px] select-none transition-all w-fit ${
                      placed
                        ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-0"
                        : isSelected
                        ? "bg-[#e3effd] border  cursor-grab font-semibold"
                        : "bg-white  text-black hover:bg-gray-50 cursor-grab active:cursor-grabbing"
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


      {/* ----------------- Q16-20 ----------------- */}
      <div className=" pt-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-bold text-[16px] mb-1">Questions 16–20</h2>
            <p className="text-[17px] ">Label the map. Choose the correct answer and move it into the gap.</p>
          </div>
          <button className="flex items-center gap-1 text-[13px] text-[#1a5fb4] hover:underline font-semibold mt-1">
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>

        {/* Layout Grid */}
        <div className="flex gap-10 items-start pl-2">
          
          {/* Map Image container without border or background wrapper */}
          <div className="relative w-full max-w-[700px] aspect-[4/3] select-none">
            <img 
              src="/map.svg" 
              alt="Map Layout"
              className="w-full h-full object-contain" 
            />
            
            {/* Absolute Overlay Slots */}
            {mapSlots.map((slot) => {
              const assignedVal = answers[String(slot.id)];
              const isFocused = currentQ === slot.id;

              return (
                <div
                  key={slot.id}
                  ref={(el) => {
                    if (el && qRefs) qRefs.current[slot.id] = el;
                  }}
                  onClick={() => handleSlotClick(slot.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, slot.id)}
                  draggable={!!assignedVal}
                  onDragStart={(e) => assignedVal && handleDragStart(e, assignedVal)}
                  style={{
                    position: "absolute",
                    top: slot.top,
                    left: slot.left,
                    width: slot.width,
                    height: slot.height,
                  }}
                  className={`rounded-md transition-all flex items-center justify-center cursor-pointer text-[13px] text-black shadow-xs whitespace-nowrap ${
                    assignedVal
                      ? "border-2 border-[#1a5fb4] bg-white font-bold px-2 cursor-grab active:cursor-grabbing"
                      : `border border-dashed bg-white/95 ${
                          isFocused 
                            ? "border-2 border-dashed border-[#1a5fb4] text-[#1a5fb4]" 
                            : "border-gray-500 text-gray-800 font-bold"
                        }`
                  }`}
                >
                  {assignedVal || slot.label}
                </div>
              );
            })}
          </div>

          {/* Options pool column */}
          <div 
            className="flex flex-col gap-2 w-[180px] mt-8"
            onDragOver={handleDragOver}
            onDrop={handleDropToPool}
          >
            {poolOptions2.map((opt) => {
              const placed = isOptionPlaced(opt);
              const isSelected = selectedOption === opt;

              return (
                <div
                  key={opt}
                  draggable={!placed}
                  onDragStart={(e) => handleDragStart(e, opt)}
                  onClick={() => !placed && handleOptionClick(opt)}
                  className={`px-2.5 py-1 border text-[13px] rounded-[4px] select-none transition-all w-fit ${
                    placed
                      ? "bg-gray-100 border-gray-100 text-gray-100 cursor-not-allowed opacity-40"
                      : isSelected
                      ? "bg-[#e3effd] border-[#1a5fb4]  cursor-grab font-semibold"
                      : "bg-white border-gray-800 text-black hover:bg-gray-50 cursor-grab active:cursor-grabbing"
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
