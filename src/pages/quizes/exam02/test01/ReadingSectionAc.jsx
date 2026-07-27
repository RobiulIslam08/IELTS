import React from "react";

function ResizableLayout({ sectionTitle, range, leftContent, rightContent }) {
  const [leftWidth, setLeftWidth] = React.useState(50);
  const containerRef = React.useRef(null);
  const isDragging = React.useRef(false);

  const startResize = (e) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const resize = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const currentLeftWidth = e.clientX - containerRef.current.getBoundingClientRect().left;
    const newWidthPercentage = (currentLeftWidth / containerWidth) * 100;

    if (newWidthPercentage > 20 && newWidthPercentage < 80) {
      setLeftWidth(newWidthPercentage);
    }
  };

  const stopResize = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  };

  return (
    <div ref={containerRef} className="w-full h-full flex overflow-hidden relative">
      {/* LEFT PANEL: PASSAGE */}
      <div style={{ width: `${leftWidth}%` }} className="h-full overflow-y-auto p-6 bg-white border-r border-stone-200 select-text">
        <div className="mb-4 block border border-stone-300 bg-stone-100 px-4 py-2.5 rounded shadow-sm">
          <h2 className="text-[16px] font-bold text-stone-900 leading-[1.2] mb-0.5">{sectionTitle}</h2>
          <p className="text-[13px] text-stone-500 m-0">{range}</p>
        </div>
        <div className="prose prose-stone max-w-none text-stone-800 text-[15px] leading-relaxed whitespace-pre-line">
          {leftContent}
        </div>
      </div>

      {/* DRAG HANDLE */}
      <div onMouseDown={startResize} className="w-[10px] h-full bg-stone-100 hover:bg-emerald-500 border-x border-stone-200 cursor-col-resize flex items-center justify-center transition-colors group relative z-10">
        <div className="w-[2px] h-8 bg-stone-400 group-hover:bg-white rounded"></div>
      </div>

      {/* RIGHT PANEL: QUESTIONS */}
      <div style={{ width: `${100 - leftWidth}%` }} className="h-full overflow-y-auto p-6 bg-stone-50 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6 pb-32">
          {rightContent}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PART 1: Questions 1–13 (Reading Passage 1)
   ========================================================================== */
export function SectionOne({ answers, setAnswers, submitted, activeQuestion, setActiveQuestion }) {
  const handleInputChange = (qNum, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
    setActiveQuestion(qNum);
  };

  const tfnQuestions = [
    { num: 1, text: "People had expected Andy Murray to become the world's top tennis player for at least five years before 2016." },
    { num: 2, text: "The change that Andy Murray made to his rackets attracted a lot of attention." },
    { num: 3, text: "Most of the world's top players take a professional racket stringer on tour with them." },
    { num: 4, text: "Mike and Bob Bryan use rackets that are light in comparison to the majority of rackets." },
    { num: 5, text: "Werner Fischer played with a spaghetti-strung racket that he designed himself." },
    { num: 6, text: "The weather can affect how professional players adjust the strings on their rackets." },
    { num: 7, text: "It was believed that the change Pete Sampras made to his rackets contributed to his strong serve." }
  ];

  return (
    <ResizableLayout
      sectionTitle="READING PASSAGE 1"
      range="Questions 1–13"
      leftContent={
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-stone-900 mb-2">How tennis rackets have changed</h1>
            <p>In 2016, the British professional tennis player Andy Murray was ranked as the world's number one. It was an incredible achievement by any standard - made even more remarkable by the fact that he did this during a period considered to be one of the strongest in the sport's history, competing against the likes of Rafael Nadal, Roger Federer and Novak Djokovic, to name just a few. Yet five years previously, he had been regarded as a talented outsider who entered but never won the major tournaments.</p>
            <p>Of the changes that account for this transformation, one was visible and widely publicised: in 2011, Murray invited former number one player Ivan Lendl onto his coaching team - a valuable addition that had a visible impact on the player's playing style. Another change was so subtle as to pass more or less unnoticed. Like many players, Murray has long preferred a racket that consists of two types of string: one for the mains (verticals) and another for the crosses (horizontals). While he continued to use natural string in the crosses, in 2012 he switched to a synthetic string for the mains. A small change, perhaps, but its importance should not be underestimated.</p>
            <p>The modification that Murray made is just one of a number of options available to players looking to tweak their rackets in order to improve their games. 'Touring professionals have their rackets customised to their specific needs,' says Colin Triplow, a UK-based professional racket stringer. 'It's a highly important part of performance maximisation.'</p>
            <p>Consequently, the specific rackets used by the world's elite are not actually readily available to the public; rather, each racket is individually made to suit the player who uses it. Take the US professional tennis players Mike and Bob Bryan, for example: 'We're very particular with our racket specifications,' they say. 'All our rackets are sent from our manufacturer to Tampa, Florida, where our frames go through a thorough customisation process.' They explain how they have adjusted not only racket length, but even experimented with different kinds of paint. The rackets they use now weigh more than the average model and also have a denser string pattern (i.e. more crosses and mains). The primary reason for these modifications is simple: as the line between winning and losing becomes thinner and thinner, even these slight changes become more and more important. As a result, players and their teams are becoming increasingly creative with the modifications to their rackets as they look to maximise their competitive advantage.</p>
            <p>Racket modifications mainly date back to the 1970s, when the amateur German tennis player Werner Fischer started playing with the so-called spaghetti-strung racket. It created a string bed that generated so much topspin that it was quickly banned by the International Tennis Federation. However, within a decade or two, racket modification became a regularity. Today it is, in many ways, an aspect of the game that is equal in significance to nutrition or training.</p>
            <p>Modifications can be divided into two categories: those to the string bed and those to the racket frame. The former is far more common than the latter: the choice of the strings and the tension with which they are installed is something that nearly all professional players experiment with. They will continually change it depending on various factors including the court surface, climatic conditions, and game styles. Some will even change it depending on how they feel at the time.</p>
            <p>At one time, all tennis rackets were strung with natural gut made from the outer layer of sheep or cow intestines. This all changed in the early 1990s with the development of synthetic strings that were cheaper and more durable. They are made from three materials: nylon (relatively durable and affordable), Kevlar (too stiff to be used alone) or co-polyester (polyester combined with additives that enhance its performance). Even so, many professional players continue to use a 'hybrid set-up', where a combination of both synthetic and natural strings are used. Of the synthetics, co-polyester is by far the most widely used. It's a perfect fit for the style of tennis now played, where players tend to battle it out from the back of the court rather than coming to the net. Studies indicate that the average spin from a co-polyester string is 25% greater than that from natural string or other synthetics. In a sense, the development of co-polyester strings has revolutionised the game.</p>
            <p>However, many players go beyond these basic adjustments to the strings and make changes to the racket frame itself. For example, much of the serving power of US professional player Pete Sampras was attributed to the addition of four to five lead weights onto his rackets, and today many professionals have the weight adjusted during the manufacturing process. Other changes to the frame involve the handle. Players have individual preferences for the shape of the handle and some will have the handle of one racket moulded onto the frame of a different racket. Other players make different changes. The professional Portuguese player Gonçalo Oliveira replaced the original grips of his rackets with something thinner because they had previously felt uncomfortable to hold.</p>
            <p>Racket customisation and modification have pushed the standards of the game to greater levels that few could have anticipated in the days of natural strings and heavy, wooden frames, and it's exciting to see what further developments there will be in the future.</p>
          </div>
        </div>
      }
      rightContent={
        <>
          {/* Questions 1-7 Container */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 1–7</h4>
            <p className="m-0 mt-1">Do the following statements agree with the information given in Reading Passage 1?</p>
            <div className="mt-2 space-y-0.5 text-stone-800 font-medium text-[13px]">
              <div><b>TRUE</b> — if the statement agrees with the information</div>
              <div><b>FALSE</b> — if the statement contradicts the information</div>
              <div><b>NOT GIVEN</b> — if there is no information on this</div>
            </div>
          </div>

          <div className="space-y-3">
            {tfnQuestions.map((q) => {
              const isActive = activeQuestion === q.num;
              const curVal = answers[`q${q.num}`] || "";
              return (
                <div 
                  key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)}
                  className={`p-4 rounded-lg bg-white border flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all ${
                    isActive ? "border-emerald-600 shadow-sm ring-1 ring-emerald-600/20" : "border-stone-200"
                  }`}
                >
                  <div className="flex gap-2 text-[14px]">
                    <span className="font-bold text-stone-400 shrink-0">{q.num}</span>
                    <p className="m-0 text-stone-800 font-medium">{q.text}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-md border border-stone-200 shrink-0">
                    {["TRUE", "FALSE", "NOT GIVEN"].map(opt => (
                      <label 
                        key={opt} onClick={e => e.stopPropagation()}
                        className={`px-3 py-1.5 rounded text-[12px] font-bold uppercase cursor-pointer transition-all border text-center ${
                          curVal === opt ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        <input type="radio" name={`q-${q.num}`} checked={curVal === opt} disabled={submitted} onChange={() => handleInputChange(q.num, opt)} className="sr-only"/>
                        {opt === "NOT GIVEN" ? "N/G" : opt}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Questions 8-13 Container */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-8">
            <h4 className="font-bold text-stone-900">Questions 8–13</h4>
            <p className="m-0 mt-1">Complete the notes below. Choose <b>ONE WORD ONLY</b> from the passage for each answer.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-5 text-[14px] leading-loose">
            <h3 className="font-bold text-stone-900 border-b pb-2 mb-3">The tennis racket and how it has changed</h3>
            {[
              { num: 8, pre: "Mike and Bob Bryan made changes to the types of", post: "used on their racket frames." },
              { num: 9, pre: "Players were not allowed to use the spaghetti-strung racket because of the amount of", post: "it created." },
              { num: 10, pre: "Changes to rackets can be regarded as being as important as players' diets or the", post: "they do." },
              { num: 11, pre: "All rackets used to have natural strings made from the", post: "of animals." },
              { num: 12, pre: "Pete Sampras had metal", post: "put into the frames of his rackets." },
              { num: 13, pre: "Gonçalo Oliveira changed the", post: "on his racket handles." }
            ].map((q) => (
              <div key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)} className={`p-2 rounded ${activeQuestion === q.num ? "bg-emerald-50/50" : ""}`}>
                <span className="font-bold text-stone-400 mr-2">{q.num}</span>
                {q.pre}
                <input 
                  type="text" disabled={submitted} value={answers[`q${q.num}`] || ""} onFocus={() => setActiveQuestion(q.num)}
                  onChange={(e) => handleInputChange(q.num, e.target.value)}
                  className="mx-2 px-2 py-0.5 w-[160px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none transition-all text-center font-semibold text-stone-900"
                />
                {q.post}
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}

/* ==========================================================================
   PART 2: Questions 14–26 (Reading Passage 2)
   ========================================================================== */
export function SectionTwo({ answers, setAnswers, submitted, activeQuestion, setActiveQuestion }) {
  const handleInputChange = (qNum, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
    setActiveQuestion(qNum);
  };

  return (
    <ResizableLayout
      sectionTitle="READING PASSAGE 2"
      range="Questions 14–26"
      leftContent={
        <div>
          <h1 className="text-xl font-bold text-stone-900 mb-2">The pirates of the ancient Mediterranean</h1>
          <p className="italic text-stone-600 mb-4">In the first and second millennia BCE, pirates sailed around the Mediterranean, attacking ships and avoiding pursuers</p>
          <p> <b>A</b> When one mentions pirates, an image springs to most people’s minds of a crew of misfits, daredevils and adventurers in command of a tall sailing ship in the Caribbean Sea. Yet from the first to the third millennium BCE, thousands of years before these swashbucklers began spreading fear across the Caribbean, pirates prowled the Mediterranean, raiding merchant ships and threatening vital trade routes. However, despite all efforts and the might of various ancient states, piracy could not be stopped. The situation remained unchanged for thousands of years. Only when the pirates directly threatened the interests of ancient Rome did the Roman Republic organise a massive fleet to eliminate piracy. Under the command of the Roman general Pompey, Rome eradicated piracy, transforming the Mediterranean into ‘Mare Nostrum’ (Our Sea).</p>
          <br />
          <p>
            <b>B</b> Although piracy in the Mediterranean is first recorded in ancient Egypt during the reign of Pharaoh Amenhotep III
            (c 1390–1353 BCE), it is reasonable to assume it predated this powerful civilisation. This is partly due to the great importance the Mediterranean held at this time, and partly due to its geography. While the Mediterranean region is predominantly fertile, some parts are rugged and hilly, even mountainous. In the ancient times, the inhabitants of these areas relied heavily on marine resources, including fish and salt. Most had their own boats, possessed good seafaring skills, and unsurpassed knowledge of the local coastline and sailing routes. Thus, it is not surprising that during hardships, these men turned to piracy. Geography itself further benefited the pirates, with the numerous coves along the coast providing places for them to hide their boats and strike undetected. Before the invention of ocean-going caravels* in the 15th century, ships could not easily cross long distances over open water. Thus, in the ancient world most were restricted to a few well-known navigable routes that followed the coastline. Caught in a trap, a slow merchant ship laden with goods had no other option but to surrender. In addition, knowledge of the local area helped the pirates to avoid retaliation once a state fleet arrived.
          </p>

          <br />
          <p>
            <b>C </b> 
            One should also add that it was not unknown in the first and second millennia BCE for governments to resort to pirates’ services, especially during wartime, employing their skills and numbers against their opponents. A pirate fleet would serve in the first wave of attack, preparing the way for the navy. Some of the regions were known for providing safe harbours to pirates, who, in return, boosted the local economy.
            
                     </p>

          <br />
          <p>
            <b>D </b> 
            The first known record of a named group of Mediterranean pirates, made during the rule of ancient Egyptian Pharaoh Akhenaten (c 1353–1336 BCE), was in the Amarna Letters. These were extracts of diplomatic correspondence between the pharaoh and his allies, and covered many pressing issues, including piracy. It seems the pharaoh was troubled by two distinct pirate groups, the Lukka and the Sherden. Despite the Egyptian fleet’s best efforts, the pirates continued to cause substantial disruption to regional commerce. In the letters, the king of Alashiya (modern Cyprus) rejected Akhenaten’s claims of a connection with the Lukka (based in modern-day Turkey). The king assured Akhenaten he was prepared to punish any of his subjects involved in piracy.
  
                     </p>
          <br />
          <p>
            <b>E </b> 
            The ancient Greek world’s experience of piracy was different from that of Egyptian rulers. While Egypt’s power was land-based, the ancient Greeks relied on the Mediterranean in almost all aspects of life, from trade to warfare. Interestingly, in his works the Iliad and the Odyssey, the ancient Greek writer Homer not only condones, but praises the lifestyle and actions of pirates. The opinion remained unchanged in the following centuries. The ancient Greek historian Thucydides, for instance, glorified pirates’ daring attacks on ships or even cities. For Greeks, piracy was a part of everyday life. Even high-ranking members of the state were not beyond engaging in such activities. According to the Greek orator Demosthenes, in 355 BCE, Athenian ambassadors made a detour from their official travel to capture a ship sailing from Egypt, taking the wealth found onboard for themselves! The Greeks’ liberal approach towards piracy does not mean they always tolerated it, but attempts to curtail piracy were hampered by the large number of pirates operating in the Mediterranean.

                     </p>
          <br />
          <p>
            <b>F</b> The rising power of ancient Rome required the Roman Republic to deal with piracy in the Mediterranean. While piracy was a serious issue for the Republic, Rome profited greatly from its existence. Pirate raids provided a steady source of slaves, essential for Rome’s agriculture and mining industries. But this arrangement could work only while the pirates left Roman interests alone. Pirate attacks on grain ships, which were essential to Roman citizens, led to angry voices in the Senate, demanding punishment of the culprits. Rome, however, did nothing, further encouraging piracy. By the 1st century BCE, emboldened pirates kidnapped prominent Roman dignitaries, asking for a large ransom to be paid.
            Their most famous hostage was none other than Julius Caesar, captured in 75 BCE.
                     </p>
          <br />
          <p>
            <b>G </b>
            By now, Rome was well aware that pirates had outlived their usefulness. The time had come for concerted action. In 67 BCE, a new law granted Pompey vast funds to combat the Mediterranean menace. Taking personal command, Pompey divided the entire Mediterranean into 13 districts, assigning a fleet and commander to each. After cleansing one district of pirates, the fleet would join another in the next district. The process continued until the entire Mediterranean was free of pirates. Although thousands of pirates died at the hands of Pompey’s troops, as a long-term solution to the problem, many more were offered land in fertile areas located far from the sea.
            Instead of a maritime menace, Rome got productive farmers that further boosted its economy
                     </p>
        </div>
      }
      rightContent={
       <>



{/* ==========================================
    QUESTIONS 14–19: Matching Headings (Text Input System)
    ========================================== */}
<div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
  <h4 className="font-bold text-stone-900">Questions 14–19</h4>
  <p className="m-0 mt-1">
    Reading Passage 2 has seven paragraphs, <b>A–G</b>. Choose the correct heading for paragraphs B–G from the list below.
  </p>
  <p className="m-0 mt-1 text-stone-600 italic">
    Write the correct letter, <b>A–G</b>, in boxes 14–19.
  </p>
</div>

<div className="space-y-6 bg-white border border-stone-200 rounded-lg p-6 text-[14px]">
  
 

  <hr className="my-4 border-stone-200" />

  {/* Active Input Layout: Heading Text -> Input Box (A-G) */}
  <div className="space-y-3 max-w-3xl">
    {[
      { qNum: 14, label: "i", text: "a reference to a denial of involvement in piracy" },
      { qNum: 15, label: "ii", text: "details of how a campaign to eradicate piracy was carried out" },
      { qNum: 16, label: "iii", text: "a mention of the circumstances in which states in the ancient world would make use of pirates" },
      { qNum: 17, label: "iv", text: "a reference to how people today commonly view pirates" },
      { qNum: 18, label: "v", text: "an explanation of how some people were encouraged not to return to piracy" },
      { qNum: 19, label: "vi", text: "a mention of the need for many sailing vessels to stay relatively close to land" }
    ].map((q) => {
      const isActive = activeQuestion === q.qNum;
      return (
        <div 
          key={q.qNum} 
          id={`question-wrapper-${q.qNum}`} 
          onClick={() => setActiveQuestion(q.qNum)} 
          className={`flex items-center justify-between gap-4 p-3.5 border rounded-lg transition-all ${
            isActive ? "border-emerald-600 bg-emerald-50/10 shadow-sm" : "border-stone-200 bg-white"
          }`}
        >
          {/* Left Side: Question number and Heading Text description */}
          <div className="flex items-start gap-3 flex-1 text-stone-800">
            <span className="font-bold text-stone-400 w-6 shrink-0 mt-0.5 text-center">{q.qNum}</span>
            <span className="font-medium">{q.text}</span>
          </div>

          {/* Right Side: Simple A-G Text Box */}
          <div className="flex items-center gap-2 shrink-0">
            <input
              type="text"
              disabled={submitted}
              maxLength={1}
              value={answers[`q${q.qNum}`] || ""}
              onFocus={() => setActiveQuestion(q.qNum)}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                // Validates single character entries strictly between A and G
                if (/^[A-G]?$/.test(val)) {
                  handleInputChange(q.qNum, val);
                }
              }}
              placeholder=" "
              className="w-14 h-10 text-center border-2 border-stone-300 focus:border-emerald-600 rounded bg-stone-50 font-bold text-stone-900 text-[16px] outline-none transition-all uppercase"
            />
          </div>
        </div>
      );
    })}
  </div>
</div>


  {/* ==========================================
      QUESTIONS 18–23: Multi-Select Box Arrays with FIFO Auto-Cycling
      ========================================== */}
  <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-8">
    
    <p>Questions 20 and 21</p>
    <p className="m-0 mt-1">Choose <b>TWO</b> letters, A–E.</p>
  </div>

  <div className="space-y-6 bg-white border border-stone-200 rounded-lg p-6 text-[14px]">
    
    
    {/* 20-21 Group Box Logic Panel */}
    <div id="question-wrapper-20" onClick={() => setActiveQuestion(20)} className={`p-4 rounded-lg border ${activeQuestion === 20 || activeQuestion === 21 ? "border-emerald-600 bg-emerald-50/10" : "border-stone-200"}`}>
      <p className="font-bold text-stone-900 mb-3">Write the correct letters in boxes 20 and 21 on your answer sheet.</p>
      <h2>Which TWO of the following statements does the writer make about inhabitants of the Mediterranean region in the ancient world?</h2>
      <div className="space-y-2">
        {[
          { key: "A", text: "They often used stolen vessels to carry out pirate attacks" },
          { key: "B", text: "They managed to escape capture by the authorities because they knew the area so well." },
          { key: "C", text: "They paid for information about the routes merchant ships would take" },
          { key: "D", text: "They depended more on the sea for their livelihood than on farming." },
          { key: "E", text: "They stored many of the goods taken in pirate attacks in coves along the coastline." }
        ].map((opt) => {
          const isSelectedQ20 = answers.q20 === opt.key;
          const isSelectedQ21 = answers.q21 === opt.key;
          const isChecked = isSelectedQ20 || isSelectedQ21;

          return (
            <label key={opt.key} className="flex items-start gap-3 cursor-pointer py-1 text-stone-800 font-medium">
              <input
                type="checkbox"
                disabled={submitted}
                checked={isChecked}
                onChange={() => {
                  if (submitted) return;
                  if (isChecked) {
                    // Remove key if already matched
                    if (isSelectedQ20) handleInputChange(20, "");
                    if (isSelectedQ21) handleInputChange(21, "");
                  } else {
                    // Managed Cap Selection: Set to slot 1, slot 2, or cycle out oldest
                    if (!answers.q20) {
                      handleInputChange(20, opt.key);
                    } else if (!answers.q21) {
                      handleInputChange(21, opt.key);
                    } else {
                      // FIFO: push out old value from q20, move q21 over to q20, assign new key to q21
                      if (setAnswers) {
                        setAnswers(prev => ({ ...prev, q20: prev.q21, q21: opt.key }));
                      }
                    }
                  }
                }}
                className="mt-1 accent-emerald-600 rounded w-4 h-4"
              />
              <span><b className="mr-1">{opt.key}</b> {opt.text}</span>
            </label>
          );
        })}
      </div>
    </div>

    {/* 22-23 Group Box Logic Panel */}
    <div id="question-wrapper-22" onClick={() => setActiveQuestion(22)} className={`p-4 rounded-lg border ${activeQuestion === 22 || activeQuestion === 23 ? "border-emerald-600 bg-emerald-50/10" : "border-stone-200"}`}>
      <p className="font-bold text-stone-900 mb-3"><span className="text-stone-400 mr-1">22–23</span>Choose TWO letters, A–E.</p>
      <p className="font-bold text-stone-900 mb-3">Write the correct letters in boxes 22 and 23 on your answer sheet.</p>
      <p className="font-bold text-stone-900 mb-3">Which TWO of the following statements does the writer make about piracy and ancient Greece?</p>
      <div className="space-y-2">
        {[
          { key: "A", text: "The state estimated that very few people were involved in piracy." },
          { key: "B", text: "Attitudes towards piracy changed shortly after the Iliad and the Odyssey were written." },
          { key: "C", text: "Important officials were known to occasionally take part in piracy." },
          { key: "D", text: "Every citizen regarded pirate attacks on cities as unacceptable." },
          { key: "E", text: "A favourable view of piracy is evident in certain ancient Greek texts." }
        ].map((opt) => {
          const isSelectedQ22 = answers.q22 === opt.key;
          const isSelectedQ23 = answers.q23 === opt.key;
          const isChecked = isSelectedQ22 || isSelectedQ23;

          return (
            <label key={opt.key} className="flex items-start gap-3 cursor-pointer py-1 text-stone-800 font-medium">
              <input
                type="checkbox"
                disabled={submitted}
                checked={isChecked}
                onChange={() => {
                  if (submitted) return;
                  if (isChecked) {
                    if (isSelectedQ22) handleInputChange(22, "");
                    if (isSelectedQ23) handleInputChange(23, "");
                  } else {
                    if (!answers.q22) {
                      handleInputChange(22, opt.key);
                    } else if (!answers.q23) {
                      handleInputChange(23, opt.key);
                    } else {
                      if (setAnswers) {
                        setAnswers(prev => ({ ...prev, q22: prev.q23, q23: opt.key }));
                      }
                    }
                  }
                }}
                className="mt-1 accent-emerald-600 rounded w-4 h-4"
              />
              <span><b className="mr-1">{opt.key}</b> {opt.text}</span>
            </label>
          );
        })}
      </div>
    </div>
  </div>


  {/* ==========================================
      QUESTIONS 24–26: Summary Completion
      ========================================== */}
  <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-8">
    <h4 className="font-bold text-stone-900">Questions 24–26</h4>
    <p className="m-0 mt-1">Complete the summary below. Choose <b>ONE WORD ONLY</b> from the text for each answer.</p>
  </div>

  <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-6 text-[14px] leading-loose">
    <h3 className="font-bold text-stone-900 border-b pb-2 mb-3">Write your answers in boxes 24–26 on your answer sheet.</h3>
    <p className="text-stone-800 font-medium">
    <b className="text-center">Ancient Rome and piracy</b>  <br />
      <span className="inline-block mx-1" id="question-wrapper-24" onClick={() => setActiveQuestion(24)}>
        Piracy was an issue ancient Rome had to deal with, but it also brought some benefits for Rome. For example, pirates supplied slaves that were important for Rome’s industries. However, attacks on vessels transporting <span className="text-stone-400 font-bold mr-1">24</span>
        <input 
          type="text" 
          disabled={submitted} 
          value={answers.q24 || ""} 
          onFocus={() => setActiveQuestion(24)} 
          onChange={(e) => handleInputChange(24, e.target.value)} 
          className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900 transition-all" 
        />
      </span> 
       to Rome resulted in calls for 
      <span className="inline-block mx-1" id="question-wrapper-25" onClick={() => setActiveQuestion(25)}>
        <span className="text-stone-400 font-bold mr-1">25</span>
        <input 
          type="text" 
          disabled={submitted} 
          value={answers.q25 || ""} 
          onFocus={() => setActiveQuestion(25)} 
          onChange={(e) => handleInputChange(25, e.target.value)} 
          className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900 transition-all" 
        />
      </span> 
       for the pirates responsible. Nevertheless, piracy continued, with some pirates demanding a
      <span className="inline-block mx-1" id="question-wrapper-26" onClick={() => setActiveQuestion(26)}>
        <span className="text-stone-400 font-bold mr-1">26</span>
        <input 
          type="text" 
          disabled={submitted} 
          value={answers.q26 || ""} 
          onFocus={() => setActiveQuestion(26)} 
          onChange={(e) => handleInputChange(26, e.target.value)} 
          className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900 transition-all" 
        />
      </span> 
     for the return of the Roman officials they captured.
    </p>
  </div>
</>
      }
    />
  );
}

/* ==========================================================================
   PART 3: Questions 27–40 (Reading Passage 3) -> এরর ফিক্স করার জন্য যোগ করা হলো
   ========================================================================== */
export function SectionThree({ answers, setAnswers, submitted, activeQuestion, setActiveQuestion }) {
  const handleInputChange = (qNum, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
    setActiveQuestion(qNum);
  };

  return (
    <ResizableLayout
      sectionTitle="READING PASSAGE 3"
      range="Questions 27–40"
      leftContent={
        <div>
          <h1 className="text-xl font-bold text-stone-900 mb-2">Reading Passage 3 Title</h1>
          <b>The persistence and peril of misinformation</b>
          <p className="text-center">Brian Southwell looks at how human brains verify information and discusses some of the challenges of battling widespread falsehoods</p>
          <p>Misinformation – both deliberately promoted and accidentally shared – is perhaps an inevitable part of the world in which we live, but it is not a new problem. People likely have lied to one another for roughly as long as verbal communication has existed. Deceiving others can offer an apparent opportunity to gain strategic advantage, to motivate others to action, or even to protect interpersonal bonds. Moreover,
            people inadvertently have been sharing inaccurate information with one another for thousands of years.</p>
            <br />
            <p>
              However, we currently live in an era in which technology enables information to reach large audiences distributed across the globe, and thus the potential for immediate and widespread effects from misinformation now looms larger than in the past. Yet the means to correct misinformation might, over time, be found in those same patterns of mass communication and of the facilitated spread of information.

            </p>
            <br />
            <p>
              The main worry regarding misinformation is its potential to unduly influence attitudes and behavior, leading people to think and act differently than they would if they were correctly informed, as suggested by the research teams of Stephan Lewandowsky of the University of Bristol and Elizabeth Marsh of Duke University, among others. In other words, we worry that misinformation might lead people to hold misperceptions, or false beliefs, and that these misperceptions, especially when they occur among large groups of people,
              may have detrimental, downstream consequences for health, social harmony, and the political climate.
            </p>
            <br />
            <p>
              At least three observations related to misinformation in the contemporary mass-media environment warrant the attention of researchers, policy makers, and really everyone who watches television, listens to the radio, or reads information online. First of all, people who encounter misinformation tend to believe it, at least initially. Secondly, electronic and print media often do not block many types of misinformation before it appears in content available to large audiences.
              Thirdly, countering misinformation once it has enjoyed wide exposure can be a resource-intensive effort.
            </p>
            <br />
            <p>
              Knowing what happens when people initially encounter misinformation holds tremendous importance for estimating the potential for subsequent problems. Although it is fairly routine for individuals to come across information that is false, the question of exactly how – and when – we mentally label information as true or false has garnered philosophical debate. The dilemma is neatly summarized by a contrast between how the 17th-century philosophers René Descartes and Baruch Spinoza described human information engagement,
              with conflicting predictions that only
            </p>
            <br />
            <p>
              recently have been empirically tested in robust ways.
              Descartes argued that a person only accepts or rejects information after considering its truth or falsehood; Spinoza argued that people accept all encountered information (or misinformation) by default and then subsequently verify or reject it through a separate cognitive process. In recent decades, empirical evidence from the research teams of Erik Asp of the University of Chicago and Daniel Gilbert at Harvard University, among others, has supported Spinoza’s account: people appear to encode all new information as if it were true, even if only momentarily, and later tag the information as being either true or false, a pattern that seems consistent with the observation that mental resources for skepticism physically reside in a different part of the brain than the resources used in perceiving and encoding.

            </p>
            <br />
            <p>
              What about our second observation that misinformation often can appear in electronic or print media without being preemptively blocked? In support of this, one might consider the nature of regulatory structures in the United States: regulatory agencies here tend to focus on post hoc detection of broadcast information. Organizations such as the Food and Drug Administration (FDA) offer considerable monitoring and notification functions, but these roles typically do not involve preemptive censoring. The FDA oversees direct-to-consumer prescription drug advertising, for example, and has developed mechanisms such as the ‘Bad Ad’ program, through which people can report advertising in apparent violation of FDA guidelines on drug risks. Such programs, although laudable and useful, do not keep false advertising off the airwaves.
              In addition, even misinformation that is successfully corrected can continue to affect attitudes.
            </p>
            <br />
            <p>
              This leads us to our third observation: a campaign to correct misinformation, even if rhetorically compelling, requires resources and planning to accomplish necessary reach and frequency. For corrective campaigns to be persuasive, audiences need to be able to comprehend them, which requires either effort to frame messages in ways that are accessible or effort to educate and sensitize audiences to the possibility of misinformation. That some audiences might be unaware of the potential for misinformation also suggests the utility of media literacy efforts as early as elementary school. Even with journalists and scholars pointing to the phenomenon of ‘fake news’,
              people do not distinguish between demonstrably false stories and those based in fact when scanning and processing written information.
            </p>
            <br />
            <p>
              We live at a time when widespread misinformation is common. Yet at this time many people also are passionately developing potential solutions and remedies. The journey forward undoubtedly will be a long and arduous one. Future remedies will require not only continued theoretical consideration but also the development and maintenance of consistent monitoring tools – and a recognition among fellow members of society that claims which find prominence in the media that are insufficiently based in scientific consensus and social reality should be countered. Misinformation arises as a result of human fallibility and human information needs. To overcome the worst effects of the phenomenon,
              we will need coordinated efforts over time, rather than any singular one-time panacea we could hope to offer.
            </p>
        </div>
      }
      rightContent={
        <>
  {/* ==========================================
      QUESTIONS 27–30: Matching Options (A–J)
      ========================================== */}
  {/* ==========================================
    QUESTIONS 27–30: Multiple Choice (A, B, C, D)
    ========================================== */}
<div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
  <h4 className="font-bold text-stone-900">Questions 27–30</h4>
  <p className="m-0 mt-1">Choose the correct letter, <b>A</b>, <b>B</b>, <b>C</b> or <b>D</b>.</p>
  <p className="m-0 mt-1 text-stone-600 italic">Click on the option to select your answer.</p>
</div>

<div className="space-y-6">
  {[
    {
      num: 27,
      question: "What point does the writer make about misinformation in the first paragraph?",
      options: [
        { key: "A", text: "Misinformation is a relatively recent phenomenon." },
        { key: "B", text: "Some people find it easy to identify misinformation." },
        { key: "C", text: "Misinformation changes as it is passed from one person to another." },
        { key: "D", text: "There may be a number of reasons for the spread of misinformation." }
      ]
    },
    {
      num: 28,
      question: "What does the writer say about the role of technology?",
      options: [
        { key: "A", text: "It may at some point provide us with a solution to misinformation." },
        { key: "B", text: "It could fundamentally alter the way in which people regard information." },
        { key: "C", text: "It has changed the way in which organisations use misinformation." },
        { key: "D", text: "It has made it easier for people to check whether information is accurate." }
      ]
    },
    {
      num: 29,
      question: "What is the writer doing in the fourth paragraph?",
      options: [
        { key: "A", text: "comparing the different opinions people have of misinformation" },
        { key: "B", text: "explaining how the effects of misinformation have changed over time" },
        { key: "C", text: "outlining which issues connected with misinformation are significant today" },
        { key: "D", text: "describing the attitude of policy makers towards misinformation in the media" }
      ]
    },
    {
      num: 30,
      question: "What point does the writer make about regulation in the USA?",
      options: [
        { key: "A", text: "The guidelines issued by the FDA need to be simplified." },
        { key: "B", text: "Regulation does not affect people’s opinions of new prescription drugs." },
        { key: "C", text: "The USA has more regulatory bodies than most other countries." },
        { key: "D", text: "Regulation fails to prevent misinformation from appearing in the media." }
      ]
    }
  ].map((q) => {
    const isActive = activeQuestion === q.num;
    const curVal = answers[`q${q.num}`] || "";

    return (
      <div
        key={q.num}
        id={`question-wrapper-${q.num}`}
        onClick={() => setActiveQuestion(q.num)}
        className={`p-5 rounded-lg bg-white border transition-all ${
          isActive 
            ? "border-emerald-600 shadow-sm ring-1 ring-emerald-600/20" 
            : "border-stone-200"
        }`}
      >
        {/* Question Title Line */}
        <div className="flex gap-2 text-[14px] mb-4">
          <span className="font-bold text-stone-400 shrink-0">{q.num}</span>
          <p className="m-0 text-stone-900 font-bold leading-relaxed">{q.question}</p>
        </div>

        {/* Options List */}
        <div className="space-y-2 pl-6">
          {q.options.map((opt) => {
            const isSelected = curVal === opt.key;
            return (
              <label
                key={opt.key}
                onClick={(e) => e.stopPropagation()}
                className={`flex items-start gap-3 p-3 rounded border text-[14px] font-medium cursor-pointer transition-all ${
                  isSelected
                    ? "bg-emerald-50/60 border-emerald-500 text-stone-900"
                    : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100/70 hover:border-stone-300"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <input
                    type="radio"
                    name={`q-${q.num}`}
                    disabled={submitted}
                    checked={isSelected}
                    onChange={() => handleInputChange(q.num, opt.key)}
                    className="w-4 h-4 accent-emerald-600 cursor-pointer"
                  />
                </div>
                <div className="leading-tight">
                  <b className="mr-1 text-stone-900">{opt.key}</b> {opt.text}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  })}
</div>

{/* ==========================================
    QUESTIONS 31–36: Summary Completion (List of Phrases)
    ========================================== */}
<div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-8">
  <h4 className="font-bold text-stone-900">Questions 31–36</h4>
  <p className="m-0 mt-1">
    Complete the summary using the list of phrases, <b>A–J</b>, below.
  </p>
  <p className="m-0 mt-1 text-stone-600 italic">
    Write the correct letter, <b>A–J</b>, in boxes 31–36 on your answer sheet.
  </p>
</div>

<div className="space-y-6 bg-white border border-stone-200 rounded-lg p-6 text-[14px]">
  
  {/* Summary Box Container */}
  <div className="border border-stone-300 rounded-lg p-5 bg-stone-50/40 leading-relaxed shadow-sm">
    <h5 className="font-bold text-stone-900 text-[15px] border-b pb-2 mb-4 text-center">
      What happens when people encounter misinformation?
    </h5>
    
    <p className="text-stone-800 font-medium m-0">
      Although people have{" "}
      <span 
        id="question-wrapper-31" 
        onClick={() => setActiveQuestion(31)}
        className={`inline-flex items-center gap-1 px-1 rounded transition-all cursor-pointer ${
          activeQuestion === 31 ? "bg-emerald-100/70 ring-1 ring-emerald-500" : ""
        }`}
      >
        <b className="text-stone-400 mr-1">31</b>
        <input 
          type="text" 
          disabled={submitted} 
          maxLength={1}
          value={answers.q31 || ""} 
          onFocus={() => setActiveQuestion(31)} 
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            if (/^[A-J]?$/.test(val)) handleInputChange(31, val);
          }}
          className="w-11 h-7 text-center border-b-2 border-stone-400 focus:border-emerald-600 bg-stone-100 outline-none font-bold text-stone-950 transition-all uppercase rounded-t" 
        />
      </span>{" "}
      to misinformation, there is debate about precisely how and when we label something as true or untrue. 
      The philosophers Descartes and Spinoza had{" "}
      <span 
        id="question-wrapper-32" 
        onClick={() => setActiveQuestion(32)}
        className={`inline-flex items-center gap-1 px-1 rounded transition-all cursor-pointer ${
          activeQuestion === 32 ? "bg-emerald-100/70 ring-1 ring-emerald-500" : ""
        }`}
      >
        <b className="text-stone-400 mr-1">32</b>
        <input 
          type="text" 
          disabled={submitted} 
          maxLength={1}
          value={answers.q32 || ""} 
          onFocus={() => setActiveQuestion(32)} 
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            if (/^[A-J]?$/.test(val)) handleInputChange(32, val);
          }}
          className="w-11 h-7 text-center border-b-2 border-stone-400 focus:border-emerald-600 bg-stone-100 outline-none font-bold text-stone-950 transition-all uppercase rounded-t" 
        />
      </span>{" "}
      about how people engage with information. While Descartes believed that people accept or reject information 
      after considering whether it is true or not, Spinoza argued that people accepted <i>all</i> information they 
      encountered – and by default misinformation – and did not verify or reject it until afterwards. Moreover, 
      Spinoza believed that a distinct{" "}
      <span 
        id="question-wrapper-33" 
        onClick={() => setActiveQuestion(33)}
        className={`inline-flex items-center gap-1 px-1 rounded transition-all cursor-pointer ${
          activeQuestion === 33 ? "bg-emerald-100/70 ring-1 ring-emerald-500" : ""
        }`}
      >
        <b className="text-stone-400 mr-1">33</b>
        <input 
          type="text" 
          disabled={submitted} 
          maxLength={1}
          value={answers.q33 || ""} 
          onFocus={() => setActiveQuestion(33)} 
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            if (/^[A-J]?$/.test(val)) handleInputChange(33, val);
          }}
          className="w-11 h-7 text-center border-b-2 border-stone-400 focus:border-emerald-600 bg-stone-100 outline-none font-bold text-stone-950 transition-all uppercase rounded-t" 
        />
      </span>{" "}
      is involved in these stages. Recent research has provided{" "}
      <span 
        id="question-wrapper-34" 
        onClick={() => setActiveQuestion(34)}
        className={`inline-flex items-center gap-1 px-1 rounded transition-all cursor-pointer ${
          activeQuestion === 34 ? "bg-emerald-100/70 ring-1 ring-emerald-500" : ""
        }`}
      >
        <b className="text-stone-400 mr-1">34</b>
        <input 
          type="text" 
          disabled={submitted} 
          maxLength={1}
          value={answers.q34 || ""} 
          onFocus={() => setActiveQuestion(34)} 
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            if (/^[A-J]?$/.test(val)) handleInputChange(34, val);
          }}
          className="w-11 h-7 text-center border-b-2 border-stone-400 focus:border-emerald-600 bg-stone-100 outline-none font-bold text-stone-950 transition-all uppercase rounded-t" 
        />
      </span>{" "}
      for Spinoza's theory and it would appear that people accept all encountered information as if it were true, 
      even if this is for an extremely{" "}
      <span 
        id="question-wrapper-35" 
        onClick={() => setActiveQuestion(35)}
        className={`inline-flex items-center gap-1 px-1 rounded transition-all cursor-pointer ${
          activeQuestion === 35 ? "bg-emerald-100/70 ring-1 ring-emerald-500" : ""
        }`}
      >
        <b className="text-stone-400 mr-1">35</b>
        <input 
          type="text" 
          disabled={submitted} 
          maxLength={1}
          value={answers.q35 || ""} 
          onFocus={() => setActiveQuestion(35)} 
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            if (/^[A-J]?$/.test(val)) handleInputChange(35, val);
          }}
          className="w-11 h-7 text-center border-b-2 border-stone-400 focus:border-emerald-600 bg-stone-100 outline-none font-bold text-stone-950 transition-all uppercase rounded-t" 
        />
      </span>
      , and do not label the information as true or false until later. This is consistent with the fact that 
      the resources for scepticism and the resources for perceiving and encoding are in{" "}
      <span 
        id="question-wrapper-36" 
        onClick={() => setActiveQuestion(36)}
        className={`inline-flex items-center gap-1 px-1 rounded transition-all cursor-pointer ${
          activeQuestion === 36 ? "bg-emerald-100/70 ring-1 ring-emerald-500" : ""
        }`}
      >
        <b className="text-stone-400 mr-1">36</b>
        <input 
          type="text" 
          disabled={submitted} 
          maxLength={1}
          value={answers.q36 || ""} 
          onFocus={() => setActiveQuestion(36)} 
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            if (/^[A-J]?$/.test(val)) handleInputChange(36, val);
          }}
          className="w-11 h-7 text-center border-b-2 border-stone-400 focus:border-emerald-600 bg-stone-100 outline-none font-bold text-stone-950 transition-all uppercase rounded-t" 
        />
      </span>{" "}
      in the brain.
    </p>
  </div>

  {/* Reference Matrix A-J Block */}
  <div className="border border-stone-200 rounded-lg p-4 bg-stone-50 select-none">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-[14px]">
      {[
        { key: "A", text: "constant conflict" },
        { key: "B", text: "additional evidence" },
        { key: "C", text: "different locations" },
        { key: "D", text: "experimental subjects" },
        { key: "E", text: "short period" },
        { key: "F", text: "extreme distrust" },
        { key: "G", text: "frequent exposure" },
        { key: "H", text: "mental operation" },
        { key: "I", text: "dubious reason" },
        { key: "J", text: "different ideas" }
      ].map((item) => (
        <div key={item.key} className="flex gap-2 items-center py-1 font-medium text-stone-700">
          <span className="flex items-center justify-center w-6 h-6 rounded bg-stone-200 text-stone-900 font-bold text-[13px] shrink-0 shadow-sm border border-stone-300">
            {item.key}
          </span>
          <span className="truncate">{item.text}</span>
        </div>
      ))}
    </div>
  </div>
