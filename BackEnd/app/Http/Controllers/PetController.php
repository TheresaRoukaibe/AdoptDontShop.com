<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;

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
}
