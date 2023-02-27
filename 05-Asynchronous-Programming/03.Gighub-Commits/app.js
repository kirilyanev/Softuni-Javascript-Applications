function loadCommits() {
    // Try it with Fetch API
    const username = document.getElementById('username').value;
    const repository = document.getElementById('repo').value;
    const commits = document.getElementById('commits');
    const url = `https://api.github.com/repos/${username}/${repository}/commits`;

    fetch(url).then(response => {
        if(response.ok == false) {
            throw `Error: ${response.status} (Not Found)`;
        }
        return response.json();
    }).then(data => {
        commits.replaceChildren();
        for (let entry of data) {
            const liElement = document.createElement('li');
            liElement.textContent = `${entry.commit.author.name}: ${entry.commit.message}`;
            commits.appendChild(liElement);
        }
    }).catch(error => {
        commits.replaceChildren();
        const liElement = document.createElement('li');
        liElement.textContent = `${error}`;
        commits.appendChild(liElement);
    })
}