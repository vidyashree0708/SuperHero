const searchBtn = document.querySelector('.search-btn');
const superHeroList = document.getElementById('superhero');
const superHeroDetailsContent = document.querySelector('.superhero-details-content');
const superHeroCloseBtn = document.getElementById('superhero-close-btn');
const searchInputTxt = document.getElementById('search-input');


superHeroCloseBtn.addEventListener('click', () =>
{
  superHeroDetailsContent.parentElement.classList.remove('showSuperHero')
  console.log("close");
})

searchBtn.addEventListener('click', getSuperHeroList);

function getSuperHeroList()
{
  let searchInputTxt = document.getElementById('search-input').value.trim();
  //console.log(searchInputTxt);

  fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=94990c30eeadfb944e8ce703f46fb9df&hash=84942db7f1df9d6abda2409a1c16dcf5&nameStartsWith=${searchInputTxt}`)
    .then(response => response.json())
    .then(data =>
    {
      let html = "";
      if (data.data.results)
      {
        data.data.results.forEach(element =>
        {
          html += `
        <div class="superhero-item" data-id = "${element.id}">
        <div class="superhero-img">
            <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" alt="superhero"/>
        </div>
        <div class="superhero-name">
        <a href="#" class="superhero-info">
           ${element.name}
            </a>
            <a href="#" class="superhero-btn">Add To Favourites</a>
        </div>
    </div>`;

        });
        //console.log(data);
        superHeroList.classList.remove('notFound');
      }
      else
      {
        html = "Sorry, we didn't find any superhero!";
        superHeroList.classList.add('notFound');
      }


      superHeroList.innerHTML = html;
    })
}/*
superHeroList.addEventListener('click', getSuperHeroInfo);
function getSuperHeroInfo(e)
{
  e.preventDefault();
  console.log(e.target);
}*/
superHeroList.addEventListener('click', getSuperHeroInfo);
function getSuperHeroInfo(e)
{
  e.preventDefault();
  if (e.target.classList.contains('superhero-info'))
  {
    let superHeroItem = e.target.parentElement.parentElement;
    console.log(superHeroItem);
    fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=94990c30eeadfb944e8ce703f46fb9df&hash=84942db7f1df9d6abda2409a1c16dcf5&id=${superHeroItem.dataset.id}`)
    .then(response => response.json())
    .then(data => superHeroModal(data.data.results));
  }
}
function superHeroModal(element){
  console.log(element);
  element = element[0];
  let html=`<h2 class="superhero-title">${element.name}</h2>

  <div class="superheros-img">
  <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" alt="superhero"/>
  </div>
  <div class="superhero-instruct">
      <p>${element.description}</p>
  </div>`;
  superHeroDetailsContent.innerHTML = html;
  superHeroDetailsContent.parentElement.classList.add('showSuperHero');
}
/*
superHeroList.addEventListener('DOMContentLoaded', function(){
  document.querySelector('.superhero-info').addEventListener('click',function(event){
    event.preventDefault();
    fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=94990c30eeadfb944e8ce703f46fb9df&hash=84942db7f1df9d6abda2409a1c16dcf5&nameStartsWith=${searchInputTxt}`)
    .then(response=>{
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the API response data here
      console.log('API Data:', data);
    })
    .catch(error => {
      // Handle errors that may occur during the API request
      console.error('Error fetching data:', error);
    })
  })
})
*/
/*
superHeroList.addEventListener('DOMContentLoaded', function () {
  // Add a click event listener to the superhero-info element
  document.querySelector('.superhero-info').addEventListener('click', function (event) {
    // Simulate a click on the superhero-info element
    document.querySelector('.superhero-info').click();
  });

  // Define the getSuperHeroInfo function
  function getSuperHeroInfo(e) {
    e.preventDefault();
    if (e.target.classList.contains('superhero-info')) {
      let superHeroItem = e.target.parentElement.parentElement;
      console.log(superHeroItem);
    }
  }
  getSuperHeroInfo()
});*/
