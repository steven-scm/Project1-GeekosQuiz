console.log('JS connected');

console.log("hello world");


let compteur = 0;
let questionArray = [];
let score = 0;

let playerScore = document.querySelector('#player-score');
let questionNumber = document.querySelector('#question-number');

let quizModule = document.querySelector("#quizModule");
let main = document.querySelector("main");
let buttonContainer = document.querySelector("#button-container")








//on rend cliquable les boutons Quiz Geek

const btns = document.querySelectorAll('.btn-geek');
console.log(btns);
btns.forEach(ele => {
    console.log(ele);
    ele.addEventListener('click', () => {
        console.log(ele.getAttribute("difficulty"));
        getQuiz(ele.getAttribute("difficulty"));
    });
});

function getQuiz(difficulty) {
    axios
        .get(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`)
        .then(response => {
            console.log('Response from API is: ', response.data.results);
            const opentdbGeek = response.data.results;

            //on est dans les quiz geek

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
            relaunchButton.setAttribute("id", "relaunchButton");
            // buttonContainer.appendChild(relaunchButton);
            relaunchButton.addEventListener('click', () => location.reload());
        })
        .catch(err => console.log(err));
};



//on rend cliquable le bouton Quiz Bonus

const btnBonus = document.querySelector('.btn-bonus');
console.log(btnBonus);

// btnBonus.addEventListener('click', () => {
//     axios
//         .get("https://opentdb.com/api.php?amount=10")
//         .then(response => {
//             console.log('Response from API is: ', response.data.results);
//             const opentdbQuiz = response.data.results;

//             //on est dans le quiz bonus

//             for (let i = 0; i < opentdbQuiz.length; i++) {
//                 let responseArray = [...opentdbQuiz[i].incorrect_answers];
//                 responseArray.push(opentdbQuiz[i].correct_answer);
//                 responseArray = responseArray.sort(() => Math.random() - 0.5);
//                 opentdbQuiz[i]['all_answers'] = responseArray;
//             }
//             console.log(opentdbQuiz);

//             questionArray = opentdbQuiz;

//             setQuiz(opentdbQuiz);

//             const container = document.querySelector('#selection');
//             container.style.display = "none";

//             quizModule.style.display = "flex";

//             const relaunchButton = document.createElement('button');
//             main.appendChild(relaunchButton);
//             relaunchButton.innerHTML = "Reboot game!";
//             relaunchButton.setAttribute("id", "relaunchButton");
//             // buttonContainer.appendChild(relaunchButton);
//             relaunchButton.addEventListener('click', () => location.reload());


//         })
//         .catch(err => console.log(err));
// })






// on rend cliquable le quiz bonus (btc)

btnBonus.addEventListener('click', () => {
    const myquizbtc =
        [
            {
                category: "Entertainment: Film",
                type: "multiple",
                difficulty: "easy",
                question: "Which of the following is popularly used for storing bitcoins?",
                correct_answer: "Wallet",
                incorrect_answers: [
                    "Pocket",
                    "Box",
                    "Stack"
                ]
            },
            {
                category: "Geography",
                type: "multiple",
                difficulty: "easy",
                question: "Which site run by Ross Ulbricht was closed by the FBI for letting people buy drugs with Bitcoin?",
                correct_answer: "Silk Road",
                incorrect_answers: [
                    "Lace Place",
                    "Silk Street",
                    "Dark Alley"
                ]
            },
            {
                category: "Entertainment: Video Games",
                type: "multiple",
                difficulty: "easy",
                question: "Cryptographic Hash Function transforms an arbitrary length of a fixed length string that act more or less as a Fingerprint of the document",
                correct_answer: "False",
                incorrect_answers: [
                    "True"
                ]
            },
            {
                category: "Geography",
                type: "multiple",
                difficulty: "medium",
                question: "What is the name of the famous Bitcoin exchange from Japan that collapsed in 2014?",
                correct_answer: "Mt. Gox",
                incorrect_answers: [
                    "Blockchain.info",
                    "Blockchain.info",
                    "Bitstamp"
                ]
            },
            {
                category: "Entertainment: Japanese Anime & Manga",
                type: "boolean",
                difficulty: "easy",
                question: "What does the block in the blockchain consist of?",
                correct_answer: "All of these",
                incorrect_answers: [
                    "Transaction data",
                    "A Hash point",
                    " A Timestamp"
                ]
            },
            {
                category: "Science & Nature",
                type: "multiple",
                difficulty: "medium",
                question: "After 10 Minutes a new block is formed that contains latest transactions",
                correct_answer: "True",
                incorrect_answers: [
                    "False"
                ]
            },
            {
                category: "Entertainment: Television",
                type: "multiple",
                difficulty: "hard",
                question: "A bitcoin address collision happens when 2 different payments are made at the same time to the same bitcoin address",
                correct_answer: "False",
                incorrect_answers: [
                    "True"
                ]
            },
            {
                category: "Geography",
                type: "multiple",
                difficulty: "hard",
                question: "What date did Bitcoin Network Start?",
                correct_answer: "January 2009",
                incorrect_answers: [
                    "September 2011",
                    "November 2008",
                    "November 2010"
                ]
            },
            {
                category: "Entertainment: Video Games",
                type: "multiple",
                difficulty: "hard",
                question: "What is the name of the first academic paper that describes bitcoin commonly referred to as?",
                correct_answer: "The Bitcoin Whitepaper",
                incorrect_answers: [
                    "The origins of money",
                    "The great unrevealing",
                    "Bitcoin onepager "
                ]
            },
            {
                category: "Politics",
                type: "multiple",
                difficulty: "medium",
                question: "What does IPFS stand for?",
                correct_answer: "Interplanetary File System",
                incorrect_answers: [
                    "Inter Filing System",
                    " Internet Play Store",
                    "Internet Platform for Storage"
                ]
            }
        ];

    for (let i = 0; i < myquizbtc.length; i++) {
        let responseArray = [...myquizbtc[i].incorrect_answers];
        responseArray.push(myquizbtc[i].correct_answer);
        responseArray = responseArray.sort(() => Math.random() - 0.5);
        myquizbtc[i]['all_answers'] = responseArray;
    }
    console.log(myquizbtc);

    questionArray = myquizbtc;

    setQuiz(myquizbtc);

    const container = document.querySelector('#selection');
    container.style.display = "none";

    quizModule.style.display = "flex";
    quizModule.style.backgroundImage = "url('https://journalducoin-com.exactdn.com/app/uploads/2021/02/bitcoin-monde-1.jpg?strip=all&lossy=1&quality=66&ssl=1&fit=2332,1312')";

    const relaunchButton = document.createElement('button');
    main.appendChild(relaunchButton);
    relaunchButton.innerHTML = "Reboot game!";
    relaunchButton.setAttribute("id", "relaunchButton");
    // buttonContainer.appendChild(relaunchButton);
    relaunchButton.addEventListener('click', () => location.reload());

})
























function setQuiz(array) {
    if (compteur === questionArray.length) {
        alert(`          GAME OVER !!! 

        ---- YOUR FINAL SCORE WAS ${score}/10 ----

        CLICK OK TO RESTART THE GAME` );
        setTimeout(() => location.reload(), 1000);
    }
    setQuestion(array[compteur]);
    setResponse(array[compteur]);
    questionNumber.innerHTML = compteur + 1;
}

function setQuestion(array) {
    let question = document.querySelector('p#question');
    question.innerHTML = array.question;
    playerScore.innerHTML = score;

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


            // listeReponse.innerHTML = ""
            // question.innerHTML = "";


            if (li.innerHTML === array.correct_answer) {
                li.style.backgroundColor = 'green';
                setTimeout(() => {
                    score++;
                    compteur++;
                    playerScore.innerHTML = score;
                    questionNumber.innerHTML = compteur + 1;
                    setQuiz(questionArray)
                }, 1000);
            } else {
                li.style.backgroundColor = 'red';
                setTimeout(() => {
                    alert("WRONG : the good answer was " + array.correct_answer);
                    compteur++;
                    questionNumber.innerHTML = compteur + 1;
                    setQuiz(questionArray), 500
                });
            }
        })

    })
}

