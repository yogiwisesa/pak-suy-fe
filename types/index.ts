export type Student = {
  username?: string;
  firstName?: string;
  lastName?: string;
  id?: number;
  parentId?: number;
};

export type Teacher = {
  username?: string;
  firstName?: string;
  lastName?: string;
  id?: number;
};

export type Group = {
  groupId: number;
  groupName?: string;
  teacher?: Teacher;
  students?: Student[];
};

export type Similar = {
  score: number;
  student: ExamAnswer;
  target: string;
};

export type ExamProblem = {
  problem: string;
  answers: string[];
  correctAnswer: string;
  answer?: string;
  similars?: Similar[];
};

export type ExamRoot = {
  duration: number;
  title: string;
  groupId?: number | null;
  id: string;
  problems: ExamProblem[];
};

export type ExamAnswer = {
  title: string;
  groupId?: number;

  examId: string;
  studentId: number;
  studentName: string;
  correctAnswerCount: number;
  problems?: ExamProblem[];
};

export type Note = {
  from: string;
  body: string;
};

export type NoteRoot = {
  groupName: string;
  groupId: number;
  date: string;
  notes: Note[];
};

export type MemberRoot = {
  student: Student;
  group: Group;
};
