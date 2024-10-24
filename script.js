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


