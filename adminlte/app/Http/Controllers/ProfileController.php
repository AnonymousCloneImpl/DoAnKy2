<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ProfileUpdateRequest;

class ProfileController extends Controller
{
    public function show()
    {
        return view('auth.profile');
    }

    public function update(ProfileUpdateRequest $request)
    {
        $updateSuccess = true;

        if ($request->password) {
            $updateSuccess = auth()->user()->update(['password' => Hash::make($request->password)]);
        }

        $updateSuccess = $updateSuccess && auth()->user()->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

        if ($updateSuccess) {
            toastr()->success('Profile updated successfully', 'Success');
            return redirect()->back();
        } else {
            toastr()->error('Profile is not updated', 'Oops! Something went wrong!');
            return redirect()->back();
        }
    }
}
