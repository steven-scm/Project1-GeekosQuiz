console.log('JS connected');

console.log("hello world");


let compteur = 1;
let questionArray = [];
let score = 0;

let playerScore = document.querySelector('#player-score');
let questionNumber = document.querySelector('#question-number');

let quizModule = document.querySelector("#quizModule");
let main = document.querySelector("main");


const getQuiz = difficulty => {
    axios
        .get(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`)
        .then(response => {
            console.log('Response from API is: ', response.data.results);
            const opentdbGeek = response.data.results;

            for (let i = 0; i < opentdbGeek.length; i++) {
                let responseArray = [...opentdbGeek[i].incorrect_answers];
                responseArray.push(opentdbGeek[i].correct_answer);
                responseArray = responseArray.sort(() => Math.random() - 0.5);
                opentdbGeek[i]['all_answers'] = responseArray;
            }
            console.log(opentdbGeek);

            questionArray = opentdbGeek;

            setQuiz(opentdbGeek);
            const container = document.querySelector('#selection');
            container.style.display = "none";
            quizModule.style.display = "flex";

            const relaunchButton = document.createElement('button');
            main.appendChild(relaunchButton);
            relaunchButton.innerHTML = "Reboot game!";
            relaunchButton.addEventListener('click', () => location.reload());

        })
        .catch(err => console.log(err));
};

const btns = document.querySelectorAll('.btn-quiz');
console.log(btns);
btns.forEach(ele => {
    console.log(ele);
    ele.addEventListener('click', () => {
        console.log(ele.getAttribute("difficulty"));
        getQuiz(ele.getAttribute("difficulty"));
    });
});

const btnBonus = document.querySelector('.btn-bonus');
console.log(btnBonus);


btnBonus.addEventListener('click', () => {
    axios
        .get("https://opentdb.com/api.php?amount=10")
        .then(response => {
            console.log('Response from API is: ', response.data.results);
            const opentdbQuiz = response.data.results;

            //on est dans le quiz bonus

            for (let i = 0; i < opentdbQuiz.length; i++) {
                let responseArray = [...opentdbQuiz[i].incorrect_answers];
                responseArray.push(opentdbQuiz[i].correct_answer);
                responseArray = responseArray.sort(() => Math.random() - 0.5);
                opentdbQuiz[i]['all_answers'] = responseArray;
            }
            console.log(opentdbQuiz);

            questionArray = opentdbQuiz;

            setQuiz(opentdbQuiz);

            const container = document.querySelector('#selection');
            container.style.display = "none";

            quizModule.style.display = "flex";

            const relaunchButton = document.createElement('button');
            main.appendChild(relaunchButton);
            relaunchButton.innerHTML = "Reboot game!";
            relaunchButton.addEventListener('click', () => location.reload());


        })
        .catch(err => console.log(err));
})


// function setQuiz(array) {
//     for (let i = 0; i < array.length; i++) {
//         console.log(array[i].question);
//         console.log(array[i].correct_answer);
//         let responseArray = [...array[compteur].incorrect_answers];
//         responseArray.push(array[compteur].correct_answer);
//         responseArray = responseArray.sort(() => Math.random() - 0.5);
//         console.log(responseArray);
//         setQuestion(array[compteur]);
//         setResponse(responseArray);
//     }
// }






function setQuiz(array) {
    setQuestion(array[compteur]);
    setResponse(array[compteur]);
}

function setQuestion(array) {
    let question = document.querySelector('p#question');
    question.innerHTML = array.question;
}

function setResponse(array) {
    let listeReponse = document.querySelector('#answers');
    listeReponse.innerHTML = "";
    console.log(compteur);
    console.log(score);

    array.all_answers.forEach(response => {
        console.log(response);
        let li = document.createElement('li');
        console.log(li);
        li.innerHTML = response;
        // console.log(listeReponse);
        listeReponse.appendChild(li);

        li.addEventListener("click", () => {


            if (compteur >= questionArray.length) {
                console.log("we reached the last question");
                alert(`GAME IS OVER YOUR SCORE WAS ${score}/10


                WE WILL RESTART THE GAME` );
                setTimeout(() => location.reload(), 1000);

                listeReponse.innerHTML = ""
                question.innerHTML = "";
            } else if (li.innerHTML === array.correct_answer) {
                li.style.backgroundColor = 'green';
                score++;
                playerScore.innerHTML = score;
                compteur++;
                questionNumber.innerHTML = compteur;
                const timeOutId = setTimeout(() => setQuiz(questionArray), 1000);
            } else {
                li.style.backgroundColor = 'red';
                setTimeout(() => {
                    alert("WRONG : the good answer was " + array.correct_answer);
                    compteur++;
                    questionNumber.innerHTML = compteur;
                    setQuiz(questionArray)
                }, 500);
            }
        })

    })
}

