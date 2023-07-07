# 02 filtering with Pipes

The main feature goal if to show only the todos you want to see.

- ALL
- only ACTIVE (meaning not completed)
- only COMPLETED

The second goal is to show the number of remaining todos with a Pipe.

## Strategy for filtering

The strategy is to use button to set an attribute on the AppComponent memorizing that choice. This attribute will be
named filterChoice: TODO_FILTER_ENUM. Don' forget to give it a starting value.

Then when Angular refresh the view it will use that choice to filter the Todos used in the *ngFor loop.

- The *ngFor will look like:  *ngFor="let todo of (todos | todosFilterPipe:filterChoice);

- You will use the 3 button (ALL, ACTIVE and COMPLETED) to set the filterChoice attribute.

- When a button has been clicked the filterChoice attribute is set to the corresponding TODO_FILTER_ENUM value. , and
  the button will have an added class to show that it is the selected one.

## The TodosFilterPipe

As a preparattion add a (click) event on the 3 buttons to call a method on the AppComponent to set filterChoice.

- Also add a class to the button to show that it is the selected one. The class is named .myActive.

Code and use a TodosFilterPipe

1. the goal is to show only ACTIVE, or only COMPLETED todos or ALL.
2. Usage of the Pipe : *ngFor="let task of ( todos | todosFilterPipe: filterChoice)
3. filterChoice is a property on AppComponent you have to create
4. filterChoice is set by clicking on the button ALL, ACTIVE or COMPLETE
5. The Pipe will have 2 parameter as input to its implementation methods.
6. TIPS : it could be useful to expose the Enum to the Angular HTML context, you could achieve this by creating a public
   property named TASKS_FILTER_ENUM on AppComponent. The value of TASKS_FILTER_ENUM should be TASKS_FILTER_ENUM.
7. it looks like :   TASKS_FILTER_ENUM = TASKS_FILTER_ENUM;

## Code and use a RemainingTasksPipe

1. Code and use a RemainingMessagePipe
    1. Usage :  {{ todos |remainingMessage}}
    2. for no remaining todos it should return 'No remaining todos'
    3. for remaining task it should return 'One remaining todo'
    4. for # remaining todos it should return '# remaining todos'

- when coding a new Pipe you should ask yourself it it should be pure or not. By default (no specific parameter) a pipe
  is pure.

````
@Pipe({
  name: 'thePipeName',
  pure: true   // default value
})
````
