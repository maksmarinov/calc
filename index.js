let result = 0
let current = 0
let action = 0
let lastButtonWasAction = false
const res = document.querySelector(".result")
const num = document.querySelectorAll(".num")
const fnc = document.querySelectorAll(".fnc")
const actns = document.querySelectorAll(".actns")
const temp = document.querySelector(".temp")

document.addEventListener("keydown", handleKeyPress)

function handleKeyPress(e) {
  const key = e.key

  if (/^[0-9]$/.test(key)) {
    document.querySelector(`.btn.num:nth-child(${key === "0" ? 10 : Number.parseInt(key)})`).click()
    animateButton(document.querySelector(`.btn.num:nth-child(${key === "0" ? 10 : Number.parseInt(key)})`))
  }

  if (["+", "-", "*", "/"].includes(key)) {
    document.querySelector(`.btn.actns:contains('${key}')`).click()
    animateButton(document.querySelector(`.btn[class*="actns"]:contains('${key}')`))
  }

  if (key === "Enter") {
    document.querySelector(".btn.equal").click()
    animateButton(document.querySelector(".btn.equal"))
  }

  if (key === "Backspace") {
    document.querySelector(".btn.backspace").click()
    animateButton(document.querySelector(".btn.backspace"))
  }

  if (key === "Escape") {
    document.querySelector(".btn.clear").click()
    animateButton(document.querySelector(".btn.clear"))
  }
}

function animateButton(button) {
  if (!button) return

  button.classList.add("active")
  setTimeout(() => {
    button.classList.remove("active")
  }, 100)
}

function updateDisplay(value) {
  res.innerHTML = value
}

function calculate() {
  try {
    return eval(current + action + res.innerHTML)
  } catch (error) {
    return "Error"
  }
}

num.forEach((buttn) => {
  buttn.addEventListener("click", (event) => {
    if (res.innerHTML === "0" || lastButtonWasAction) {
      res.innerHTML = event.target.innerHTML
      lastButtonWasAction = false
    } else {
      res.innerHTML = res.innerHTML + event.target.innerHTML
    }

    event.target.classList.add("clicked")
    setTimeout(() => {
      event.target.classList.remove("clicked")
    }, 150)
  })
})

fnc.forEach((buttn) => {
  buttn.addEventListener("click", (event) => {
    event.target.classList.add("clicked")
    setTimeout(() => {
      event.target.classList.remove("clicked")
    }, 150)

    if (event.target.innerHTML === "←" && res.innerHTML != "0") {
      res.innerHTML = res.innerHTML.slice(0, -1)
      if (res.innerHTML.length === 0 && action != 0) {
        temp.innerHTML = current + action
        res.innerHTML = ""
      }
      if (res.innerHTML.length === 0 && action === 0) {
        res.innerHTML = "0"
      }
    } else if (event.target.innerHTML === "C") {
      res.innerHTML = "0"
      current = 0
      result = 0
      action = 0
      temp.innerHTML = ""
      lastButtonWasAction = false
    }
  })
})

actns.forEach((buttn) => {
  buttn.addEventListener("click", (event) => {
    event.target.classList.add("clicked")
    setTimeout(() => {
      event.target.classList.remove("clicked")
    }, 150)

    if (temp.innerHTML != "" && res.innerHTML === "") {
      action = event.target.innerHTML
      temp.innerHTML = current + action
      if (action === "=") {
        temp.innerHTML = current
      }
    } else if (event.target.innerHTML === "=" && current != 0 && action != 0) {
      try {
        current = eval(current + action + res.innerHTML)
        if (!isFinite(current)) {
          res.innerHTML = "Error"
          temp.innerHTML = ""
          current = 0
        } else {
          action = 0
          temp.innerHTML = current
          res.innerHTML = ""
        }
      } catch (e) {
        res.innerHTML = "Error"
        temp.innerHTML = ""
        current = 0
      }
      lastButtonWasAction = true
    } else if (event.target.innerHTML != "=" && result === 0) {
      current = res.innerHTML
      action = event.target.innerHTML
      result = res.innerHTML
      res.innerHTML = ""
      temp.innerHTML = current + action
      lastButtonWasAction = true
    } else if (event.target.innerHTML != "=" && result != 0) {
      try {
        current = eval(current + action + res.innerHTML)
        if (!isFinite(current)) {
          res.innerHTML = "Error"
          temp.innerHTML = ""
          current = 0
        } else {
          action = event.target.innerHTML
          temp.innerHTML = current + action
          res.innerHTML = ""
        }
      } catch (e) {
        res.innerHTML = "Error"
        temp.innerHTML = ""
        current = 0
      }
      lastButtonWasAction = true
    } else if (event.target.innerHTML === "=") {
      action = event.target.innerHTML
      temp.innerHTML = action
      current = 0
      result = 0
      action = 0
      temp.innerHTML = ""
      lastButtonWasAction = true
    }
  })
})

Element.prototype.contains = function (text) {
  return this.textContent.includes(text)
}

