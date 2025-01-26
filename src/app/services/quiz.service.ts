import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questions: Question[] = [];
  private questionsSubject = new BehaviorSubject<Question[]>(this.questions);
  questions$ = this.questionsSubject.asObservable();
  private score: number = 0;
  private apiUrl = 'https://opentdb.com/api.php?amount=10';

  constructor(private http: HttpClient) {
    this.fetchQuestionsFromApi(); // Fetch questions when service is initialized
  }

  // Fetch questions from the API
  fetchQuestionsFromApi() {
    this.http.get<any>(this.apiUrl).subscribe(
      (response: any) => {
        // Transform the API response into the `Question` format
        this.questions = response.results.map((item: any, index: number) => {
          console.log(item);

          const my_question: Question = {
            id: index + 1,
            questionText: item.question,
            options: [...item.incorrect_answers, item.correct_answer].sort(
              () => Math.random() - 0.5
            ), // Shuffle options
            correctAnswer: item.correct_answer,
          };

          return my_question;
        });
        
        this.questionsSubject.next(this.questions); // Update the observable
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

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