</div>


<div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-8">
  <h4 className="font-bold text-stone-900">Questions 37–40</h4>
  <p className="m-0 mt-1">
   Do the following statements agree with the claims of the writer in Reading Passage 3?
<br />
   In boxes 37–40 on your answer sheet, write
  </p>
  <p>
   <b>YES</b>  if the statement agrees with the claims of the writer
  </p>

  <p>
   <b>NO</b>  if the statement contradicts the claims of the writer
  </p>

  <p>
   <b>NOT GIVEN </b> if it is impossible to say what the writer thinks about this
  </p>
  <div className="mt-2 space-y-0.5 text-stone-800 font-medium text-[13px]">
    
    <div className="space-y-3 mt-4">
  {[
    { qNum: 37, text: "Campaigns designed to correct misinformation will fail to achieve their purpose if people are unable to understand them." },
    { qNum: 38, text: "Attempts to teach elementary school students about misinformation have been opposed." },
    { qNum: 39, text: "It may be possible to overcome the problem of misinformation in a relatively short period." },
    { qNum: 40, text: "The need to keep up with new information is hugely exaggerated in today’s world." }
  ].map((q) => {
    const isActive = activeQuestion === q.qNum;
    const curVal = answers[`q${q.qNum}`] || "";
    
    return (
      <div 
        key={q.qNum} 
        id={`question-wrapper-${q.qNum}`} 
        onClick={() => setActiveQuestion(q.qNum)}
        className={`p-4 rounded-lg bg-white border flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all ${
          isActive ? "border-emerald-600 shadow-sm ring-1 ring-emerald-600/20" : "border-stone-200"
        }`}
      >
        <div className="flex gap-2 text-[14px]">
          <span className="font-bold text-stone-400 shrink-0">{q.qNum}</span>
          <p className="m-0 text-stone-800 font-medium">{q.text}</p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-md border border-stone-200 shrink-0">
          {["YES", "NO", "NOT GIVEN"].map((opt) => (
            <label 
              key={opt} 
              onClick={(e) => {
                e.preventDefault(); // Prevents default label double triggering
                e.stopPropagation(); // Stops wrapper click bubbling
                handleInputChange(q.qNum, opt);
              }}
              className={`px-3 py-1.5 rounded text-[12px] font-bold uppercase cursor-pointer transition-all border text-center whitespace-nowrap ${
                curVal === opt 
                  ? "bg-emerald-600 text-white border-emerald-600" 
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <input 
                type="radio" 
                name={`q-${q.qNum}`} 
                checked={curVal === opt} 
                disabled={submitted} 
                readOnly // Managed strictly via React state
                className="sr-only"
              />
              {opt === "NOT GIVEN" ? "N/G" : opt}
            </label>
          ))}
        </div>
      </div>
    );
  })}
</div>
      </div>

</div>
</>
      }
    />
  );
}