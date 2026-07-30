// @ts-nocheck
export default function Part2Right({ text, setText, disabled = false }) {
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="flex flex-col h-full p-1 bg-white">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        className="w-full flex-1 min-h-[300px] p-4 border border-gray-500 text-[16px] leading-[1.6] resize-none outline-none focus:border-[#1a5fb4] focus:border-2 bg-white text-black disabled:opacity-60 disabled:cursor-not-allowed"
        placeholder="Type your essay here..."
        spellCheck={false}
      />
      <div className="text-right text-[15px] font-medium text-gray-800 mt-2 select-none">
        Total Words: {wordCount}
      </div>
    </div>
  );
}
