const searchArea = document.querySelector(".search-area input");
const searchButton = document.querySelector(".search-area .search-button");
const dataArea = document.querySelector(".data");
const card = document.querySelector(".card");

window.onload = () => {
  if (card.innerHTML.trim() === "") {
    card.style.display = "none";
  }
};

//function to change format of given date
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);
  return `Joined   ${formattedDate}`;
}

searchButton.onclick = () => {
  getUserData();
  getRepos();
};

const getUserData = () => {
  const username = searchArea.value.trim();
  if (username === "") {
    dataArea.innerHTML = "<span>Please Enter a GitHub Username</span>";
    dataArea.style.textAlign = "center";
    dataArea.style.fontWeight = "bold";
  } else {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //display the card
        card.style.display = "block";
        //create main-info component
        let mainInfo = document.createElement("div");
        mainInfo.className = "main-info";

        //create the image
        let image = document.createElement("img");
        image.className = `user-avatar`;
        image.src = data.avatar_url;

        //create the text container next to image
        let text = document.createElement("div");
        text.className = "text";

        //get the name of the user
        let name = document.createElement("p");
        name.className = "name";
        name.innerHTML = data.name;

        //get the user handle
        let handle = document.createElement("a");
        handle.href = data.html_url;
        handle.target = "_blank";
        handle.className = "handle";
        handle.innerHTML = "@" + data.login;

        //get the user Joined date
        let date = document.createElement("p");
        date.className = "date";
        date.innerHTML = formatDate(data.created_at);

        //append the name to taxt area
        text.appendChild(name);
        text.appendChild(handle);
        text.appendChild(date);
        //append image to main-info
        mainInfo.appendChild(image);
        mainInfo.appendChild(text);

        //append main-info to card
        card.appendChild(mainInfo);

        searchArea.innerHTML = ``;
      });
  }
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
          // console.log(repo.name);
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
