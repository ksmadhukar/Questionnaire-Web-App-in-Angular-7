import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fade, slideUp } from '../animations';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  animations: [
    fade, slideUp
  ]
})
export class QuestionnaireComponent implements OnInit {
  VisibleIndex: any = 0;
  surveyList;
  isValid = false;
  message;
  Percentage: any = 0;
  prevIndex = 0;
  answeredQuestions = 0;
  public show: boolean = false;
  public buttonName: any = 'Show';
  constructor(private httpClient: HttpClient) {}
  async getsureveydata() {
    try {
      this.returnSurveyData().subscribe(data => {
        this.surveyList = data;
        this.surveyList.questionnaire.questions.forEach(item => {
          if (item.question_type === 'text') {
            item['value'] = '';
          }
        });
      });
      // .catch(error => {});
    } catch (e) {}
  }

  ngOnInit(): void {
    this.getsureveydata();
  }
  toggle() {
    this.show = !this.show;
  }
  NextQuestion() {
    this.VisibleIndex++;
    if (this.prevIndex + 1 === this.VisibleIndex) {
      this.prevIndex = this.VisibleIndex;
    }
    this.completedPercentage();
  }
  PrevQuestion() {
    this.VisibleIndex--;
  }
  DoneQuestion() {
    this.isValid = false;
    this.surveyList.questionnaire.questions.forEach(item => {
      if (item.question_type === 'text' && item['value'] !== '') {
        this.isValid = true;
        this.answeredQuestions++;
      }
      if (item.question_type === 'multiple-choice') {
        item.choices.forEach(choice => {
          if (choice.selected) {
            this.isValid = true;
            this.answeredQuestions++;
          }
        });
      }
    });
    if (this.isValid) {
      this.message = 'success';
      this.completedPercentage();
    } else {
      this.message = 'error';
    }
  }

  returnSurveyData() {
    return this.httpClient.get('./assets/data.json');
  }
  completedPercentage() {
    if (this.prevIndex === this.VisibleIndex) {
      this.answeredQuestions = 0;

      this.surveyList.questionnaire.questions.forEach(item => {
        if (item.question_type === 'text' && item['value'] !== '') {
          this.answeredQuestions++;
        }
        if (item.question_type === 'multiple-choice') {
          item.choices.forEach(choice => {
            if (choice.selected) {
              this.answeredQuestions++;
            }
          });
        }
      });
      this.Percentage =
        this.answeredQuestions *
        (100 / this.surveyList.questionnaire.questions.length);
    }
  }

  ClickChoices(type, i, j) {
    //console.log(type, i, j);
    if (type === 'false') {
      this.surveyList.questionnaire.questions[i].choices.forEach(choice => {
        console.log();
        if (choice.selected) {
          choice.selected = false;
        }
      });
      //console.log(this.surveyList.questionnaire.questions[i].choices);
      this.surveyList.questionnaire.questions[i].choices[j].selected = true;
      setTimeout(()=>{
        this.NextQuestion();
      }, 1400);
    }
  }
}