// import axios from 'axios'

// let searcArea = document.querySelector('.search-area input');

// let searchButton = document.querySelector('.search-area .search-button');

// let dataArea = document.querySelector('.data');

// searchButton.onclick = () => {
//     getRepos();
// }

// let getRepos = () => {
//     if(searcArea.value === ''){
//         dataArea.innerHTML = '<span>Please Enter Githup Username</span>';
//         dataArea.style.textAlign = 'center';
//         dataArea .style.fontWeight = 'bold';
//     }
//     else{
//         axios.get('https://api.githup.com/users/ElzeroWebSchool/repos')
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => {
//             console.log(data);
//         });
//     }
// }

// import axios from 'axios';

const searchArea = document.querySelector(".search-area input");
const searchButton = document.querySelector(".search-area .search-button");
const dataArea = document.querySelector(".data");

searchButton.onclick = () => {
  getRepos();
};

const getRepos = () => {
  const username = searchArea.value.trim(); // Trim to remove leading/trailing whitespace
  if (username === "") {
    dataArea.innerHTML = "<span>Please Enter a GitHub Username</span>";
    dataArea.style.textAlign = "center";
    dataArea.style.fontWeight = "bold";
  } else {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        dataArea.innerHTML = "";
        data.forEach((repo) => {
          console.log(repo.name);
          let mainDiv = document.createElement("div");
          mainDiv.className = "repo-box";
          mainDiv.textContent = repo.name;

          let url = document.createElement("a");
          url.className = "button";
          url.href = `https://github.com/${username}/${repo.name}`;
          url.setAttribute("target", "_blank");
          url.textContent = "visit";

          let startSpan = document.createElement("span");
          startSpan.className = "button";
          startSpan.textContent = `Stars ${repo.stargazers_count}`;

          let buttons = document.createElement("div");
          buttons.className = "buttons";
          buttons.appendChild(url);
          buttons.appendChild(startSpan);

          mainDiv.appendChild(buttons);

          dataArea.appendChild(mainDiv);
        });
      })
      .catch((error) => {
        console.error(error);
        dataArea.innerHTML = `<span>Error: ${error.message}</span>`;
        dataArea.style.textAlign = "center";
        dataArea.style.fontWeight = "bold";
      });
  }
};
