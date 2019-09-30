import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs';
import { of } from 'rxjs';

describe('Todo component', () => {

  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoListServiceStub: {
    getTodoById: (todoId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => of([
        {
          id: 'fry_id',
          owner: 'Fry',
          status: false,
          body: 'Welcome to campus.',
          category: 'school'
        },
        {
          id: 'roberta_id',
          owner: 'Roberta',
          status: true,
          body: 'We hope you like your stay.',
          category: 'welcome'
        },
        {
          id: 'worker_id',
          owner: 'Worker',
          status: true,
          body: 'This sure is a lot of work.',
          category: 'tasks'
        }
      ].find(todo => todo.id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Fry by ID', () => {
    todoComponent.setId('fry_id');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Fry');
    expect(todoComponent.todo.category).toBe('school');
  });

  it('returns undefined for Pumpkin', () => {
    todoComponent.setId('Pumpkin');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
