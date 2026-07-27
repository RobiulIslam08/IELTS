import React from "react";

/* ==========================================================================
    REUSABLE COMPONENT: RESIZABLE LAYOUT
   ========================================================================== */
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
    PART 1: Questions 1–14
   ========================================================================== */
export function SectionOne({ answers, setAnswers, submitted, activeQuestion, setActiveQuestion }) {
  const handleInputChange = (qNum, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
    setActiveQuestion(qNum);
  };

  const matchingQuestions = [
    { num: 1, text: "This campsite has recently received good reviews on the internet." },
    { num: 2, text: "Campers should be in reasonably good physical shape to use this site." },
    { num: 3, text: "This campsite is a good choice for people who want to visit local attractions." },
    { num: 4, text: "Campers are required to pitch their tents in a specific area." },
    { num: 5, text: "This campsite is situated next to a place where people can buy fresh food." },
    { num: 6, text: "This campsite does not have a lot of modern amenities or facilities." },
    { num: 7, text: "Campers can enjoy drinks and meals without leaving the site." }
  ];

  const partOneBlanks = [
    { num: 8, pre: "It is essential to take out appropriate", post: "to cover your business activities." },
    { num: 9, pre: "You must inform the office that deals with", post: "as soon as you start working from home." },
    { num: 10, pre: "There may be a limit on the", post: "of your home that you can use for business purposes." },
    { num: 11, pre: "It is important to check if you need to pay business", post: "on any part of your property." },
    { num: 12, pre: "You should ensure that your business activities do not cause a", post: "to your neighbors." },
    { num: 13, pre: "You may need to get formal permission or a", post: "from your local authority." },
    { num: 14, pre: "If you rent your home, you must get written consent from your", post: "before starting." }
  ];

  return (
    <ResizableLayout
      sectionTitle="READING PART 1"
      range="Questions 1–14"
      leftContent={
        <div className="space-y-6 text-[15px] text-stone-800">
          <div>
            <h1 className="text-xl font-bold text-stone-900 mb-4">Local campsites</h1>
            
            <div className="space-y-4">
              <div>
                <span className="font-bold text-emerald-700 text-lg mr-2">A</span>
                <span className="font-bold text-stone-900">Prettycoat Farm</span>
                <p className="mt-1">This well-known campsite in the wild near Browbourne is a winner with campers who are looking for time out from their fast-paced jobs in the capital. Despite its limited facilities, the site, with its large tent pitches, is an ideal base for exploring the area and driving to the rock museum, the craft workshops or Gaydon Castle. Just follow the signs.</p>
              </div>

              <div>
                <span className="font-bold text-emerald-700 text-lg mr-2">B</span>
                <span className="font-bold text-stone-900">Newgammon Wild</span>
                <p className="mt-1">This campsite looks like it's going to be a winner. It only opened last year, but already the website has some very positive reviews from the handful of campers who know about it so far. It offers splendid views over some of the country's most attractive beaches, which can be accessed by steep, narrow cliff steps. You need a good level of fitness for these, and don't forget to leave some energy for the return trip at the end of the day.</p>
              </div>

              <div>
                <span className="font-bold text-emerald-700 text-lg mr-2">C</span>
                <span className="font-bold text-stone-900">Oakerly Estate</span>
                <p className="mt-1">You won't be disappointed when you reach Oakerly, despite the problems of getting there by car on such narrow roads. You'll see quite a lot of motorhomes when you hit the clifftop, but there's still plenty of room for tents on the spacious lawn that also offers a camp kitchen, restaurant and bar. Make sure you stay safe and pitch your tent within the white line around the cliff edge, though.</p>
              </div>

              <div>
                <span className="font-bold text-emerald-700 text-lg mr-2">D</span>
                <span className="font-bold text-stone-900">South Turnbull</span>
                <p className="mt-1">The emphasis at this site is on back-to-basics camping. It's advisable to come in a robust vehicle as the track leading to the site is full of holes. However, it's worth it because the site is right next to a wonderful farm shop selling superb organic meat, vegetables and milk. There is a small stream where children can paddle, but parents must supervise them at all times.</p>
              </div>

              <div>
                <span className="font-bold text-emerald-700 text-lg mr-2">E</span>
                <span className="font-bold text-stone-900">Weston Orchard</span>
                <p className="mt-1">This is a quiet, family-run site with excellent hot showers and a laundry room. It's located in a beautiful valley, and it's perfect for walking or cycling along the old railway line. Booking is essential during July and August, as it is very popular with families who return year after year for the peaceful atmosphere.</p>
              </div>
            </div>
          </div>

          <hr className="border-stone-300" />

          <div>
            <h1 className="text-xl font-bold text-stone-900 mb-2">Running a business from home</h1>
            <p>Many people dream of leaving the daily commute behind and setting up a business from the comfort of their own home. It can be a cost-effective way to start a new venture, but there are several important legal and practical matters that you need to consider before you begin.</p>
            <p className="mt-2">First, check your insurance. Your standard home insurance policy may not cover business equipment, stock, or liabilities connected to customers visiting your property. It is essential to take out appropriate insurance to cover your business activities separately.</p>
            <p className="mt-2">Secondly, you must inform the office that deals with tax as soon as you start working from home. There are specific rules about what expenses you can claim against your business income, such as a proportion of your heating and electricity costs. There may be a limit on the percentage of your home that you can use for business purposes without affecting your capital gains tax position when you sell the house.</p>
            <p className="mt-2">Furthermore, it is important to check if you need to pay business rates on any part of your property. This usually applies if a room is used solely for business and is not dual-purpose. You should also ensure that your business activities do not cause a nuisance to your neighbors, for example through excessive noise, dust, or parking issues. You may need to get formal permission or a license from your local authority, and if you rent your home, you must get written consent from your landlord before starting.</p>
          </div>
        </div>
      }
      rightContent={
        <>
          {/* Questions 1-7 Container */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 1–7</h4>
            <p className="m-0 mt-1">Look at the five reviews of campsites, <b>A–E</b>. For which campsite are the following statements true?</p>
            <p className="m-0 mt-0.5 text-stone-600"><i>You may use any letter more than once.</i></p>
          </div>

          <div className="space-y-3">
            {matchingQuestions.map((q) => {
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
                  <div className="grid grid-cols-5 gap-1 bg-stone-100 p-1 rounded-md border border-stone-200 shrink-0">
                    {["A", "B", "C", "D", "E"].map(opt => (
                      <label 
                        key={opt} onClick={e => e.stopPropagation()}
                        className={`px-2.5 py-1.5 rounded text-[12px] font-bold uppercase cursor-pointer transition-all border text-center min-w-[34px] ${
                          curVal === opt ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        <input type="radio" name={`q-${q.num}`} checked={curVal === opt} disabled={submitted} onChange={() => handleInputChange(q.num, opt)} className="sr-only"/>
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Questions 8-14 Container */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-8">
            <h4 className="font-bold text-stone-900">Questions 8–14</h4>
            <p className="m-0 mt-1">Complete the sentences below. Choose <b>NO MORE THAN TWO WORDS</b> from the text for each answer.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-5 text-[14px] leading-loose">
            {partOneBlanks.map((q) => (
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
    PART 2: Questions 15–27
   ========================================================================== */
export function SectionTwo({ answers, setAnswers, submitted, activeQuestion, setActiveQuestion }) {
  const handleInputChange = (qNum, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
    setActiveQuestion(qNum);
  };

  const partTwoBlanksFirst = [
    { num: 15, pre: "Before making an appointment with your manager, write down your achievements and any extra", post: "you have taken on." },
    { num: 16, pre: "Find out what other companies are paying for similar roles to establish your market", post: "." },
    { num: 17, pre: "Choose a time when your manager is not stressed or dealing with a heavy", post: "." },
    { num: 18, pre: "During the meeting, remain professional and focus on your value rather than personal", post: "." },
    { num: 19, pre: "If the request is turned down, ask what specific goals or", post: "you need to achieve next." },
    { num: 20, pre: "Request a follow-up review in a few months to track your", post: "." },
    { num: 21, pre: "Ensure that any agreed increase or agreement is formally put in", post: "." }
  ];

  const partTwoBlanksSecond = [
    { num: 22, pre: "Most summer internships last for a duration of", post: "weeks." },
    { num: 23, pre: "Internships give students a chance to apply their theoretical", post: "in a practical environment." },
    { num: 24, pre: "Many companies use these summer placements as a key method for future graduate", post: "." },
    { num: 25, pre: "Applicants are usually required to submit an updated CV along with a comprehensive", post: "." },
    { num: 26, pre: "The closing date for submitting your application forms is in early", post: "." },
    { num: 27, pre: "Shortlisted candidates will be invited to attend an online", post: "with the team." }
  ];

  return (
    <ResizableLayout
      sectionTitle="READING PART 2"
      range="Questions 15–27"
      leftContent={
        <div className="space-y-6 text-[15px] text-stone-800">
          <div>
            <h1 className="text-xl font-bold text-stone-900 mb-2">Negotiating a pay rise</h1>
            <p>Asking for a salary increase can be daunting, but preparation is key to a successful negotiation. Before you schedule a meeting with your manager, spend time gathering evidence of your value to the company. Make a list of your recent achievements, successful projects, and any extra responsibilities you have taken on beyond your official job description.</p>
            <p className="mt-2">It is also helpful to research the industry standard for your position. Look at job advertisements and salary surveys to find out what other companies are paying for similar roles. This will help you establish your market value and give you a realistic figure to aim for during the discussion.</p>
            <p className="mt-2">Timing is crucial when requesting a meeting. Avoid periods when the business is facing financial difficulties or when your manager is stressed and dealing with a heavy workload. Instead, look for a moment when the company has just achieved a milestone or after you have successfully delivered an important piece of work.</p>
            <p className="mt-2">During the meeting, maintain a professional and positive tone. Focus on why your contributions deserve a higher reward, rather than talking about personal financial pressures. If your manager declines your request, do not become defensive. Ask for constructive feedback on what specific goals or benchmarks you need to achieve to qualify for an increase in the future, and request a follow-up review in a few months to track your progress. Finally, ensure that any agreed increase is formally put in writing.</p>
          </div>

          <hr className="border-stone-300" />

          <div>
            <h1 className="text-xl font-bold text-stone-900 mb-2">Summer internships for university students</h1>
            <p>Summer internships offer an excellent opportunity for university students to gain invaluable professional experience during the vacation period. These structured placements typically last between six and eight weeks, allowing participants to integrate into a professional team and work on real projects. It is a chance to apply theoretical knowledge gained during your studies to practical workplace challenges.</p>
            <p className="mt-2">Beyond gaining skills, an internship is an excellent networking opportunity. You will work alongside experienced professionals and meet peers from other institutions. Furthermore, many employers use summer placements as a primary method for future graduate recruitment, frequently offering permanent jobs to interns who perform exceptionally well.</p>
            <p className="mt-2">Applications are highly competitive, so early preparation is strongly recommended. Applicants are usually required to submit an updated CV along with a comprehensive covering letter detailing their motivation and suitability for the role. The closing date for most programs is in early February, and shortlisted candidates will be invited to attend an online interview later that month.</p>
          </div>
        </div>
      }
      rightContent={
        <>
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 15–21</h4>
            <p className="m-0 mt-1">Complete the summary below. Choose <b>ONE WORD ONLY</b> from the text for each answer.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-6 text-[14px] leading-loose">
            <h3 className="font-bold text-stone-900 border-b pb-2 mb-3">Advice on Salary Negotiation</h3>
            {partTwoBlanksFirst.map((q) => (
              <div key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)} className={`p-1.5 rounded ${activeQuestion === q.num ? "bg-emerald-50/50" : ""}`}>
                <span className="font-bold text-stone-400 mr-2">{q.num}</span>
                {q.pre}
                <input 
                  type="text" disabled={submitted} value={answers[`q${q.num}`] || ""} onFocus={() => setActiveQuestion(q.num)}
                  onChange={(e) => handleInputChange(q.num, e.target.value)}
                  className="mx-2 px-2 py-0.5 w-[140px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900"
                />
                {q.post}
              </div>
            ))}
          </div>

          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 22–27</h4>
            <p className="m-0 mt-1">Complete the sentences below. Choose <b>NO MORE THAN TWO WORDS</b> from the text for each answer.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-6 text-[14px] leading-loose">
            <h3 className="font-bold text-stone-900 border-b pb-2 mb-3">University Internship Schemes</h3>
            {partTwoBlanksSecond.map((q) => (
              <div key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)} className={`p-1.5 rounded ${activeQuestion === q.num ? "bg-emerald-50/50" : ""}`}>
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
        </>
      }
    />
  );
}

/* ==========================================================================
    PART 3: Questions 28–40
   ========================================================================== */
export function SectionThree({ answers, setAnswers, submitted, activeQuestion, setActiveQuestion }) {
  const handleInputChange = (qNum, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
    setActiveQuestion(qNum);
  };

  const tfnQuestions = [
    { num: 28, text: "The Australian sea lion population is currently showing signs of a rapid recovery." },
    { num: 29, text: "Gales Bay is an ideal location for scientists to conduct sea lion observations." },
    { num: 30, text: "Female sea lions are known to travel massive distances away from their home colonies to feed." },
    { num: 31, text: "Human interference is considered the primary threat to sea lion pups' survival rates." }
  ];

  const classificationQuestions = [
    { num: 32, text: "The colony shows an unusually high preference for rocky resting areas." },
    { num: 33, text: "This group has experienced the most significant decline in pup births." },
    { num: 34, text: "Members of this colony frequently interact with local fishing vessels." },
    { num: 35, text: "This specific population is situated furthest from the mainland research center." }
  ];

  const partThreeBlanks = [
    { num: 36, pre: "The programme focuses on situations such as mealtimes and bedtimes, and it encourages parents to set firm", post: "during these periods." },
    { num: 37, pre: "According to Kim Roberts, 'Henry' aims to help people become more", post: "as parents." },
    { num: 38, pre: "In this way, they do not instruct children to do things, nor give them total freedom of choice as in a", post: "parenting style." },
    { num: 39, pre: "Instead, they allow children to make some decisions for themselves, like deciding where a", post: "should be enjoyed in the evening." }
  ];

  return (
    <ResizableLayout
      sectionTitle="READING PART 3"
      range="Questions 28–40"
      leftContent={
        <div className="space-y-6 text-[15px] text-stone-800">
          <div>
            <h1 className="text-xl font-bold text-stone-900 mb-2">The Australian Sea Lion</h1>
            <p>The Australian sea lion (Neophoca cinerea) is one of the world's most endangered marine mammals. Unique to Australia, these creatures are found primarily along the wind-swept southern and western coasts of the continent. Unlike many other seal species whose populations have rebounded since the cessation of commercial hunting, Australian sea lions continue to experience a worrying decline.</p>
            <p className="mt-2">Biologists have focused their research on several key breeding colonies, including the isolated beach at Gales Bay. This site provides a rare sanctuary where sea lions can be observed without significant environmental disruptions. One of the most fascinating aspects discovered is the extreme philopatry displayed by females; they consistently return to the exact colony of their birth to reproduce, rarely venturing to alternative locations.</p>
            <p className="mt-2">However, this localized breeding strategy poses severe conservation risks. If a localized colony suffers from disease or fishing net entanglements, it cannot easily replenish its numbers from neighboring groups. Pups are exceptionally vulnerable during their early months, facing natural threats from marine predators as well as accidental entrapment in commercial lobster pots set along the coast.</p>
            <p className="mt-2">Efforts to combat this decline include the 'Henry' tracking and support framework used in regional centers since 2009. Originally deployed to manage coastal resource conflicts, the program focuses on strict zoning boundaries during sensitive breeding periods. According to lead warden Kim Roberts, the goal is to encourage maritime operators to become more compliant and responsible. By setting firm limits rather than enforcing total closures, the initiative balance commercial interests with wildlife survival parameters, allowing stakeholders to participate actively in preservation choices.</p>
          </div>
        </div>
      }
      rightContent={
        <>
          {/* Questions 28-31: True/False/Not Given */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 28–31</h4>
            <p className="m-0 mt-1">Do the following statements agree with the information given in the reading passage?</p>
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

          {/* Questions 32-35: Matching Features */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 32–35</h4>
            <p className="m-0 mt-1">Classify the characteristics described by matching them to the correct sea lion colony.</p>
            <div className="mt-2 space-y-0.5 text-stone-800 font-semibold text-[13px] bg-white p-2 rounded border">
              <div>A — Gales Bay Colony</div>
              <div>B — Pages Islands Colony</div>
              <div>C — Bundera Cliffs Colony</div>
            </div>
          </div>

          <div className="space-y-3">
            {classificationQuestions.map((q) => {
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
                    {["A", "B", "C"].map(opt => (
                      <label 
                        key={opt} onClick={e => e.stopPropagation()}
                        className={`px-4 py-1.5 rounded text-[12px] font-bold uppercase cursor-pointer transition-all border text-center ${
                          curVal === opt ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        <input type="radio" name={`q-${q.num}`} checked={curVal === opt} disabled={submitted} onChange={() => handleInputChange(q.num, opt)} className="sr-only"/>
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Questions 36-39: Summary Notes */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 36–39</h4>
            <p className="m-0 mt-1">Complete the summary notes below. Choose <b>NO MORE THAN TWO WORDS</b> from the passage.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-5 text-[14px] leading-loose">
            <h3 className="font-bold text-stone-900 border-b pb-2 mb-2">The 'Henry' Programme Implementation</h3>
            {partThreeBlanks.map((q) => (
              <div key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)} className={`p-1.5 rounded ${activeQuestion === q.num ? "bg-emerald-50/50" : ""}`}>
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
        </>
      }
    />
  );
}