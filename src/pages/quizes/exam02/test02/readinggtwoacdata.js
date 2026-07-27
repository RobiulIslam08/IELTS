export const totalQuestions = 40;

export const sections = [
  { id: 1, title: "Section 1", range: "Questions 1–13" },
  { id: 2, title: "Section 2", range: "Questions 14–26" },
  { id: 3, title: "Section 3", range: "Questions 27–40" },
];

export const initialAnswersState = Array.from({ length: totalQuestions }, (_, i) => ({
  [`q${i + 1}`]: ""
})).reduce((acc, cur) => ({ ...acc, ...cur }), {});