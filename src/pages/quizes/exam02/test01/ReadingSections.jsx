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
   PART 1: Questions 1–14
   ========================================================================== */
export function SectionOne({ answers, setAnswers, submitted, activeQuestion, setActiveQuestion }) {
  const handleInputChange = (qNum, val) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
    setActiveQuestion(qNum);
  };

  const tfnQuestions = [
    { num: 1, text: "The city buses start operating later than the trams." },
    { num: 2, text: "You can get a tram from the airport to the city centre up to midnight." },
    { num: 3, text: "The 207 bus service stops at the main railway station." },
    { num: 4, text: "The cost of a tram ticket varies depending on your journey." },
    { num: 5, text: "Bicycles are allowed on the trams between 7.30 am and 10 am." },
    { num: 6, text: "Additional trams run during the Gobridge festival period." },
    { num: 7, text: "Cyclists may be asked to leave the tram if they block the exit." }
  ];

  return (
    <ResizableLayout
      sectionTitle="READING PART 1"
      range="Questions 1–14"
      leftContent={
        <div className="space-y-6">
          <div>
            <p>Read the text below and answer Questions 1-7</p>
            <h1 className="text-xl font-bold text-stone-900 mb-2">Gobridge Tramlink - Frequently Asked Questions (FAQs)</h1>
            <p>Here are the some of the frequently asked questions about the tramservice in Gobridge town</p>
            <p className="font-bold text-stone-700 mt-4">When do the trams run?</p>
            <p>Gobridge Tramlink operates a network of trams that run throughout the year and provide links to main services, stations and the airport. Timetables are reviewed in October and March, and may alter slightly so check before you travel. Our first tram from the city centre leaves from Marvin Square at 6.30 am, half an hour after the first city bus service.</p>
            
            <p className="font-bold text-stone-700 mt-4">Can I get a tram from the airport?</p>
            <p>Trams from the airport to the city centre start running at 6.15 am and leave every fifteen minutes until 7.30 pm when the evening schedule takes over. Trams then run to the main railway station at 35-minute intervals and end at 11.35 pm. If your flight arrives later than this, the number 207 airport bus runs every hour through the night.</p>
            
            <p className="font-bold text-stone-700 mt-4">What do I do if I don't have a ticket?</p>
            <p>Tickets are not sold by anyone on the tram. Ticket vending machines are located at all tram shelters. Check your route and make sure you buy the correct price ticket. If the vending machine does not work, you should push the red button on the machine and speak into the microphone. A member of staff will either fix the machine straight away or contact the tram inspector onboard your tram. He or she cannot sell you a ticket, but you will not be obliged to pay the 
              &pound;8 on-board fine for not having one.
            </p>
            
          </div>
          <hr className="border-stone-300" />
          <div>
            <h1 className="text-xl font-bold text-stone-900 mb-2">Can I take my bike on the tram?</h1>
            <p >Each tram is licensed to carry a maximum of two bicycles, though drivers may refuse to allow cyclists to get on if the tram is crowded. Bicycles may only be taken on the trams during off-peak travel periods: up to 7.30 am, between 10 am and 2.30 pm and after 7 pm. Festivals and other large events may also mean that bicycles are prohibited as trams carry extra passengers at these times. Once on board,
              riders should remain with their bicycles throughout the journey and ensure they do not obstruct the entrance, exit or any other area of public access.</p></div>
        
        <p>Read the text below and answer Questions 8-14</p>

        <h1 className="text-xl text-center font-bold text-stone-900 mb-2" >Adorable Knitwear</h1>
        <p className="text-center">Online customer reviews</p>

        <b>A Mary-Anne</b>
        <p>I spent a while thinking about buying this sweater because of the price, but I’m glad I finally did. It’s a long sweater but that’s good as I’m quite tall. I normally find that the sleeves are too short when I try on a top, but not with this one. I tend to take medium but went for large, which was a wise decision as there is plenty of room for a T-shirt underneath when I wear it with jeans.</p>
        
        <b>B Davina</b>
        <p>These sweaters are an ideal weight for office wear. The purple one is pretty, though I expected a lighter shade from the picture. I wear a US size 12 / UK 16, and the medium is big enough to fit over a shirt with room to spare. It has long sleeves that I love to roll up at the wrist. I’m now trying to resist the temptation to buy it in grey too.</p>
        
        <b>C Naga</b>
        <p>This knitted sweater looks great in the pictures. I ordered the olive green with stripes and, although I wasn’t sure it was going to look right on me, I was pleasantly surprised when I put it on. It’s very soft and I love the long past-the-wrist sleeves too. I opted for the medium, but it was too tight so I exchanged it.</p>
        <b>D Libby</b>
        <p>
          This is the third of your sweaters that I’ve bought over the past two years. It’s true to size and perfect for the winter months, though I should add that its loose knit means it’s best to avoid playing with cats or young dogs when you’re wearing it as they could pull threads in the body or sleeves.
        </p>
        <b>E Laura</b>
        <p>I couldn’t decide which colour to get so I bought the deep blue and the charcoal grey, with every intention of sending one of them back. That didn’t happen, of course! I would say both colours match the online pictures. I bought size small, and the length is perfect for me, despite the unnecessarily long sleeves! These sweaters are lovely to wear with jeans but also stylish enough to wear to work.</p>
        
        </div>

        
      }
      
      rightContent={
        <>
        
          {/* Questions 1-7 Container */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 1–7</h4>
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

          

          {/* Questions 8-14 Container */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 8–14</h4>
            <p className="m-0 mt-1">Look at the five online customer reviews of sweaters, <b>A-E</b>, on pages</p>
            <p className="m-0 mt-1">For Which Review are the following statement true?</p>
            <p className="m-0 mt-1">Write the correct latter, <b>A-E</b>, in boxes 8-14 on your answer sheet.</p>
            <p className="m-0 mt-1"><b><i>NB</i></b>You may use any letter more than once.</p>
          </div>

          <div className="overflow-x-auto bg-white border border-stone-200 rounded-lg p-4 shadow-sm">
  <table className="w-full border-collapse text-[14px]">
    {/* Table Header */}
    <thead>
      <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
        <th className="p-3 text-left font-semibold">Questions</th>
        {["A", "B", "C", "D", "E"].map((letter) => (
          <th key={letter} className="p-3 text-center w-[60px] font-bold text-[15px]">
            {letter}
          </th>
        ))}
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {[
        { num: 8, text: "The colour of the sweater did not match the website image." },
        { num: 9, text: "The customer took some time to decide on the purchase." },
        { num: 10, text: "The customer initially bought the wrong size." },
        { num: 11, text: "The customer changed her mind about returning a sweater." },
        { num: 12, text: "The customer bought a bigger size than she usually does." },
        { num: 13, text: "The sweater can be worn for smart or casual occasions." },
        { num: 14, text: "The customer was worried that the sweater wouldn’t suit her." }
      ].map((q) => {
        const curVal = answers[`q${q.num}`] || "";
        const isActive = activeQuestion === q.num;

        return (
          <tr 
            key={q.num}
            onClick={() => setActiveQuestion(q.num)}
            className={`border-b border-stone-100 transition-colors last:border-none ${
              isActive ? "bg-emerald-50/40" : "hover:bg-stone-50/60"
            }`}
          >
            {/* Question Text */}
            <td className="p-3 text-stone-800 leading-relaxed">
              <span className="font-bold text-stone-400 mr-2">{q.num}</span>
              {q.text}
            </td>

            {/* Option Columns (A-E) */}
            {["A", "B", "C", "D", "E"].map((letter) => (
              <td key={letter} className="p-3 text-center vertical-middle">
                <label className="flex items-center justify-center h-full w-full cursor-pointer py-1">
                  <input
                    type="radio"
                    name={`q-${q.num}`}
                    disabled={submitted}
                    checked={curVal === letter}
                    onChange={() => handleInputChange(q.num, letter)}
                    className="w-4 h-4 text-emerald-600 border-stone-300 focus:ring-emerald-500 cursor-pointer accent-emerald-600 disabled:opacity-60"
                  />
                </label>
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
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

  return (
    <ResizableLayout
      sectionTitle="READING PART 2"
      range="Questions 15–21"
      leftContent={
        <div>
          <p>Read the text below and answer Questions 15–21.</p>
          <h1 className="text-xl font-bold text-stone-900 mb-2">How to become a great leader</h1>
          <p>Stepping into a new management role can be unnerving. Here's how to inspire your team:  </p> <p>

Set the tone of your leadership style from the outset. Be confident, self-assured and respectful with everyone you meet. Speak as you want to be spoken to, and remember to listen. The first few weeks is when people develop their perceptions of you, so work hard to earn their trust. This will be key to effective change and progress.  
</p> <p>
Part of a leader's brief is to set bold goals. They could take years to achieve, but they need to be specific enough that everyone in the organisation understands them, buys into them and is willing to work together to achieve them.  

Don't do everything yourself. Great leaders surround themselves with talented individuals and they should trust them to make things happen. If things need changing, tell people and involve them in making the changes by participating in the design of a new strategy. If the team is too cautious to embrace change, give them one more chance but be clearer about what you want.  

Stamp out the 'them and us' culture. In many organisations, employees feel distant from senior management. The message must be plain: we all work together, but leaders need to work hard to ensure this filters through to everyone in the organisation.  

Allow time for innovation. It's important to give staff time to come up with new ideas and solutions that will fix new problems. However, be clear that a decision is expected; set a time limit and stick to it.  

It is likely that the formula that makes the business you are managing successful will have been created many years ago – but it's important to remember how the business started. Honour those early pioneers and instil a sense of pride across the organisation.  

Leaders need to accept that some risk may be required if the situation calls for it. Playing it safe is never a good business rule, and leaders must make sure their business stays ahead by being prepared to act quickly.  

Show you are passionate and enthusiastic. People spend a large part of their lives working for an organisation, and having a leader who is genuinely thrilled about its future is hugely inspiring.</p>


  <p>Read the text below and answer Questions 22–27.</p>      

  <h1 className="text-xl font-bold text-stone-900 mb-2">Resigning from a job in a professional manner</h1>

  <p>When you take the decision to resign and move on to another job, you might really want to dance your way out of the door, or get your own back by criticising your boss to the whole office. But you need to resist these temptations because in future you might find you're working with your ex-line manager or other colleagues in a different company.

  </p>

  <b>Letting your manager know</b>

  <p>Show courtesy by telling your boss first. Request a meeting to say that you're leaving, following up soon after with an official letter. Before the meeting with your boss, write a list of ongoing tasks along with status updates and suggestions concerning completion.
Use the meeting to clarify any other points, such as your notice period and leaving date, and how you will inform others (colleagues or external clients, contacts and suppliers). Ask about a reference too; your employer may only supply the most basic type but your line manager might also give you a more personal one. Making sure you get a good one can make subsequent job hunting less stressful.
</p>

<b>Preparation</b>
<p>Work out how you can ensure a smooth transition and minimise disruption to your employer. There may be a range of things you can do to hand over professionally, such as completing projects, working out the priorities with your line manager, and leaving clear documentation for the successor in your post concerning processes or software.

</p>

<b>Your letter of resignation</b>
<p>Keep your letter short. You don't need to give lots of explanations or justification for why you're leaving. Don't be tempted to address the failings of the company or your boss, either. Instead, thanking your employer for the job and mentioning what you appreciated about it is a graceful touch. Here's an idea of what to include:</p>
        

    <li><b>First paragraph – the basics</b></li>
    <p>Inform the employer that you wish to resign and confirm the agreed final date at work.</p>
    <li> <b>Second paragraph – thank your employer</b> </li>
    <p>Mention any particular career-building projects you worked on or opportunities to develop skills and contribute to the employer's goals and successes. You can also mention your appreciation at being able to work in a great team.

    </p>
    <li> <b>Third paragraph – handover </b>
      <p>State your willingness to finish existing projects and hand over your work smoothly.</p>
    </li>
     
        </div>
      }
      rightContent={
        <>
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 15–21</h4>
            <p className="m-0 mt-1">Complete the sentences below.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-6 text-[14px] leading-loose">
            <h3 className="font-bold text-stone-900 border-b pb-2 mb-3">Choose ONE WORD ONLY from the text for each answer.</h3>
            <p>
              Write your answers in boxes 15–21 on your answer sheet. <br></br>
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> Initially, a leader needs to focus on gaining the
                <input type="text" placeholder="15" disabled={submitted} value={answers.q15 || ""} onFocus={() => setActiveQuestion(15)} onChange={(e) => handleInputChange(15, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              of the staff. </span> 
              
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> A leader should decide on
                <input type="text" placeholder="16" disabled={submitted} value={answers.q16 || ""} onFocus={() => setActiveQuestion(16)} onChange={(e) => handleInputChange(16, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span> 
              that their staff are happy to fulfil.
            </p>
            
            <p>
              Leaders should involve their staff in the process of producing a different 
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span>
                <input type="text" placeholder="17" disabled={submitted} value={answers.q17 || ""} onFocus={() => setActiveQuestion(17)} onChange={(e) => handleInputChange(17, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span>, 
              If tricky issues arise, leaders should give staff the space to find 
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span>
                <input type="text" placeholder="18" disabled={submitted} value={answers.q18 || ""} onFocus={() => setActiveQuestion(18)} onChange={(e) => handleInputChange(18, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span> 
              o them.
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> Leaders need to encourage their staff to feel
                <input type="text" placeholder="19" disabled={submitted} value={answers.q19 || ""} onFocus={() => setActiveQuestion(19)} onChange={(e) => handleInputChange(19, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              in the past achievements of the company.
              </span> 

              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> It is important for leaders to agree to a certain degree of
                <input type="text" placeholder="20" disabled={submitted} value={answers.q20 || ""} onFocus={() => setActiveQuestion(20)} onChange={(e) => handleInputChange(20, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              when necessary.
              </span> 

              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> If leaders find the
                <input type="text" placeholder="21" disabled={submitted} value={answers.q21 || ""} onFocus={() => setActiveQuestion(21)} onChange={(e) => handleInputChange(21, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              of the company exciting, their staff will be more motivated to work hard.
              </span> 
              
            </p>

            
          </div>

          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 22–27</h4>
            <p className="m-0 mt-1">Complete the sentences below.</p>
          </div>

          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-6 text-[14px] leading-loose">
            <h3 className="font-bold text-stone-900 border-b pb-2 mb-3">Choose ONE WORD ONLY from the text for each answer.</h3>
            <p>
              Write your answers in boxes 22–27 on your answer sheet. <br></br>
              <h1 className="font-bold text-center text-stone-900 border-b pb-2 mb-3" >The best way to resign</h1>
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> Avoid all
                <input type="text" placeholder="22" disabled={submitted} value={answers.q22 || ""} onFocus={() => setActiveQuestion(22)} onChange={(e) => handleInputChange(22, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              to resign in an angry way. Instead follow this procedure: <br />

<b>
Arrange a meeting with the boss to: </b> </span> 
              
              <span className="inline-block mx-1">
                 ● mention any projects which are underway and give ideas for their 

               &nbsp <input type="text" placeholder="23" disabled={submitted} value={answers.q23 || ""} onFocus={() => setActiveQuestion(23)} onChange={(e) => handleInputChange(23, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span>  <br />
             <span> ● discuss how much notice you need to give before you go. </span>
            <br />
             ● request information on the type of
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span>
                <input type="text" placeholder="24" disabled={submitted} value={answers.q24 || ""} onFocus={() => setActiveQuestion(24)} onChange={(e) => handleInputChange(24, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span>
             you will receive. <br />

<b> Steps you can take before you leave: </b> <br />
              <span className="inline-block mx-1"> 
                <span className="text-stone-400 font-bold mr-1"></span>  ● Work to cause as little
                <input type="text" placeholder="25" disabled={submitted} value={answers.q25 || ""} onFocus={() => setActiveQuestion(25)} onChange={(e) => handleInputChange(25, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span> as possible to the organisation.
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> ● Make sure your successor has adequate guidance on the organisation's systems.  <br />

<b>In the resignation letter:</b> <br /> ● avoid mentioning any
                <input type="text" placeholder="26" disabled={submitted} value={answers.q26 || ""} onFocus={() => setActiveQuestion(26)} onChange={(e) => handleInputChange(26, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              in the organisation.
              </span> 

              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span>● show appreciation for aspects of the job, e.g., the chance to improve your
                <input type="text" placeholder="27" disabled={submitted} value={answers.q27 || ""} onFocus={() => setActiveQuestion(27)} onChange={(e) => handleInputChange(27, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
  <br />  ●  indicate your wish to leave everything in good order.
              </span> 

              
              
            </p>

            
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

  const mcqData = [
    {
      num: 38,
      text: "What does the writer say about 'Words of the Year'?",
      options: [
        { k: "A", t: "They include increasing numbers of emojis." },
        { k: "B", t: "They are soon forgotten by the public." },
        { k: "C", t: "They are required to have social significance." },
        { k: "D", t: "They are invented by the writers of dictionaries." }
      ]
    },
    {
      num: 39,
      text: "The writer says that the usefulness of emojis is limited because",
      options: [
        { k: "A", t: "they are constantly being changed." },
        { k: "B", t: "they may not be correctly interpreted." },
        { k: "C", t: "they are difficult for some people to update." },
        { k: "D", t: "they are linked to specific operating systems." }
      ]
    },
    {
      num: 40,
      text: "What would be the best subtitle for this text?",
      options: [
        { k: "A", t: "Will emojis take over from words one day?" },
        { k: "B", t: "How can emojis be made more meaningful?" },
        { k: "C", t: "Are emojis used too much in our society today?" },
        { k: "D", t: "What do emojis tell us about the world we live in?" }
      ]
    }
  ];

  return (
    <ResizableLayout
      sectionTitle="READING PART 3"
      range="Questions 28–40"
      leftContent={
        <div>
          <h1 className="text-xl font-bold text-stone-900 mb-2">Emojis</h1>
          <p>
            <b>A</b> Language always changes, of course. This is one of the few constants about it. But it’s arguably changing at a faster rate now than at any previous moment in
            its history. And emojis – the set of picture characters that people use to punctuate their online correspondence – are at the forefront of this frenzy for change.
          </p>
          <br />
          <p>As a form of global communication, emojis only began their growth in 2011. Four years later, it was estimated that they were being used by over 90 per cent of the online population. In excess of six billion were being sent every day. Their prevalence in the culture was such that Oxford Dictionaries recently chose one as their word of the year. 'Words of the Year' are those judged to be reflective of the 'ethos, mood, or preoccupations of that particular year'. They’re very much of their time. And often, once that time has passed, they fade from people’s consciousness almost as quickly as they arose.  
 <br />
 <br />
There’s a good chance, then, that the emoji chosen by Oxford Dictionaries – the ‘face with tears of joy’ – will also appear to be dated in a few years. But the reasons for this offer a fascinating insight into the way that society is evolving. The little yellow circle with dots for eyes acts as a surprisingly good lens through which to view the history of human communication, and to predict its future.</p>
        <br />  <p><b>B</b> There are two main reasons why language changes. One is to do with the way that language mirrors the changes in how we relate to each other. As an expression of identity, language is adapted by different groups and different generations to reflect their own sense of self. It also needs to constantly assimilate fresh concepts as these evolve.  <br />
<br />
Words are being created for these reasons all the time. But what’s interesting about emojis is that they’ve contributed to this ever-expanding storehouse in a different way. At this point in our history, the gaps in our vocabulary are being filled not simply by new words, but by an absolutely new system of expression.</p>
       <br /> 
        
     <p> <b>C</b> The second major reason that language changes is down to technology – specifically, the ways in which the technologies we use have an effect on the process of communication itself. Both hardware and new technologies result in us subtly changing the way we interact with each other and also altering the shape of the language we use.  
<br />
<br />
Emojis have evolved as a solution to the needs of mobile communication. In particular, they compensate for the way that computer-mediated messaging on smartphones can sometimes tend towards the emotionally empty. Whereas face-to-face, or even voice-to-voice, conversations can express emotional closeness through facial expression or tone of voice, this is easy to miss when messages are rendered in a few short words on a small screen. Emojis are a means of restoring this emotional framing to an interaction – punctuating your message with a smile.</p>   
<br />
<br />
        <p><b>D</b> But unlike almost any other type of language system, emojis have something akin to a built-in obsolescence. Just as smartphones and their operating systems have a frequent refresh rate, emojis also get routine enhancements. The emojis you have on your phone now will undergo subtle redesigns over the course of time, and extra characters will be added. Because of this, their usefulness is artificially limited.  <br />
<br />
In the context of communication systems, this is something that’s never previously been the case. Twenty years ago, people might have bought a new landline phone when they were tired of the design of their old phone or if they wanted to get one with whatever latest innovation was going around – an inbuilt answering machine, say. But they didn’t have to upgrade the language they were using as well.  <br />
<br />
Emojis, on the other hand, are a case study of how technology and the human capacity for communication are working together – of how the onward march of technology exists at the intersection of consumerism, innovation and design. Moreover, the fact that they’re at the front line of a relentless wave of technologically driven change in communications practices encourages – if not necessitates – a great amount of creativity in the way they’re used.</p>
        <br />
        <p> <b>E</b> Finally, there’s the way they’ve become implicated in almost all aspects of modern society, from politics and marketing to art and entertainment. Emojis are the subject of musicals and Hollywood films. They’re the inspiration for fashion design, art and architecture. They’re a staple in advertising and commerce. Understanding why they’ve become so popular, and how they work, can not only explain something about the nature of language; it can also help us to understand our relationship with technology, society and ourselves.</p>
        </div>
      }
      rightContent={
        <>
          {/* Fill Blanks 28-37 */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px]">
            <h4 className="font-bold text-stone-900">Questions 28–37</h4>
            <p className="m-0 mt-1"><b>Read the text on pages 25 and 26 and answer Questions 28–40.</b> </p>
            <b>Questions 28–32</b>
            <p>The text on pages 25 and 26 has five sections, <b>A–E</b>.</p>
            <p>Choose the correct heading for each section from the list of headings below.</p>
            <p>Write the correct number, i–viii, in boxes 28–32 on your answer sheet.</p>
            
          </div>

          <h1><b>List of Headings</b></h1>

          <ul>
            <li>i Why emojis may have a short life</li>
            <li>ii Ways in which new emojis are designed and made available</li>
            <li>iii How words and emojis both fulfil new needs in our society</li>
            <li>iv How emojis are regarded in different ways by different cultures</li>
            <li>iv How emojis are regarded in different ways by different cultures</li>
            <li>v The use of emojis in different fields and what this means for us</li>
            <li>vi The rapid spread of a new way of interacting</li>
            <li>vii How and where emojis were first invented</li>
            <li>viii The value of emojis for making feelings clear</li>
          </ul>

          <div className="space-y-3 bg-white border border-stone-200 rounded-lg p-5 text-[14px]">
            {[28, 29, 30, 31, 32].map((num) => (
              <div key={num} id={`question-wrapper-${num}`} onClick={() => setActiveQuestion(num)} className="flex items-center gap-2 py-1">
                <span className="font-bold text-stone-400 w-6">{num}</span>
                <span className="text-stone-700">Write Correct Answer {num}:</span>
                <input 
                  placeholder={num}
                  type="text" disabled={submitted} value={answers[`q${num}`] || ""} onFocus={() => setActiveQuestion(num)}
                  onChange={(e) => handleInputChange(num, e.target.value)}
                  className="px-2 py-0.5 w-[160px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900"
                />
              </div>
            ))}
          </div>

          {/* MCQ 38-40 */}
          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 33–37</h4>
            <p className="m-0 mt-1">Complete the summery below.</p>
            <p className="m-0 mt-1">Choose <b>ONE WORD ONLY</b> from the text for each answer.</p>
            <p>Write your answer in boxes 33-37 on your answer sheet.</p>
          </div>


          <div className="space-y-4 bg-white border border-stone-200 rounded-lg p-6 text-[14px] leading-loose">
            
            <p>
              
              <h1 className="font-bold text-center text-stone-900 border-b pb-2 mb-3" >The importance of the 'face with tears of joy'</h1>
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> It is probable that before long, an emoji such as the ‘face with tears of joy’ will seem
                <input type="text" placeholder="33" disabled={submitted} value={answers.q33 || ""} onFocus={() => setActiveQuestion(33)} onChange={(e) => handleInputChange(33, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              

This is of interest as it tells us about developments in </span> 
              
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> mention any projects which are underway and give ideas for their
                <input type="text" placeholder="34" disabled={submitted} value={answers.q34 || ""} onFocus={() => setActiveQuestion(34)} onChange={(e) => handleInputChange(34, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span> 
              
            </p>
            
            <p>
              providing an effective way to focus on both the
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span>
                <input type="text" placeholder="35" disabled={submitted} value={answers.q35 || ""} onFocus={() => setActiveQuestion(35)} onChange={(e) => handleInputChange(35, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span>, 
             and the future of human communication.

Changes in language reflect changes in people’s relationships. They reflect the ways in which the:
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> Work to cause as little
                <input type="text" placeholder="36" disabled={submitted} value={answers.q36 || ""} onFocus={() => setActiveQuestion(36)} onChange={(e) => handleInputChange(36, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
              </span> 
              of groups and generations changes over time, and they allow new
              <span className="inline-block mx-1">
                <span className="text-stone-400 font-bold mr-1"></span> 
                <input type="text" placeholder="37" disabled={submitted} value={answers.q37 || ""} onFocus={() => setActiveQuestion(37)} onChange={(e) => handleInputChange(37, e.target.value)} className="px-2 py-0.5 w-[130px] border-b-2 border-stone-300 focus:border-emerald-600 bg-stone-50 outline-none text-center font-semibold text-stone-900" />
             to be included. However, emojis are interesting as they are a system that expresses these ideas in a completely new way.
              </span> 

              

              
              
            </p>

            
          </div>

          <div className="bg-stone-200 border-l-4 border-stone-700 p-4 rounded-r text-[14px] mt-6">
            <h4 className="font-bold text-stone-900">Questions 38–40</h4>
            <p className="m-0 mt-1">Choose the correct letter, <b>A, B, C or D</b>.</p>
          </div>

          <div className="space-y-5">
            {mcqData.map((q) => {
              const isActive = activeQuestion === q.num;
              const curVal = answers[`q${q.num}`] || "";

              return (
                <div 
                  key={q.num} id={`question-wrapper-${q.num}`} onClick={() => setActiveQuestion(q.num)}
                  className={`p-5 rounded-lg bg-white border transition-all space-y-3 ${
                    isActive ? "border-emerald-600 shadow-md ring-1 ring-emerald-600/20" : "border-stone-200"
                  }`}
                >
                  <p className="font-bold text-stone-900 text-[14px]">{q.num}. {q.text}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt) => {
                      const isSelected = curVal === opt.k;
                      return (
                        <button
                          key={opt.k} type="button" disabled={submitted}
                          onClick={(e) => { e.stopPropagation(); handleInputChange(q.num, opt.k); }}
                          className={`text-left p-3 rounded border transition-all text-[13px] flex items-center gap-3 ${
                            isSelected ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold" : "border-stone-200 hover:bg-stone-50 text-stone-700"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center border font-bold text-[11px] ${
                            isSelected ? "bg-emerald-600 text-white border-emerald-600" : "bg-stone-100 border-stone-300 text-stone-600"
                          }`}>
                            {opt.k}
                          </span>
                          {opt.t}
                        </button>
                      );
                    })}
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