
var container = document.querySelector("#container");

const url = "https://api.github.com/graphql";

const query = `
query{
  viewer {
    name
     repositories(last: 20) {
       forks
       nodes {
         name/
         description      
       }
     }
   }
}
`
const opts = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 3b1056fe51256f47665870892fc8b13b51a1393a"
  },
  body: JSON.stringify({ query })
};



fetch(url, opts)
  .then(res => res.json())
  .then(data => {
    console.log(data.data.user)
  })
  .catch(err => { console.log(err) });




// data.forEach(repo => {
//   // console.log(repo)
//   switch (repo.language) {
//     case "HTML":
//       color = "#e34c26";
//       break;
//     case "CSS":
//       color = "#563d7c";
//       break;
//     case "SCSS":
//       color = "#c6538c";
//       break;
//     case "JavaScript":
//       color = "#f1e05a";
//       break;
//     case "PHP":
//       color = "#4F5D95";
//       break;
//     case "LESS":
//       color = "#4F5D95";
//       break;

//     default: color = "black";
//       break;
//   }

//   details = `
//   <div class="repo">
//         <div class="repo-details">
//           <h3>${repo.name}</h3><span class=${repo.archived ? "archived" : "none"}>Archieved</span>
//           <div class="repo-config">
//             <div class="">
//               <span class="color-type" style="background-color: ${color};"></span><span class="code-type">${repo.language}</span>
//             </div>
//             <p>Updated yesterday</p>
//           </div>
//         </div>
//         <button>
//           <i class="far fa-star"></i>
//           Star
//         </button>
//       </div>
//   `
//   container.innerHTML += details
// });


function convertTime() {
  var today = new Date();
  var str = today.toGMTString();
  console.log(str);
}
convertTime();