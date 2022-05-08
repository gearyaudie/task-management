<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Webpatser\Uuid\Uuid;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    function post(Request $req){
    
        $validator = Validator::make($req->all(), [
          'assignee'  => 'required|max:255',
          'title' => 'required|max:255',
          'description' => 'required|max:255',
          'status' => 'required|max:255',
          'priority' => 'required|max:255',
        ]);
    
        if($validator->fails()){
          return response()->json($validator->errors(), 400);
        }
    
        $task = new Task();
        $task->id = Uuid::generate()->string;
        $task->assignee = $req->input('assignee');
        $task->title = $req->input('title');
        $task->description = $req->input('description');
        $task->status = $req->input('status');
        $task->priority = $req->input('priority');
    
        $task->save();
    
        return response()->json($task, 201);
      }
    
      function get() {
        $task = Task::orderBy('created_at', 'desc')->get();
    
        if(is_null($task)) {
          return response()->json(["message" => "Record not found!"], 400);
        }
    
        if($task) {
          return response()->json($task, 200);
        } else {
          return response()->json(500);
        }
      }
    
      function getById($id){
        $task = Task::findOrFail($id);
    
        if(is_null($task)) {
          return response()->json(["message" => "Record not found!"], 400);
        }
    
        if($task) {
          return response()->json($task, 200);
        } else {
          return response()->json(500);
        }
      }
    
      function delete($id) {
        if(Task::where('id', $id)->exists()) {
          $task = Task::where('id', $id)->delete();
          return response()->json("Task deleted", 200);
        } else {
          return response()->json("Task doesn't exist", 500);
        }
      }
    
      function edit($id, Request $req) {
        $task = Task::findOrFail($id);
    
        $validator = Validator::make($req->all(), [
          'assignee'  => 'required|max:255',
          'title' => 'required|max:255',
          'description' => 'required|max:255',
          'status' => 'required|max:255',
          'priority' => 'required|max:255',
        ]);
    
        if($validator->fails()){
          return response()->json($validator->errors(), 400);
        }
    
        $task->assignee = $req->input('assignee');
        $task->title = $req->input('title');
        $task->description = $req->input('description');
        $task->status = $req->input('status');
        $task->priority = $req->input('priority');
    
        $task->save();
    
        return response()->json($task, 200);
      }
}
