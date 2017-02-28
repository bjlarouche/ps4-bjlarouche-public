# CSCI 2254 Web App Development

## Problem Set 4: Extending & Refactoring a TODO App

#### (10 Points) Due via GitHub push: Wednesday March 15, 11:59PM.

---

This is a pair problem set. If you don't know anyone in the class, you can use the Piazza partner finding tool to find a partner, or you can ask a staffer for help. Once you've found your partner, the person with the alphabetically first surname should email the entire course staff indicating who the partners are. We'll make a group for you so you can have a shared GitHub repository.

This problem set involves the extension and refactoring of [Max Sandelin's TODO app](https://github.com/themaxsandelin/todo). Max has been generous enough to post two excellent videos on youtube that walk you through the development of his app. You should watch [part1](https://www.youtube.com/watch?v=2wCpkOk2uCg) and [part2](https://www.youtube.com/watch?v=bGLZ2pwCaiI). The nice thing about Sandelin's app is that it is written in pure JS, with no frameworks, no CSS extensions, just straight HTML, CSS + JS.

**Steps**

1. You should first clone Max's TODO app, review his HTML, CSS and JS code and run it to understand its functionality.

2. The required extension to Max's app is to add the functionality that when the mouse hovers over a todo list item (completed or not), your app should show the date and time that the item was created.

3. Your implementation should also refactor the JS code to conform to the TEA/model-view-update architecture. The user's introduction of a new todo list item should trigger an event listener that will update the model by adding the new item to the model. Model update can also be triggered by completion, uncompletion or deletion of an item. The update function should have type:

   ```javascript
   update : event * model -> model
   ```

   The `event` input will allow the update function to determine the identity of the triggering event.

   The `view` function should cause the UI to display an appropriate visualization of the present model. For the purposes of this problem set, it doesn't matter if your view function alters the existing DOM  structure (as done in Sandelin's app) or if the app produces a fresh `div` depicting the state of the model. 

   Unlike Sandelin's app, your app should attempt to load a model from localStorage when the window loads (i.e., `window.onload`) and should store model to localStorage on window unload (i.e., `window.onunload`).

4. As usual, submit your work by a git push by the due date.