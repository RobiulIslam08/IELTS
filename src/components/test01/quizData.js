// ১. এখানে আর correctAnswers রাখার প্রয়োজন নেই। 
// এটি ব্যাকএন্ডে (Laravel) ভ্যালিডেশনের জন্য থাকবে।

export const totalQuestions = 40;

/** * groupedMarks মূলত স্কোর ক্যালকুলেশনের জন্য ব্যবহৃত হতো। 
 * যেহেতু আপনি এখন স্কোর ব্যাকএন্ডে হিসাব করবেন, তাই এটি এখান থেকে বাদ দেওয়া নিরাপদ।
 */

export const parts = [
    { id: 1, title: "Part 1", range: "Questions 1–10" },
    { id: 2, title: "Part 2", range: "Questions 11–20" },
    { id: 3, title: "Part 3", range: "Questions 21–30" },
    { id: 4, title: "Part 4", range: "Questions 31–40" },
];