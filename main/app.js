const input = document.querySelector('input');
const html = document.querySelector('html');
const links = document.querySelectorAll('nav a.paragraph-l');

const BTN_LEFT = document.querySelectorAll(".button-arrow")[0];
const BTN_RIGHT = document.querySelectorAll(".button-arrow")[1];
const SLIDER = document.querySelector(".slider-wraper");
const ITEM_ACTIVE = document.querySelector('#item_active');

let arrValid = [];

let ITEM_LEFT = document.createElement('div');
ITEM_LEFT.innerHTML = ITEM_ACTIVE.innerHTML;
ITEM_LEFT.classList.add('item_active');
SLIDER.prepend(ITEM_LEFT);

let ITEM_RIGHT = document.createElement('div');
ITEM_RIGHT.innerHTML = ITEM_ACTIVE.innerHTML;
ITEM_RIGHT.classList.add('item_active');
SLIDER.append(ITEM_RIGHT);

SLIDER.classList.add('center');


console.log(SLIDER.innerHTML);



input.addEventListener('change', isChecked);
isLinked();

function isChecked(){
    if(input.checked){
        html.style.overflow = 'hidden'
    }else{
        html.style.overflow = 'scroll';
    }
};

function isLinked(){
    links.forEach(link =>{
        link.addEventListener("click", uncheckInput)
        console.log('!')
    })
};

function uncheckInput(){
    input.checked = false;
    isChecked();
};

const PETS = {
    'Charly': '/shelter-task/pets/assets/img/pets-charly.png',
    'Freddie': '/shelter-task/pets/assets/img/pets-freddie.png',
    'Jennifer': '/shelter-task/pets/assets/img/pets-jennifer.png',
    'Katrine': '/shelter-task/pets/assets/img/pets-katrine.png',
    'Scarlet': '/shelter-task/pets/assets/img/pets-scarlet.png',
    'Sophia': '/shelter-task/pets/assets/img/pets-sophia.png',
    'Timmy': '/shelter-task/pets/assets/img/pets-timmy.png',
    'Woody': '/shelter-task/pets/assets/img/pets-woody.png',
    };

    let switchButton = false;
    preloadImg();
    window.addEventListener('resize', sizeWindowtInfo);
    sizeWindowtInfo();



    BTN_LEFT.addEventListener('click', ()=>{
        if (switchButton){
            return
        }
        chaingeFotoCard(ITEM_LEFT.querySelectorAll('.card'));
        SLIDER.classList.add("transition-left");
        switchButton = true;
    });

    BTN_RIGHT.addEventListener('click', ()=>{
        if (switchButton){
            return
        }
        chaingeFotoCard(ITEM_RIGHT.querySelectorAll('.card'));
        SLIDER.classList.add("transition-right");
        switchButton = true;
    });

    // событие влево
    SLIDER.addEventListener("animationend", (animationEvent) => {

        if (animationEvent.animationName === "move-left"){
            SLIDER.classList.remove("transition-left");
            let ITEM_LEFT = document.querySelectorAll('.item_active')[0];
            const leftItems = ITEM_LEFT.innerHTML;
            document.querySelectorAll('.item_active')[1].innerHTML = leftItems;

            switchButton = false;
        } else {
            SLIDER.classList.remove("transition-right");
        }
    })
    // событие вправо
    SLIDER.addEventListener("animationend", (animationEvent) => {

        if (animationEvent.animationName === "move-right"){
            SLIDER.classList.remove("transition-right");
            let ITEM_RIGHT = document.querySelectorAll('.item_active')[2];
            const rightItems = ITEM_RIGHT.innerHTML;
            document.querySelectorAll('.item_active')[1].innerHTML = rightItems;

            switchButton = false
        } else {
            SLIDER.classList.remove("transition-left");
        }

    });

// HELP FUNCTION
    function randomCard(){
        let keys = Object.keys(PETS);
        let randomKey = keys[keys.length * Math.random() << 0]
        return isValid(randomKey) ? randomKey : randomCard();
    }

    function isValid(key){
        let result = true
        arrValid.forEach(el =>{
            if(el === key){
                console.log('false')
                result = false
            }
        });
        if(result){
            arrValid.push(key)
        }
        if(arrValid.length === 3){
            arrValid = []
        }
        console.log(arrValid)
        return result
    }
    function chaingeFotoCard(side){
        console.log(side)
        const CARDS = side;
        console.log(CARDS)
        CARDS.forEach(card => {
            let randomProperty = randomCard()
            let sliderFoto = card.querySelector('.slider-foto');
            let textFoto = card.querySelector('h4');
            textFoto.innerHTML = randomProperty;
            sliderFoto.style.backgroundImage = `url(${PETS[randomProperty]})`;
        });
    };

    function preloadImg(){
        const img = document.createElement('img')
        const pathImg = Object.values(PETS);
        pathImg.forEach(path => {
            img.style.backgroundImage = `url(${path})`;
        })
    };
    function sizeWindowtInfo(){

        let windowWidth = window.innerWidth
        let sliderWraperWidth = SLIDER.offsetWidth;
        document.documentElement.style.setProperty('--slider-size', `-${sliderWraperWidth}px`)
    }