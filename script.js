
let myProfile = {
    myName: 'Lam90namdinh',
    myProfileImg: 'Lam90namdinh.jpg',
}

let followRecommendationList = [
    {
        'profileImg': 'Clip-Art.png',
        'userName': 'Clip Art',
    },
    {
        'profileImg': 'Leonorah-Beverly.jpg',
        'userName': 'Leonorah Beverly',
    },
    {
        'profileImg': 'Naruto.png',
        'userName': 'Naruto',
    },
    {
        'profileImg': 'Linux.jpg',
        'userName': 'Linux',
    },
];

let stories = [
    {
        'profileImg': 'Hangover.jpg',
        'author': 'Hangover',
    },
    {
        'profileImg': 'Ocean-Woman.jpg',
        'author': 'Ocean Woman',
    },
    {
        'profileImg': 'Blue-Sky.jpg',
        'author': 'Blue Sky',
    },
    {
        'profileImg': 'Lonely-Future.jpg',
        'author': 'Lonely Future',
    },
];

let posts = [
    {
        'profileImg': 'Hangover.jpg',
        'author': 'Hangover',
        'location': 'Munich, Germany',
        'postImg': 'bmw-i8-white.jpg',
        'description': 'The M1, based on the BMW Turbo concept of the early 70’s, was penned by car design icon Giorgetto Giugiaro and powered by the “big six” M88 3.5L inline-6 churning out 273HP.',
        'like': false,
        'comments': [],
    },
    {
        'profileImg': 'Ocean-Woman.jpg',
        'author': 'Ocean Woman',
        'location': 'Mallorca, Spain',
        'postImg': 'mallorca.jpg',
        'description': 'My car was broken on a beautiful day in Mallorca. Everything was stolen',
        'like': false,
        'comments': [],
    },
    {
        'profileImg': 'Blue-Sky.jpg',
        'author': 'Blue Sky',
        'location': 'Siemenswerke, Munich, Germany',
        'postImg': 'bmw-i8.jpg',
        'description': 'Ronaldo Nazario works for Siemens in Germany after retiring from football. So that he can drive at unlimited speed every day.',
        'like': false,
        'comments': [],
    },
    {
        'profileImg': 'Lonely-Future.jpg',
        'author': 'Lonely Future',
        'location': 'Vietnam',
        'postImg': 'lonely-future.jpg',
        'description': 'I‘m sorry, but most of the time… I don‘t feel like talking to anyone. I like to be alone and I like to give myself time to reach out to the people I want to talk to. And if it‘s not them it‘s nobody. I don‘t intentionally ignore you! It‘s just me starting to feel tired of people. It‘s just my thoughts that kill my social-being…. I‘m anti-social most of the time… it‘s actually me. It‘s not YOU. Please forgive me for being like this. I might seem like I only reach out to you if I see an advantage in doing so but that‘s only because I don‘t feel necessary to talk to people anymore… NOBODY actually cares. They only hear what they wanna hear… they only say what they need to say … they only listen if they need to listen. So instead of all those small talk please understand my mindset.',
        'like': false,
        'comments': [],
    },
];

function init() {
    loadMyProfile();
    loadFollowRecommendationList();
    loadStories();
    loadPosts();
    activateCommentButton();
}

function setToLocalStorage(key, array) { //set here and use below
    localStorage.setItem(key, JSON.stringify(array));
}

function getFromLocalStorage(key) { //set here and use below
    return JSON.parse(localStorage.getItem(key));
}

/**
 * MY PROFILE
 */

function loadMyProfile() {
    document.getElementById('myProfile').innerHTML = `
        <img class="profileImg" src="img/profileImg/${myProfile.myProfileImg}" alt="">
        <b id="userName">${myProfile.myName}</b>
    `;
}

/**
 * FOLLOW RECOMMENDATION
 */

function loadFollowRecommendationList() {
    document.getElementById('followRecommendations').innerHTML = `
        <div>
            <h4>Vorschläge für dich</h4>
            <span>Alles ansehen</span>
        </div>
    `;

    for (let i = 0; i < followRecommendationList.length; i++) {
        document.getElementById('followRecommendations').innerHTML += `
            <div>
                <div class="user" id="user(${i})">
                    <img class="profileImg" src="img/profileImg/${followRecommendationList[i]['profileImg']}" alt="">
                    <b id="userName(${i})">${followRecommendationList[i]['userName']}</b>
                </div>
                <span class="editButton">follow</span>
            </div>
        `;
    }
}

/**
 * STORIES
 */

function loadStories() {
    document.getElementById('stories').innerHTML = `
        <div class="demo storyAuthor addYourStory">
            <img class="profileImg" src="img/profileImg/${myProfile.myProfileImg}" alt="">
            <button class="plusButton"> + </button>
            <span class="createStory">deine Story</span>
            <span class="tooltiptext">demo</span>
        </div>
    `;
    for (let i = 0; i < stories.length; i++) {
        document.getElementById('stories').innerHTML += `
        <div class="storyAuthor" id="storyAuthor(${i})">
            <img class="profileImg" src="img/profileImg/${stories[i]['profileImg']}" alt="">
            <span>${stories[i]['author']}</span>
        </div>
        `;
    }
}

/**
 * POSTS
 */

