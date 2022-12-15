<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;
use App\Models\Want;
use App\Models\User_save;
use Illuminate\Support\Facades\DB;

class PetController extends Controller
{
    function get_admin_dogs($company_id){
        if(!$company_id){
            return response()->json([
                "status" => "Params Error"
            ]);
        }else{
            $dogs = Pet::where("company_id", "=", $company_id)->get();
            if(!$dogs->isEmpty()){
            return response()->json([
                "status" => $dogs
            ]);
        }else{
            return response()->json([
            "status" => "No dogs posted yet"
        ]);
        }
        }
    }

    function add_dog(Request $req, $comp_id){
            $new_pet = new Pet;
            if($req->hasFile('img_src')){
                $req->validate([
                    'image' => 'mimes:jpeg,bmp,png'
                ]);

                $req->img_src->store('pets', 'public');
                $new_pet->img_src = $req->img_src->hashName();
            }
            $new_pet->name = $req->name;
            $new_pet->age = $req->age;
            $new_pet->breed = $req->breed;
            $new_pet->found_in = $req->found_in;
            $new_pet->condition = $req->condition;
            $new_pet->is_adopted = 0;
             $new_pet->company_id = $comp_id;
             $new_pet->user_id = -1;
            if($new_pet->save()){
            return response()->json([
                "status" => "Dog Added"
            ]);
            }else{
                return response()->json([
                    "status" => "Error Adding"
                ]);
            }
    }

    function get_dog($id = null){

        if($id){
            $dog=Pet::find($id);
            if($dog){
            return response()->json([
                "status" => $dog
            ]);
        }else{
            return response()->json([
                "status" => "No dog with this id in db"
            ]);
        }
        } else{
            $dogs = Pet::where("is_adopted", "=", "0")->get();
            if($dogs){
            return response()->json([
             "status" => $dogs
         ]);
        }else{
            return response()->json([
                "status" => "No dogs in db"
            ]);
        }
        }
        
    }

function remove_dog($dog_id){
$to_delete = Pet::where('id', '=', $dog_id);
$save_delete = User_save::where('dog_id', '=', $dog_id);
$wants = Want::where('dog_id', '=', $dog_id);
$to_delete->delete();  
$save_delete->delete();   
$wants->delete(); 
return response()->json([
    "status" => "Deleted Dog"
]);
}

function choose_user(Request $req){
    $dog = Pet::where('id', '=', $req->dog_id)->first();
    if($dog->is_adopted == 0){
        return response()->json([
            "status" => "Already Adopted"
        ]);
    }else{
    $dog->is_adopted = 1;
    $dog->user_id = $req->user_id;
    $dog->save();
    return response()->json([
        "status" => "Pet Adopted"
    ]);
}
}

    function get_applicants($dog_id){
        if(!$dog_id){
            return response()->json([
                "status" => "Params Error"
            ]);
        }else{
            $apps = DB::table('users')->join('wants', 'users.id', '=', 'wants.user_id')->where('wants.dog_id', '=', $dog_id)->get();
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
