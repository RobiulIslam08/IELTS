import React from "react";

function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}

// ১. TextBlank Component
export function TextBlank({ id, placeholder, label, suffix, answers, setAnswers, submitted }) {
    return (
        <span className="inline-flex items-center gap-2">
            {label && <span>{label}</span>}
            <input
                type="text"
                placeholder={placeholder}
                value={answers[id] || ""}
                onChange={(e) => setAnswers({ ...answers, [id]: e.target.value })}
                disabled={submitted}
                className={`border-b border-stone-400 px-2 text-center focus:outline-none placeholder:text-stone-400 ${
                    submitted ? "bg-transparent text-stone-700 cursor-not-allowed" : "bg-white"
                }`}
            />
            {suffix && <span>{suffix}</span>}
        </span>
    );
}

// ২. ChoiceGroup Component
export function ChoiceGroup({ id, question, options, answers, setAnswers, submitted }) {
    const value = answers[id] || "";
    return (
        <div className="py-[9px] pb-4">
            <p className="mb-3 font-normal leading-[1.45] text-black">
                <b>{id.replace("q", "")}.</b> {question}
            </p>
            <div className="grid gap-[11px]">
                {options.map((option) => (
                    <label 
                        className={cx(
                            "grid grid-cols-[auto_22px_minmax(0,1fr)] items-center gap-[3px]",
                            submitted ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                        )} 
                        key={option.value}
                    >
                        <input
                            type="radio"
                            name={id}
                            value={option.value}
                            checked={value === option.value}
                            disabled={submitted}
                            onChange={() => setAnswers((current) => ({ ...current, [id]: option.value }))}
                        />
                        <span className="font-bold text-black">{option.value}</span>
                        <span>{option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

// ৩. CheckboxGroup Component (Updated with FIFO Max 2 logic)
export function CheckboxGroup({ id, title, options, answers, setAnswers, submitted, note = "Choose TWO letters." }) {
    const selected = answers[id] || [];
    
    const toggle = (value) => {
        if (submitted) return; // সাবমিট হলে চেঞ্জ করা বন্ধ
        
        setAnswers((current) => {
            const currentValues = current[id] || [];
            
            let updatedValues;
            if (currentValues.includes(value)) {
                // অলরেডি সিলেক্টেড থাকলে সেটাকে রিমুভ/আনচেক করবে
                updatedValues = currentValues.filter((item) => item !== value);
            } else {
                // নতুন সিলেক্ট করতে গেলে যদি অলরেডি ২টি সিলেক্ট করা থাকে, 
                // তবে প্রথমটি (index 0) বাদ দিয়ে নতুনটি শেষে যুক্ত করবে।
                if (currentValues.length >= 2) {
                    updatedValues = [...currentValues.slice(1), value];
                } else {
                    updatedValues = [...currentValues, value];
                }
            }
            
            return {
                ...current,
                [id]: updatedValues,
            };
        });
    };

    return (
        <div className="mt-2 mb-[18px] py-[9px] pb-4">
            <p className="mb-2 text-[16px] font-normal text-black">{note}</p>
            <p className="mb-3 font-normal leading-[1.45] text-black">{title}</p>
            <div className="grid gap-[11px]">
                {options.map((option) => (
                    <label 
                        className={cx(
                            "grid grid-cols-[auto_22px_minmax(0,1fr)] items-center gap-[3px]",
                            submitted ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                        )} 
                        key={option.value}
                    >
                        <input
                            type="checkbox"
                            value={option.value}
                            checked={selected.includes(option.value)}
                            disabled={submitted}
                            onChange={() => toggle(option.value)}
                        />
                        <span className="font-bold text-black">{option.value}</span>
                        <span>{option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}