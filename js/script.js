// Get Element From HTML

let elUsersWrapper = document.querySelector(".users__wrapper");
let elUsersTemplate = document.querySelector("#users__template").content;
let elUsersResult = document.querySelector(".users__result");
let elUsersId = document.querySelector(".users__id");
let elUsersName = document.querySelector(".users__name");
let elUsersUserName = document.querySelector(".users__username");
let elUsersEmail = document.querySelector(".users__email");
let elUsersCountry = document.querySelector(".users__country");
let elUsersCompany = document.querySelector(".users__company");
let elUsersWebsite = document.querySelector(".users__website");

// Posts Element From HTML

let elPostsWrapper = document.querySelector(".posts__wrapper");
let elPostsTemplate = document.querySelector("#posts__template").content;
let elPostsResult = document.querySelector(".posts__result");
let elCommentsId = document.querySelector(".posts__id");
let elPostsTitle = document.querySelector(".posts__title");
let elPostsBody = document.querySelector(".posts__body");

// Comment Element From HTML

let elCommentsWrapper = document.querySelector(".comments__wrapper");
let elCommentsTemplate = document.querySelector("#comments__template").content;
let elCommentsResult = document.querySelector(".comments__result");
let elCommentsTitle = document.querySelector(".comments__title");
let elCommentsEmail = document.querySelector(".comments__email");
let elCommentsBody = document.querySelector(".comments__body");

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(data => {
    usersRander(data, elUsersWrapper);
}); 

// Render Users 

function usersRander(array, wrapper) {
    wrapper.innerHTML = null;
    elUsersResult.textContent = array.length;
    
    let usersFragment = document.createDocumentFragment();
    
    for (const item of array) {
        usersTemp = elUsersTemplate.cloneNode(true);
        
        usersTemp.querySelector(".users__name").textContent = item.name;
        usersTemp.querySelector(".users__username").textContent = item.username;
        usersTemp.querySelector(".users__email").textContent = item.email;
        usersTemp.querySelector(".users__email").href = item.email;
        usersTemp.querySelector(".users__id").dataset.userId = item.id
        usersTemp.querySelector(".users__country").textContent = item.address.city;
        usersTemp.querySelector(".users__company").textContent = item.company.name;
        usersTemp.querySelector(".users__website").textContent = item.website;
        usersTemp.querySelector(".users__website").href = item.website;
        
        usersFragment.appendChild(usersTemp);
    }   
    wrapper.appendChild(usersFragment);
}

//  Render Posts

function renderPosts(array, wrapper) {
    wrapper.innerHTML = null;
    elPostsResult.textContent = array.length;
    
    let fragment = document.createDocumentFragment();
    
    for (const item of array) {
        let postsTemp = elPostsTemplate.cloneNode(true);
        
        postsTemp.querySelector(".posts__title").textContent = item.title;
        postsTemp.querySelector(".posts__body").textContent = item.body;
        postsTemp.querySelector(".posts__id").dataset.postsId = item.id;
        
        fragment.appendChild(postsTemp);
    }
    wrapper.appendChild(fragment);
}

// Render Comments

function renderComments(array, wrapper) {
    wrapper.innerHTML = null;
    elCommentsResult.textContent = array.length;
    
    let fragment = document.createDocumentFragment();
    
    for (const item of array) {
        let commentsTemp = elCommentsTemplate.cloneNode(true);
        
        commentsTemp.querySelector(".comments__title").textContent = item.name;
        commentsTemp.querySelector(".comments__email").textContent = item.email;
        commentsTemp.querySelector(".comments__email").href = item.email;
        commentsTemp.querySelector(".comments__body").textContent = item.body;
        
        fragment.appendChild(commentsTemp);
    }
    wrapper.appendChild(fragment)
}


elUsersWrapper.addEventListener("click", function (evt) {
    let datasetId = evt.target.closest(".users__id").dataset.userId
    
    if(datasetId){
        fetch(`https://jsonplaceholder.typicode.com/users/${datasetId}/posts`)
        .then(response => response.json())
        .then(data => {
            renderPosts(data, elPostsWrapper);
        });
    }
});


elPostsWrapper.addEventListener("click", function (evt) {
    let datasetId = evt.target.closest(".posts__id").dataset.postsId;
    
    if (datasetId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${datasetId}/comments`)
        .then(response => response.json())
        .then(data =>{
            renderComments(data, elCommentsWrapper);
            console.log(data);
        });
    }
});

