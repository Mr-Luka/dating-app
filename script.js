const profile = document.querySelector('.wrapper');
const seeMore = document.querySelector('.see-more');
const x = document.querySelector('.x');
const heart = document.querySelector('.heart');



async function getPeopleApi () {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    console.log(data);
    if(x) {
        dislikeButton(data)
    }
}
getPeopleApi ()


function dislikeButton (person) {
    // const personInfo = person.results[0];
    profile.innerHTML = `
        <div class="image">
            <img src="${person.results[0].picture.large}"/>
        </div>
        <div class="title">
            <h1>${person.results[0].name.first} - ${person.results[0].dob.age} years old</h1>
        </div>
        <div class="location cursor typewriter-animation">
            <p>Location: ${person.results[0].location.city}</p>
        </div>
        <div class="description">
            <p>Lover of sunsets, dog walks and spontaneous adventures. Let's create our own love story.
                Looking for someone to share lazy Sunday mornings and late-night conversations with.
                Searching for my partner-in-crime to explore the city, try new foods and cuddle up with on rainy days.
            </p>
        </div>
        <div class="like-dislike">
            <div class="x-button">
                <i class="fa-solid fa-x x" style="color: #d60000;"></i>
            </div>
            <div class="like-button">
                <i class="fa-solid fa-heart heart" style="color: #63E6BE;"></i>
            </div>
        </div>`;
        console.log('Its working')
}

function likedButton () {
    if (heart) {
        console.log('its working')
    }
}

x.addEventListener('click', dislikeButton);
heart.addEventListener('click', likedButton);

