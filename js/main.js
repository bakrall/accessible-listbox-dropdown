const selectionButton = document.querySelector('#selection__button'),
    selectionListComponent = document.querySelector('#selection__list-area'),
    selectionList = document.querySelector('#selection__list'),
	selectionItems = Array.from(document.querySelectorAll('.selection__item')),
    firstListItem = selectionItems[0],
    lastListItem = selectionItems[selectionItems.length - 1];
let itemSelected;

function openSelectionList() {
	selectionList.classList.toggle('active');
    selectFirstItem(firstListItem);
}	

function deSelectItem(listItem) {
    listItem.classList.remove('selected');
    listItem.removeAttribute('aria-selected', 'true');
}

function selectItem(listItem) {
    listItem.classList.add('selected');
    listItem.setAttribute('aria-selected', 'true');
}

function selectFirstItem(firstListItem) {
    itemSelected = firstListItem;
    selectItem(itemSelected);
}

function selectLastItem(lastListItem) {
    itemSelected = lastListItem;
    selectItem(itemSelected);
}

function selectNextItem(next) {
    itemSelected = next;
    selectItem(next); 
}

//https://stackoverflow.com/questions/8902787/navigate-through-list-using-arrow-keys-javascript-jq
function moveFocus(e) {
    if(e.which === 40) {
        if(itemSelected) {
            deSelectItem(itemSelected);
            next = itemSelected.nextElementSibling;
            if(next) {
                selectNextItem(next)
            } else {
                selectFirstItem(firstListItem);
            }
        } else {
            selectFirstItem(firstListItem);
        }
    } else if(e.which === 38) {
        if(itemSelected) {
            deSelectItem(itemSelected);
            next = itemSelected.previousElementSibling;
            if(next) {
                selectNextItem(next)
            } else {
                selectLastItem(lastListItem);
            }
        } else {
            selectLastItem(lastListItem);
        }
    }

    selectionList.setAttribute('aria-activedescendant', itemSelected.getAttribute('id'));
};

selectionButton.addEventListener('click', openSelectionList);
selectionListComponent.addEventListener('keydown', (e) => {
    if (e.which === 40 || e.which === 38) {
        moveFocus(e);
    }
});