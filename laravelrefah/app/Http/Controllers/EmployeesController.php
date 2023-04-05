<?php

namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Employees::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $path='';
        if ($request->profile_dp != '') {
            $png_url = "product-".time().".png";
            $path = public_path().'img/' . $png_url;
            Image::make(file_get_contents($request->profile_dp))->save($path);   

        }
        
        Employees::create([
            'name' => $request->name,
            'father_name' => $request->father_name,
            'email' => $request->email,
            'profile_dp' => $path,
            'is_active' => $request->is_active
        ]);

        return response()->json(true);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employees $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employees $employee)
    {
        $employee->name = $request->name;
        $employee->father_name = $request->father_name;
        $employee->email = $request->email;
        $employee->profile_dp = $request->is_active;
        $employee->is_active = $request->is_active;
        $employee->save();

        return response()->json(true);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employees $employee)
    {
        $employee->delete();

        return response()->json(true);
    }
}
