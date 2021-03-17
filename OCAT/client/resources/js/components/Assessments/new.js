import React from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useForm } from 'react-hook-form';


export function AssessmentNew(){
  const createAssessmentObject = (data)=>{
    const assessment ={
      instrument: data.instruments, 
      Name : data.Name,
      DateOfBirth : data.DateOfBirth,
    }
    assessment.score = calculateScore(data)
    assessment.riskLevel = calculateRiskLevel(assessment.score)
    return assessment;
  }

  const calculateScore = (data)=>{
    let score = 0;
    score += +data.answer1;
    score += +data.answer2;
    score += +data.answer3;
    score += +data.answer4;
    score += +data.answer5;
    return score;
  }

  const calculateRiskLevel = (score)=>{
    let riskLevel = 'low';
    if(score > 1) riskLevel = 'medium';
    if(score > 3) riskLevel = 'high';

    return riskLevel;
  }

  const { register, handleSubmit, errors } = useForm({shouldFocusError: true});  
  const onSubmit = async (data) => {
    const assessment = createAssessmentObject(data);
    await AssessmentService.submit(assessment);
  };

  return (
          <form onSubmit={handleSubmit(onSubmit)}>
           <h5>Cat Name</h5>
            <input className="form-control form-control-sm" type="text" name="Name" id="Name-id" autoFocus ref={register({required: true, maxLength: 80})} />
                <h5>Cat Date of Birth</h5>
                <input className="form-control form-control-sm" type="date"  name="DateOfBirth" id="DateOfBirth-id" ref={register({ required: true })} />
                <h5>Instrument</h5>
                <select className="form-control form-control-sm" name="instruments" id="instrument-select" ref={register({ required: true })}>
                  <option value="CBI">Cat Behavioral Instrument</option>
                </select>
              {errors.catName, errors.catDateOfBirth, errors.instruments  && <p>Required</p>}

                <h5 className="text-decoration-underline">1. Previous contact with the Cat Judicial System:</h5>
                  <input className="form-check-input" type="radio" id="answer1-no" name="answer1" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer1-no">No</label>
                  <input className="form-check-input" type="radio" id="answer1-yes" name="answer1" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer1-yes">Yes</label>
              {errors.response1 && <p>Required</p>}
                                                                                                                      
                <h5>2. Physical altercations with other cats:</h5>
                  <input className="form-check-input" type="radio" id="answer2-0" name="answer2" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer2-0">0-3 altercations</label>
                  <input className="form-check-input" type="radio" id="answer2-3" name="answer2" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer2-3">3+ altercations</label>
              {errors.response2 && <p>Required</p>}

                <h5>3. Physical altercations with owner (scratching, biting, etc...):</h5>
                  <input className="form-check-input" type="radio" id="answer3-10" name="answer3" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer3-10">10+ altercations</label>      
                  <input className="form-check-input" type="radio" id="answer3-0" name="answer3" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer3-0">0-10 altercations </label>
              {errors.response3 && <p>Required</p>}
                <h5>4. Plays well with dogs:</h5>
                  <input className="form-check-input" type="radio" id="answer4-no" name="answer4" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label mr-30" htmlFor="answer4-no">No</label>
                  <input className="form-check-input" type="radio" id="answer4-yes" name="answer4" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer4-yes">Yes</label>
                  {errors.response4 && <p>Required</p>}
                <h5 className="text-decoration-underline">5. Hisses at strangers:</h5>
                  <input className="form-check-input" type="radio" id="answer5-yes" name="answer5" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label mr-30" htmlFor="answer5-yes">Yes</label>
                  <input className="form-check-input" type="radio" id="answer5-no" name="answer5" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="answer5-No">No</label>
                {errors.response5 && <p>Required</p>}
                <input type="submit"/>     

          </form>

  );
}
