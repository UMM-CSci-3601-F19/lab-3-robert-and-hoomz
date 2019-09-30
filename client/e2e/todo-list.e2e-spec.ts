import {TodoPage} from './todo-list.po';
import {browser, protractor} from "protractor";
let origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  let args = arguments;

  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });
  return origFn.apply(browser.driver.controlFlow(), args);
};

// below are the tests

describe('Todo list',  () =>{
  let page: TodoPage;

  beforeEach(()=>{
    page = new TodoPage();
  });

  it('should get and highlight Todo Owner attribute', ()=>{
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos'); // checks to see if page is called Todos
  });

  it('should type in owner box and see if its actually what it typed', ()=>{
    page.navigateTo();
    page.typeAOwner("ro");
    expect(page.getUniqueTodo("video games")).toEqual("Roberta");
    page.backspace();
    page.backspace();
    page.typeAOwner("wo");
    expect(page.getUniqueTodo("homework")).toEqual("Workman");
  });

  it ('get a owner with certain words in the body', ()=>{
    page.navigateTo();
    page.typeABody("cillum")
    expect(page.getUniqueTodo('software design')).toEqual('Blanche');
    page.backspace();
    page.backspace();
    page.backspace();
    page.backspace();
    page.backspace();
    page.backspace();
    page.typeABody("occaeca");
    expect(page.getUniqueTodo('video games')).toEqual('Workman');
  });

  it ('find someone when given true or false', ()=>{
    page.navigateTo();
    page.getTodoByStatus('true');
    expect(page.getUniqueTodo('homework')).toEqual('Fry');
    page.backspace();
    page.backspace();
    page.backspace();
    page.backspace();
    page.getTodoByStatus('false');
    expect(page.getUniqueTodo('video games')).toEqual('Roberta');
  });

});
