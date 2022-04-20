export function convert(gradeNum){
    if (gradeNum < 60) return 'F'
    else if(gradeNum >= 60 && gradeNum < 70) return 'D'
    else if(gradeNum >= 70 && gradeNum < 80) return 'C'
    else if(gradeNum >= 80 && gradeNum < 90) return 'B'
    else if(gradeNum >= 90) return 'A'
}