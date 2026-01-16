const budgetForm= document.getElementById("budgetForm");
const budgetInput=document.getElementById("budgetInput");
const totalBudget=document.getElementById("totalBudget");
const remainingBudget=document.getElementById("remainingBudget");

const expForm=document.getElementById("expenseForm");
const expName=document.getElementById("expenseName");
const expAmount=document.getElementById("expenseAmount");
const expList=document.getElementById("expenseList");
const amountError=document.getElementById("alert");

budget=0;
remaining=0;

function saveToLocal(){
    localStorage.setItem("budget", budget);
    localStorage.setItem("remaining", remaining);
    localStorage.setItem("expenses", expList.innerHTML)
}

budgetForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    budget=budgetInput.value;
    console.log(budget);
    remaining=budget;


    totalBudget.innerHTML=budget;
    remainingBudget.innerHTML=remaining;

    saveToLocal();

    budgetInput.value="";
    expList.innerHTML="";


})


expForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    expTitle=expName.value;
    amount=expAmount.value;

    if(remaining<amount){
        amountError.classList.remove("hidden");
        return ;
    }


    amountError.classList.add("hidden")
    remaining-=amount;
    remainingBudget.innerHTML=remaining;
    displayDiv=document.createElement("div");
   
    displayDiv.innerHTML=`
        <span> ${expTitle} </span>
        <span> ${amount}  </span>
    `;
    displayDiv.className="flex justify-between border border-red-400 bg-red-50 rounded-lg p-3"

     expList.appendChild(displayDiv);

    saveToLocal();
     expName.value="";
     expAmount.value="";

})


window.addEventListener("DOMContentLoaded", ()=>{
    savedBudget=localStorage.getItem("budget");
    savedRemaining=localStorage.getItem("remaining");
    savedExpenses=localStorage.getItem("expenses");


    if(savedBudget){
        budget=savedBudget;
        totalBudget.innerHTML=budget;

    }

    if(savedRemaining){
        remaining=savedRemaining;
        remainingBudget.innerHTML=remaining;
    }

    if(savedExpenses){
        expList.innerHTML=savedExpenses;
    }
})