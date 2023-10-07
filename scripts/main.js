//console.log(countries)
//alert('Open the console and check if the countries has been loaded')
let addListener = (element)=>{
    try{
        element.addEventListener('mouseenter', ()=>{
            element.style.width = '100%'
            element.style.height = '100%'
            element.style.fontSize = '120%'
            element.classList.remove('bg1')
            element.classList.add('bg2')
            element.appendChild(document.createElement('br'))
            let cou = new Array();
            for(i = 0; i < orgCountries.length; i++){
                if(orgCountries[i][0] == element.textContent){
                    cou = orgCountries[i]
                    console.log(cou)
                    break
                }
            }
            element.style.color = "red"
            let message = document.createElement('div')
            let cap = document.createElement('p')
            let lang = document.createElement('p')
            let pop = document.createElement('p')
            cap.style.fontSize = '1vw'
            pop.style.fontSize = '1vw'
            lang.style.fontSize = '1vw'
            cap.style.color = "Orange"
            lang.style.color = "Blue"
            pop.style.color = "Purple"
            cap.textContent = "Capital: " + cou[1]
            let langs = ""
            if(cou[2].length > 3){
                for(i = 0; i < 3; i++){
                    langs = langs + (cou[2][i] + " ")
                }
            }else{ 
                for(i = 0; i < cou[2].length; i++){
                    langs = langs + (cou[2][i] + " ") 
                }
            }
            num = formatNum(cou[3])
            pop.textContent = 'Population: ' + num
            lang.textContent = "Langs: "+ langs

            message.appendChild(cap)
            message.appendChild(lang)
            message.appendChild(pop)
            message.id = "message"

            element.appendChild(message)
        })
        element.addEventListener('mouseleave', ()=>{
            element.style.color = "White"
            element.style.width = '80%'
            element.style.height = '80%'
            element.style.fontSize = '20px'
            element.classList.add('bg1')
            element.classList.remove('bg2')
            let message = document.querySelector('#message')
            element.removeChild(element.querySelector('br'))
            element.removeChild(message)
        })
    }catch(err){
        console.error(err)
    }
}

let az = true
let startsWith = true; //if false it is search

let order = document.querySelector("#order")
let include = document.querySelector("#include")
let start = document.querySelector("#start")
let input = document.querySelector('input')
let frame = document.querySelector('.frame')
let num = document.querySelector('h3')
let label = document.querySelector('#startsWith')

order.addEventListener('click',()=>{
    if(order.textContent == "↑A"){
        az = true
        order.textContent = "↓A"
    }else{
        az = false
        order.textContent = "↑A"
    }
    update()
})

start.addEventListener('click',()=>{
    startsWith = true
    start.style.backgroundColor = "rgb(59, 2, 165)"
    include.style.backgroundColor = "rgb(93, 48, 177)"
    update()
})

include.addEventListener('click',()=>{
    startsWith = false
    include.style.backgroundColor = "rgb(59, 2, 165)"
    start.style.backgroundColor = "rgb(93, 48, 177)"
    update()
})

input.addEventListener('input',()=>{
    update()
    
})

/*	<div class="container">
				<div class="box"><p>potato of the united states</p></div>
			</div> 
*/
let addCountry = (country = "No Country")=>{
    let container = document.createElement('div')
    container.className = "container"
    container.style.width = "15%"
    
    let box = document.createElement('div')
    box.className="box bg1"

    box.textContent = country
    box.style.display = "flex"
    box.style.flexDirection = "column"
    box.style.flexWrap = 'wrap'
    box.style.fontWeight = "bold"
    box.style.overflow = "hidden"
    
    container.appendChild(box)
    addListener(box)
    frame.appendChild(container)

    let width = container.getBoundingClientRect().width
    container.style.height = width + "px"
}

let addPlaceholder = ()=>{
    let container = document.createElement('div')
    container.className = "container"
    container.style.width = "15%"
    let box = document.createElement('div')
    box.className="box"

    container.style.color = "purple"
    container.appendChild(box)
    frame.appendChild(container)
    let width = container.getBoundingClientRect().width
    container.style.height = width + "px"
}


for(let place of countryName){
    addCountry(place)
}


let update = ()=>{
    frame.innerHTML = ""
    let numero = 0
    if(startsWith){
        label.textContent = "Countries that start with " + input.value
        if(az){
            for(let place of countryName){
                if(place.toLowerCase().indexOf(input.value.toLowerCase()) == 0){
                    addCountry(place)
                    numero++
                }
            }
        }else{
            for(let i = countryName.length-1; i >= 0; i--){
                if(countryName[i].toLowerCase().indexOf(input.value.toLowerCase()) == 0){
                    addCountry(countryName[i])
                    numero++
                }
            }
        }
    }else{
        label.textContent = "Countries that contain " + input.value
        if(az){
            for(let place of countryName){
                if(place.toLowerCase().includes(input.value.toLowerCase())){
                    addCountry(place)
                    numero++
                }
            }
        }else{
            for(let i = countryName.length-1; i >= 0; i--){
                if(countryName[i].toLowerCase().includes(input.value.toLowerCase())){
                    addCountry(countryName[i])
                    numero++
                }
            }
        }
    }
    for(let i = 0; i < 10; i++){
        addPlaceholder()
    }
    if(input.value == ''){
        label.textContent = "All countries"
    }
    num.textContent = "Total number of countries: " + numero
}

window.addEventListener('resize', ()=>{
    update()
})

function formatNum(num){
    let premat = num.toString()
    let formatted = ""
    let counter = 0;
    for(i = premat.length-1; i >= 0; i--){
        counter++;
        if(counter == 4){
            counter = 1;
            formatted = premat[i] + ',' + formatted
        }else
            formatted = premat[i] + formatted
            
    }
    return formatted
}
