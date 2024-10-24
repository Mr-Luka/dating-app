const profile = document.querySelector('.wrapper');
const seeMore = document.querySelector('.see-more');
const x = document.querySelector('.x');
const heart = document.querySelector('.heart');
console.log(x)


async function getPeopleApi () {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    console.log(data);
    dislikeButton(data);
}
getPeopleApi ()


function dislikeButton (person) {
    const personInfo = person.results[0];
    profile.innerHTML = `
        <div class="image">
            <img src="${personInfo.picture.large}"/>
        </div>
        <div class="title">
            <h1>${personInfo.name.first} - ${personInfo.dob.age} years old</h1>
        </div>
        <div class="location cursor typewriter-animation">
            <p>Location: ${personInfo.location.city}</p>
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
}

x.addEventListener('click', dislikeButton);