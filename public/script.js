const next=document.querySelector('.next')
const prev=document.querySelector('.prev')
const questainDiv=document.querySelector('.questains')
const options=document.querySelector('.options')
let userAns={}
let allOptions=[]
let questains=[]
let currentIndex=0
const fetchQuestains=async ()=>{
    try {
        const response=await fetch('/quiz',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        questains=data.questains
        addQuestains()
    } catch (error) {
    }
}
window.onload=fetchQuestains()
next.addEventListener('click',(e)=>{
    e.preventDefault()
    if(currentIndex<questains.length-1){
        currentIndex++
        addQuestains()
    }
})
prev.addEventListener('click',(e)=>{
    e.preventDefault()
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
    questains[currentIndex].options.forEach((option) => {
        const newElement = document.createElement('p');
        newElement.textContent =option;
        options.appendChild(newElement)
    });
    allOptions=Array.from(options.children)
    allOptions.forEach((option,index)=>{
        option.addEventListener('click',async (e)=>{
            const response=await fetch(`/quiz/answer/${currentIndex}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    ans:index
                })
            })
            const data=await response.json()
            userAns=data.userAns
                option.style.backgroundColor = "gold"
        })
    })
}
