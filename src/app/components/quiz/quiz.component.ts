import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: false,

  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];

  userAnswers: { [key: number]: string } = {};

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.questions = this.quizService.getQuestions();
  }
  selectAnswer(questionId: number, answer: string) {
    this.userAnswers[questionId] = answer;
  }

  submitQuiz() {
    const correctAnswers = this.questions.filter(
      (q) => this.userAnswers[q.id] === q.correctAnswer
    ).length;

    this.quizService.setScore(correctAnswers);
    this.router.navigate(['/result']);
  }
}
