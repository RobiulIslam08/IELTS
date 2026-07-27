import React from "react";
import { CheckboxGroup, ChoiceGroup, TextBlank } from "./QuestionComponents";

/**
 * Reusable Header for each Part
 */
function PartHeader({ title, children }) {
    return (
        <section className="mx-auto mb-4 block w-[740px] max-w-full border border-stone-300 bg-stone-100 px-5 py-[18px] [&_h2]:mb-1 [&_h2]:text-[18px] [&_h2]:font-bold [&_h2]:leading-[1.2] [&_h2]:text-stone-900 [&_p]:m-0 [&_p]:text-[14px] [&_p]:leading-[1.4] [&_p]:text-stone-500">
            <h2>{title}</h2>
            <p>{children}</p>
        </section>
    );
}

// --- PART ONE (Guitar Group) ---
export function PartOne({ answers, setAnswers, submitted }) {
    return (
        <div className="bg-transparent px-5 pb-14 max-[820px]:px-0">
            <PartHeader title="PART 1">Questions 1–10</PartHeader>
            <div className="mx-auto block w-full max-w-[780px] text-[16px] leading-[1.55] text-black [&_h2]:my-3.5 [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-black [&_h3]:mb-3 [&_h3]:mt-[34px] [&_h3]:text-[18px] [&_h3]:font-bold [&_h3]:text-black [&_p]:mb-[13px] [&_table]:mb-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-stone-300 [&_th]:bg-stone-50 [&_th]:p-2 [&_td]:border [&_td]:border-stone-300 [&_td]:p-2">
                
                <p className="font-bold">Questions 1–6</p>
                <p>Complete the form below.</p>
                <p className="mb-6">Write <b>ONE WORD AND/OR A NUMBER</b> for each answer.</p>
                
                {/* বইয়ের মতো নিখুঁত বর্ডারযুক্ত ফর্ম বক্স */}
                <div className="border border-stone-400 p-6 bg-white rounded-sm shadow-sm max-w-[650px] mx-auto mb-10 space-y-4">
                    <h2 className="text-center text-xl font-bold border-none !my-2">Guitar Group</h2>
                    
                    <div className="grid grid-cols-[160px_1fr] items-center gap-y-3 gap-x-2 text-[15px]">
                        
                        {/* Question 1 */}
                        <span className="font-semibold text-stone-800">Coordinator:</span>
                        <div className="flex items-center gap-1 w-full">
                            <span className="shrink-0">Gary </span>
                            <div className="flex-1 min-w-[120px]">
                                <TextBlank id="q1" placeholder="1" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} />
                            </div>
                        </div>

                        {/* Question 2 */}
                        <span className="font-semibold text-stone-800">Level:</span>
                        <div className="flex items-center gap-1 w-full">
                            <span className="shrink-0"></span>
                            <div className="flex-1 min-w-[120px]">
                                <TextBlank id="q2" placeholder="2" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} />
                            </div>
                        </div>

                        {/* Question 3 & 4 */}
                        <span className="font-semibold text-stone-800">Place:</span>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-1">
                                <span className="shrink-0">the </span>
                                <div className="flex-1 min-w-[120px]">
                                    <TextBlank id="q3" placeholder="3" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} />
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="shrink-0"></span>
                                <div className="flex-1 min-w-[120px]">
                                    <TextBlank id="q4" placeholder="4" label="" suffix=" Street" answers={answers} setAnswers={setAnswers} submitted={submitted} />
                                </div>
                            </div>
                            <span className="text-stone-500 text-sm pl-1">First floor, Room T347</span>
                        </div>

                        {/* Question 5 */}
                        <span className="font-semibold text-stone-800">Time:</span>
                        <div className="flex items-center gap-1 w-full">
                            <span className="shrink-0">Thursday morning at </span>
                            <div className="flex-1 min-w-[120px]">
                                <TextBlank id="q5" placeholder="5" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} />
                            </div>
                        </div>

                        {/* Question 6 */}
                        <span className="font-semibold text-stone-800">Recommended website:</span>
                        <div className="flex items-center gap-1 w-full">
                            <span className="shrink-0">'The perfect </span>
                            <div className="flex-1 min-w-[120px]">
                                <TextBlank id="q6" placeholder="6" label="" suffix="'" answers={answers} setAnswers={setAnswers} submitted={submitted} />
                            </div>
                        </div>

                    </div>
                </div>

                <h3 className="mt-14">Questions 7–10</h3>
                <p>Complete the table below.</p>
                <p>Write <b>ONE WORD ONLY</b> for each answer.</p>
                
                <h2 className="text-[18px] mt-4">A typical 45-minute guitar lesson</h2>
                <table className="w-full text-left text-sm mt-2">
                    <thead>
                        <tr>
                            <th className="w-[15%]">Time</th>
                            <th className="w-[35%]">Activity</th>
                            <th className="w-[50%]">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>5 minutes</td>
                            <td>tuning guitars</td>
                            <td>using an app or by <TextBlank id="q7" placeholder="7" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></td>
                        </tr>
                        <tr>
                            <td>10 minutes</td>
                            <td>strumming chords using our thumbs</td>
                            <td>keeping time while the teacher is <TextBlank id="q8" placeholder="8" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></td>
                        </tr>
                        <tr>
                            <td>15 minutes</td>
                            <td>playing songs</td>
                            <td>often listening to a <TextBlank id="q9" placeholder="9" label="" suffix=" of a song" answers={answers} setAnswers={setAnswers} submitted={submitted} /></td>
                        </tr>
                        <tr>
                            <td>10 minutes</td>
                            <td>playing single notes and simple tunes</td>
                            <td>playing together, then <TextBlank id="q10" placeholder="10" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></td>
                        </tr>
                        <tr>
                            <td>5 minutes</td>
                            <td>noting things to practise at home</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- PART TWO (Working as a lifeboat volunteer) ---
