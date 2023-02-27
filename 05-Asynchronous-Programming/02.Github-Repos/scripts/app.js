function loadRepos() {
	const username = document.getElementById('username').value;
	const output = document.getElementById('repos');

	const url = `https://api.github.com/users/${username}/repos`;
	fetch(url).then(res => {
		console.log(res);
			if(res.ok == false) {
				console.log('Error encountered:',res.status,res.statusText);
				// return Promise.reject(`${res.status} ${res.statusText}`);
				throw `${res.status} ${res.statusText}`
			}
			return res.json();
		})
		.then(data => {
			console.log(data);
			output.replaceChildren();
			data.forEach(repo => {
				let liElement = document.createElement('li');
				let aElement = document.createElement('a');
				aElement.textContent = repo.full_name;
				aElement.setAttribute("href", `${repo.html_url}`);
				liElement.appendChild(aElement);
				output.appendChild(liElement);
			});
		})
		.catch (err => {
			output.innerHTML = `<p>Error encountered: ${err}</p>`;

		})
}