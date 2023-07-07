## TP 01 CRUD

This project contains TDD tests ! So you can use them to follow your progress when coding this exercise.

TDD : start the tests with :

      ng test

Correct your code and make the tests turn green progressively.

Steps to follow **in order**

## WARNING

In order to make the test compile NOW without all properties and methods coded on AppComponent (that you will developp
along with this exercise), I added the following at the beginning of the app.component.spect.ts file :

      // @ts-nocheck
      /* @ts-ignore */

You can keep it there and implement the features one by one, BUT this prevent the IDE to help you with intellisense in
the spec file.

So what you could do is to remove the pragmas comments (// @ts-nocheck adn /* @ts-ignore */) and then comment all the
tests except the first one, then code the implementation to make the first test green. Once done uncomment the second
test and code it and so on.

Doing so, you will have much less test errors, and you can remove the lines : @ts-nocheck / @ts-ignore and have the IDE
helps you with the linter and warnings which is very helpful.

And for every step you will have to solve first the compile error (for example because a attribute or method does not
exist) and then the test will probably fail on more functionnal problems before you accomplish the step.

## 1. Create a property remainingTasks in AppComponent

Create a property remainingTasks in AppComponent named *remainingTasks* and initialize it to zero. Then show that prop
in HTML.

         export class AppComponent { remainingTasks = 0; }

## 2. Initialize a array of Task and show it in HTML

Initialize a array of Todo(s) (*todos : Todo[]*) with 4 Todo(s) and show those Todos in HTML. Each Todo should have 2
properties =>   completed : boolean and label : string + an id : number property. And one of those Todo(s) should be
already completed. You can use the util class.method TodoUtils.createTodo(label, completed) to create a Todo or create
them manually with a literal.

- first add *ngFor loop on the \<li>* to iterate on the array of Todos

- To show the label of a Todo in HTML you can use the following syntax :

      {{todo.label}}

- to show the completed property of a Todo in HTML you can use [(ngModel)] or [checked] (see below)

  [(ngModel)]="todo.completed"
  [checked]="todo.completed"

## 3. Toggle the state of a task (property complete) between true/false when clicking on the checkbox

- if you used checked, you will have to add an event listener method catching the (change) event on the checkbox to be
  able to change the completed property on the targeted Todo. Both solutions are correct. => and in the method with (
  change) you will have to modify the completed property of the targeted Todo yourself (On the other hand ngModel does
  all that by itself but it is obsolete and difficult to test).

    - to toggle one completed of a Todo you have 2 options : click directly on the checkbox or check on the label (
      associated with a for attribute) . To make the test pass for "cliking on the label" you will have to adapt the
      dedicated tests selectors. The feature "clicking on the checkbox" does not require tests adaptation, but in that
      case clicking on the label will not always produce what you expect. Check it out and adpat the test.

## 4. the label is ~~crossed~~ when completes (line-through)

Add the class  *line-through* on *\<li>* when the task is completed (complete===true)

      src/app/app.component.scss:
        .line-through {
            text-decoration: line-through;
        }   

Check the syntax for  [ngClass] over internet (or in the slides)

https://www.telerik.com/blogs/angular-basics-conditional-classes-angular-ngclass

## 5. Delete a Todo

when clicking on the button with an X on the same line than the task, the task should be removed from the list.

## 6. Add a Todo

Add a Todo when clicking typing text into the form.input + click enter or click on the Add button

- Do not add task with if the label is empty
- Clear the input value after the add.
- You have different solutions to instrument the Add with the \<input>, one of them is adding a [(ngModel)] to the
  input. Or a better more robust api with a FormControl. or you can use a template variable on the input (#myInput)
  and extract the value. You also will have to captue (keyup.enter) on the input to trigger the add. And a (click)
  on the Add button.
- if you capture (ngSubmit) on the form, you will have to add a type="submit" on the button to make it work. And that
  way you it's easier to capture only one (ngSubmit) event (instead of capture (keyup.enter) on the input and (click) on
  the button

## 7. Toggle all Todos to  complete or uncomplete state

When clicking on the checkbox on the top of the list, all Todos should be toggled to the opposite state (complete or not
complete).

- Also when you reach all Todos as all completed (for example when completing the last uncompleted Todo by clicking its
  local toggleOne checkbox), the toggle-all checkbox should be checked automatically.
- If one Todo turned again not competed or a new uncompelted Todo is added, the toggle-all checkbox should be unchecked
  automatically.
- To code that you have to defined a reused method to check the state ot component.todos array.
- And you have to execute that method in the 3 following cases for each action or init of th UI:
    - when clicking on the toggle-all checkbox
    - when adding a new Todo
    - when toggling one Todo
- consequently you will have to adapt one previous test to make it pass with the new feature.

## 8. Show message telling how many Todos are remaining

Show a message telling how many Todos are remaining. For example : "3 remaining tasks".

Strategy :

- you can use a method to count the remaining Todos and show the result in the HTML.
- Or you can use a pipe to do the same thing.
- the pipe or the method should be used/called in the HTML with the following syntax : {{ myMethod() }} or {{ myPipe |
  myPipeArg }}
- the myMethod() could recompute the message using the todos array, or use directly remainingTasks property.
- the Pipe could have as entry the todos array or the remainingTasks property.
- you could even use the Pipe i18nPlural given by Angular.

Example using a i18nPlural pipe :

      <div>{{ messages.length | i18nPlural: {'=0': 'No messages.', '=1': 'One message.', 'other': '# messages.'} }}</div>

The Messages SHOULD be (to make the tests work):

- No todos remaining
- # todos remaining (# being the number of remaining todos)
- One todo remaining


