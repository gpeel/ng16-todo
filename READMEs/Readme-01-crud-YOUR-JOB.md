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

1. Create a property in AppComponent named *remainingTasks* and initialize it to zero. Then show that property in HTML.

2. Initialize a array of Task (*tasks : Task[]*) with 3 tasks and show those tasks in HTML. Each task should have 2
   properties =>   completed : boolean and label : string . And 1 task should be already completed.

   ex :

       var todo = {
         label: 'learn RxJS',
         completed: false
       }

3. Add the necessary code to be able to toggle the state of a task (property complete) between true/false when either
   clicking on the checkbox or the label of the task on the UI. To make the test pass for "cliking on the label" you
   will have to adapt the dedicated tests selectors. The feature "clicking on the checkbox" does not require tests
   adaptation, but in that case clicking on the label will not always produce what you expect.

4. Add the class  *completed* on *\<li>* when the task is completed (complete===true)

In the file ./src/style.css => this will use the following style definition:

      .todo-list li.completed label { color: #d9d9d9; text-decoration: line-through; }

Check the syntax for  [ngClass] over internet (or in the slides)

https://www.telerik.com/blogs/angular-basics-conditional-classes-angular-ngclass

5. Delete a task when clicking on the cross button

6. Add a Task when clicking enter when focused on the \<input>

   Do not add task with if the lable is empty.

   Clear the input value after the add.

   You have different solutions to instrument the \<input>, one of them is adding a ngModel to the input. If you use
   ngModel, use the standalone version to make the test pass (unresolved angular bug), which means add [ngModelOptions]
   ="{standalone : true}" in the input.

   Most of the time when using ngModel we prefer the other solution which is to add name="theNameOfTheProp" on each
   \<input>   and it works (both in tests and app).

   You could try with "name" to see that the solution is functionnal, it is just my tricky async test which does not
   work in that particuliar case. If you understand why tell me !

7. Toggle all tasks complete state (true/false) when clicking on the top chevron

8. Count how many tasks are not completed, show it on the UI and adapt the tests to make them pass

9. Use i18nPlural to have a better label than "remaining tasks" when you have no completed or only one completed task.

Example:

      <div>{{ messages.length | i18nPlural: {'=0': 'No messages.', '=1': 'One message.', 'other': '# messages.'} }}</div>



