//    FIRST CONTAINER
const register = document.querySelector('.container');
const preferance = document.querySelector('.container2');
const form = document.querySelector('.form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const button1 = document.querySelector('#con1');
let namePerson;
let email;
function handleContinue (e){
    e.preventDefault();
    namePerson = inputName.value.trim();
    email = inputEmail.value.trim();

    const correctName = /^[a-z ,.'-]+$/i;
    const correctEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!namePerson && !email) {
        alert('Please fill in the form correctly');
    } else if (!correctName.test(namePerson)) {
        alert("Please enter a valid name");
    } else if (!correctEmail.test(email)){
        alert("Please enter a valid email");
    } else {
        register.classList.add('hidden');
        preferance.classList.remove('hidden');
    }
}
button1.addEventListener('click', handleContinue);


// SECOND CONTAINER
const button2 = document.querySelector('#con2');
const ageRange = document.querySelector('#input1');
const selectGender = document.querySelector('#gender');
const looking = document.querySelector('#looking');
let selectedGender;
let lookingFor;
selectGender.addEventListener('change', ()=> {
    selectedGender = selectGender.value;
})

looking.addEventListener('change', ()=> {
    lookingFor = looking.value;
})

const ageMin = document.getElementById("age-min");
const ageMax = document.getElementById("age-max");
const ageOutput = document.getElementById("age-output");

function updateRange() {
  const minVal = parseInt(ageMin.value);
  const maxVal = parseInt(ageMax.value);
  
  if (minVal > maxVal - 1) {
    ageMin.value = maxVal - 1;
  }
  if (maxVal < minVal + 1) {
    ageMax.value = minVal + 1;
  }
  
  ageOutput.textContent = `(between ${ageMin.value} and ${ageMax.value})`;
}

ageMin.addEventListener("input", updateRange);
ageMax.addEventListener("input", updateRange);

updateRange();





const profile = document.querySelector('.wrapper');
const seeMore = document.querySelector('.see-more');
const back = document.querySelector('.back')
const profileInfo = document.querySelector('.wrapper-more');
const likeDislike = document.querySelector('.like-dislike');
const x = document.querySelector('#mainDislike');
const heart = document.querySelector('#mainLike');

let currentPerson;

async function getPeopleApi () {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    currentPerson = data.results[0];
    dislikeButton(currentPerson);
    console.log(data)
}



function dislikeButton (person) {

    if (person.gender === 'female') {
        profile.style.backgroundColor = '#ed8258e5 ';
    } else {
        profile.style.background = '#5867ede5';
    }

    profile.innerHTML = `
        <div class="image">
            <img src="${person.picture.large}"/>
        </div>
        <div class="title">
            <h1>${person.name.first} - ${person.dob.age}</h1>
        </div>
        <div class="location cursor typewriter-animation">
            <p>Location: ${person.location.city}</p>
        </div>
        <div class="description">
            <p>Lover of sunsets, dog walks and spontaneous adventures. Let's create our own love story.
                Looking for someone to share lazy Sunday mornings and late-night conversations with.
                Searching for my partner-in-crime to explore the city, try new foods and cuddle up with on rainy days.
            </p>
        </div>
        `;
}

function dislike (){
    profile.classList.add('active');
    setTimeout(() => {
        getPeopleApi();
        profile.classList.remove('active');
        handleBack();
    }, 1700);
}

function dislikeMore () {
    getPeopleApi();
    handleBack();
}
function likeMore(){
    getPeopleApi();
    handleBack();
}


function handleSeeMore() {
    if (!currentPerson) return;

    profile.classList.add('hidden');
    seeMore.classList.add('hidden');
    likeDislike.classList.add('hidden');
    profileInfo.classList.remove('hidden');
    back.classList.remove('hidden');

    if (currentPerson.gender === 'female') {
        profileInfo.style.backgroundColor = '#da67f193';
    } else {
        profileInfo.style.backgroundColor = '#cce3fe93';
    }

    profileInfo.innerHTML = `
    <section class="gallery">
        <div class="images stagger" data-delay="0.5s">
            <img  class="fade-right" src="${currentPerson.picture.large}"/>
            <img  class="fade-up" src="${currentPerson.picture.large}"/>
            <img  class="fade-down"  src="${currentPerson.picture.large}"/>
            <img  class="fade-left" src="${currentPerson.picture.large}"/>
        </div>
    </section>
        
        <div class="title-more title-info">
            <h1>${currentPerson.name.first} - ${currentPerson.dob.age} years old</h1>
        </div>
        <div class="location-more cursor typewriter-animation">
            <p>Location: ${currentPerson.location.city} ${currentPerson.location.country}</p>
        </div>
        <div class="description-more">
            <p>Lover of sunsets, dog walks and spontaneous adventures. Let's create our own love story.
                Looking for someone to share lazy Sunday mornings and late-night conversations with.
                Searching for my partner-in-crime to explore the city, try new foods and cuddle up with on rainy days.
                Lover of sunsets, dog walks and spontaneous adventures. Let's create our own love story.
                Looking for someone to share lazy Sunday mornings and late-night conversations with.
                Searching for my partner-in-crime to explore the city, try new foods and cuddle up with on rainy days.
                Lover of sunsets, dog walks and spontaneous adventures. Let's create our own love story.
            </p>
        <div class="like-dislike-more">
            <i id="dislike-more" class="fa-solid fa-x x x-info" style="color: #d60000;"></i>
            <i id="like-more" class="fa-solid fa-heart heart" style="color: #63E6BE;"></i>
        </div>
        </div>
    </div>
    `;
    document.querySelector('#dislike-more').addEventListener('click', dislikeMore);
    document.querySelector('#like-more').addEventListener('click', likeMore);
}

function handleBack() {
    profile.classList.remove('hidden');
    seeMore.classList.remove('hidden');
    likeDislike.classList.remove('hidden');
    profileInfo.classList.add('hidden');
    back.classList.add('hidden');
}

function xGoBack(){
    handleBack();
    getPeopleApi();
}

function handleLike (){
    profile.classList.add('like');
    setTimeout(() => {
        getPeopleApi();
        profile.classList.remove('like');
    }, 1700);

}

seeMore.addEventListener('click', handleSeeMore);
x.addEventListener('click', dislike)
back.addEventListener('click', handleBack);
heart.addEventListener('click', handleLike);
getPeopleApi ()

