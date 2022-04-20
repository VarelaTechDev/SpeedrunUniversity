import Axios from 'axios'
import domain from '../../../util/domain'



// TODO: REFACTOR THIS
export async function getGrade(userObject, ClassId, questionOneAnswer, questionTwoAnswer){
    let grade = 100
    if(questionOneAnswer == 'WRONG') grade -= 50
    if(questionTwoAnswer == 'WRONG') grade -= 50

    console.log(userObject.username)   
    //console.log(ClassId)   
    
    
    
    // ! We want to first check the answers first and do some magic


    // ? We should break this apart, not have one mega fdunction later
    await Axios.put(`${domain}/auth/courses/${userObject.username}/${ClassId}/${grade}`)
}