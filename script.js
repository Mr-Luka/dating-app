
//    FIRST CONTAINER
const register = document.querySelector('.container');
const form = document.querySelector('.form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const button1 = document.querySelector('#con1');
const notice = document.querySelector('#notice')
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
    notice.classList.add('hidden')
}
button1.addEventListener('click', handleContinue);


// SECOND CONTAINER
const button2 = document.querySelector('#con2');
const ageRange = document.querySelector('#input1');
const selectGender = document.querySelector('#gender');
const looking = document.querySelector('#looking');
const continueButton = document.querySelector('#con2');
const preferance = document.querySelector('.container2');

let selectedGender;
let lookingFor;
selectGender.addEventListener('change', ()=> {
    selectedGender = selectGender.value;
})

looking.addEventListener('change', ()=> {
    lookingFor = looking.value;
    console.log(lookingFor)
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
  
  ageOutput.textContent = `between ${ageMin.value} and ${ageMax.value}`;
}

function handlePrefernces() {
    if (selectGender.value === 'choose') {
        alert("Please select a gender");
    } else if (lookingFor.value === 'choose') {
        alert("Please select what you are looking for");
    } else {
        preferance.classList.add('hidden');
        xGoBack();
        social.classList.remove('hidden')
    }
}

ageMin.addEventListener("input", updateRange);
ageMax.addEventListener("input", updateRange);
continueButton.addEventListener('click', handlePrefernces);

updateRange();



function lookingForGender(person) {
    if (lookingFor === 'male') {
        return person.gender === 'male';
    } else if (lookingFor === 'female') {
        return person.gender === 'female';
    } else if (lookingFor === 'both') {
        return person.gender === 'male' || person.gender === 'female';
    }
    return false;
}

function filterUsersByAge(users, minAge, maxAge) {
    return users.filter(user=> user.dob.age >= minAge && user.dob.age <= maxAge);
}



const profile = document.querySelector('.wrapper');
const seeMore = document.querySelector('.see-more');
const back = document.querySelector('.back')
const profileInfo = document.querySelector('.wrapper-more');
const likeDislike = document.querySelector('.like-dislike');
const x = document.querySelector('#mainDislike');
const heart = document.querySelector('#mainLike');
const social = document.querySelector('.social');

let currentPerson;
let currentIndex = 0;
let filteredUsers = [];
const userArray = [];

async function getPeopleApi() {
    if (userArray.length === 0) {
        try {
            const response = await fetch('https://randomuser.me/api/?results=10');
            const data = await response.json();
            userArray.push(...data.results);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return;
        }
    }
    
    const minAge = parseInt(ageMin.value);
    const maxAge = parseInt(ageMax.value);

    // Filter users by age and gender preference
    filteredUsers = filterUsersByAge(userArray, minAge, maxAge).filter(user => lookingForGender(user));

    // Debugging: Log the filtered users to check results
    console.log("Filtered Users:", filteredUsers);

    if (filteredUsers.length === 0) {
        profile.innerHTML = `<p>No matching user found based on your preferences.</p>`;
        return;
    }
    
    // Reset currentIndex if it exceeds the length of filteredUsers
    currentIndex = currentIndex % filteredUsers.length;

    // Render the first profile or next profile based on currentIndex
    renderUserProfile(filteredUsers[currentIndex], profile);
}

function renderUserProfile (person, container) {
    currentPerson = person;
    if(!person || !person.picture) {
        console.error('User data is incomplete or indefined.');
        container.innerHTML = `<p>User profile could not be loaded.</p>`;
        return;
    } 
    container.innerHTML = `
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
        <p id="bio">Lover of sunsets, dog walks and spontaneous adventures. Let's create our own love story.
            Looking for someone to share lazy Sunday mornings and late-night conversations with.
            Searching for my partner-in-crime to explore the city, try new foods and cuddle up with on rainy days.
        </p>
    </div>
    `
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

function dislike() {
    profile.classList.add('active');
    setTimeout(() => {
        // Move to the next profile in filteredUsers
        currentIndex = (currentIndex + 1) % filteredUsers.length;
        getPeopleApi();
        profile.classList.remove('active');
    }, 1700);
}

function handleLike() {
    profile.classList.add('like');
    setTimeout(() => {
        // Move to the next profile in filteredUsers
        currentIndex = (currentIndex + 1) % filteredUsers.length;
        getPeopleApi();
        profile.classList.remove('like');
    }, 1700);
}



seeMore.addEventListener('click', handleSeeMore);
x.addEventListener('click', dislike)
back.addEventListener('click', handleBack);
heart.addEventListener('click', handleLike);
getPeopleApi ();