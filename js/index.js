/**
 * js/index.js - sample-todo-app
 * Licensed under MIT.
 * 
 * The app is built from scratch without the use of
 * any frameworks or libraries (or any external code)
 * at all. It is built with MVC philosophies in mind.
 * 
 * WARNING: Not even slightly lintable.
 */

(function () {
    'use strict';

    /**
     * Grab all elements that we are going to be
     * creating interactions with.
     */
    var inTodo = document.getElementById('inTodo'),
        btnAdd = document.getElementById('add'),
        btnSortUp = document.getElementById('sortUp'),
        btnSortDown = document.getElementById('sortDown'),
        btnDeleteAll = document.getElementById('deleteAll'),
        elmList = document.getElementById('list'),
        imgCode = document.getElementById('code');
    
    /**
     * This array will store all the todo items for us.
     * All todo items should be JSON objects that look like
     * this:
     * 
     * {
     *      text: 'The text describing the item.',
     *      done: false
     * }
     */
    var list = [];

    /**
     * This function grabs the JSON object from the URL, converts it into object form,
     * and then pops it into the list variable.
     */
    var getJSON = function () {
        // The 'location.hash' variable is a global variable that stores the
        // string in the URL after the '#' (hash).
        // We must offset this string by 1 character because the first character
        // of the hash is always '#'
        var listString = location.hash.substr(1);

        // We just need to make sure that the string is not empty.
        // If it is, we can't do much more. So we quit.
        if ( !listString ) {
            return;
        }

        // We should push the string through decodeURIComponent to convert
        // all the special characters back
        listString = decodeURIComponent(listString);

        // Finally, we transform the string into an object using the browser's native
        // API
        list = JSON.parse(listString);

        // Now we update the view because we have changed the list variable.
        updateView();
    };

    /**
     * This function transforms a todo JSON object into the
     * appropriate HTML.
     */
    var toHTML = function (index, item) {
        var classes = 'item',
            checked = '';

        // if the item is marked done, add the class 'done'
        // to the list of classes and add the 'checked' attribute
        // to the checkbox element
        if (item.done) {
            classes += ' done';
            checked = 'checked';
        }

        // generate the appropriate HTML and stick the appropriate html
        // variables where needed
        return '<li class="' + classes + '">' +
                   '<input data-index="' + index + '" type="checkbox" class="checkbox" ' + checked + '>' +
                   '<span>' + item.text + '</span>' +
                   '<button data-index="' + index + '" class="delete">x</button>' +
               '</li>';
    };

    /**
     * This function should be called when the user has written
     * some text inside the input and wants this input to be transformed
     * into a todo item.
     * 
     * This function should be added as an event listener. Event listeners for
     * all events receive a single argument: an event object describing what
     * has happened.
     */
    var addTodo = function ( event ) {
        // The 'preventDefault()' function of an event object tells the
        // browser NOT to do whatever it was planning on doing when the user
        // triggers that event. For instance, calling 'event.preventDefault()'
        // on the event object of a click listener on an anchor element will
        // tell the browser NOT to redirect the page.
        event.preventDefault();

        // The first thing to do is to grab what the user has entered into a
        // variable so we can use it.
        var text = inTodo.value;

        // This is not absolutely necessary but it makes the user's experience
        // simpler and better. We do a few things:
        //   1. We empty the contents of the input so that the user does not
        //      have to.
        //   2. We "blur" (the opposite of focus) the button that was clicked.
        inTodo.value = '';
        btnAdd.blur();

        // We now create a new JSON object to represent the todo item
        var object = {
            text: text,

            // by default, the todo item should not be marked done
            done: false
        };

        // Finally, add the item to the array of items we are managing.
        list.push(object);

        // We have now manipulated the array in some way. Due to this, it
        // is time to update what the user sees.
        updateView();
    };

    /**
     * This function removes a particular todo item from the list.
     */
    var rmTodo = function ( event ) {
        // Same use as above.
        event.preventDefault();

        // The 'target' propery of the event object points towards
        // the HTMLElement that was clicked. We need to grab the
        // 'data-index' attribute of this element because that is
        // where we are storing the index of the todo item.
        var index = event.target.getAttribute('data-index');

        // All attribute values are strings by default. But to use it,
        // we need to convert it to integer.
        index = parseInt(index);

        // Now that we know the index of the todo item we are using,
        // we can use the '.filter()' method of the array to remove
        // the element at this index.
        list = list.filter(function (elm, elmIndex) {
            return index !== elmIndex;
        });

        // Finally, we just need to update the view since the list
        // has been uploaded yet again.
        updateView();
    };

    /**
     * This function toggles the 'done' property of the todo item.
     */
    var toggleDone = function ( event ) {
        // Same use as above.
        event.preventDefault();

        // The 'target' propery of the event object points towards
        // the HTMLElement that was clicked. We need to grab the
        // 'data-index' attribute of this element because that is
        // where we are storing the index of the todo item.
        var index = event.target.getAttribute('data-index');

        // All attribute values are strings by default. But to use it,
        // we need to convert it to integer.
        index = parseInt(index);

        // Now that we know the index of the todo item we are using,
        // we can grab it into a variable so we can use it.
        var item = list[index];

        // The simple way to invert a boolean value is to use the
        // '!' operator.
        item.done = !item.done;

        // Finally, we just need to update the view since the list
        // has been uploaded yet again.
        updateView();
    };

    /**
     * This function sorts the list by the text property in
     * alphabetical order.
     */
    var sortDown = function ( event ) {
        // Same use as above.
        event.preventDefault();

        // This will sort the list alphabetically automatically.
        list.sort(function (a, b) {
            return a.text > b.text;
        });

        // This is not necessary but adds to the user's experience.
        // We will blur the button that was clicked to break it's focus.
        event.target.blur();

        // We now update the view since the list has been changed.
        updateView();
    };

    /**
     * This function sorts the list by the text property in reverse
     * alphabetical order.
     */
    var sortUp = function ( event ) {
        // Same use as above.
        event.preventDefault();

        // This will sort the list alphabetically automatically.
        list.sort(function (a, b) {
            return a.text < b.text;
        });

        // This is not necessary but adds to the user's experience.
        // We will blur the button that was clicked to break it's focus.
        event.target.blur();

        // We now update the view since the list has been changed.
        updateView();
    };

    /**
     * This function filters out all todo items that have been
     * marked 'done'.
     */
    var deleteAll = function ( event ) {
        // Same use as above.
        event.preventDefault();

        // This is a simple use of the Array.prototype.filter
        // method. We need to return a boolean stating whether or
        // not we wish to keep a particular item. We will simply return
        // the inverse of the 'done' property so that the only elements
        // kept are the ones with the 'done' property set to false.
        list = list.filter(function ( elm ) {
            return !elm.done;
        });

        // This is not necessary but adds to the user's experience.
        // We will blur the button that was clicked to break it's focus.
        event.target.blur();

        // We need to update the view since we have modified the list.
        updateView();
    };

    /**
     * This function transforms the entire todo list array into
     * HTML and injects it into the list element. This will take
     * the *model* that the code is manipulating and transform it
     * into the *view* which is what the user sees.
     */
    var updateView = function () {
        var html = '', i;

        // we can use the 'toHTML' function to transform each object
        // and add it onto the big html string we are maintaining
        for (i = 0; i < list.length; i += 1) {
            html += toHTML(i, list[i]);
        }

        // now we set the 'innerHTML' of our <ul> element to the long
        // string that we have generated
        elmList.innerHTML = html;

        // now the event listeners on checkboxes need to be set again
        // so we are going to grab all checkbox elements
        var checkboxes = document.getElementsByClassName('checkbox');

        // now we loop through the checkboxes and attach our event
        // listeners
        for (i = 0; i < checkboxes.length; i += 1) {
            if (!checkboxes[i].getAttribute('data-has-events')) {
                checkboxes[i].addEventListener('click', toggleDone);

                // This helps keep a record of whether or not we have added
                // event listeners to the checkbox element. By doing so, we
                // avoid adding more than one event listener to the same event.
                checkboxes[i].setAttribute('data-has-events', 'true');
            }
        }

        // now the event listeners on delete buttons need to be set again
        // so we are going to grab all delete buttons elements
        var deleteBtns = document.getElementsByClassName('delete');

        // now we loop through the checkboxes and attach our event
        // listeners
        for (i = 0; i < deleteBtns.length; i += 1) {
            if (!deleteBtns[i].getAttribute('data-has-events')) {
                deleteBtns[i].addEventListener('click', rmTodo);

                // This helps keep a record of whether or not we have added
                // event listeners to the checkbox element. By doing so, we
                // avoid adding more than one event listener to the same event.
                deleteBtns[i].setAttribute('data-has-events', 'true');
            }
        }

        // to create the QR code, we first transform our object into a string.
        var listString = JSON.stringify(list);

        // we now need to make this string appropriate for URLs by giving it
        // over to encodeURIComponent
        listString = encodeURIComponent(listString);

        // Now that we have the actual string that we have to stick into the
        // GET variable, we can simply set the hash of the page to this string
        location.hash = listString;

        // we can now reset the image to the new QR code
        imgCode.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(location.href);
    };

    /**
     * Attach the appropriate event listeners.
     */
    btnAdd.addEventListener('click', addTodo);
    btnSortUp.addEventListener('click', sortUp);
    btnSortDown.addEventListener('click', sortDown);
    btnDeleteAll.addEventListener('click', deleteAll);

    /**
     * We create an event that waits for keyboard keys to be pressed.
     */
    inTodo.addEventListener('keypress', function ( event ) {
        // If the key that was pressed has keyCode 13, which is
        // the keyCode for the enter key, we run the addTodo
        // function.
        if ( event.keyCode === 13 ) {
            addTodo(event);
        }
    });

    /**
     * Start off the application by trying to grab the saved JSON
     * from the URL.
     */
    getJSON();
}());