// @ts-nocheck
// Drop-target heading slots for questions 14-17
const HEADING_NUMS = [14, 15, 16, 17];

function findHeadingSlot(answers, heading, excludeNum) {
  return HEADING_NUMS.find((num) => num !== excludeNum && answers[String(num)] === heading);
}

function HeadingSlot({ num, answers, setAnswer }) {
  const value = answers[String(num)];
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    e.preventDefault();
    const heading = e.dataTransfer.getData("text/heading");
    if (!heading) return;

    const previousSlot = findHeadingSlot(answers, heading, num);
    if (previousSlot) setAnswer(String(previousSlot), null);
    setAnswer(String(num), heading);
  };
  const clear = () => setAnswer(String(num), null);

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="border border-dashed border-gray-500 rounded-sm   my-2 min-h-7 flex items-center justify-center text-center text-[17px] font-bold bg-white"
    >
      {value ? (
        <span
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/heading", value);
            e.dataTransfer.effectAllowed = "move";
          }}
          className="bg-white px-2  cursor-pointer "
          onClick={clear}
          title="Click to remove"
        >
          {value}
        </span>
      ) : (
        <span className="text-gray-600 font-semibold">{num}</span>
      )}
    </div>
  );
}

export default function Part2Left({ answers, setAnswer }) {
  return (
    <>
      <h2 className="font-bold text-[17px] mb-4">The global importance of wetlands </h2>

      

      <div className="space-y-4 leading-[1.5] text-[17px] text-black ">
        <b>A</b>
        <p>
          Wetlands are areas where water covers the soil, or is present either at or near the surface of the soil, for all or part of the year. These are complex ecosystems, rich in unique plant and animal life. But according to the World Wide Fund for Nature (WWFN), half of the world's wetlands have disappeared since 1900 – converted or destroyed for commercial development, drainage schemes and the extraction of minerals and peat*. Many of those that remain have been damaged by agricultural pesticides and fertilisers, industrial pollutants, and construction works.
        </p>
        <b>B</b>
        <p>
          Throughout history, humans have gathered around wetlands, and their fertile ecosystems have played an important part in human development. Consequently, they are of considerable religious, historical and archaeological value to many communities around the world. 'Wetlands directly support the livelihoods and well-being of millions of people,' says Dr Matthew McCartney, principal researcher and hydrologist at the International Water Management Institute (IWMI). 'In many developing countries, large numbers of people are dependent on wetland agriculture for their livelihoods.'
        </p>
        <b>C</b>
        
        <p>
          They also serve a crucial environmental purpose. 'Wetlands are one of the key tools in mitigating climate change across the planet,' says Pieter van Eijk, head of Climate Adaptation at Wetlands International (WI), pointing to their use as buffers that protect coastal areas from sea-level rise and extreme weather events such as hurricanes and flooding. Wetland coastal forests provide food and water, as well as shelter from storms, and WI and other agencies are working to restore those forests which have been lost. 'It can be as simple as planting a few trees per hectare to create shade and substantially change a microclimate,' he says. 'Implementing climate change projects isn't so much about money,'
        </p>
      </div>

    

      <div className="space-y-4 leading-[1.6] text-[14px] sm:text-[15px]">
        <b>D</b>
        <p>
          The world's wetlands are, unfortunately, rich sources for in-demand commodities, such as palm oil and pulpwood. Peatlands – wetlands with a waterlogged organic soil layer – are particularly targeted. When peatlands are drained for cultivation, they become net carbon emitters instead of active carbon stores, and, according to Marcel Silvius, head of Climate-smart Land-use at WI, this practice causes six per cent of all global carbon emissions. The clearance of peatlands for planting also increases the risk of forest fires, which release huge amounts of CO<sub>2</sub>. 'We're seeing huge peatland forests with extremely high biodiversity value being lost for a few decades of oil palm revenues,' says Silvius.
        </p>
      </div>

     

      <div className="space-y-4 leading-[1.6] text-[14px] sm:text-[15px]">
        <b>E</b>
        <p>
         The damage starts when logging companies arrive to clear the trees. They dig ditches to enter the peat swamps by boat and then float the logs out the same way. These are then used to drain water out of the peatlands to allow for the planting of corn, oil palms or pulpwood trees. Once the water has drained away, bacteria and fungi then break down the carbon in the peat and turn it into CO<sub>2</sub> and methane. Meanwhile, the remainder of the solid matter in the peat starts to move downwards, in a process known as subsidence. Peat comprises 90 per cent water, so this is one of the most alarming consequences of peatland clearances. 'In the tropics, peat subsides at about four centimetres a year, so within half a century, very large landscapes on Sumatra and Borneo will become flooded as the peat drops below water level,' says Silvius. 'It's a huge catastrophe that's in preparation. Some provinces will lose 40 per cent of their landmass.'
        </p>
      </div>

      
      <div className="space-y-4 leading-[1.6] text-[14px] sm:text-[15px]">
        <b>F</b>
        <p>
          And while these industries affect wetlands in ways that can easily be documented, Dr Dave Tickner of the WWFN believes that more subtle impacts can be even more devastating. 'Sediment run-off and fertilisers can be pretty invisible,' says Tickner. 'Over-extraction of water is equally invisible. You do get shock stories about rivers running red, or even catching fire, but there's seldom one big impact that really hurts a wetland.' Tickner does not blame anyone for deliberate damage, however. 'I've worked on wetland issues for 20 years and have never met anybody who wanted to damage a wetland,' he says. 'It isn't something that people generally set out to do. Quite often, the effects simply come from people trying to make a living.'
        </p>
      </div>
      <b>G</b>
      <p>Silvius also acknowledges the importance of income generation. 'It's not that we just want to restore the biodiversity of wetlands – which we do – but we recognise there's a need to provide an income for local people.' This approach is supported by IWMI. 'The idea is that people in a developing country will only protect wetlands if they value and profit from them,' says McCartney. 'For sustainability, it's essential that local people are involved in wetland planning and decision making and have clear rights to use wetlands.'</p>

      <b>H</b>
      <p>
        their long-term value. 'Different governments have different attitudes,' he says, and goes on to explain that some countries place a high priority on restoring wetlands, while others still deny the issue. McCartney is cautiously optimistic, however. 'Awareness of the importance of wetlands is growing,' he says. 'It's true that wetland degradation still continues at a rapid pace, but my impression is that things are slowly changing.'
      </p>
    </>
  );
}
