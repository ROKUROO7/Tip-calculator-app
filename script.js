const bill_input = document.getElementById("bill-input")
const bill_Error = document.getElementById("bill_Error")
const bill_border = document.getElementById("bill-input-container")

const person_input = document.getElementById("person-input")
const person_Error = document.getElementById("person_Error")
const person_border = document.getElementById("person-input-container")

const tip_buttons = Array.from(document.getElementsByClassName("form_tip-button"))
const custom_input = document.getElementById("custom-input")
const custom_Error = document.getElementById("custom_Error")

const tip_display = document.getElementById("tip_per-person")
const total_display = document.getElementById("total-Amount_per-person")

const form_reset = document.getElementById("form_reset")

const red = "hsl(4, 100%, 67%)"
const green = "hsl(172, 67%, 45%)"

let tipButtonValue

function valid_NumberError(str,input) {
  if (!str) {
    input.style.borderColor = red
    return "need a number"
  }
  else if (str <= 0) {
    input.style.borderColor = red
    return "Can't be zero"
  }
  else {
    input.style.borderColor = green
    return ""
  }
}

function validate_tip(custom, tip) {
  if (custom === "") {
    const tipValue = tip / 100
    return tipValue
  }
  else {
    const customValue = custom / 100
    return customValue
  }
}

function tipClassRemove() {
  tip_buttons.forEach((tipBtn) => {
    tipBtn.classList.remove("form_tip-button--active")
  })
}

function borderReset() {
  bill_border.style.borderColor = "transparent"
  person_border.style.borderColor = "transparent"
  custom_input.style.borderColor = "transparent"
}

function displayZero() {
  tip_display.innerText = "$0.00"
  total_display.innerText = "$0.00"
}

function reset() {
  bill_Error.innerText = ""
  bill_input.value = ""
  person_Error.innerText = ""
  person_input.value = ""
  custom_Error.innerText = ""
  custom_Error.value = ""
  borderReset()
  
  tipClassRemove()
  tipButtonValue = ""
  
  custom_Error.style.display = "block"
  displayZero()
  
  form_reset.classList.remove("form_reset-button--active")
}

function tipPercent (value) {
  return value.slice(0,-1)
}
function totalTipAmount(bill,tip) {
  return bill * tip
}
function totalAmount(bill,totalTip) {
  return Number(bill) + Number(totalTip)
}
function totalTipAmount_PerPerson(totalTipAmount,person) {
  return totalTipAmount / person
}
function totalAmount_PerPerson(totalAmount,person) {
  return totalAmount / person
}

function calculate() {
  
  form_reset.classList.add("form_reset-button--active")
  
  const billValue = bill_input.value
  const personValue = person_input.value
  
  const billError = valid_NumberError(billValue,bill_border)
  const personError = valid_NumberError(personValue,person_border)
  bill_Error.innerText = billError
  person_Error.innerText = personError
  
  const customValue = custom_input.value
  const tipError = valid_NumberError(customValue,custom_input)
  custom_Error.innerText = tipError
  
  const tipValue = tipButtonValue
  const valideTip = validate_tip(customValue,tipValue)
  
  if (billValue && valideTip && personValue) {
    
    borderReset()
    
    const total_TipAmount = totalTipAmount(billValue,valideTip)
    const total_Amount = totalAmount(billValue,total_TipAmount)
    
    const totalTipPerPerson = totalTipAmount_PerPerson(total_TipAmount,personValue)
    const totalAmountPerPerson = totalAmount_PerPerson(total_Amount,personValue)
    
    if (isFinite(totalTipPerPerson) && isFinite(totalAmountPerPerson)) {
      tip_display.innerText = `$${totalTipPerPerson.toFixed(2)}`
      total_display.innerText = `$${totalAmountPerPerson.toFixed(2)}`
    }
    else {
      displayZero()
    }
  }
  
  else {
    displayZero()
  }
}

bill_input.addEventListener("input",calculate)

tip_buttons.forEach((tip_button) => {
  tip_button.addEventListener("click", (e) => {
    
    tipClassRemove()
    
    custom_input.value = ""
    custom_input.style.borderStyle = "none"
    custom_Error.style.display = "none"
    e.target.classList.add("form_tip-button--active")
    
    tipButtonValue = tipPercent(e.target.innerHTML)
    console.log(tipButtonValue)
    calculate()
  })
})

custom_input.addEventListener("input", () => {
  custom_Error.style.display = "block"
  custom_input.style.borderStyle = "solid"
  tipClassRemove()
  calculate()
})

person_input.addEventListener("input",calculate)

form_reset.addEventListener("click", reset)

