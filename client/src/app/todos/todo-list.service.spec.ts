import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';

describe('Todo list service: ', () => {
  // A small collection of test todos
  const testTodos: Todo[] = [
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
  ];
  let todoListService: TodoListService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoListService = new TodoListService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getTodos() calls api/todos', () => {
    // Assert that the todos we get from this call to getTodos()
    // should be our set of test todos. Because we're subscribing
    // to the result of getTodos(), this won't actually get
    // checked until the mocked HTTP request "returns" a response.
    // This happens when we call req.flush(testTodos) a few lines
    // down.
    todoListService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoListService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  it('getTodoById() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo.id;
    todoListService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );

    const expectedUrl: string = todoListService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });

  it('filterTodos() filters by owner', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'o';
    expect(todoListService.filterTodos(testTodos, todoOwner).length).toBe(2);
  });

  it('filterTodos() filters by stuff in body', () => {
    expect(testTodos.length).toBe(3);
    let todoBody = 'work';
    expect(todoListService.filterTodos(testTodos, null, todoBody).length).toBe(1);
  });

  it('filterTodos() filters by owner and body', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'e';
    let todoBody = 'stay';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoBody).length).toBe(1);
  });
});
