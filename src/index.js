import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import "./assets/style.css";
import quizService from './quizService';
import QuestionBox from './Components/QuestionBox';
import Result from './Components/Result';
class Vquizb extends Component {
  state={
    questionbank:[],
    score:0,
    responses:0
  };
  getQuestions=()=>{
    quizService().then(question=>{
      this.setState({
        questionbank:question
      });
    });
  };
  computeAnswer=(answer,correctAnswer)=>{
    if(answer==correctAnswer){
      this.setState({score : this.state.score+1});
    }
    this.setState({responses : this.state.responses<5 ? this.state.responses+1:5});
  }
  componentDidMount(){
    this.getQuestions();
  }
  playAgain= () =>{
    this.getQuestions();
    this.setState({
      responses:0,
      score:0
    });
     
  }
  render(){
    return(
      <div className="container">
        <div className="title">Vquizb</div>
        {this.state.questionbank.length>0 && this.state.responses<5 && this.state.questionbank.map(
          ({question,answers,correct,questionId})=>(
          <QuestionBox question={question} options={answers} key={questionId} 
          selected={answer=> this.computeAnswer(answer,correct)} />))}

          {this.state.responses == 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />):null}
      </div>
    );
  }
}

ReactDOM.render(<Vquizb />,document.getElementById("root"));



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
