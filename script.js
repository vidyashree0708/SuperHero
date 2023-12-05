const searchBtn = document.querySelector('.search-btn');
const superHeroList = document.getElementById('superhero');
const superHeroDetailsContent = document.querySelector('.superhero-details-content');
const superHeroCloseBtn = document.getElementById('superhero-close-btn');
const searchInputTxt = document.getElementById('search-input');


superHeroCloseBtn.addEventListener('click', ()=>{
    superHeroDetailsContent .parentElement.classList.remove('showSuperHero')
    console.log("close");
})

searchBtn.addEventListener('click', getSuperHeroList);

function getSuperHeroList(){
  let searchInputTxt = document.getElementById('search-input').value.trim();
  //console.log(searchInputTxt);
  
  fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=94990c30eeadfb944e8ce703f46fb9df&hash=84942db7f1df9d6abda2409a1c16dcf5&nameStartsWith=${searchInputTxt}`)
  .then(response => response.json())
  .then(data => { 
    let html="";
     if(data.data.results){
      data.data.results.forEach(element => {
        html += `
        <div class="superhero-item" data-id = "${element.id}">
        <div class="superhero-img">
            <img src="${element.thumbnail["path"]+"."+element.thumbnail["extension"]}" alt="superhero"/>
        </div>
        <div class="superhero-name">
        <a href="#" class="superhero-info">
            <h3>${element.name}</h3>
            </a>
            <a href="#" class="superhero-btn">Add To Favourites</a>
        </div>
    </div>`;
       
     });
      console.log(data);
      superHeroList.classList.remove('notFound');
     }
     else{
      html = "Sorry, we didn't find any superhero!";
      superHeroList.classList.add('notFound');
     }
    
    
    superHeroList.innerHTML = html;
  })
}




