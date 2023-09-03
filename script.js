window.onload = function() {
    quiz.init()
}

class Quiz {
    questions = [
                {q: "W którym roku rozpoczął się rozpad Jugosławii?", answers:["1914","1991","1995"], correctAnswerNum: 1},
                {q: "W którym roku Polska dołączyła do UE?", answers:["2004","1999","1989"], correctAnswerNum: 0},
                {q: "W którym roku Niemcy bombardowali Westerplatte?", answers:["1938","1941","1939"], correctAnswerNum: 2}
            ]

    currentQuestionIndex = -1
    heading = null
    questionParagraph = null
    answer0 = null
    answer1 = null
    answer2 = null
    correctAnswerNum = null

    userSelectedChoice = null
    userCorrectAnswersNum = 0
    userBadAnswersNum = 0
    saveAnswerButton = null
    nextQuestionButton = null
    saveAnswerOnce = 0

    modalWindow = null
    init() {
        this.heading = document.querySelector(".alert-heading")
        this.answer0 = document.getElementById("answer0")
        this.answer1 = document.getElementById("answer1")
        this.answer2 = document.getElementById("answer2")
        this.questionParagraph = document.querySelector("#questionParagraph")

        this.saveAnswerButton = document.getElementById("saveAnswerButton")
        this.nextQuestionButton = document.getElementById("nextQuestionButton")

        this.setNextQuestionData()
        this.saveAnswerButton.addEventListener('click', this.checkAnswer)
        this.nextQuestionButton.addEventListener('click', this.setNextQuestionData, this.clearChecking)
        this.nextQuestionButton.addEventListener('click', this.clearChecking)
        this.initModal()
    }

    setNextQuestionData = () => {
        this.currentQuestionIndex++
        this.saveAnswerOnce = 0
        if(this.currentQuestionIndex>=this.questions.length) {
            console.log("Koniec quizu!")
            this.showModalResults()
            return
        }

        const question = this.questions[this.currentQuestionIndex]
        const qStr = `Pytanie ${this.currentQuestionIndex+1} z ${this.questions.length} : `
        this.heading.innerHTML = qStr + question.q
        this.answer0.innerHTML = question.answers[0]
        this.answer1.innerHTML = question.answers[1]
        this.answer2.innerHTML = question.answers[2]
        this.correctAnswerNum = question.correctAnswerNum
       
        this.nextQuestionButton.classList.add("disabled")
    }

    checkAnswer = () => {
        this.userSelectedChoice = document.querySelector("input[type='radio']:checked")
        if(!this.userSelectedChoice || this.saveAnswerOnce==1) {
            return;
        }
        
        const selectedIndex = this.userSelectedChoice.getAttribute("data-index")
        if(selectedIndex == this.correctAnswerNum) {
            this.userCorrectAnswersNum++
            this.userSelectedChoice.classList.add("is-valid")
        }else {
            this.userBadAnswersNum++
            this.userSelectedChoice.classList.add("is-invalid")
        }
        this.setUserStats()
        this.saveAnswerOnce++
        this.nextQuestionButton.classList.remove("disabled")
    }

    setUserStats = () => {
        document.getElementById('correctAnswers').innerHTML = this.userCorrectAnswersNum
        document.getElementById('badAnswers').innerHTML = this.userBadAnswersNum
    }

    clearChecking = () => {
       let checked = document.querySelectorAll("input[type='radio']")
        checked.forEach((el) => {
            el.classList.remove("is-valid")
            el.classList.remove("is-invalid")
            el.checked = false
        })
    }

    initModal =() => {
        this.modalWindow = new bootstrap.Modal(document.getElementById("modalWindow"))
    }

    showModalResults = () => {
        
        const modalParag = document.getElementById("modalResults")
        let info
        if(this.userCorrectAnswersNum>=this.userBadAnswersNum) {
            info = "Przynajmniej 1/2 odpowiedzi jest prawidlowa"
        }else {
            info = "Niestety, ale duża część odpowiedzi jest nieprawidłowa!"
        }
        modalParag.innerHTML = info
        this.modalWindow.toggle()

        const restartButton = document.getElementById("restartButton")
        restartButton.addEventListener('click',this.restartQuiz)
    }

    restartQuiz = () => {
        this.currentQuestionIndex = -1
        this.userBadAnswersNum = 0
        this.userCorrectAnswersNum = 0
        this.setUserStats()
        this.setNextQuestionData()
    }

 }

const quiz = new Quiz()