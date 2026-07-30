// @ts-nocheck
const MATCH_ITEMS = [
  { num: 14, text: "reference to the need to ensure that inhabitants of wetland regions continue to benefit from them" },
  { num: 15, text: "the proportion of wetlands which have already been lost" },
  { num: 16, text: "reference to the idea that people are beginning to appreciate the value of wetlands" },
  { num: 17, text: "mention of the cultural significance of wetlands" },
];

const PARAGRAPHS = [
  {
    id: "A",
    text: `Wetlands are areas where water covers the soil, or is present either at or near the surface of the soil, for all or part of the year. These are complex ecosystems, rich in unique plant and animal life. But according to the World Wide Fund for Nature (WWFN), half of the world's wetlands have disappeared since 1900 – converted or destroyed for commercial development, drainage schemes and the extraction of minerals and peat*. Many of those that remain have been damaged by agricultural pesticides and fertilisers, industrial pollutants, and construction works.`,
  },
  {
    id: "B",
    text: `Throughout history, humans have gathered around wetlands, and their fertile ecosystems have played an important part in human development. Consequently, they are of considerable religious, historical and archaeological value to many communities around the world. 'Wetlands directly support the livelihoods and well-being of millions of people,' says Dr Matthew McCartney, principal researcher and hydrologist at the International Water Management Institute (IWMI). 'In many developing countries, large numbers of people are dependent on wetland agriculture for their livelihoods.'`,
  },
  {
    id: "C",
    text: `They also serve a crucial environmental purpose. 'Wetlands are one of the key tools in mitigating climate change across the planet,' says Pieter van Eijk, head of Climate Adaptation at Wetlands International (WI), pointing to their use as buffers that protect coastal areas from sea-level rise and extreme weather events such as hurricanes and flooding. Wetland coastal forests provide food and water, as well as shelter from storms, and WI and other agencies are working to restore those forests which have been lost. 'It can be as simple as planting a few trees per hectare to create shade and substantially change a microclimate,' he says. 'Implementing climate change projects isn't so much about money.'`,
  },
  {
    id: "D",
    text: `The world's wetlands are, unfortunately, rich sources for in-demand commodities, such as palm oil and pulpwood. Peatlands – wetlands with a waterlogged organic soil layer – are particularly targeted. When peatlands are drained for cultivation, they become net carbon emitters instead of active carbon stores, and, according to Marcel Silvius, head of Climate-smart Land-use at WI, this practice causes six per cent of all global carbon emissions. The clearance of peatlands for planting also increases the risk of forest fires, which release huge amounts of CO₂. 'We're seeing huge peatland forests with extremely high biodiversity value being lost for a few decades of oil palm revenues,' says Silvius.`,
  },
  {
    id: "E",
    text: `The damage starts when logging companies arrive to clear the trees. They dig ditches to enter the peat swamps by boat and then float the logs out the same way. These are then used to drain water out of the peatlands to allow for the planting of corn, oil palms or pulpwood trees. Once the water has drained away, bacteria and fungi then break down the carbon in the peat and turn it into CO₂ and methane. Meanwhile, the remainder of the solid matter in the peat starts to move downwards, in a process known as subsidence. Peat comprises 90 per cent water, so this is one of the most alarming consequences of peatland clearances. 'In the tropics, peat subsides at about four centimetres a year, so within half a century, very large landscapes on Sumatra and Borneo will become flooded as the peat drops below water level,' says Silvius. 'It's a huge catastrophe that's in preparation. Some provinces will lose 40 per cent of their landmass.'`,
  },
  {
    id: "F",
    text: `And while these industries affect wetlands in ways that can easily be documented, Dr Dave Tickner of the WWFN believes that more subtle impacts can be even more devastating. 'Sediment run-off and fertilisers can be pretty invisible,' says Tickner. 'Over-extraction of water is equally invisible. You do get shock stories about rivers running red, or even catching fire, but there's seldom one big impact that really hurts a wetland.' Tickner does not blame anyone for deliberate damage, however. 'I've worked on wetland issues for 20 years and have never met anybody who wanted to damage a wetland,' he says. 'It isn't something that people generally set out to do. Quite often, the effects simply come from people trying to make a living.'`,
  },
  {
    id: "G",
    text: `Silvius also acknowledges the importance of income generation. 'It's not that we just want to restore the biodiversity of wetlands – which we do – but we recognise there's a need to provide an income for local people.' This approach is supported by IWMI. 'The idea is that people in a developing country will only protect wetlands if they value and profit from them,' says McCartney. 'For sustainability, it's essential that local people are involved in wetland planning and decision making and have clear rights to use wetlands.'`,
  },
  {
    id: "H",
    text: `The fortunes of wetlands would be improved, Silvius suggests, if more governments recognised their long-term value. 'Different governments have different attitudes,' he says, and goes on to explain that some countries place a high priority on restoring wetlands, while others still deny the issue. McCartney is cautiously optimistic, however. 'Awareness of the importance of wetlands is growing,' he says. 'It's true that wetland degradation still continues at a rapid pace, but my impression is that things are slowly changing.'`,
  },
];

const EMPTY_LABEL = { A: 14, B: 15, C: 16, D: 17, E: 14, F: 15, G: 16, H: 17 };

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
      <h2 className="font-bold text-[18px] mb-1">The global importance of wetlands</h2>

      <div className="space-y-2 leading-[1.5] text-[17px] text-black">
        {PARAGRAPHS.map((p) => (
          <div key={p.id}>
            <StatementSlot paragraphId={p.id} answers={answers} setAnswer={setAnswer} />
            <div className="flex gap-3 mb-4">
              <p className="flex-1">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
