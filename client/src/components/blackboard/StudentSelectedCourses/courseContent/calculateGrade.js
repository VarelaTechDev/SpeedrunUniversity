import Axios from 'axios'
import domain from '../../../../util/domain'



// TODO: REFACTOR THIS
export async function getGrade(userObject, ClassId, questionOneAnswer, questionTwoAnswer, questionThreeAnswer){
    let grade = 100
    // A --> Perfect
    // B --> Get question ONE wrong
    // C --> Get question TWO wrong
    // D --> Get question ONE and TWO wrong
    // F --> Do nothing
    if(questionOneAnswer == 'WRONG') grade -= 15
    if(questionTwoAnswer == 'WRONG') grade -= 25
    if(questionThreeAnswer == 'WRONG') grade -= 10

    console.log(userObject.username)   
    //console.log(ClassId)   
    
    
    
    // ! We want to first check the answers first and do some magic


    // ? We should break this apart, not have one mega fdunction later
    await Axios.put(`${domain}/auth/courses/${userObject.username}/${ClassId}/${grade}`)
}