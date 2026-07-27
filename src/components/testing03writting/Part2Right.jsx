// @ts-nocheck
export default function Part2Right({ text, setText }) {
  // ওয়ার্ড কাউন্টের সঠিক লজিক
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    // h-full পুরো উচ্চতা কভার করবে এবং mt-10 সরিয়ে স্ট্যান্ডার্ড প্যাডিং দেওয়া হয়েছে
    <div className="flex flex-col h-full p-1 bg-white">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        // resize-none দিয়ে বক্স টেনে বড় করার অপশন বন্ধ করা হয়েছে (IELTS Standard)
        className="w-full flex-1 min-h-[300px] p-4 border border-gray-500 text-[16px] leading-[1.6] resize-none outline-none focus:border-[#1a5fb4] focus:border-2 bg-white text-black"
        placeholder="Type your essay here..."
        spellCheck={false}
      />
      {/* ওয়ার্ড কাউন্ট টেক্সট */}
      <div className="text-right text-[15px] font-medium text-gray-800 mt-2 select-none">
        Total Words: {wordCount}
      </div>
    </div>
  );
}