export function PartTwo({ answers, setAnswers, submitted }) {
    return (
        <div className="bg-transparent px-5 pb-14 max-[820px]:px-0">
            <PartHeader title="PART 2">Questions 11–20</PartHeader>
            <div className="mx-auto block w-full max-w-[780px]">
                <p className="mb-[13px] text-[16px] leading-[1.55] text-black"><b>Questions 11–16</b></p>
                <p className="mb-[13px] text-[16px] leading-[1.55] text-black">Choose the correct letter, <b>A, B or C.</b></p>

                <h2 className="text-xl font-bold mb-4">Working as a lifeboat volunteer</h2>
                
                <ChoiceGroup id="q11" question="What made David leave London and move to Northsea?" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "He was eager to develop a hobby." }, { value: "B", text: "He wanted to work shorter hours." }, { value: "C", text: "He found his job in website design unsatisfying." }]} />
                <ChoiceGroup id="q12" question="The Lifeboat Institution in Northsea was built with money provided by" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "a local organisation." }, { value: "B", text: "a local resident." }, { value: "C", text: "the local council." }]} />
                <ChoiceGroup id="q13" question="In his health assessment, the doctor was concerned about the fact that David" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "might be colour blind." }, { value: "B", text: "was rather short-sighted." }, { value: "C", text: "had undergone eye surgery." }]} />
                <ChoiceGroup id="q14" question="After arriving at the lifeboat station, they aim to launch the boat within" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "five minutes." }, { value: "B", text: "six to eight minutes." }, { value: "C", text: "eight and a half minutes." }]} />
                <ChoiceGroup id="q15" question="As a 'helmsman', David has the responsibility of deciding" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "who will be the members of his crew." }, { value: "B", text: "what equipment it will be necessary to take." }, { value: "C", text: "if the lifeboat should be launched." }]} />
                <ChoiceGroup id="q16" question="As well as going out on the lifeboat, David" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "gives talks on safety at sea." }, { value: "B", text: "helps with fundraising." }, { value: "C", text: "recruits new volunteers." }]} />

                <div className="mt-14">
                    <p className="font-bold">Questions 17 and 18</p>
                    <CheckboxGroup id="q17" title="Which TWO things does David say about the lifeboat volunteer training?" answers={answers} setAnswers={setAnswers} submitted={submitted} note="Choose TWO letters, A-E." options={[{ value: "A", text: "The residential course developed his leadership skills." }, { value: "B", text: "The training in use of ropes and knots was quite brief." }, { value: "C", text: "The training exercises have built up his mental strength." }, { value: "D", text: "The casualty care activities were particularly challenging for him." }, { value: "E", text: "The wave tank activities provided practice in survival techniques." }]} />
                </div>

                <div className="mt-10">
                    <p className="font-bold">Questions 19 and 20</p>
                    <CheckboxGroup id="q19" title="Which TWO things does David find most motivating about the work he does?" answers={answers} setAnswers={setAnswers} submitted={submitted} note="Choose TWO letters, A-E." options={[{ value: "A", text: "experiences when working in winter" }, { value: "B", text: "working as part of a team" }, { value: "C", text: "being thanked by those he has helped" }, { value: "D", text: "the fact that it keeps him fit" }, { value: "E", text: "the chance to develop new equipment" }]} />
                </div>
                
                
            </div>
        </div>
    );
}

