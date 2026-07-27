import { totalQuestions } from "./quizData";

/**
 * ইউজার ইনপুটকে ক্লিন করার জন্য এটি রাখা যেতে পারে, 
 * তবে এটি এখন অপশনাল যদি আপনি ব্যাকএন্ডে সব হ্যান্ডেল করেন।
 */
export function normalize(value) {
    return String(value || "").trim().toLowerCase();
}

// আমরা শুধু totalQuestions এক্সপোর্ট করছি কারণ এটি ListeningOne.jsx এ ব্যবহার হয়েছে।
export { totalQuestions };