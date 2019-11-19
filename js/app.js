let moving__line = document.querySelector('.moving__line');
let wrapper = document.querySelector('.wrapper');
let listItems = document.querySelectorAll('.list__items');
let navigation = document.querySelector('.navigation');
let menu__icon = document.querySelector('.menu__icon');
let nav__itemsContainer = document.querySelector('.nav__items');

function removeClassFromSiblings(classes, element) {
    element.forEach(cur => {
        cur.classList.remove(classes);
    })
}



function updateMovingLine() {
    let activeListItem = document.querySelector('.nav__items ul li.active');
    let activeCoords = activeListItem.getClientRects();
    let wrapperCoords = wrapper.getClientRects();

    moving__line.style.left = `${activeCoords[0].left - wrapperCoords[0].left}px`;
    moving__line.style.width = `${activeCoords[0].width}px`;
}

updateMovingLine();

listItems.forEach(cur => {
    cur.addEventListener('click', function (e) {
        smoothScroll(cur);
        removeClassFromSiblings('active', listItems);
        e.preventDefault();
        this.classList.add('active');
        updateMovingLine();
    });
});

window.addEventListener('resize', updateMovingLine);

window.addEventListener('scroll', () => {
    // let about = document.querySelector('.about');
    // console.log(about.offsetTop - window.pageYOffset);
    // if((about.offsetTop - window.pageYOffset) <= 0 && (about.offsetTop + about.clientHeight - window.pageYOffset) > 0) {
    //     console.log('About section is up here');
    // }
    if(window.pageYOffset > 148) {
        navigation.classList.add('collapse');
    } else {
        navigation.classList.remove('collapse');
    }
});

window.addEventListener('wheel', loopThroughListItems);

function loopThroughListItems() {
    listItems.forEach(cur => {
        updateNavOnScroll(`${cur.dataset.id}`);
    })
}

menu__icon.addEventListener('click', () => {
    nav__itemsContainer.classList.toggle('mobDropDown');
});

document.addEventListener('click', e => {
    if(!e.path.includes(navigation)) {
        nav__itemsContainer.classList.remove('mobDropDown');
    }
});

function updateNavOnScroll(curE) {
    let curEl = document.querySelector(`.${curE}`);
    let curListItem = document.querySelector(`.list__items[data-id=${curE}]`);
    if((curEl.offsetTop - window.pageYOffset) <= 0 && (curEl.offsetTop + curEl.clientHeight - window.pageYOffset) > 0) {
        removeClassFromSiblings('active', listItems);
        curListItem.classList.add('active');
        updateMovingLine();
    }
}

function smoothScroll(curEl) {
    let targetDiv = document.querySelector(`.${curEl.dataset.id}`);
    window.scrollTo({
        top: targetDiv.offsetTop,
        left: 0,
        behavior: 'smooth'
    });
}