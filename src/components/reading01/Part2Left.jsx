// @ts-nocheck
const MATCH_ITEMS = [
  { num: 14, text: "a reference to a denial of involvement in piracy" },
  { num: 15, text: "details of how a campaign to eradicate piracy was carried out" },
  { num: 16, text: "a mention of the circumstances in which states in the ancient world would make use of pirates" },
  { num: 17, text: "a reference to how people today commonly view pirates" },
  { num: 18, text: "an explanation of how some people were encouraged not to return to piracy" },
  { num: 19, text: "a mention of the need for many sailing vessels to stay relatively close to land" },
];

const PARAGRAPHS = [
  {
    id: "A",
    text: `When one mentions pirates, an image springs to most people's minds of a crew of misfits, daredevils and adventurers in command of a tall sailing ship in the Caribbean Sea. Yet from the first to the third millennium BCE, thousands of years before these swashbucklers began spreading fear across the Caribbean, pirates prowled the Mediterranean, raiding merchant ships and threatening vital trade routes. However, despite all efforts and the might of various ancient states, piracy could not be stopped. The situation remained unchanged for thousands of years. Only when the pirates directly threatened the interests of ancient Rome did the Roman Republic organise a massive fleet to eliminate piracy. Under the command of the Roman general Pompey, Rome eradicated piracy, transforming the Mediterranean into 'Mare Nostrum' (Our Sea).`,
  },
  {
    id: "B",
    text: `Although piracy in the Mediterranean is first recorded in ancient Egypt during the reign of Pharaoh Amenhotep III (c 1390–1353 BCE), it is reasonable to assume it predated this powerful civilisation. This is partly due to the great importance the Mediterranean held at this time, and partly due to its geography. While the Mediterranean region is predominantly fertile, some parts are rugged and hilly, even mountainous. In the ancient times, the inhabitants of these areas relied heavily on marine resources, including fish and salt. Most had their own boats, possessed good seafaring skills, and unsurpassed knowledge of the local coastline and sailing routes. Thus, it is not surprising that during hardships, these men turned to piracy. Geography itself further benefited the pirates, with the numerous coves along the coast providing places for them to hide their boats and strike undetected. Before the invention of ocean-going caravels* in the 15th century, ships could not easily cross long distances over open water. Thus, in the ancient world most were restricted to a few well-known navigable routes that followed the coastline. Caught in a trap, a slow merchant ship laden with goods had no other option but to surrender. In addition, knowledge of the local area helped the pirates to avoid retaliation once a state fleet arrived.`,
  },
  {
    id: "C",
    text: `One should also add that it was not unknown in the first and second millennia BCE for governments to resort to pirates' services, especially during wartime, employing their skills and numbers against their opponents. A pirate fleet would serve in the first wave of attack, preparing the way for the navy. Some of the regions were known for providing safe harbours to pirates, who, in return, boosted the local economy.`,
  },
  {
    id: "D",
    text: `The first known record of a named group of Mediterranean pirates, made during the rule of ancient Egyptian Pharaoh Akhenaten (c 1353–1336 BCE), was in the Amarna Letters. These were extracts of diplomatic correspondence between the pharaoh and his allies, and covered many pressing issues, including piracy. It seems the pharaoh was troubled by two distinct pirate groups, the Lukka and the Sherden. Despite the Egyptian fleet's best efforts, the pirates continued to cause substantial disruption to regional commerce. In the letters, the king of Alashiya (modern Cyprus) rejected Akhenaten's claims of a connection with the Lukka (based in modern-day Turkey). The king assured Akhenaten he was prepared to punish any of his subjects involved in piracy.`,
  },
  {
    id: "E",
    text: `The ancient Greek world's experience of piracy was different from that of Egyptian rulers. While Egypt's power was land-based, the ancient Greeks relied on the Mediterranean in almost all aspects of life, from trade to warfare. Interestingly, in his works the Iliad and the Odyssey, the ancient Greek writer Homer not only condones, but praises the lifestyle and actions of pirates. The opinion remained unchanged in the following centuries. The ancient Greek historian Thucydides, for instance, glorified pirates' daring attacks on ships or even cities. For Greeks, piracy was a part of everyday life. Even high-ranking members of the state were not beyond engaging in such activities. According to the Greek orator Demosthenes, in 355 BCE, Athenian ambassadors made a detour from their official travel to capture a ship sailing from Egypt, taking the wealth found onboard for themselves! The Greeks' liberal approach towards piracy does not mean they always tolerated it, but attempts to curtail piracy were hampered by the large number of pirates operating in the Mediterranean.`,
  },
  {
    id: "F",
    text: `The rising power of ancient Rome required the Roman Republic to deal with piracy in the Mediterranean. While piracy was a serious issue for the Republic, Rome profited greatly from its existence. Pirate raids provided a steady source of slaves, essential for Rome's agriculture and mining industries. But this arrangement could work only while the pirates left Roman interests alone. Pirate attacks on grain ships, which were essential to Roman citizens, led to angry voices in the Senate, demanding punishment of the culprits. Rome, however, did nothing, further encouraging piracy. By the 1st century BCE, emboldened pirates kidnapped prominent Roman dignitaries, asking for a large ransom to be paid. Their most famous hostage was none other than Julius Caesar, captured in 75 BCE.`,
  },
  {
    id: "G",
    text: `By now, Rome was well aware that pirates had outlived their usefulness. The time had come for concerted action. In 67 BCE, a new law granted Pompey vast funds to combat the Mediterranean menace. Taking personal command, Pompey divided the entire Mediterranean into 13 districts, assigning a fleet and commander to each. After cleansing one district of pirates, the fleet would join another in the next district. The process continued until the entire Mediterranean was free of pirates. Although thousands of pirates died at the hands of Pompey's troops, as a long-term solution to the problem, many more were offered land in fertile areas located far from the sea. Instead of a maritime menace, Rome got productive farmers that further boosted its economy.`,
  },
];

