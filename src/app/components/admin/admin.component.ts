import { Component } from '@angular/core';
import { Question } from '../../models/question';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-admin',
  standalone: false,

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  newQuestion: Question = {
    id: 0,
    questionText: '',
    options: [],
    correctAnswer: '',
  };
  questions: Question[] = [];
  isEditingOptions: { [key: number]: boolean } = {}; // Track edit mode for options
  updatedOptions: { [key: number]: string[] } = {}; // Temporarily hold updated options

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.questions = this.quizService.getQuestions();
  }

  // Enable editing options for a specific question
  enableEditOptions(question: Question) {
    this.isEditingOptions[question.id] = true;
    this.updatedOptions[question.id] = [...question.options]; // Copy current options
  }

  // Save updated options
  saveOptions(question: Question) {
    question.options = [...this.updatedOptions[question.id]]; // Update question's options
    this.quizService.updateQuestion(question); // Save to service
    this.isEditingOptions[question.id] = false; // Exit edit mode
  }

  // Cancel editing options
  cancelEditOptions(questionId: number) {
    this.isEditingOptions[questionId] = false; // Exit edit mode without saving
    delete this.updatedOptions[questionId]; // Clear temporary options
  }

  // Add a new option to the question
  addOption(questionId: number) {
    this.updatedOptions[questionId].push(''); // Add a blank option
  }

  // Update a specific option directly
  // Correctly handle input event to update options
  updateOption(questionId: number, optionIndex: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.updatedOptions[questionId][optionIndex] = inputElement.value;
    }
  }

  // Remove an option from the question
  removeOption(questionId: number, optionIndex: number) {
    this.updatedOptions[questionId].splice(optionIndex, 1); // Remove the option
  }

  addQuestion() {
    this.newQuestion.id = new Date().getTime();
    this.quizService.addQuestion(this.newQuestion);
    this.newQuestion = {
      id: 0,
      questionText: '',
      options: [],
      correctAnswer: '',
    };
  }

  deleteQuestion(id: number) {
    this.quizService.deleteQuestion(id); // Delete from the service
    this.questions = this.questions.filter((question) => question.id !== id); // Update the local array
  }
}
