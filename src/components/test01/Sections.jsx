import React from "react";
import { CheckboxGroup, ChoiceGroup, TextBlank } from "./QuestionComponents";

import FarleyHouse from "../../assets/test/FarlyHouse.png"

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

// --- PART ONE (Hinchingbrooke Country Park) ---
export function PartOne({ answers, setAnswers, submitted }) {
    return (
        <div className="bg-transparent px-5 pb-14 max-[820px]:px-0">
            <PartHeader title="PART 1">Questions 1–10</PartHeader>
            <div className="mx-auto block w-full max-w-[780px] text-[16px] leading-[1.55] text-black [&_h2]:my-3.5 [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-black [&_h3]:mb-3 [&_h3]:mt-[34px] [&_h3]:text-[18px] [&_h3]:font-bold [&_h3]:text-black [&_p]:mb-[13px] [&_ul]:mb-[34px] [&_ul]:ml-[19px] [&_ul]:p-0 [&_li]:mb-[17px] [&_li]:pl-0.5">
                <p>Complete the notes below.</p>
                <p>Write <b>ONE WORD AND/OR A NUMBER</b> for each answer.</p>
                
                <h2>Hinchingbrooke Country Park</h2>
                <h3>The park</h3>
                <p><b>Area:</b> <TextBlank id="q1" placeholder="1" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /> hectares</p>
                <p><b>Habitats:</b> wetland, grassland and woodland</p>
                <p><b>Wetland:</b> lakes, ponds and a <TextBlank id="q2" placeholder="2" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></p>
                <p>Wildlife includes birds, insects and animals</p>

                <h3>Subjects studied in educational visits include</h3>
                <p><b>Science:</b> Children look at <TextBlank id="q3" placeholder="3" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /> about plants, etc.</p>
                <p><b>Geography:</b> includes learning to use a <TextBlank id="q4" placeholder="4" label="" suffix=" and compass" answers={answers} setAnswers={setAnswers} submitted={submitted} /></p>
                <p><b>History:</b> changes in land use</p>
                <p><b>Leisure and tourism:</b> mostly concentrates on the park’s <TextBlank id="q5" placeholder="5" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></p>
                <p style={{ whiteSpace: "nowrap" }}>
  <b>Music:</b> Children make {" "}
  <TextBlank
    id="q6"
    placeholder="6"
    label=""
    suffix=" with natural materials, and experiment with rhythm and speed."
    answers={answers}
    setAnswers={setAnswers}
    submitted={submitted}
  />
</p>

                <h3>Benefits of outdoor educational visits</h3>
                <p>They give children a feeling of <TextBlank id="q7" placeholder="7" label="" suffix=" that they may not have elsewhere." answers={answers} setAnswers={setAnswers} submitted={submitted} /></p>
                <p>Children learn new <TextBlank id="q8" placeholder="8" label="" suffix=" and gain self-confidence." answers={answers} setAnswers={setAnswers} submitted={submitted} /></p>

                <h3>Practical issues</h3>
                <p><b>Cost per child:</b>  £ <TextBlank id="q9" placeholder="9" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></p>
                <p>Adults, such as <TextBlank id="q10" placeholder="10" label="" suffix=", free" answers={answers} setAnswers={setAnswers} submitted={submitted} /></p>
            </div>
        </div>
    );
}

