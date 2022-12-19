<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Exception;



class UsersController extends Controller
{
    protected $service;
    public function __construct()
    {
        $this->service = new UserService(new User);
    }

    public function create(Request $request)
    {
        $response = $this->service->create($request->all());
        return response()->send($response['message'], $response['status'], $response['data']);
    }

    public function read(Request $request)
    {
        $response = $this->service->read($request->all());
        return response()->send($response['message'], $response['status'], $response['data']);
    }

    public function delete(Request $request, $id)
    {
        $response = $this->service->delete($id);
        return response()->send($response['message'], $response['status'], $response['data']);
    }

    public function update(Request $request, $id)
    {
        $response = $this->service->update($request->all(), $id);
        return response()->send($response['message'], $response['status'], $response['data']);
    }
}