function loadPosts() {
    // setToLocalStorage('posts', posts);
    if (getFromLocalStorage('posts')) {
        posts = getFromLocalStorage('posts');
    }

    document.getElementById('posts').innerHTML = ``;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        document.getElementById('posts').innerHTML += `
            <div class="post">
                <div class="poster">${renderPoster(post)}</div>
                <div class="postImg">${renderPostImg(post)}</div>
                <div class="functionButtons row-between">${renderFunctionButtons(i)}</div>
                <p class="description">${post['description']}</p>
                <div class="comments" id="commentsContainer(${i})"></div>
                <div class="commentCreatingField">${renderCommentCreatingField(i)}</div>
            </div>
        `;
        renderComments(i);
        loadLikeIcon(i);
    }
}

/**
 * SEARCH
 */

function search() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    
    document.getElementById('posts').innerHTML = ``;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if(postFitSearch(post, search)){
            document.getElementById('posts').innerHTML += `
                <div class="post">
                    <div class="poster">${renderPoster(post)}</div>
                    <div class="postImg">${renderPostImg(post)}</div>
                    <div class="functionButtons row-between">${renderFunctionButtons(i)}</div>
                    <p class="description">${post['description']}</p>
                    <div class="comments" id="commentsContainer(${i})"></div>
                    <div class="commentCreatingField">${renderCommentCreatingField(i)}</div>
                </div>
            `;
            renderComments(i);
            loadLikeIcon(i);
        }
    }
    hightlightSearchResult();//doesn't work
}

function postFitSearch(post, search){
    return post.author.toLowerCase().includes(search) || post.description.toLowerCase().includes(search) || post.location.toLowerCase().includes(search);
}

function renderPoster(post) {
    return `
            <div class="row-between">
                <img class="profileImg" src="img/profileImg/${post['profileImg']}" alt="">
                <div class="column">
                    <b class="author">${post['author']}</b>
                    <span class="location">${post['location']}</span>
                </div>
            </div>
            <span class="optionButton">•••</span>
    `;
}

function renderPostImg(post) {
    return `
            <img src="img/${post['postImg']}">
    `;
}

function renderFunctionButtons(i) {
    return `
            <div>
                <i id="like(${i})" onclick="like(${i})"></i>
                <i class="far fa-comment-alt" onclick="toggleCommentsContainer(${i})"></i>
                <i class="demo far fa-paper-plane"><span class="tooltiptext">demo</span></i>
            </div>
            <div>
                <i class="demo far fa-bookmark"><span class="tooltiptext">demo</span></i>
            </div>
    `;
}

function loadLikeIcon(i) {
    let likeIcon = document.getElementById(`like(${i})`);
    if (posts[i].like == false) {
        likeIcon.className = "far fa-heart";
    }
    else {
        likeIcon.className = "fas fa-heart";
    }
}

function renderCommentCreatingField(i) {
    return `
            <i class="demo iconBox far fa-smile"><span class="tooltiptext">demo</span></i>
            <textarea id="newComment(${i})" onkeyup="activateCommentButton(${i})" placeholder="Kommentar hinzufügen ..." oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
            <button id="commentButton(${i})" type="submit" onclick="comment(${i})">Posten</button>
    `;
}

function activateCommentButton(i) {
    let commentButton = document.getElementById(`commentButton(${i})`);
    if (document.getElementById(`newComment(${i})`).value) {
        commentButton.disabled = false;
        commentButton.style = 'opacity: 1; cursor: pointer';
    } else {
        commentButton.disabled = true;
        commentButton.style = '';
    }
}

function hightlightSearchResult(){ //doesn't work
    let search = document.getElementById('search').value;
    let searchResultGlobal = new RegExp(search, "g");
    document.getElementById('posts').innerHTML.replace(searchResultGlobal, (search) => `<mark>${search}</mark>`);
}

/**
 * COMMENT
 */

function comment(i) {
    if (document.getElementById(`newComment(${i})`).value) {
        pushNewCommentToArray(i);
        setToLocalStorage('posts', posts);
        renderComments(i);
    }
    document.getElementById(`commentButton(${i})`).style = '';
    document.getElementById(`newComment(${i})`).style = 'height: 20px'; //to make newComment-textarea comeback to oneline height after submit
}

function pushNewCommentToArray(i, post) {
    let newComment = document.getElementById(`newComment(${i})`).value;
    newComment = newComment.replaceAll('\n', '<br>') //to break the comment lines like writing on textarea
    posts[i].comments.push(newComment);
}

function renderComments(i) {
    getFromLocalStorage('posts');
    let commentsContainer = document.getElementById(`commentsContainer(${i})`);
    commentsContainer.innerHTML = ``;
    for (let a = 0; a < posts[i]['comments'].length; a++) {
        document.getElementById(`commentsContainer(${i})`).innerHTML += `
            <b>${myProfile.myName}</b>
            <p>${posts[i]['comments'][a]}</p>
        `;
    }
    if (commentsContainer.classList == 'd-none') {
        commentsContainer.classList.remove('d-none');
    }
    document.getElementById(`newComment(${i})`).value = '';
}

function toggleCommentsContainer(i) {
    document.getElementById(`commentsContainer(${i})`).classList.toggle('d-none');
}

/**
 * LIKE
 */

function like(i) {
    getFromLocalStorage('posts');
    let likeIcon = document.getElementById(`like(${i})`)

    if (posts[i].like == false) {
        posts[i].like = true;
        likeIcon.classList.replace("far", "fas");
    } else {
        posts[i].like = false;
        likeIcon.classList.replace("fas", "far");
    }
    setToLocalStorage('posts', posts);
}



/**
 * ONTOP BUTTON
 */

function onTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
