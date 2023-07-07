# 02 filtering with Pipes

The feature goal if to show only the todos you want to see.

- ALL
- only ACTIVE (meaning not completed)
- only COMPLETED

## TP step2 TODO-MVC pipe YOUR JO

this HTML app.component.html has been modified to add a fex button in the footer:

The new footer looks lke:

````html

<footer class="footer">
  <span class="todo-count"><strong>{{computeRemainingTasks()}} remaining tasks</strong></span>
  <ul class="filters">
    <li>
      <a>ALL</a>
    </li>
    <li>
      <a>ACTIVE</a>
    </li>
    <li>
      <a>COMPLETED</a>
    </li>
  </ul>
</footer>

````

## 3 Pipes to use and/or code

1. using the pipe "uppercase" show the lable in capital letter to the user
2. Code and use a RemainingTasksPipe
    1. Usage :  {{tasks |remainingTasks}}
    2. for no remaining tasks it should return 'no remaining tasks'
    3. for 1 remaining task it should return 'one remaining task'
    4. for # remaining tasks it should return '# remaining tasks'
3. Code and use a TasksFilterPipe
    1. the goal is to show only ACTIVE, or only COMPLETED tasks or ALL with the button in the footer
    2. Usage : *ngFor="let task of ( tasks | tasksFilterPipe: tasksFilterStatus)
    3. tasksFilterStatus is a property on AppComponent you have to create
    4. tasksFilterStatus is set by clicking on the button ALL, ACTIVE ro COMPLETE
    5. it could be useful to expose the Enum to the HTML context, you could achieve this by creating a public property
       named TASKS_FILTER_ENUM on AppComponent. The value of TASKS_FILTER_ENUM should be TASKS_FILTER_ENUM.
    6. it looks like : TASKS_FILTER_ENUM = TASKS_FILTER_ENUM;

- when coding a new Pipe you should ask yourself it it should be pure or not. By default is pipe is pure.

````
@Pipe({
  name: 'thePipeName',
  pure: true   // default value
})
````
