const text = document.getElementById("input")
const mainContainerLower = document.getElementById("mainContainerLower")

async function search() {
    mainContainerLower.innerHTML = ""
    console.log(input.value);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text.value}`)
    const data = await response.json()
    console.log(data);
    if (data.meals) {
        data.meals.map((ele) => {
        mainContainerLower.innerHTML += `
        <div class="card" id=${ele.idMeal}>
                    <div class="cardUpper">
                        <img src=${ele.strMealThumb} alt="" style="width: 100%; height: 100%;">
                    </div>
                    <div class="cardLower">
                        <h1>${ele.strMeal}</h1>
                        <button onclick="create(${ele.idMeal})" class="button"><h2>Get Receipe</h2></button>
                    </div>
                </div>
        `
        })
    }
    else {
        mainContainerLower.innerHTML = `<div class="notFound"><h1> Sorry, we didn't find any meal!</h1> </div>`
    }
}

async function create(params) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params}`)
    const data = await response.json()
    console.log(data);
    var temp=document.getElementById("temp")
    temp.innerHTML=""
    var mainContainer = document.getElementById("mainContainer")
    console.log(params);
    const div = document.createElement("div")
    div.classList.add("recipeCard")

    const cross = document.createElement("div")
    div.appendChild(cross)
    cross.classList.add("cross")
    const crossButton = document.createElement("button")
    var icon = document.createElement("i")
    icon.classList.add("fa")
    icon.classList.add("fa-times")
    icon.classList.add("fa-2x")
    crossButton.appendChild(icon)
    crossButton.onclick = function () {
        temp.innerHTML=""
    };

    cross.appendChild(crossButton)
    const recipeCardName = document.createElement("div")
    div.appendChild(recipeCardName)
    recipeCardName.classList.add("recipeCardName")
    const recipeCardNameh1 = document.createElement("h1")
    var recipeCardNameMeal = document.createTextNode(data.meals[0].strMeal)
    recipeCardNameh1.appendChild(recipeCardNameMeal)
    recipeCardName.appendChild(recipeCardNameh1)

    const recipeCardInput = document.createElement("div")
    div.appendChild(recipeCardInput)
    recipeCardInput.classList.add("recipeCardInput")
    const recipeCardInputh1 = document.createElement("h3")
    var recipeCardInputMeal = document.createTextNode(data.meals[0].strCategory)
    recipeCardInputh1.appendChild(recipeCardInputMeal)
    recipeCardInput.appendChild(recipeCardInputh1)

    const recipeCardInstruction = document.createElement("div")
    div.appendChild(recipeCardInstruction)
    recipeCardInstruction.classList.add("recipeCardInstruction")
    const recipeCardInstructionh2 = document.createElement("h2")
    var recipeCardInstructionInstruction = document.createTextNode("Instructions:")
    recipeCardInstructionh2.appendChild(recipeCardInstructionInstruction)
    recipeCardInstruction.appendChild(recipeCardInstructionh2)

    const recipeCardPara = document.createElement("div")
    div.appendChild(recipeCardPara)
    recipeCardPara.classList.add("recipeCardPara")
    const recipeCardParaPara = document.createElement("p")
    var recipeCardParaSteps = document.createTextNode(data.meals[0].strInstructions)
    recipeCardParaPara.appendChild(recipeCardParaSteps)
    recipeCardPara.appendChild(recipeCardParaPara)

    const recipeCardImg = document.createElement("div")
    div.appendChild(recipeCardImg)
    recipeCardImg.classList.add("recipeCardImg")
    var img = document.createElement('img');
    img.style.width = "100px"
    img.style.height = "100px"
    img.src = data.meals[0].strMealThumb;
    recipeCardImg.appendChild(img);

    const recipeCardVideo = document.createElement("div")
    div.appendChild(recipeCardVideo)
    recipeCardVideo.classList.add("recipeCardVideo")
    const recipeCardVideoa = document.createElement("a")
    var recipeCardWatchVideo = document.createTextNode("Watch Video")
    recipeCardVideoa.appendChild(recipeCardWatchVideo)
    recipeCardVideoa.href = data.meals[0].strYoutube;
    recipeCardVideo.appendChild(recipeCardVideoa)

    temp.appendChild(div) 
    mainContainer.appendChild(temp) 
    document.body.appendChild(mainContainer)
}
