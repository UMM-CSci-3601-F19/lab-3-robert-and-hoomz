import {browser, by, element, Key} from 'protractor';

export class TodoPage {
  navigateTo() {    //navigates to todos page
    return browser.get('/todos');
  }

highlightElement(byObject){
  function setStyle(element, style){
  const previous = element.getAttribute('style');
  element.setAttribute('style', style);
  setTimeout(() => {
    element.setAttribute('style', previous);

  }, 200);
  return "highlighted";
  }
  return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: green; background-color: black;');

}

getTodoTitle(){
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));
    return title;
}

typeAOwner(owner: string){
    let input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(owner);
}

typeABody(body: string){
    let input = element(by.id('todoBody'));
    input.click();
    input.sendKeys(body);
}

getTodoByStatus(status: string){
    let input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(status);
}

backspace(){
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
}

getUniqueTodo(category: string){
    let todo = element(by.id(category)).getText();
    this.highlightElement(by.id(category));
    return todo;
}
}