// --- PART TWO (Stanthorpe Twinning Association & Farley House Map) ---
export function PartTwo({ answers, setAnswers, submitted }) {
    return (
        <div className="bg-transparent px-5 pb-14 max-[820px]:px-0">
            <PartHeader title="PART 2">Questions 11–20</PartHeader>
            <div className="mx-auto block w-full max-w-[780px]">
                <p className="mb-[13px] text-[16px] leading-[1.55] text-black"><b>Questions 11–15</b></p>
                <p className="mb-[13px] text-[16px] leading-[1.55] text-black">Choose the correct letter, <b>A, B or C.</b></p>

                <h2 className="text-xl font-bold mb-4">Stanthorpe Twinning Association</h2>
                
                <ChoiceGroup id="q11" question="11 During the visit to Malatte, in France, members especially enjoyed" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "going to a theme park." }, { value: "B", text: "experiencing a river trip." }, { value: "C", text: "visiting a cheese factory." }]} />
                <ChoiceGroup id="q12" question="12 What will happen in Stanthorpe to mark the 25th anniversary of the Twinning Association?" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "A tree will be planted." }, { value: "B", text: "A garden seat will be bought." }, { value: "C", text: "A footbridge will be built." }]} />
                <ChoiceGroup id="q13" question="13 Which event raised most funds this year?" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "the film show" }, { value: "B", text: "the pancake evening" }, { value: "C", text: "the cookery demonstration" }]} />
                <ChoiceGroup id="q14" question="14 For the first evening with the French visitors host families are advised to" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "take them for a walk round the town." }, { value: "B", text: "go to a local restaurant." }, { value: "C", text: "have a meal at home." }]} />
                <ChoiceGroup id="q15" question="15 On Saturday evening there will be the chance to" answers={answers} setAnswers={setAnswers} submitted={submitted} options={[{ value: "A", text: "listen to a concert." }, { value: "B", text: "watch a match." }, { value: "C", text: "take part in a competition." }]} />

                <div className="mt-14">
                    <p className="font-bold">Questions 16–20</p>
                    <p>Label the map below.</p>
                    <p>Write the correct letter, <b>A–H</b>, next to Questions 16–20.</p>
                    <h2 className="text-center text-2xl font-bold my-4">Farley House</h2>
                    
                    <div className="border border-stone-300 p-4 mb-6 bg-white flex justify-center">
                         <img src={FarleyHouse} alt="" srcset="" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 items-center">
    <TextBlank id="q16" placeholder="16" label={<><b>16</b> Farm shop </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    <TextBlank id="q17" placeholder="17" label={<><b>17</b> Disabled entry </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    
    <TextBlank id="q18" placeholder="18" label={<><b>18</b> Adventure playground </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    
    <TextBlank id="q19" placeholder="19 " label={<><b>19</b> Kitchen gardens </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    
    <TextBlank id="q20" placeholder="20" label={<><b>20</b> The Temple of the Four Winds </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
</div>
                </div>
            </div>
        </div>
    );
}

// --- PART THREE (Bread Project & Food Trends) ---
export function PartThree({ answers, setAnswers, submitted }) {
    return (
        <div className="bg-transparent px-5 pb-14 max-[820px]:px-0">
            <PartHeader title="PART 3">Questions 21–30</PartHeader>
            <div className="mx-auto block w-full max-w-[780px]">
                <p className="font-bold">Questions 21 and 22</p>
                <CheckboxGroup id="q21" title="Which TWO things did Colin find most satisfying about his bread reuse project?" answers={answers} setAnswers={setAnswers} submitted={submitted} note="Choose TWO letters, A–E." options={[{ value: "A", text: "receiving support from local restaurants" }, { value: "B", text: "finding a good way to prevent waste" }, { value: "C", text: "overcoming problems in a basic process" }, { value: "D", text: "experimenting with designs and colours" }, { value: "E", text: "learning how to apply 3-D printing" }]} />

                <p className="font-bold mt-10">Questions 23 and 24</p>
                <CheckboxGroup id="q23" title="Which TWO ways do the students agree that touch-sensitive sensors for food labels could be developed in future?" answers={answers} setAnswers={setAnswers} submitted={submitted} note="Choose TWO letters, A–E." options={[{ value: "A", text: "for use on medical products" }, { value: "B", text: "to show that food is no longer fit to eat" }, { value: "C", text: "for use with drinks as well as foods" }, { value: "D", text: "to provide applications for blind people" }, { value: "E", text: "to indicate the weight of certain foods" }]} />

                <div className="mt-14">
                    <p className="font-bold">Questions 25–30</p>
                    <p>What is the students' opinion about each of the following food trends?</p>
                    <p>Choose <b>SIX</b> answers from the box and write the correct letter, <b>A–H</b>, next to Questions 25–30.</p>
                    
                    <div className="border border-stone-300 p-4 bg-stone-50 rounded my-5">
                        <h3 className="font-bold mb-2">Opinions</h3>
                        <p><b>A</b> This is only relevant to young people.</p>
                        <p><b>B</b> This may have disappointing results.</p>
                        <p><b>C</b> This already seems to be widespread.</p>
                        <p><b>D</b> Retailers should do more to encourage this.</p>
                        <p><b>E</b> More financial support is needed for this.</p>
                        <p><b>F</b> Most people know little about this.</p>
                        <p><b>G</b> There should be stricter regulations about this.</p>
                        <p><b>H</b> This could be dangerous.</p>
                    </div>

                    <b>Food trends</b>

                    <div className="space-y-3 [&>*]:flex [&>*]:justify-between [&>*]:items-center">
    <TextBlank id="q25" placeholder="25" label={<><b>25</b> Use of local products </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    <TextBlank id="q26" placeholder="26" label={<><b>26</b> Reduction in unnecessary packaging </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    <TextBlank id="q27" placeholder="27" label={<><b>27</b> Gluten-free and lactose-free food </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    <TextBlank id="q28" placeholder="28" label={<><b>28</b> Use of branded products related to celebrity chefs </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    <TextBlank id="q29" placeholder="29" label={<><b>29</b> Development of 'ghost kitchens' for takeaway food </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
    <TextBlank id="q30" placeholder="30" label={<><b>30</b> Use of mushrooms for common health concerns </>} answers={answers} setAnswers={setAnswers} submitted={submitted} />
</div>
                </div>
            </div>
        </div>
    );
}

// --- PART FOUR (Céide Fields) ---
export function PartFour({ answers, setAnswers, submitted }) {
    return (
        <div className="bg-transparent px-5 pb-14 max-[820px]:px-0">
            <PartHeader title="PART 4">Questions 31–40</PartHeader>
            <div className="mx-auto block w-full max-w-[780px] text-[16px] leading-[1.55] text-black [&_h2]:my-3.5 [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-black [&_h3]:mb-3 [&_h3]:mt-[34px] [&_h3]:text-[18px] [&_h3]:font-bold [&_h3]:text-black [&_p]:mb-[13px] [&_ul]:mb-[34px] [&_ul]:ml-[19px] [&_ul]:p-0 [&_li]:mb-[17px] [&_li]:pl-0.5">
                <p>Complete the notes below.</p>
                <p>Write <b>ONE WORD ONLY</b> for each answer.</p>
                
                <h2 className="text-center">Céide Fields</h2>
                <ul className="list-disc pl-5">
                    <li>an important Neolithic archaeological site in the northwest of Ireland</li>
                </ul>

                <h3>Discovery</h3>
                <ul className="list-disc pl-5">
                    <li className="flex items-center whitespace-nowrap gap-2">
    <span>In the 1930s, a local teacher realised that stones beneath the bog surface were once</span>
    <TextBlank id="q31" placeholder="31" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} />
</li>
                    <li>His <TextBlank id="q32" placeholder="32" label="" suffix=" became an archaeologist and undertook an investigation of the site:" answers={answers} setAnswers={setAnswers} submitted={submitted} />
                        <ul className="mt-2 list-circle pl-5">
                            <li className="flex items-center whitespace-nowrap gap-2"> — a traditional method used by local people to dig for <TextBlank id="q33" placeholder="33" label="" suffix=" was used to identify where stones were located" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                            <li> — carbon dating later proved the site was Neolithic.</li>
                        </ul>
                    </li>
                    <li>Items are well preserved in the bog because of a lack of <TextBlank id="q34" placeholder="34" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                </ul>

                <h3>Neolithic farmers</h3>
                <ul className="list-disc pl-5">
                    <li>Houses were <TextBlank id="q35" placeholder="35" label="" suffix=" in shape and had a hole in the roof." answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                    <li>Neolithic innovations include:
                        <ul className="mt-2 list-circle pl-5">
                            <li> — cooking indoors</li>
                            <li> — pots used for storage and to make <TextBlank id="q36" placeholder="36" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                        </ul>
                    </li>
                    <li>Each field at Céide was large enough to support a big <TextBlank id="q37" placeholder="37" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                    <li >The fields were probably used to restrict the grazing of animals – no evidence of structures to house them during <TextBlank id="q38" placeholder="38" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                </ul>

                <h3>Reasons for the decline in farming</h3>
                <ul className="list-disc pl-5">
                    <li>a decline in <TextBlank id="q39" placeholder="39" label="" suffix=" quality" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                    <li>an increase in <TextBlank id="q40" placeholder="40" label="" answers={answers} setAnswers={setAnswers} submitted={submitted} /></li>
                </ul>
            </div>
        </div>
    );
}