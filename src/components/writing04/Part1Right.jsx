// @ts-nocheck
export default function Part1Right({ text, setText, disabled = false }) {
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="flex flex-col h-full mt-10">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        className="w-full flex-1 min-h-[200px] p-3 border border-gray-600 text-[16px] leading-[1.6] resize-y outline-none focus:border-[#2196F3] focus:ring-0 bg-white disabled:opacity-60 disabled:cursor-not-allowed"
        placeholder=""
        spellCheck={false}
      />
      <div className="text-right text-[15px] text-gray-900 mt-2">Words: {wordCount}</div>
    </div>
  );
}
