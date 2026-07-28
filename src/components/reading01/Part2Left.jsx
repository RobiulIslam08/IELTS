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
      <h2 className="font-bold text-[17px] mb-4">The Physics of Traffic Behavior</h2>

      <HeadingSlot num={14} answers={answers} setAnswer={setAnswer} />

      <div className="space-y-4 leading-[1.5] text-[17px] text-black ">
        <p>
          Some years ago, when several theoretical physicists, principally Dirk Helbing and Boris
          Kerner of Stuttgart, Germany, began publishing papers on traffic flow in publications
          normally read by traffic engineers, they were clearly working outside their usual sphere
          of investigation. They had noticed that if they simulated the movement of vehicles on a
          highway, using the equations that describe how the molecules of a gas move, some very
          strange results emerged. Of course, vehicles do not behave exactly like gas molecules:
          for example, drivers try to avoid collisions by slowing down when they get too near
          another vehicle, whereas gas molecules have no such concern. However, the physicists
          modified the equations to take the differences into account and the overall description
          of traffic as a flowing gas has proved to be a very good one; the moving-gas model of
          traffic reproduces many phenomena seen in real-world traffic.
        </p>
        <p>
          The strangest thing that came out of these equations, however, was the implication that
          congestion can arise completely spontaneously; no external causes are necessary. Vehicles
          can be flowing freely along, at a density still well below what the road can handle, and
          then suddenly gel into a slow-moving ooze. Under the right conditions a brief and local
          fluctuation in the speed or the distance between vehicles is all it takes to trigger a
          system-wide breakdown that persists for hours. In fact, the physicists' analysis
          suggested such spontaneous breakdowns in traffic flow probably occur quite frequently on
          highways.
        </p>
        <p className="italic">Dramatic effects can result from small changes in traffic just as in nature</p>
        <p>
          Though a decidedly unsettling discovery, this showed striking similarities to the
          phenomena popularized as 'chaos theory'. This theory has arisen from the understanding
          that in any complex interacting system which is made of many parts, each part affects
          the others. Consequently, tiny variations in one part of a complex system can grow in
          huge but unpredictable ways. This type of dramatic change from one state to another is
          similar to what happens when a chemical substance changes from a vapor to a liquid. It
          often happens that water in a cloud remains as a gas even after its temperature and
          density have reached the point where it could condense into water droplets. However if
          the vapor encounters a solid surface, even something as small as a speck of dust,
          condensation can take place and the transition from vapor to liquid finally occurs.
          Helbing and Kerner see traffic as a complex interacting system. They found that a small
          fluctuation in traffic density can act as the 'speck of dust' causing a sudden change
          from freely moving traffic to synchronized traffic, when vehicles in all lanes abruptly
          slow down and start moving at the same speed, making passing impossible.
        </p>
      </div>

      <HeadingSlot num={15} answers={answers} setAnswer={setAnswer} />

      <div className="space-y-4 leading-[1.6] text-[14px] sm:text-[15px]">
        <p>
          The physicists have challenged proposals to set a maximum capacity for vehicles on
          highways. They argue that it may not be enough simply to limit the rate at which vehicles
          are allowed to enter a highway, rather, it may be necessary to time each vehicle's entry
          onto a highway precisely to coincide with a temporary drop in the density of vehicles
          along the road. The aim of doing this would be to smooth out any possible fluctuations
          in the road conditions that can trigger a change in traffic behavior and result in
          congestion. They further suggest that preventing breakdowns in the flow of traffic could
          ultimately require implementing the radical idea that has been suggested from time to
          time: directly regulating the speed and spacing of individual cars along a highway with
          central computers and sensors that communicate with each car's engine and brake controls.
        </p>
      </div>

      <HeadingSlot num={16} answers={answers} setAnswer={setAnswer} />

      <div className="space-y-4 leading-[1.6] text-[14px] sm:text-[15px]">
        <p>
          However, research into traffic control is generally centered in civil engineering
          departments and here the theories of the physicists have been greeted with some
          skepticism. Civil engineers favor a practical approach to problems and believe traffic
          congestion is the result of poor road construction (two lanes becoming one lane or
          dangerous curves), which constricts the flow of traffic. Engineers questioned how well
          the physicists' theoretical results relate to traffic in the real world. Indeed, some
          engineering researchers questioned whether elaborate chaos-theory interpretations are
          needed at all, since at least some of the traffic phenomena the physicists' theories
          predicted seemed to be similar to observations that had been appearing in traffic
          engineering literature under other names for years; observations which had
          straightforward cause-and-effect explanations.
        </p>
      </div>

      <HeadingSlot num={17} answers={answers} setAnswer={setAnswer} />

      <div className="space-y-4 leading-[1.6] text-[14px] sm:text-[15px]">
        <p>
          James Banks, a professor of civil and environmental engineering at San Diego State
          University in the US, suggested that a sudden slowdown in traffic may have less to do
          with chaos theory than with driver psychology. As traffic gets heavier and the passing
          lane gets more crowded, aggressive drivers move to other lanes to try to pass, which also
          tends to even out the speed between lanes. He also felt that another leveling force is
          that when a driver in a fast lane brakes a little to maintain a safe distance between
          vehicles, the shock wave travels back much more rapidly than it would in the other slower
          lanes, because each following driver has to react more quickly. Consequently as a road
          becomes congested, the faster moving traffic is the first to slow down.
        </p>
      </div>
    </>
  );
}
