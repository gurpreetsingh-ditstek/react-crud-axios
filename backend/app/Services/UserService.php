<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Exception;

class UserService
{
    protected $success;
    protected $failure;
    protected $obj;
    
    public function __construct($obj)
    {
        $this->obj = $obj;
        $this->success = Response::HTTP_OK;
        $this->failure = Response::HTTP_BAD_REQUEST;
    }

    public function create($request)
    {
        $validator = Validator::make($request, [
            "email" => "required|email",
            "name" => "required",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return prepareApiResponse($validator->errors()->first(), Response::HTTP_BAD_REQUEST);
        }

        $user = User::updateOrCreate(
            ["email" => $request['email']],
            [
                "email" => $request['email'],
                "name" => $request['name'],
                "password" => Hash::make($request['password']),
            ]
        );

        return prepareApiResponse("New user created successfully!", $this->success, $user);
    }

    public function read($request)
    {
        $user = User::get();
        return prepareApiResponse("New detail!", $this->success, $user);
    }

    public function delete($id)
    {
        $user = User::find($id);
        $user->delete();
        return prepareApiResponse("User deleted successfully!", $this->success);
    }

    public function update($request, $id)
    {
        $validator = Validator::make($request, [
            "email" => "required|email",
            "name" => "required",
        ]);

        if ($validator->fails()) {
            return prepareApiResponse($validator->errors()->first(), Response::HTTP_BAD_REQUEST);
        }
        $user = User::find($id);
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->save();
        return prepareApiResponse("User deleted successfully!", $this->success, $user);
    }
}

?>