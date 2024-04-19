const score=document.querySelector('.score')
const questainDiv=document.querySelector('.questains')
const options=document.querySelector('.options')
const next=document.querySelector('.next')
const prev=document.querySelector('.prev')
const ans=document.querySelector('.ans')
let questains=[]
let answars=[]
let userAns={}
let currentIndex=0
async function fetchAnswar(){
    const response=await fetch('/quiz/submit',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data=await response.json()
    score.innerText=`Your score is ${data.score} out of 10`
    questains=data.questains
    answars=data.answars
    userAns=data.userAns
    addQuestains()
}

next.addEventListener('click',()=>{
    if(currentIndex<questains.length-1){
        currentIndex++
        addQuestains()
    }
})
prev.addEventListener('click',()=>{
    if(currentIndex>0){
        currentIndex--
        addQuestains()
    }
})

function addQuestains(){
    questainDiv.innerText=questains[currentIndex].question
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
    questains[currentIndex].options.forEach((option,index) => {
        const newElement = document.createElement('p');
        newElement.textContent =option;
        options.appendChild(newElement)
            if(currentIndex in userAns){
                if(userAns[currentIndex]==index){
                    if(userAns[currentIndex]==answars[currentIndex]){
                        newElement.style.backgroundColor = "green";
                        ans.innerText="Correct Answer"
                        ans.style.backgroundColor = "green";
                    }else{
                        newElement.style.backgroundColor = "red";
                        ans.innerText="Wrong Answer"
                        ans.style.backgroundColor = "red";
                    }
                }
            }else{
                ans.innerText="Not answar"
                ans.style.backgroundColor = "gold";
            }
        if(index==answars[currentIndex]){
            newElement.style.backgroundColor = "green";
        }
    });
}

window.onload = fetchAnswar()