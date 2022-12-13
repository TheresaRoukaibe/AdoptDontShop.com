<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Mpdels\Pet;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    function get_adopted($user_id){
        $dogs = Pet::where('user_id', '=', $user_id)->get();
        if($dogs){
            return response()->json([
                "status" => $dogs
            ]);
        }else{
            return response()->json([
                "status" => "No dogs adopted"
            ]);
        }
    }

    function register(Request $req){
        $user = User::where('email', '=', $req->email)->first();
        if($user){
            return response()->json([
                "status" => "User Exists"
            ]);
        }else{
            $new_user = new User;
            $new_user->fname = $req->fname;
            $new_user->lname = $req->lname;
            $new_user->email = $req->email;
            $new_user->password = Hash::make($req->password);
            $new_user->location = $req->address;
            $new_user->user_type_id = $req->user_type_id;
            $new_user->save();
            return response()->json([
                "status" => "User Added"
            ]);
        }


    }

    function login(Request $request){
        $check_user = User::where("email", "=", $request->email)->first();
        if(!$check_user){
            return response()->json([
                "status" => "Email not found"
            ]);
        }else{
           if(Hash::check($request->password, $check_user->password)){
                return response()->json([
                    "status" => $check_user
                ]);
            }else{

                return response()->json([
                    "status" => "Wrong Password"
                ]);
            }
        }
    }

    function get_saved($id){
        if(!$id){
            return response()->json([
                "status" => "Params Error"
            ]);
        }else{
            $dogs = DB::table('user_saves')->join('pets', 'pets.id', '=', 'user_saves.dog_id')->where('user_saves.id', '=', $id)->get();
            if(!$dogs->isEmpty()){
            return response()->json([
                "status" => $dogs
            ]);
        }else{
            return response()->json([
            "status" => "No saved dogs"
        ]);
        }
        }
    }

    function get_user_info($id){
        if(!$id){
            return response()->json([
                "status" => "Params Error"
            ]);
        }else{
            $user = User::where('id', '=', $id)->get();
            if($user){
                return response()->json([
                    "status" => $user
                ]);
        }else{
            return response()->json([
                "status" => "No user found"
            ]);
            
        }
        }
    }

    function edit_profile(Request $req, $id){
        $user = User::where('id', '=', $id)->first();
        if($user){
            if(Hash::check($req->old_pass, $user->password)){
                $user->fname = $req->fname;
                $user->lname = $req->lname;
                 $user->email = $req->email;
                 $user->password = $req->new_password;
                 $user->location = $req->location;
                 $user->save();
                 return response()->json([
                    "status" => "Info edited"
                ]);
            }else{
                return response()->json([
                    "status" => "Wrong password"
                ]);
            }

        }else{
            return response()->json([
                "status" => "User not found"
            ]);
        }
    }
}
