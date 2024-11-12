async function getInitialPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was an error fetching the posts", error);
    }
}

function displayPosts(posts) {
    const postContainer = document.getElementById('posts');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        `;
        postContainer.appendChild(postElement);
    });
}

// Fetch and display initial posts
getInitialPosts().then(posts => {
    displayPosts(posts);
});
async function loadMorePosts() {
    showLoader();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await response.json();
    displayPosts(data);
    hideLoader();
}

function showLoader() {
    document.querySelector('.loader').style.display = 'block';
}

function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        loadMorePosts();
    }
});
const filterInput = document.getElementById('filter');
filterInput.addEventListener('input', filterPosts);

function filterPosts(e) {
    const searchTerm = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const postTitle = post.querySelector('.post-title').innerText.toUpperCase();
        const postContent = post.querySelector('.post-body').innerText.toUpperCase();
        if (postTitle.includes(searchTerm) || postContent.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}
