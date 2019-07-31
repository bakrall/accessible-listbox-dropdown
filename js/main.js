const selectionButton = $('#selection__button'),
    selectionListComponent = $('#selection__list-area'),
    selectionList = $('#selection__list'),
    selectionItems = Array.from($('.selection__item')),
    firstListItem = selectionItems[0],
    lastListItem = selectionItems[selectionItems.length - 1];
let itemSelected;	

function toggleSelectionList() {
    let expanded = selectionButton.attr('aria-expanded') === "false"; 

    selectionList.toggleClass('active');
    selectionButton.attr('aria-expanded', expanded);

    if (selectionList.is('.active')) {
        selectionList.focus();
        if (!itemSelected) {
            selectFirstItem(firstListItem);
        }
    }
}

function checkForOpen(e) {
    if (e.which === 40 || e.which === 38) {
        toggleSelectionList();
    }
}

function checkForClose(e) {
    if (e.which === 13 || e.which === 27) {
        toggleSelectionList();
        setTimeout(focusButton, 0);
    }
}

function checkForSelection(e) {
    if (e.which === 36) {
        deSelectItem(itemSelected);
        selectFirstItem(firstListItem);
        updateChosenItem();
    }

    if (e.which === 35) {
        deSelectItem(itemSelected);
        selectLastItem(lastListItem);
        updateChosenItem();
    }
}

function focusButton() {
    selectionButton.focus()
}

function closeSelectionList(e) {
    if (selectionList.is('.active') && !$(e.relatedTarget).is(selectionButton)) {
        selectionList.removeClass('active');
        selectionButton.attr('aria-expanded', 'false');
    }
}

function updateChosenItem() {
    let itemValue = $(itemSelected).text();

    selectionButton.text(itemValue);
}

function deSelectItem(listItem) {
    $(listItem).removeClass('selected');
    $(listItem).removeAttr('aria-selected', 'true');
}

function selectItem(listItem) {
    $(listItem).addClass('selected');
    $(listItem).attr('aria-selected', 'true');
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
            next = $(itemSelected).next();
            if(next.length) {
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
            next = $(itemSelected).prev();
            if(next.length) {
                selectNextItem(next)
            } else {
                selectLastItem(lastListItem);
            }
        } else {
            selectLastItem(lastListItem);
        }
    }

    selectionList.attr('aria-activedescendant', $(itemSelected).attr('id'));
};

//https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
//https://stackoverflow.com/questions/3705937/document-click-not-working-correctly-on-iphone-jquery
function fixSupportForClickOnIOS() {
    const iOSMobile = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (iOSMobile) {
        document.body.style.cursor = "pointer";
    }
}

function init() {
    fixSupportForClickOnIOS();
    bindUiEvents();

}

function bindUiEvents() {
    selectionButton.on('click', toggleSelectionList);
    selectionButton.on('keydown', checkForOpen);
    selectionList.on('keydown', checkForClose);
    selectionList.on('keydown', checkForSelection);

    selectionListComponent.on('keydown', (e) => {
        if (e.which === 40 || e.which === 38) {
            moveFocus(e);
            updateChosenItem(e);
        }
    });

    selectionList.on('blur', closeSelectionList);
}

init();