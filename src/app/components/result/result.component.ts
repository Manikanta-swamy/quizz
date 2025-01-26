import { Component , OnInit} from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-result',
  standalone: false,
  
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  score: number = 0;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.score = this.quizService.getScore();
  }
}