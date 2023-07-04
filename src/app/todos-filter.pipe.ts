import {Pipe, PipeTransform} from '@angular/core';
import {Todo, TODO_FILTER_ENUM} from './todo.model';

@Pipe({
  name: 'todoFilterPipe',
  pure: false
})
export class TodosFilterPipe implements PipeTransform {
  counter = 0;

  transform(todos: Todo[], status: TODO_FILTER_ENUM): Todo[] {
    console.log('pipe computation:' + this.counter++);
    let res!: Todo[];

    if (status === TODO_FILTER_ENUM.ALL) {
      res = todos;
    } else if (status === TODO_FILTER_ENUM.COMPLETED) {
      res = todos.filter(tc => tc.completed);
    } else if (status === TODO_FILTER_ENUM.ACTIVE) {
      res = todos.filter(tc => !tc.completed);
    }
    return res;
  }

}









