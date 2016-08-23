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
        elmList = document.getElementById('list');
    
    /**
     * This array will store all the todo items for us.
     * All todo items should be string values like this:
     * 
     * 'This is a todo item.'
     */
    var list = [];

    /**
     * This function should be called when the user has written
     * some text inside the input and wants this input to be transformed
     * into a todo item.
     */
    var addTodo = function () {
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

        // Finally, add the item to the array of items we are managing.
        list.push(text);

        // We have now manipulated the array in some way. Due to this, it
        // is time to update what the user sees.
        updateView();
    };

    /**
     * This function removes a particular todo item from the list.
     */
    var rmTodo = function () {
        // The 'target' propery of the event object points towards
        // the HTMLElement that was clicked. We need to grab the
        // 'id' property of this element because that is
        // where we are storing the index of the todo item.
        var index = event.target.id;

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
            html += '<li class="item">' +
                       '<span>' + list[i] + '</span>' +
                       '<button id="' + i + '" class="delete">x</button>' +
                   '</li>';
        }

        // now we set the 'innerHTML' of our <ul> element to the long
        // string that we have generated
        elmList.innerHTML = html;

        // now the event listeners on delete buttons need to be set again
        // so we are going to grab all delete buttons elements
        var deleteBtns = document.getElementsByClassName('delete');

        // now we loop through the delete buttons and attach our event
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
    };

    /**
     * Attach the addTodo function to the click event of the add button.
     */
    btnAdd.addEventListener('click', addTodo);

    /**
     * We create an event listener that waits for keyboard keys to be pressed.
     * 
     * Recall: all event handlers receive a single argument, an event object
     * that describes the event.
     */
    inTodo.addEventListener('keypress', function ( event ) {
        // If the key that was pressed has keyCode 13, which is
        // the keyCode for the enter key, we run the addTodo
        // function.
        if ( event.keyCode === 13 ) {
            addTodo(event);
        }
    });
}());