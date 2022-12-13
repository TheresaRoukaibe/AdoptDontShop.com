<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;

use Illuminate\Support\Facades\DB;

class PetController extends Controller
{
    function get_dog($id = null){
        if($id){
            $dog=Pet::find($id);
            if($dog){
            return response()->json([
                "status" => $dog
            ]);
        }else{
            return response()->json([
                "status" => "No dogs in db"
            ]);
        }
            
        }else{
           $dogs = Pet::where("isAdopted", "=", 0);
           return response()->json([
            "status" => $dogs
        ]);
        }

    }

    function get_applicants($dog_id){
        if(!$dog_id){
            return response()->json([
                "status" => "Params Error"
            ]);
        }else{
            $apps = DB::table('users')->join('wants', 'users.id', '=', 'wants.user_id')->join('pets', 'pets.id', '=', $dog_id)->get();
            if(!$apps->isEmpty()){
            return response()->json([
                "status" => $apps
            ]);
        }else{
            return response()->json([
            "status" => "No applicants"
        ]);
        }
        }
    }
}
