
const profile = document.querySelector('.wrapper');
const seeMore = document.querySelector('.see-more');
const back = document.querySelector('.back')
const profileInfo = document.querySelector('.wrapper-more')
const xInfo = document.querySelector('.x');
const heart = document.querySelector('.heart');

let currentPerson;

async function getPeopleApi () {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    currentPerson = data.results[0];
    dislikeButton(currentPerson);
}

function dislikeButton (person) {
    // const personInfo = person.results[0];
    if (person.gender === 'female') {
        profile.style.backgroundColor = '#da67f193';
    } else {
        profile.style.backgroundColor = '#43b4cd93';
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
        <div class="like-dislike">
            <i class="fa-solid fa-x x" style="color: #d60000;"></i>
            <i class="fa-solid fa-heart heart" style="color: #63E6BE;"></i>
        </div>`;

        const x = document.querySelector('.x');
        x.addEventListener('click', getPeopleApi);

}



function handleSeeMore() {
    if (!currentPerson) return;

    profile.classList.add('hidden');
    seeMore.classList.add('hidden');
    profileInfo.classList.remove('hidden');
    back.classList.remove('hidden');

    if (currentPerson.gender === 'female') {
        profileInfo.style.backgroundColor = '#da67f193';
    } else {
        profileInfo.style.backgroundColor = '#43b4cd93';
    }

    profileInfo.innerHTML = `
    <section class="gallery">
        <div class="images stagger" data-delay="0.5s">
            <img src="${currentPerson.picture.large}"/>
            <img src="${currentPerson.picture.large}"/>
            <img src="${currentPerson.picture.large}"/>
            <img src="${currentPerson.picture.large}"/>
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
            <i class="fa-solid fa-x x x-info" style="color: #d60000;"></i>
            <i class="fa-solid fa-heart heart" style="color: #63E6BE;"></i>
        </div>
        </div>
    </div>
    `;
}

function handleBack() {
    profile.classList.remove('hidden');
    seeMore.classList.remove('hidden');
    profileInfo.classList.add('hidden');
    back.classList.add('hidden');
}

function xGoBack(){
    handleBack();
    getPeopleApi();
}

seeMore.addEventListener('click', handleSeeMore);
// xInfo.addEventListener('click', ()=> {
//     xGoBack();
// })
back.addEventListener('click', handleBack);
// heart.addEventListener('click', likedButton);
getPeopleApi ()

