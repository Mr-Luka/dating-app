const profile = document.querySelector('.wrapper');
const seeMore = document.querySelector('.see-more');
const back = document.querySelector('.back')
const profileInfo = document.querySelector('.wrapper-more')
const x = document.querySelector('.x');
const heart = document.querySelector('.heart');



async function getPeopleApi () {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();

    dislikeButton(data.results[0]);
    handleSeeMore(data.results[0])
}


function dislikeButton (person) {
    // const personInfo = person.results[0];
    profile.innerHTML = `
        <div class="image">
            <img src="${person.picture.large}"/>
        </div>
        <div class="title">
            <h1>${person.name.first} - ${person.dob.age} years old</h1>
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

function likedButton () {
    console.log('works')
}

function handleSeeMore(person) {
    profile.classList.add('hidden');
    seeMore.classList.add('hidden');
    profileInfo.classList.remove('hidden');
    back.classList.remove('hidden');

    profileInfo.innerHTML = `
    <section class="gallery">
        <div class="images stagger" data-delay="0.5s">
            <img src="${person.picture.large}"/>
            <img src="${person.picture.large}"/>
            <img src="${person.picture.large}"/>
            <img src="${person.picture.large}"/>
        </div>
    </section>
        
        <div class="title-more">
            <h1>${person.name.first} - ${person.dob.age} years old</h1>
        </div>
        <div class="location-more cursor typewriter-animation">
            <p>Location: New York</p>
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
        <i class="fa-solid fa-x x" style="color: #d60000;"></i>
        <i class="fa-solid fa-heart heart" style="color: #63E6BE;"></i>
        </div>
        </div>
    </div>
    `
}

function handleBack() {
    profile.classList.remove('hidden');
    seeMore.classList.remove('hidden');
    profileInfo.classList.add('hidden');
    back.classList.add('hidden');

}

seeMore.addEventListener('click', handleSeeMore);
back.addEventListener('click', handleBack);
heart.addEventListener('click', likedButton);
getPeopleApi ()

