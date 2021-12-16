console.log('JS connected');

console.log("hello world");

// let buttonQuiz1Ele = document.getElementById('quiz1');
// //let button = document.getElementsByName('button');
// let buttonQuiz2Ele = document.getElementById('quiz2');
// let buttonQuiz3Ele = document.getElementById('quiz3');
// let buttonQuiz4Ele = document.getElementById('quiz4');



// console.log(buttonQuiz1Ele);
// console.log(buttonQuiz2Ele);
// console.log(buttonQuiz3Ele);
// console.log(buttonQuiz4Ele);

// const handleClick1 = () => {
//     console.log("Hello World");
// }
// const handleClick2 = () => {
//     console.log("Hello World");
// }
// const handleClick3 = () => {
//     console.log("Hello World");
// }
// const handleClick4 = () => {
//     console.log("Hello World");
// }

// buttonQuiz1Ele.addEventListener("click", handleClick1);
// buttonQuiz2Ele.addEventListener("click", handleClick2);
// buttonQuiz3Ele.addEventListener("click", handleClick3);
// buttonQuiz4Ele.addEventListener("click", handleClick4);



// const getCountryInfo = countryName => {
//     axios
//       .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
//       .then(response => {
//         console.log('Response from API is: ', response);
//         const countryDetail = response.data[0];
//         console.log('a single country details: ', countryDetail);
//       })
//       .catch(err => console.log(err));
//   };

//   document.getElementById('get-country-btn').addEventListener('click', () => {
//     const userInput = document.getElementById('country-name-input').value;
//     getCountryInfo(userInput);
//   });

let compteur = 0;
let questionArray = [];
let score = 0;


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

            //on est dans le quiz

            for (let i = 0; i < opentdbQuiz.length; i++) {
                let responseArray = [...opentdbQuiz[i].incorrect_answers];
                responseArray.push(opentdbQuiz[i].correct_answer);
                responseArray = responseArray.sort(() => Math.random() - 0.5);
                opentdbQuiz[i]['all_answers'] = responseArray;
            }
            console.log(opentdbQuiz);

            questionArray = opentdbQuiz;

            setQuiz(opentdbQuiz);
            const container = document.querySelector('.container');
            container.style.display = "none";

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
            if (compteur >= questionArray.length - 1) {
                console.log("we reached the last question");
                alert(`GAME IS OVER YOUR SCORE WAS ${score}/10


                WE WILL RESTART THE GAME` );
                setTimeout(() => location.reload(), 1000);

                listeReponse.innerHTML = ""
                question.innerHTML = "";
            } else if (li.innerHTML === array.correct_answer) {
                li.style.backgroundColor = 'green';
                score++;
                compteur++;
                const timeOutId = setTimeout(() => setQuiz(questionArray), 1000);
            } else {
                li.style.backgroundColor = 'red';
                setTimeout(() => alert("WRONG : the good answer was " + array.correct_answer), 1000);
                compteur++;
                const timeOutId = setTimeout(() => setQuiz(questionArray), 1000);
            }
        })

    })
}