// Drop-zone empty label: question numbers (not A/B/C) — same visual as your heading design
const EMPTY_LABEL = { A: 14, B: 15, C: 16, D: 17, E: 18, F: 19, G: 19 };

function findItem(num) {
  return MATCH_ITEMS.find((item) => item.num === num);
}

function StatementSlot({ paragraphId, answers, setAnswer }) {
  const placedNums = MATCH_ITEMS.map((item) => item.num).filter(
    (num) => answers[String(num)] === paragraphId
  );

  const onDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/statement");
    if (!raw) return;
    const num = Number(raw);
    if (!num) return;
    setAnswer(String(num), paragraphId);
  };

  const clearOne = (num) => setAnswer(String(num), null);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="border border-dashed border-gray-500 rounded-sm my-2 min-h-[36px] flex flex-col items-center justify-center text-center text-[17px] font-bold bg-white px-2 py-1.5 gap-1"
    >
      {placedNums.length === 0 ? (
        <span className="text-gray-600 font-semibold">{EMPTY_LABEL[paragraphId]}</span>
      ) : (
        placedNums.map((num) => {
          const item = findItem(num);
          return (
            <span
              key={num}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/statement", String(num));
                e.dataTransfer.effectAllowed = "move";
              }}
              className="bg-white px-2 py-0.5 cursor-pointer w-full text-left font-bold leading-[1.3]"
              onClick={() => clearOne(num)}
              title="Click to remove"
            >
              {item?.text}
            </span>
          );
        })
      )}
    </div>
  );
}

export default function Part2Left({ answers, setAnswer }) {
  return (
    <>
      <h2 className="font-bold text-[18px] mb-1">The pirates of the ancient Mediterranean</h2>
      <p className="italic text-[16px] text-black mb-5 leading-[1.4]">
        In the first and second millennia BCE, pirates sailed around the Mediterranean, attacking
        ships and avoiding pursuers
      </p>

      <div className="space-y-2 leading-[1.5] text-[17px] text-black">
        {PARAGRAPHS.map((p) => (
          <div key={p.id}>
            <StatementSlot paragraphId={p.id} answers={answers} setAnswer={setAnswer} />
            <div className="flex gap-3 mb-4">
              {/* <span className="font-bold flex-shrink-0 w-5">{p.id}</span> */}
              <p className="flex-1">{p.text}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[14px] text-gray-700 leading-[1.4]">
        <span className="font-semibold">*</span> caravels: historical sailing ships that could sail
        across oceans
      </p>
    </>
  );
}
