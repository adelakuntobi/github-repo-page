const body = {
  "query": `
    query{
      user(login: "adelakuntobi") {
        name
        login
        avatarUrl
        email
        __typename
        websiteUrl
        starredRepositories {
          edges {
            node {
              name
            }
          }
        }
        repositories(first: 27, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            owner {
              __typename
            }
            name
            description,
            forkCount
            updatedAt
            isFork
            url
            isPrivate
            stargazerCount
            isArchived
            primaryLanguage {
              name
              color
            }
            parent {
              forkCount
              nameWithOwner
              licenseInfo {
                name
              }
            }
          }
        }
      }
    }
   
  `
}

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer 0ebc8ad1dc2da926d1612d234fcf968a18e69f05"
}


const container = document.querySelector("#container");
const container1 = document.querySelector(".first-section");
const isStar = 0

// Fetch Data
fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body)
})
  .then(response => response.json())
  .then(data => {
    // console.log(data.data)
    var data = data.data.user
    console.log(data)

    document.querySelector("#avatar").src = data.avatarUrl
    owner = `
    <section class="flex">
      <img class="profile-avatar" src="${data.avatarUrl}" />
      <section>
        <h1>${data.name}</h1>
        <p>${data.login}</p>
      </section>
    </section>
    <button>Edit profile</button>

    <ul>
      <li>
      <svg class="octicon octicon-people text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
      12 followers</li>
      <li>
      16 followers</li>
      <li>
        <i class="far fa-star"></i>
        1</li>
    </ul>
    <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=${data.email}" target="_blank" class="email">
    <svg class="octicon octicon-mail" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path></svg>
      ${data.email}</a>
    <a href="${data.websiteUrl}" target="_blank" class="email">
    <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
      ${data.websiteUrl}</a>

    <div class="none-mobile">
      <h4>Highlights</h4>
      <p>Arctic Code Vault Contributor</p>
    </div>
    `
    container1.innerHTML = owner

    data.repositories.nodes.forEach(repo => {
      // if (repo.stargazerCount === 0) {

      //   return repo.stargazerCount
      // }

      details = `${repo.owner.__typename === "Organization" ? "" :
        `<div class="repo">
            <div class="repo-details">
              <a href="${repo.url}">${repo.name}</a><span class=${repo.archived ? "archived" : "none"}>Archieved</span>
              ${repo.parent ? `<p class="p-tag">Forked from ${repo.parent.nameWithOwner}</p>` : ""}
              ${repo.description ? `<p class="p-tag desc">${repo.description}</p>` : ""}
              <div class="repo-config">
                <div class="">
                  <span class="color-type" style="background-color: ${repo.primaryLanguage.color};"></span><span class="code-type">${repo.primaryLanguage.name}</span>
                </div>
                ${repo.stargazerCount ? `<div class="flex">
                <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                  <span>${repo.stargazerCount}</span>
                </div>` : ""}
                ${repo.parent ? ` <div class="flex">
                  <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                  <span>${repo.parent.forkCount}</span>
                </div> ` : " "}
                ${repo.parent ? ` <div class="flex">
                <svg class="octicon octicon-law mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>
                  <span>${repo.parent.licenseInfo ? repo.parent.licenseInfo.name : ""}</span>
                </div> ` : " "}
                <p>Updated ${formatTimeUpdated(repo.updatedAt)}</p>
              </div>
            </div>
            <button>
              <i class="far fa-star"></i>
              Star
            </button>
          </div>`}
      `
      container.innerHTML += details
    });
  })

  .catch(error => {
    console.log(error)
  })



  const getInterval = (updatedTimeStamp, format) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const timeParam = { second, minute, hour, day };
    return Math.floor(updatedTimeStamp / timeParam[format]);
  }
  
  const formatTimeUpdated = (date) => {
    const updatedDate = Date.parse(date);
    const modifiedUpdate = (new Date(updatedDate)).toDateString()
    const daysInterval = getInterval(Date.now() - updatedDate, "day");
    if(daysInterval >= 30){
      const [_, month, day, year] = /\s(\w{3})\s(\d{2})\s(\w{4})/.exec(modifiedUpdate);
      return `on ${parseInt(day)} ${month} ${(new Date()).getFullYear() === +year ? "" : year}`
    }
    else{
      let formats = ["day", "hour", "minute", "second"];
      const lastUpdated = formats.map(format =>{
        const when = getInterval(Date.now() - updatedDate, format)
        return `${when} ${when > 1 ? `${format}s`: format} ago`;
      })
        .filter( value => parseInt(value) !== 0)
      return lastUpdated[0];
    }
  }