// @ts-nocheck
const MATCH_ITEMS = [
  { num: 14, text: "reference to two chemical compounds which impact on performance" },
  { num: 15, text: "examples of strategies for minimising the effects of stress" },
  { num: 16, text: "how a sportsperson accounted for their own experience of stress" },
  { num: 17, text: "study results indicating links between stress responses and performance" },
  { num: 18, text: "mention of people who can influence how athletes perceive their stress responses" },
];

const PARAGRAPHS = [
  {
    id: "A",
    text: `It isn't easy being a professional athlete. Not only are the physical demands greater than most people could handle, athletes also face intense psychological pressure during competition. This is something that British tennis player Emma Raducanu wrote about on social media following her withdrawal from the 2021 Wimbledon tournament. Though the young player had been doing well in the tournament, she began having difficulty regulating her breathing and heart rate during a match, which she later attributed to 'the accumulation of the excitement and the buzz'.`,
  },
  {
    id: "B",
    text: `For athletes, some level of performance stress is almost unavoidable. But there are many different factors that dictate just how people's minds and bodies respond to stressful events. Typically, stress is the result of an exchange between two factors: demands and resources. An athlete may feel stressed about an event if they feel the demands on them are greater than they can handle. These demands include the high level of physical and mental effort required to succeed, and also the athlete's concerns about the difficulty of the event, their chance of succeeding, and any potential dangers such as injury. Resources, on the other hand, are a person's ability to cope with these demands. These include factors such as the competitor's degree of confidence, how much they believe they can control the situation's outcome, and whether they're looking forward to the event or not.`,
  },
  {
    id: "C",
    text: `Each new demand or change in circumstances affects whether a person responds positively or negatively to stress. Typically, the more resources a person feels they have in handling the situation, the more positive their stress response. This positive stress response is called a challenge state. But should the person feel there are too many demands placed on them, the more likely they are to experience a negative stress response – known as a threat state. Research shows that the challenge states lead to good performance, while threat states lead to poorer performance. So, in Emma Raducanu's case, a much larger audience, higher expectations and facing a more skilful opponent, may all have led her to feel there were greater demands being placed on her at Wimbledon – but she didn't have the resources to tackle them. This led to her experiencing a threat response.`,
  },
  {
    id: "D",
    text: `Our challenge and threat responses essentially influence how our body responds to stressful situations, as both affect the production of adrenaline and cortisol – also known as 'stress hormones'. During a challenge state, adrenaline increases the amount of blood pumped from the heart and expands the blood vessels, which allows more energy to be delivered to the muscles and brain. This increase of blood and decrease of pressure in the blood vessels has been consistently related to superior sport performance in everything from cricket batting, to golf putting and football penalty taking. But during a threat state, cortisol inhibits the positive effect of adrenaline, resulting in tighter blood vessels, higher blood pressure, slower psychological responses, and a faster heart rate. In short, a threat state makes people more anxious – they make worse decisions and perform more poorly. In tennis players, cortisol has been associated with more unsuccessful serves and greater anxiety.`,
  },
  {
    id: "E",
    text: `That said, anxiety is also a common experience for athletes when they're under pressure. Anxiety can increase heart rate and perspiration, cause heart palpitations, muscle tremors and shortness of breath, as well as headaches, nausea, stomach pain, weakness and a desire to escape in more extreme cases. Anxiety can also reduce concentration and self-control and cause overthinking. The intensity with which a person experiences anxiety depends on the demands and resources they have. Anxiety may also manifest itself in the form of excitement or nervousness depending on the stress response. Negative stress responses can be damaging to both physical and mental health – and repeated episodes of anxiety coupled with negative responses can increase risk of heart disease and depression.`,
  },
  {
    id: "F",
    text: `But there are many ways athletes can ensure they respond positively under pressure. Positive stress responses can be promoted through the language that they and others – such as coaches or parents – use. Psychologists can also help athletes change how they see their physiological responses – such as helping them see a higher heart rate as excitement, rather than nerves. Developing psychological skills, such as visualisation, can also help decrease physiological responses to threat. Visualisation may involve the athlete recreating a mental picture of a time when they performed well, or picturing themselves doing well in the future. This can help create a feeling of control over the stressful event. Recreating competitive pressure during training can also help athletes learn how to deal with stress. An example of this might be scoring athletes against their peers to create a sense of competition. This would increase the demands which players experience compared to a normal training session, while still allowing them to practise coping with stress.`,
  },
];

const EMPTY_LABEL = { A: 14, B: 15, C: 16, D: 17, E: 18, F: 18 };

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
      <h2 className="font-bold text-[18px] mb-1">Athletes and stress</h2>

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
