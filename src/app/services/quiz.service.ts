import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questions: Question[] = [
    {
      id: 1,
      questionText: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      questionText: 'Who wrote "Hamlet"?',
      options: ['Shakespeare', 'Homer', 'Tolkien', 'Rowling'],
      correctAnswer: 'Shakespeare',
    },
  ];

  private questionsSubject = new BehaviorSubject<Question[]>(this.questions);
  questions$ = this.questionsSubject.asObservable();
  private score: number = 0;

  setScore(score: number) {
    this.score = score;
  }

  getScore(): number {
    return this.score;
  }

  getQuestions() {
    return this.questionsSubject.value;
  }

  addQuestion(question: Question) {
    this.questions.push(question);
    this.questionsSubject.next(this.questions);
  }

  deleteQuestion(id: number) {
    this.questions = this.questions.filter((q) => q.id !== id);
    this.questionsSubject.next(this.questions);
  }
  updateQuestion(updatedQuestion: Question) {
    const index = this.questions.findIndex((q) => q.id === updatedQuestion.id);
    if (index !== -1) {
      this.questions[index] = updatedQuestion; // Update the question
    }
  }
}
