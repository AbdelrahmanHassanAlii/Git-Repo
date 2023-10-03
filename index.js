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

const searchArea = document.querySelector('.search-area input');
const searchButton = document.querySelector('.search-area .search-button');
const dataArea = document.querySelector('.data');

searchButton.onclick = () => {
  getRepos();
};

const getRepos = () => {
  const username = searchArea.value.trim(); // Trim to remove leading/trailing whitespace
  if (username === '') {
    dataArea.innerHTML = '<span>Please Enter a GitHub Username</span>';
    dataArea.style.textAlign = 'center';
    dataArea.style.fontWeight = 'bold';
  } else {
    fetch(`https://api.github.com/users/abdo100300500/repos`)
    .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                })
      .catch((error) => {
        dataArea.innerHTML = `<span>Error: ${error.message}</span>`;
        dataArea.style.textAlign = 'center';
        dataArea.style.fontWeight = 'bold';
      });
  }
};
