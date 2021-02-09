const search = document.getElementById('search');
const submit = document.getElementById('submit');
const mealEl = document.getElementById('meals');
const resultHeading = document.getElementsByClassName('result-heading');
const single_mealel = document.getElementById('single-meal');

function searchMeal(e) {
    e.preventDefault();

    single_mealel.innerHTML = "";


    const term = search.value;
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2> search result for ${term}`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2> there is no result for ${term}`;


                }
                else {
                    mealEl.innerHTML = data.meals.map(
                        (meal) => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}"alt="${meal.strMeal}">
                    
                   <div>
                    <div class="meal-info" data-mealId="${meal.idMeal}">
                  
                    <h3>${meal.strMeal} <button onclick="getIngridents()" class:"btn btn-success >Ingridents</button> </h3>
                    </div>
                    </div>`
                    )
                }
            });

    }

}
submit.addEventListener("submit", searchMeal);

const getIngridents = () => {

    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then(response => response.json())
        .then(data => console.log(data));

}