// --- PART THREE (Recycling Footwear) ---
export function PartThree({ answers, setAnswers, submitted }) {
    return (
        <div className="bg-transparent px-5 pb-14 max-[820px]:px-0">
            <PartHeader title="PART 3">Questions 21–30</PartHeader>
            <div className="mx-auto block w-full max-w-[780px]">
                <p className="mb-[13px] text-[16px] leading-[1.55] text-black"><b>Questions 21–24</b></p>
                <p className="mb-[13px] text-[16px] leading-[1.55] text-black">Choose the correct letter, <b>A, B or C.</b></p>
                
                <h2 className="text-xl font-bold mb-4">Recycling Footwear</h2>

                <ChoiceGroup id="q21" question="At first, Don thought the topic of recycling footwear might be too" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "limited in scope." }, { value: "B", text: "hard to research." }, { value: "C", text: "boring for listeners." }]} />
                <ChoiceGroup id="q22" question="When discussing trainers, Bella and Don disagree about" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "how popular they are among young people." }, { value: "B", text: "how suitable they are for school." }, { value: "C", text: "how quickly they wear out." }]} />
                <ChoiceGroup id="q23" question="Bella says that she sometimes recycles shoes because" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "they no longer fit." }, { value: "B", text: "she no longer likes them." }, { value: "C", text: "they are no longer in fashion." }]} />
                <ChoiceGroup id="q24" question="What did the article say that confused Don?" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "Public consumption of footwear has risen." }, { value: "B", text: "Less footwear is recycled now than in the past." }, { value: "C", text: "People dispose of more footwear than they used to." }]} />

                <div className="mt-14">
                    <p className="font-bold">Questions 25–28</p>
                    <p>What reasons did the recycling manager give for rejecting footwear, according to the students?</p>
                    <p>Choose <b>FOUR</b> answers from the box and write the correct letter, <b>A–F</b>, next to Questions 25–28.</p>
                    
                    <div className="border border-stone-300 p-4 bg-stone-50 rounded my-5">
                        <h3 className="font-bold mb-2">Reasons</h3>
                        <p><b>A</b> one shoe was missing</p>
                        <p><b>B</b> the colour of one shoe had faded</p>
                        <p><b>B</b> the colour of one shoe had faded</p>
                        <p><b>C</b> one shoe had a hole in it</p>
                        <p><b>D</b> the shoes were brand new</p>
                        <p><b>E</b> the shoes were too dirty</p>
                        <p><b>F</b> the stitching on the shoes was broken</p>
                    </div>

                    <div className="flex flex-col gap-4">
    <TextBlank id="q25" placeholder="25" label={<><b>25 </b>high-heeled shoes</>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    
    
    <TextBlank id="q26" placeholder="26" label={<><b>26 </b>the ankle boots</>} answers={answers} setAnswers={setAnswers} submitted={submitted} />

    
    <TextBlank id="q27" placeholder="27" label={<><b>27 </b>the baby shoes</>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
   
    
    <TextBlank id="q28" placeholder="28" label={<><b>28 </b> the trainers</>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
</div>
                </div>

                <div className="mt-14">
                    <p className="font-bold">Questions 29-30</p>
                    <p className="mb-4">Choose the correct letter, <b>A, B or C.</b></p>
                    <ChoiceGroup id="q29" question="Why did the project to make 'new' shoes out of old shoes fail?" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "People believed the 'new' pairs of shoes were unhygienic." }, { value: "B", text: "There were not enough good parts to use in the old shoes." }, { value: "C", text: "The shoes in the 'new' pairs were not completely alike." }]} />
                    <ChoiceGroup id="q30" question="Bella and Don agree that they can present their topic" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "from a new angle." }, { value: "B", text: "with relevant images." }, { value: "C", text: "in a straightforward way." }]} />
                </div>
            </div>
        </div>
    );
}

