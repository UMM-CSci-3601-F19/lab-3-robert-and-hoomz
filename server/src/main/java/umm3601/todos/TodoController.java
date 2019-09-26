package umm3601.todos;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import spark.Request;
import spark.Response;

import java.io.IOException;

import static umm3601.Util.*;

/**
 * Controller that manages requests for info about todos.
 */
public class TodoController {

  private final Gson gson;
  private TodoDatabase todoDatabase;

  /**
   * Construct a controller for todos.
   * <p>
   * This loads the "todoDatabase" of todo info from a JSON file and
   * stores that internally so that (subsets of) todos can be returned
   * in response to requests.
   *
   * @param todoDatabase the todoDatabase containing todo data
   */
  public TodoController(Database todoDatabase) {
    gson = new Gson();
    this.todoDatabase = todoDatabase;
  }

  /**
   * Get the single todo specified by the `id` parameter in the request.
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return a success JSON object if the todo with that ID is found, a fail
   * JSON object if no todo with that ID is found
   */
  public JsonElement getTodo(Request req, Response res) {
    res.type("application/json");
    String id = req.params("id");
    Todo todo = todoDatabase.getTodo(id);
    if (todo != null) {

      //return buildSuccessJsonResponse("todo", gson.toJsonTree(todo));
      return gson.toJsonTree(todo);
    } else {
      String message = "Todo with ID " + id + " wasn't found.";
      return buildFailJsonResponse("id", message);
    }
  }

  /**
   * Get a JSON response with a list of all the todos in the "todoDatabase".
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return a success JSON object containing all the todos
   */
  public JsonElement getTodos(Request req, Response res) {
    res.type("application/json");
    Todo[] todos = todoDatabase.listTodos(req.queryMap().toMap());

    //return buildSuccessJsonResponse("todos", gson.toJsonTree(todos));
    return gson.toJsonTree(todos);
  }

}
