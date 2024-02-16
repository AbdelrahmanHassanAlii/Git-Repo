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
  card.innerHTML = "";
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
        if (data.message === "Not Found") {
          return;
        } else {
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

          //get the user bio
          let bio = document.createElement("div");
          bio.className = "bio";
          bio.innerHTML = data.bio || `This Profile has no Bio`;

          //create the container of the numbers
          let numbers = document.createElement("div");
          numbers.className = "numbers";

          let publicRepositories = document.createElement("div");

          let publicRepositoriesName = document.createElement("p");
          publicRepositoriesName.className = "public-repositories-name";
          publicRepositoriesName.innerHTML = "Public Repos";

          let numberOfPublicRepos = document.createElement("p");
          numberOfPublicRepos.className = "number";
          numberOfPublicRepos.innerHTML = data.public_repos;

          let followersContainer = document.createElement("div");

          let followers = document.createElement("p");
          followers.className = "followers";
          followers.innerHTML = "Followers";

          let numberOfFollowers = document.createElement("p");
          numberOfFollowers.className = "number";
          numberOfFollowers.innerHTML = data.followers;

          let followingContainer = document.createElement("div");

          let following = document.createElement("p");
          following.className = "followering";
          following.innerHTML = "Followering";

          let numberOfFollowing = document.createElement("p");
          numberOfFollowing.className = "number";
          numberOfFollowing.innerHTML = data.following;

          let contacts = document.createElement("div");
          contacts.className = "contacts";

          let adress = document.createElement("p");
          adress.className = "adress";
          if (!data.adress) {
            adress.classList.add("disabled");
          } else {
            adress.classList.remove("disabled");
          }
          adress.innerHTML =
            `<i class="fa-solid fa-location-dot"></i>` +
            (data.location ? data.location : "Not Available");

          let link = document.createElement("a");
          link.className = "link";
          if (!data.blog) {
            link.classList.add("disabled");
          } else {
            link.classList.remove("disabled");
          }
          link.src = data.blog;
          link.innerHTML =
            `<i class="fa-solid fa-link"></i>` +
            (data.blog === "" ? "Not Available" : data.blog);

          let twiter = document.createElement("p");
          twiter.className = "twitter";
          if (!data.twitter_username) {
            twiter.classList.add("disabled");
          } else {
            twiter.classList.remove("disabled");
          }
          twiter.innerHTML =
            `<i class="fa-brands fa-twitter"></i>` +
            (data.twitter_username ? data.twitter_username : "Not Available");

          let company = document.createElement("p");
          company.className = "company";
          if (!data.company) {
            company.classList.add("disabled");
          } else {
            company.classList.remove("disabled");
          }
          company.innerHTML =
            `<i class="fa-solid fa-building"></i>` +
            (data.company === "" ? "Not Available" : data.company);

          //append the name to taxt area
          text.appendChild(name);
          text.appendChild(handle);
          text.appendChild(date);

          //append image to main-info
          mainInfo.appendChild(image);
          mainInfo.appendChild(text);

          publicRepositories.appendChild(publicRepositoriesName);
          publicRepositories.appendChild(numberOfPublicRepos);

          followersContainer.appendChild(followers);
          followersContainer.appendChild(numberOfFollowers);

          followingContainer.appendChild(following);
          followingContainer.appendChild(numberOfFollowing);

          numbers.appendChild(publicRepositories);
          numbers.appendChild(followersContainer);
          numbers.appendChild(followingContainer);

          contacts.appendChild(adress);
          contacts.appendChild(link);
          contacts.appendChild(twiter);
          contacts.appendChild(company);

          //append main-info to card
          card.appendChild(mainInfo);
          card.appendChild(bio);
          card.appendChild(numbers);
          card.appendChild(contacts);

          searchArea.innerHTML = ``;
        }
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
        data.forEach((repo, index) => {
          // console.log(repo.name);
          let mainDiv = document.createElement("div");
          mainDiv.className = "repo-box";
          mainDiv.textContent = ` ${index + 1} - ${repo.name}`;

          let description = document.createElement("p");
          description.className = "repo-description";
          description.innerHTML =
            repo.description || "NO Description For This Repository";

          let url = document.createElement("a");
          url.className = "button";
          url.href = `https://github.com/${username}/${repo.name}`;
          url.setAttribute("target", "_blank");
          url.innerHTML = `<i class="fa-solid fa-code"></i>` + "Code";

          let startSpan = document.createElement("span");
          startSpan.className = "button";
          startSpan.textContent = `Stars ${repo.stargazers_count}`;

          let demo = document.createElement("a");
          demo.href = `${repo.homepage}`;
          console.log(repo.homepage);
          demo.target = "_blank";
          demo.className = "button demo-button";
          demo.innerHTML = `<i class="fa-solid fa-globe"></i> Demo`;

          let buttons = document.createElement("div");
          buttons.className = "buttons";
          buttons.appendChild(url);
          // buttons.appendChild(startSpan);
          repo.homepage !== null ? buttons.appendChild(demo) : null;

          mainDiv.appendChild(description);
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
