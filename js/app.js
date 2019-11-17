let moving__line = document.querySelector('.moving__line');
let wrapper = document.querySelector('.wrapper');
let listItems = document.querySelectorAll('.list__items');
let navigation = document.querySelector('.navigation');


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
        removeClassFromSiblings('active', listItems);
        e.preventDefault();
        this.classList.add('active');
        updateMovingLine();
    });
});

window.addEventListener('scroll', () => {
    if(window.pageYOffset >= 148) {
        navigation.classList.add('collapse');
    } else {
        navigation.classList.remove('collapse');
    }
});