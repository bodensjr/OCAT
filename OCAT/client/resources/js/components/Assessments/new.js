import React from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useForm } from 'react-hook-form';


export function AssessmentNew(){
  const createAssessmentObject = (data)=>{
    const assessment ={
      Name : data.Name,
      DateOfBirth : data.DateOfBirth
    }
    assessment.instrument = "Cat Behavioral Instrument"
    assessment.score = FindScore(data)
    assessment.riskLevel = FindRiskLevel(assessment.score)
    return assessment;
  }

  const FindScore = (data)=>{
    var score = 0;
    score += data.answer1;
    score += data.answer2;
    score += data.answer3;
    score += data.answer4;
    score += data.answer5;
    return score;
  }

  const FindRiskLevel = (score)=>{
    var riskLevel = 'high';
    if(score > 1) {
      riskLevel = 'medium';
    }
    if(score <= 1) {
      riskLevel = 'low';
    }

    return riskLevel;
  }

  const { register, handleSubmit, errors } = useForm({shouldFocusError: true});  
  const onSubmit = async (data) => {
    const assessment = createAssessmentObject(data);
    await AssessmentService.submit(assessment);
  };

  return (
          <form onSubmit={handleSubmit(onSubmit)}>
          <div class="row h-100 justify-content-center align-items-center ">
             <div class="form-group ">
            <br>
           <h1>Cat Name</h1>
            <br>
            <input className="form-control form-control-sm" type="text" name="Name" id="NameId" autoFocus ref={register({required: true})} />
                          </div>
                <br>                                                                                       
                <br>
             <div class="form-group ">                                                                                                               
                <h1>Cat Date of Birth</h1>
                <br>                                                                             
                <input className="form-control form-control-sm" type="date"  name="DateOfBirth" id="DateId" ref={register({ required: true })} />
              </div>
                <br>
                <br>
               <div class="form-group ">
                <h1>Instrument</h1>
              <br>  
              <label>Cat Behavioral Instrument</label>
              {errors.Name, errors.DateOfBirth  && <p>Required</p>}
               </div>
                <br>
                <br>
                <div class="form-group ">
                <h1>1. Previous contact with the Cat Judicial System:</h1>
               <br>
                  
                  <input className="form-check-input" type="radio" id="answer1no" name="answer1" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer1-no">No</label>
                  <br>
                  <input className="form-check-input" type="radio" id="answer1yes" name="answer1" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer1yes">Yes</label>
              {errors.answer1 && <p>Required</p>}
               </div>
                <br>
                <br>
                <div class="form-group ">
                <h1>2. Physical altercations with other cats:</h1>
               <br>   
               <input className="form-check-input" type="radio" id="answer20" name="answer2" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer2-0">0-3 altercations</label>
                  <br>
                  <input className="form-check-input" type="radio" id="answer23" name="answer2" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer23">3+ altercations</label>
              {errors.answer2 && <p>Required</p>}
               </div>
                <br>
                <br>
                <div class="form-group ">
                <h1>3. Physical altercations with owner (scratching, biting, etc...):</h1>
                  <input className="form-check-input" type="radio" id="answer310" name="answer3" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer310">10+ altercations</label>      
                  <br>
                  <input className="form-check-input" type="radio" id="answer30" name="answer3" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer30">0-10 altercations </label>
              {errors.answer3 && <p>Required</p>}
               </div>
                <br>
                <br>
                <div class="form-group ">
                <h1>4. Plays well with dogs:</h1>
               <br>  
               <input className="form-check-input" type="radio" id="answer4no" name="answer4" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer4no">No</label>
                  <br>
                  <input className="form-check-input" type="radio" id="answer4yes" name="answer4" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer4yes">Yes</label>
                  {errors.answer4 && <p>Required</p>}
                   </div>
                <br>
                <br>
                <div class="form-group ">
                <h1>5. Hisses at strangers:</h1>
                  <br>
                  <input className="form-check-input" type="radio" id="answer5yes" name="answer5" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer5yes">Yes</label>
                  <br>                                                                                               
                  <input className="form-check-input" type="radio" id="answer5no" name="answer5" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer5no">No</label>
                {errors.answer5 && <p>Required</p>}
                 </div>
                 <br>
                <div class="text-center ">
                <input type="submit"/>     
                  </div>
                 </div>

          </form>

  );
}
