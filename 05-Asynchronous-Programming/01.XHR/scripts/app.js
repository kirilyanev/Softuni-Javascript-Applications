function loadRepos() {
   const div = document.getElementById('res');
   const httpRequest = new XMLHttpRequest;
   let url = 'https://api.github.com/users/testnakov/repos';

   httpRequest.addEventListener('readystatechange',()=> {
      if(httpRequest.readyState == 4) {
         div.textContent = httpRequest.responseText;
      }
   })
   httpRequest.open('GET',url);
   httpRequest.send();
}