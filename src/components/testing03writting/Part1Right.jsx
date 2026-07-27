// @ts-nocheck
export default function Part1Right({ text, setText }) {
  // ওয়ার্ড কাউন্টের নিখুঁত লজিক
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    // h-full নিশ্চিত করে এটি প্যারেন্ট কন্টেইনারের পুরো উচ্চতা নেবে
    <div className="flex flex-col h-full p-1 bg-white">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        // resize-none ব্যবহার করা হয়েছে কারণ আসল আইইএলটিএস পোর্টালে বক্স টেনে বড় করা যায় না
        className="w-full flex-1 min-h-[250px] p-4 border border-gray-500 text-[16px] leading-[1.6] resize-none outline-none focus:border-[#1a5fb4] focus:border-2 bg-white text-black"
        placeholder="Type your answer here..."
        spellCheck={false}
      />
      {/* আইইএলটিএস ম্যাচিং কালার ও প্যাডিং */}
      <div className="text-right text-[15px] font-medium text-gray-800 mt-2 select-none">
        Total Words: {wordCount}
      </div>
    </div>
  );
}