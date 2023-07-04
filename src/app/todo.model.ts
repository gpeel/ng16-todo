export interface Todo {
  id: number;
  label: string;
  completed: boolean;
}

// export class Todo {
//
//   static nextId: number = 1;
//   id: number;
//
//   constructor(public label: string, public completed: boolean = false) {
//     this.id = Todo.nextId++;
//   }
//
// }

//
export class TodoUtils {

  static nextId: number = 1;

  static createTodo(label: string, completed: boolean = false): Todo {
    return {id: this.nextId++, label, completed};
  }

}

// Enum using default number values (not advised)
// export enum TODO_FILTER_ENUM {
//   ALL, ACTIVE, COMPLETED
// }

// the best is to used string enum with the SAME value as the key
// it helps to NOT have duplicates key/values pairs
export enum TODO_FILTER_ENUM {
  ALL = 'ALL', ACTIVE = 'ACTIVE', COMPLETED = 'COMPLETED'
}