// --- PART FOUR (Tardigrades) ---
export function PartFour({ answers, setAnswers, submitted }) {
    return (
        <div className="bg-transparent px-5 pb-14 max-[820px]:px-0">
            <PartHeader title="PART 4">Questions 31–40</PartHeader>
            <div className="mx-auto block w-full max-w-[780px] text-[16px] leading-[1.55] text-black [&_h2]:my-3.5 [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-black [&_h3]:mb-3 [&_h3]:mt-[34px] [&_h3]:text-[18px] [&_h3]:font-bold [&_h3]:text-black [&_p]:mb-[13px] [&_ul]:mb-[34px] [&_ul]:ml-[19px] [&_ul]:p-0 [&_li]:mb-[17px] [&_li]:pl-0.5">
                <p>Complete the notes below.</p>
                <p>Write <b>ONE WORD ONLY</b> for each answer.</p>
                
                <h2 className="text-center">Tardigrades</h2>
                <ul className="list-disc pl-5">
                    <li>more than 1,000 species, 0.05-1.2 millimetres long</li>
                    <li>also known as water 'bears' (due to how they <TextBlank id="q31" placeholder="31" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} />) or 'moss piglets'</li>
                </ul>

                <h3>Physical appearance</h3>
                <ul className="list-disc pl-5">
                    <li>round body and four pairs of legs</li>
                    <li>a <TextBlank id="q32" placeholder="32" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /> and claws or <TextBlank id="q33" placeholder="33" label="" suffix=" for gripping" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                    <li>absence of respiratory organs</li>
                    <li>body filled with a liquid that carries both <TextBlank id="q34" placeholder="34" label="" suffix=" and blood" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                    <li>mouth shaped like a <TextBlank id="q35" placeholder="35" label="" suffix=" with teeth called stylets" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                </ul>

                <h3>Habitat</h3>
                <ul className="list-disc pl-5">
                    <li>often found at the bottom of a lake or on plants</li>
                    <li>very resilient and can exist in very low or high <TextBlank id="q36" placeholder="36" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                </ul>

                <h3>Cryptobiosis</h3>
                <ul className="list-disc pl-5">
                    <li>In dry conditions, they roll into a ball called a 'tun'.</li>
                    <li>They stay alive with a much lower metabolism than usual.</li>
                    <li>A type of <TextBlank id="q37" placeholder="37" label="" suffix=" ensures their DNA is not damaged." answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                    <li>Research is underway to find out how many days they can stay alive in <TextBlank id="q38" placeholder="38" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                </ul>

                <h3>Feeding</h3>
                <ul className="list-disc pl-5">
                    <li>consume liquids, e.g., those found in moss or <TextBlank id="q39" placeholder="39" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                    <li>may eat other tardigrades</li>
                </ul>

                <h3>Conservation status</h3>
                <ul className="list-disc pl-5">
                    <li>They are not considered to be <TextBlank id="q40" placeholder="40" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                </ul>
            </div>
        </div>
    );
}