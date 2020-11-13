
var container = document.querySelector("#container");

var request = new XMLHttpRequest();

request.open('GET', 'https://api.github.com/users/adelakuntobi/repos', true)

request.onload = function () {
  var data = JSON.parse(this.response)
  console.log(data)
  data.forEach(repo => {
    // console.log(repo)
    switch (repo.language) {
      case "HTML":
        color = "pink";
      case "CSS":
        color = "#563d7c";
        break;
      case "SCSS":
        color = "#c6538c";
        break;
      case "JavaScript":
        color = "#f1e05a";
        break;
      case "PHP":
        color = "#4F5D95";
        break;
      case "LESS":
        color = "#4F5D95";
        break;

      default: color = "black";
        break;
    }

    details = `
    <div class="repo">
          <div class="repo-details">
            <h3>${repo.name}</h3><span class=${repo.archived ? "archived" : "none"}>Archieved</span>
            <div class="repo-config">
              <div class="">
                <span class="color-type" style="background-color: ${color};"></span><span class="code-type">${repo.language}</span>
              </div>
              <p>Updated yesterday</p>
            </div>
          </div>
          <button>
            <i class="far fa-star"></i>
            Star
          </button>
        </div>
    `
    container.innerHTML += details
  });
}

request.send();