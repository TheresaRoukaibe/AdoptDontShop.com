<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
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
                    "status" => $check_user->id
                ]);
            }else{

                return response()->json([
                    "status" => "Wrong Password"
                ]);
            }
        }
    }
}
