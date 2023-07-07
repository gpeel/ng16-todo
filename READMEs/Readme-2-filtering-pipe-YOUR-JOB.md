# 02 filtering with Pipes

The feature goal if to show only the todos you want to see.

- ALL
- only ACTIVE (meaning not completed)
- only COMPLETED

## Strategy

The strategy is to use button to set an attribute on the AppComponent memorizing that choice. This attribute will be
named filterChoice: TODO_FILTER_ENUM. Don' forget to give it a starting value.

Then when Angular refresh the view it will use that choice to filter the Todos used in the *ngFor loop.

- The *ngFor will look like:  *ngFor="let todo of (todos | todosFilterPipe:filterChoice);

- You will use the 3 button (ALL, ACTIVE and COMPLETED) to set the filterChoice attribute.

- When a button has been clicked the filterChoice attribute is set to the corresponding TODO_FILTER_ENUM value. , and
  the button will have an added class to show that it is the selected one.

## 3 Pipes to use and/or code

1. using the pipe "uppercase" show the lable in capital letter to the user
2. Code and use a RemainingMessagePipe
    1. Usage :  {{ todos |remainingMessage}}
    2. for no remaining todos it should return 'No remaining todos'
    3. for remaining task it should return 'One remaining todo'
    4. for # remaining todos it should return '# remaining todos'
3. Code and use a TodosFilterPipe
    1. the goal is to show only ACTIVE, or only COMPLETED todos or ALL with the button in the footer
    2. Usage : *ngFor="let task of ( todos | todosFilterPipe: todosFilterStatus)
    3. todosFilterStatus is a property on AppComponent you have to create
    4. todosFilterStatus is set by clicking on the button ALL, ACTIVE ro COMPLETE
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
