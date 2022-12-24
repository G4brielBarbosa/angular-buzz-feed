import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = "";
  questions: any;
  questionSelected: any;
  answers:string[] = [];
  answersSelected: string = "";
  questionIndex:number = 0;
  questionMaxIndex: number = 0
  buzz: any;


  finished: boolean = false;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getApi().subscribe(
      (res) => {
        this.title = res[0].title
        this.questions = res[0].questions
        this.questionSelected = this.questions[this.questionIndex]
        this.questionIndex = 0;
        this.questionMaxIndex = this.questions.length
        this.buzz = res[0]
      }
    )

  }

  return(){
    this.finished = false;
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex]
  }


  buttonPress(value:string){
    this.answers.push(value);
    this.nextStep()
  }

async nextStep(){
    this.questionIndex ++;
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
      
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = this.buzz.results[finalAnswer as keyof typeof this.buzz.results]
    }
  }




  async checkResult(answers:string[]){

    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })

    return result
  }

}
