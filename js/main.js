const selectionButton = document.querySelector('#selection__button'),
	selectionList = document.querySelector('#selection__list'),
	selectionItems = Array.from(document.querySelectorAll('.selection__item'));
let itemSelected;

function openSelectionList() {
	selectionList.classList.toggle('active');
	selectionList.firstElementChild.classList.add('selected');
}	

//https://stackoverflow.com/questions/8902787/navigate-through-list-using-arrow-keys-javascript-jq
function moveFocus(e) {
    if(e.which === 40) {
        if(itemSelected) {
            itemSelected.classList.remove('selected');
            next = itemSelected.nextElementSibling;
            if(next) {
                itemSelected = next;
                next.classList.add('selected');
            } else {
                itemSelected = selectionItems[0];
                itemSelected.classList.add('selected');
            }
        } else {
            itemSelected = selectionItems[0];
            itemSelected.classList.add('selected');
        }
    } else if(e.which === 38) {
        if(itemSelected) {
            itemSelected.classList.remove('selected');
            next = itemSelected.previousElementSibling;
            if(next) {
                itemSelected = next;
                next.classList.add('selected');
            } else {
                itemSelected = selectionItems[selectionItems.length - 1];
                itemSelected.classList.add('selected');
            }
        } else {
            itemSelected = selectionItems[selectionItems.length - 1];
            itemSelected.classList.add('selected');;
        }
    }
};

selectionButton.addEventListener('click', openSelectionList);
window.addEventListener('keydown', moveFocus)