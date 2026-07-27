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
   PART 1: Questions 1–13 (The Industrial Revolution in Britain)
   ========================================================================== */
export function SectionOne({ answers, setAnswers, submitted, activeQuestion, setActiveQuestion }) {
  const handleInputChange = (qNum, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
    setActiveQuestion(qNum);
  };

  const tfQuestions = [
    { num: 8, text: "Britain's canal network grew rapidly so that more goods could be transported around the country." },
    { num: 9, text: "Costs in the iron industry rose when the technique of smelting iron ore with coke was introduced." },
    { num: 10, text: "Samuel Morse's communication system was more reliable than that developed by William Cooke and Charles Wheatstone." },
    { num: 11, text: "The economic benefits of industrialisation were limited to certain sectors of society." },
    { num: 12, text: "Some skilled weavers believed that the introduction of the new textile machines would lead to job losses." },
    { num: 13, text: "There was some sympathy among local people for the Luddites who were arrested near Huddersfield." }
  ];

  return (
    <ResizableLayout
      sectionTitle="READING PASSAGE 1"
      range="Questions 1–13"
      leftContent={
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-stone-900">The Industrial Revolution in Britain</h1>
          <p>The Industrial Revolution began in Britain in the mid-1700s and by the 1830s and 1840s had spread to many other parts of the world, including the United States. In Britain, it was a period when a largely rural, agrarian society was transformed into an industrialised, urban one. Goods that had once been crafted by hand started to be produced in mass quantities by machines in factories, thanks to the invention of steam power and the introduction of new machines and manufacturing techniques in textiles, iron-making and other industries.</p>
          <p>The foundations of the Industrial Revolution date back to the early 1700s, when the English inventor Thomas Newcomen designed the first modern steam engine. Called the 'atmospheric steam engine', Newcomen's invention was originally used to power machines that pumped water out of mines. In the 1760s, the Scottish engineer James Watt started to adapt one of Newcomen's models, and succeeded in making it far more efficient. Watt later worked with the English manufacturer Matthew Boulton to invent a new steam engine driven by both the forward and backward strokes of the piston, while the gear mechanism it was connected to produced rotary motion. It was a key innovation that would allow steam power to spread across British industries.</p>
          <p>The demand for coal grew rapidly during the Industrial Revolution, as it was needed to run not only the factories used to produce manufactured goods, but also steam-powered transportation. In the early 1800s, the English engineer Richard Trevithick built a steam-powered locomotive, and by 1830 goods and passengers were being transported between the industrial centres of Manchester and Liverpool.</p>
          <p>The British iron industry also underwent major change as it adopted new innovations. Chief among the new techniques was the smelting of iron ore with coke (a material made by heating coal) instead of the traditional charcoal. This method was cheaper and produced metals that were of a higher quality, enabling Britain's iron and steel production to expand rapidly.</p>
          <p>The impact of the Industrial Revolution on people's lives was immense. Although industrialisation increased the country's economic output overall and improved the standard of living for the middle and upper classes, many poor people continued to struggle. Factory workers had to work long hours in dangerous conditions for extremely low wages. A group of British workers who became known as 'Luddites' were British weavers and textile workers who objected to the increased use of mechanised looms and knitting frames, fearing that unskilled operators were robbing them of their livelihood.</p>
        </div>
      }
      rightContent={
        <>
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 1–7</h4>
            <p className="m-0 mt-1">Complete the notes below. Choose <b>ONE WORD ONLY</b> from the passage for each answer.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-5 text-[14px] leading-loose">
            <h3 className="font-bold text-stone-900 border-b pb-2 mb-3">Britain's Industrial Revolution Notes</h3>
            {[
              { num: 1, pre: "In Watt and Boulton's steam engine, the movement of the", post: "was linked to a gear system." },
              { num: 2, pre: "A greater supply of", post: "was required to power steam engines." },
              { num: 3, pre: "Before the Industrial Revolution, spinners and weavers worked at home and in", post: "." },
              { num: 4, pre: "Not as much", post: "was needed to produce cloth once the spinning jenny and power loom were invented." },
              { num: 5, pre: "Smelting of iron ore with coke resulted in material that was better", post: "." },
              { num: 6, pre: "Demand for iron increased with the growth of the", post: "." },
              { num: 7, pre: "The new cities were dirty, crowded and lacked sufficient", post: "." }
            ].map((q) => (
              <div key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)} className={`p-2 rounded ${activeQuestion === q.num ? "bg-emerald-50/50" : ""}`}>
                <span className="font-bold text-stone-400 mr-2">{q.num}</span>
                {q.pre}
                <input 
                  type="text" disabled={submitted} value={answers[`q${q.num}`] || ""} onFocus={() => setActiveQuestion(q.num)}
                  onChange={(e) => handleInputChange(q.num, e.target.value)}
                  className="mx-2 px-2 py-0.5 w-[160px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900"
                />
                {q.post}
              </div>
            ))}
          </div>

          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-8">
            <h4 className="font-bold text-stone-900">Questions 8–13</h4>
            <p className="m-0 mt-1">Do the following statements agree with the information given in Reading Passage 1?</p>
            <div className="mt-2 space-y-0.5 text-stone-800 font-medium text-[13px]">
              <div><b>TRUE</b> — if the statement agrees with the information</div>
              <div><b>FALSE</b> — if the statement contradicts the information</div>
              <div><b>NOT GIVEN</b> — if there is no information on this</div>
            </div>
          </div>

          <div className="space-y-3">
            {tfQuestions.map((q) => {
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
        </>
      }
    />
  );
}

/* ==========================================================================
   PART 2: Questions 14–26 (Athletes and stress)
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
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-stone-900">Athletes and stress</h1>
          <p className="italic text-stone-600">It isn't easy being a professional athlete. Athletes face intense psychological pressure during competition.</p>
          <p><b>[Paragraph A]</b> This is something that British tennis player Emma Raducanu wrote about on social media following her withdrawal from the 2021 Wimbledon tournament. Though the young player had been doing well in the tournament, she began having difficulty regulating her breathing and heart rate during a match, which she later attributed to 'the accumulation of the excitement and the buzz'.</p>
          <p><b>[Paragraph B]</b> For athletes, some level of performance stress is almost unavoidable. But there are many different factors that dictate just how people's minds and bodies respond to stressful events.</p>
          <p><b>[Paragraph C]</b> Researchers have found that how an athlete perceives stress directly drives performance outcomes. When stress is seen as a challenge, performance levels scale up. However, when it is registered as an absolute threat, the mind triggers responses oriented towards avoiding potential dangers such as injury.</p>
          <p><b>[Paragraph D]</b> Under threat stress, the hormone cortisol has been associated with more unsuccessful serves in tennis and poorer execution in high-stakes environments. Physical elements like adrenaline and cortisol fluctuate drastically based on psychological frames.</p>
          <p><b>[Paragraph E]</b> If chronic stress or threat states are experienced too often, long-term health risks multiply, including an elevated risk of heart disease and clinical depression.</p>
          <p><b>[Paragraph F]</b> Developing psychological skills, such as visualisation and recreating high-pressure settings during daily training, can completely shift an athlete's mental language. This guidance helps coaches and parents assist athletes in seeing a higher heart rate as excitement rather than debilitating anxiety.</p>
        </div>
      }
      rightContent={
        <>
          {/* Questions 14-18 */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 14–18</h4>
            <p className="m-0 mt-1">Reading Passage 2 has six paragraphs, <b>A–F</b>. Which paragraph contains the following information?</p>
          </div>

          <div className="space-y-3">
            {[
              { num: 14, text: "A description of the physical hormones activated during stress." },
              { num: 15, text: "Examples of techniques used to simulate stress conditions during practice." },
              { num: 16, text: "A case of an elite athlete sharing personal experiences on digital platforms." },
              { num: 17, text: "Data regarding how performance changes based on threat vs challenge states." },
              { num: 18, text: "The role of coaches and families in altering the language used around stress." }
            ].map(q => {
              const curVal = answers[`q${q.num}`] || "";
              const isActive = activeQuestion === q.num;

              return (
                <div 
                  key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)}
                  className={`p-4 rounded-lg bg-white border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                    isActive ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600/10" : "border-stone-200"
                  }`}
                >
                  {/* Question Text */}
                  <div className="flex gap-2 text-[14px]">
                    <span className="font-bold text-stone-400 shrink-0">{q.num}</span>
                    <span className="text-stone-800 font-medium">{q.text}</span>
                  </div>

                  {/* Radio Buttons Container (A-F) */}
                  <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-md border border-stone-200 shrink-0">
                    {["A", "B", "C", "D", "E", "F"].map(opt => (
                      <label 
                        key={opt} onClick={e => e.stopPropagation()}
                        className={`w-9 h-8 flex items-center justify-center rounded text-[12px] font-bold uppercase cursor-pointer transition-all border text-center ${
                          curVal === opt 
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                            : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name={`q-${q.num}`} 
                          checked={curVal === opt} 
                          disabled={submitted} 
                          onChange={() => handleInputChange(q.num, opt)} 
                          className="sr-only"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Questions 19-22 */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 19–22</h4>
            <p className="m-0 mt-1">Complete the sentences below. Choose <b>ONE WORD ONLY</b> from the passage for each answer.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-5 text-[14px] leading-loose">
            {[
              { num: 19, pre: "Athletes entering a threat state often focus heavily on avoiding major concerns like", post: "." },
              { num: 20, pre: "High amounts of cortisol correspond directly with more failed", post: "during matches." },
              { num: 21, pre: "Proper support can reframe a fast heartbeat as a feeling of", post: "rather than fear." },
              { num: 22, pre: "Mental techniques such as", post: "help simulate genuine competition environments." }
            ].map((q) => (
              <div key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)} className={`p-2 rounded ${activeQuestion === q.num ? "bg-emerald-50/50" : ""}`}>
                <span className="font-bold text-stone-400 mr-2">{q.num}</span>
                {q.pre}
                <input 
                  type="text" disabled={submitted} value={answers[`q${q.num}`] || ""} onFocus={() => setActiveQuestion(q.num)}
                  onChange={(e) => handleInputChange(q.num, e.target.value)}
                  className="mx-2 px-2 py-0.5 w-[160px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900"
                />
                {q.post}
              </div>
            ))}
          </div>

{/* Questions 23-26 */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 23–26</h4>
            <p className="m-0 mt-1">Choose the correct letter, <b>A</b>, <b>B</b>, <b>C</b>, <b>D</b> or <b>E</b>.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-5 text-[14px]">
            <div>
              <p className="font-bold text-stone-800 mb-3">Questions 23 & 24: Which TWO symptoms or factors are mentioned regarding Raducanu's performance difficulties?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: "A", text: "A: Chronic back pain limitations" },
                  { id: "B", text: "B: Breathing and heart rate difficulties" },
                  { id: "C", text: "C: Sudden loss of interest in the match" },
                  { id: "D", text: "D: Larger audience and high expectation pressures" },
                  { id: "E", text: "E: Equipment configuration failures" }
                ].map(opt => (
                  <div key={opt.id} className="space-y-2 border border-stone-200 p-3 rounded-lg bg-stone-50/50 flex flex-col justify-between">
                    <span className="text-stone-700 font-medium text-[13px]">{opt.text}</span>
                    <div className="flex gap-2 border-t pt-2 mt-1">
                      <button 
                        type="button" 
                        onClick={() => handleInputChange(23, opt.id)} 
                        className={`px-3 py-1 rounded text-xs font-bold border transition-all ${answers.q23 === opt.id ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"}`}
                      >
                        Select Q23
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleInputChange(24, opt.id)} 
                        className={`px-3 py-1 rounded text-xs font-bold border transition-all ${answers.q24 === opt.id ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"}`}
                      >
                        Select Q24
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 mt-4">
              <p className="font-bold text-stone-800 mb-3">Questions 25 & 26: Which TWO long-term consequences or structural items of stress are validated?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: "A", text: "A: State intensity depends entirely on demands and resources" },
                  { id: "B", text: "B: Total permanent memory loss risks" },
                  { id: "C", text: "C: Complete deterioration of muscle tissues" },
                  { id: "D", text: "D: Genetic mutations over time" },
                  { id: "E", text: "E: Long-term risks of heart disease and depression" }
                ].map(opt => (
                  <div key={opt.id} className="space-y-2 border border-stone-200 p-3 rounded-lg bg-stone-50/50 flex flex-col justify-between">
                    <span className="text-stone-700 font-medium text-[13px]">{opt.text}</span>
                    <div className="flex gap-2 border-t pt-2 mt-1">
                      <button 
                        type="button" 
                        onClick={() => handleInputChange(25, opt.id)} 
                        className={`px-3 py-1 rounded text-xs font-bold border transition-all ${answers.q25 === opt.id ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"}`}
                      >
                        Select Q25
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleInputChange(26, opt.id)} 
                        className={`px-3 py-1 rounded text-xs font-bold border transition-all ${answers.q26 === opt.id ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"}`}
                      >
                        Select Q26
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

/* ==========================================================================
   PART 3: Questions 27–40 (An Inquiry into the Existence of the Gifted Child)
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
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-stone-900">An Inquiry into the Existence of the Gifted Child</h1>
          <p>Maryam Mirzakhani was a unique mathematician who became the only woman to win the Fields Medal. Surprisingly, in her early childhood years, maths wasn't her primary interest - reading was. She became intrigued and deeply interested when her elder brother told her about mathematical challenges. She was completely resolute and determined in the face of setbacks, often mentioning that the most rewarding part of her job was the 'Aha' moment of satisfaction. This approach took her to the absolute heights of original and innovative research.</p>
          <p>Professor John Baer notes that most Nobel prize winners were unexceptional and completely ordinary in childhood. Einstein famously failed certain entry level tests early on. While the jury is completely out on giftedness being innate, Einstein famously countered assumptions of raw intelligence by stating: 'It's not that I'm so smart, it's just that I stay with problems longer. It is character.'</p>
          <p>Professor Deborah Eyre argues that high performance learning is achievable by teaching children the right attitudes and a spirit of inquiry towards their studies. Professor Anders Ericsson also shares strong evidence that unique or innate gifts are not the core factor, but rather the explicit guidance of an adult or adults who value, support, and recognize the benefits of long term education.</p>
        </div>
      }
      rightContent={
        <>
          {/* Questions 27-32 */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 27–32</h4>
            <p className="m-0 mt-1">Complete the summary below using the list of words, <b>A–J</b>, below.</p>
            <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded mt-2 border text-xs font-semibold text-stone-700">
              <div>A: appeal</div><div>B: determined</div><div>C: intrigued</div><div>D: host</div>
              <div>E: complex</div><div>F: standard</div><div>G: regular</div><div>H: unique</div>
              <div>I: innovative</div><div>J: satisfaction</div>
            </div>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-5 text-[14px] leading-loose">
            <h3 className="font-bold text-stone-900 border-b pb-2 mb-3">Maryam's Academic Journey Summary</h3>
            <p className="text-stone-800">
              Maryam Mirzakhani was a 
              <span className="ml-2 font-bold text-stone-400">27</span>
              <input 
                type="text" 
                maxLength={1}
                disabled={submitted} 
                value={answers.q27 || ""} 
                onFocus={() => setActiveQuestion(27)}
                onChange={(e) => handleInputChange(27, e.target.value.toUpperCase())} 
                className="mx-1 px-1 w-10 border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-bold text-emerald-700 uppercase"
              />
              mathematician. In early childhood, math didn't hold a massive 
              <span className="ml-2 font-bold text-stone-400">28</span>
              <input 
                type="text" 
                maxLength={1}
                disabled={submitted} 
                value={answers.q28 || ""} 
                onFocus={() => setActiveQuestion(28)}
                onChange={(e) => handleInputChange(28, e.target.value.toUpperCase())} 
                className="mx-1 px-1 w-10 border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-bold text-emerald-700 uppercase"
              />
              for her. She became 
              <span className="ml-2 font-bold text-stone-400">29</span>
              <input 
                type="text" 
                maxLength={1}
                disabled={submitted} 
                value={answers.q29 || ""} 
                onFocus={() => setActiveQuestion(29)}
                onChange={(e) => handleInputChange(29, e.target.value.toUpperCase())} 
                className="mx-1 px-1 w-10 border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-bold text-emerald-700 uppercase"
              />
              after her brother's descriptions. She remained highly 
              <span className="ml-2 font-bold text-stone-400">30</span>
              <input 
                type="text" 
                maxLength={1}
                disabled={submitted} 
                value={answers.q30 || ""} 
                onFocus={() => setActiveQuestion(30)}
                onChange={(e) => handleInputChange(30, e.target.value.toUpperCase())} 
                className="mx-1 px-1 w-10 border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-bold text-emerald-700 uppercase"
              />
              regardless of continuous updates. She loved the ultimate 'Aha' moment of 
              <span className="ml-2 font-bold text-stone-400">31</span>
              <input 
                type="text" 
                maxLength={1}
                disabled={submitted} 
                value={answers.q31 || ""} 
                onFocus={() => setActiveQuestion(31)}
                onChange={(e) => handleInputChange(31, e.target.value.toUpperCase())} 
                className="mx-1 px-1 w-10 border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-bold text-emerald-700 uppercase"
              />
              which guided her towards highly 
              <span className="ml-2 font-bold text-stone-400">32</span>
              <input 
                type="text" 
                maxLength={1}
                disabled={submitted} 
                value={answers.q32 || ""} 
                onFocus={() => setActiveQuestion(32)}
                onChange={(e) => handleInputChange(32, e.target.value.toUpperCase())} 
                className="mx-1 px-1 w-10 border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-bold text-emerald-700 uppercase"
              />
              research limits.
            </p>
          </div>

          {/* Questions 33-37 */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 33–37</h4>
            <p className="m-0 mt-1">Do the following statements agree with the claims of the writer?</p>
            <div className="mt-1 text-xs font-semibold text-stone-600">YES / NO / NOT GIVEN</div>
          </div>

          <div className="space-y-3">
            {[
              { num: 33, text: "Most Nobel prize winners were completely ordinary and unexceptional during childhood." },
              { num: 34, text: "Einstein experienced a complete lack of confidence due to early entrance test failures." },
              { num: 35, text: "The definitive consensus on whether giftedness is completely innate remains unproven." },
              { num: 36, text: "Einstein was deeply upset about the general public's standard views on his intelligence." },
              { num: 37, text: "Einstein believed his discoveries were exclusively due to his superior raw intellect." }
            ].map(q => {
              const curVal = answers[`q${q.num}`] || "";
              return (
                <div key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)} className={`p-4 rounded-lg bg-white border flex items-center justify-between gap-4 ${activeQuestion === q.num ? "border-emerald-600 ring-1 ring-emerald-600/10" : "border-stone-200"}`}>
                  <div className="flex gap-2 text-[14px]">
                    <span className="font-bold text-stone-400">{q.num}</span>
                    <p className="m-0 text-stone-800 font-medium">{q.text}</p>
                  </div>
                  <div className="flex gap-1 bg-stone-100 p-1 rounded border shrink-0">
                    {["YES", "NO", "NOT GIVEN"].map(o => (
                      <button key={o} type="button" onClick={() => handleInputChange(q.num, o)} className={`px-2 py-1 text-[11px] font-bold rounded ${curVal === o ? "bg-emerald-600 text-white" : "bg-white text-stone-600 border border-stone-200"}`}>
                        {o === "NOT GIVEN" ? "N/G" : o}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Questions 38-40 */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 38–40</h4>
            <p className="m-0 mt-1">Choose the correct letter, <b>A</b>, <b>B</b>, <b>C</b> or <b>D</b>.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                num: 38,
                title: "What is Deborah Eyre's main solution for achieving high performance?",
                opts: [
                  { id: "A", text: "A) Implementing longer school hours dynamically" },
                  { id: "B", text: "B) Avoiding standard homework patterns entirely" },
                  { id: "C", text: "C) Developing a solid spirit of inquiry and attitudes towards studies" },
                  { id: "D", text: "D) Separating kids based on physical capability parameters" }
                ]
              },
              {
                num: 39,
                title: "What is Professor Anders Ericsson's view on exceptional expertise?",
                opts: [
                  { id: "A", text: "A) It is purely a byproduct of lucky environmental parameters" },
                  { id: "B", text: "B) Being born with an exceptional innate gift is not the key factor" },
                  { id: "C", text: "C) It requires absolute isolation from standard social groups" },
                  { id: "D", text: "D) It cannot be reproduced or studied scientifically" }
                ]
              },
              {
                num: 40,
                title: "What core requirement did the spin-off research identify among successful children?",
                opts: [
                  { id: "A", text: "A) Access to premium private modern technological gadgets" },
                  { id: "B", text: "B) High financial income parameters inside the household" },
                  { id: "C", text: "C) Moving to premium urban communities at a very early age" },
                  { id: "D", text: "D) The active guidance of an adult who values and supports learning" }
                ]
              }
            ].map(q => (
              <div key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)} className={`p-5 rounded-lg bg-white border space-y-3 ${activeQuestion === q.num ? "border-emerald-600 shadow-sm" : "border-stone-200"}`}>
                <p className="font-bold text-stone-800 text-[14px]"><span className="text-stone-400 mr-2">{q.num}</span> {q.title}</p>
                <div className="grid grid-cols-1 gap-2">
                  {q.opts.map(o => (
                    <button
                      key={o.id} type="button" onClick={() => handleInputChange(q.num, o.id)}
                      className={`text-left px-4 py-2 text.xs rounded border transition-all font-medium ${answers[`q${q.num}`] === o.id ? "bg-emerald-600 border-emerald-600 text-white" : "bg-stone-50 text-stone-700 hover:bg-stone-100"}`}
                    >
                      {o.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}