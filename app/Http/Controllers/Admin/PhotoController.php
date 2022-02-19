<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PhotoController extends Controller
{
    public function uploadImage(Request $request,Apartment $apartment)
    {
        if($request->hasFile('images')){
            foreach($request->file('images') as $image){
                $photo = new Photo();
                $name = time() . Str::random(35) . '.' . $image->getClientOriginalExtension();
                $image->move(storage_path('app/public/apartments/images/'), $name);
                $photo->apartment_id = $apartment->id;
                $photo->image_url = $name;
                $photo->save();
            }
        }
        return redirect()->route('admin.apartment.show');
    }

    public function deleteImage(Photo $photo)
    {
        Storage::disk('public')->delete('apartments/images/'.$photo->image_url);
        $photo->delete();

        return view('admin.apartment.show')->with('delete-image',"la foto numero $photo->id è stata eliminata con successo" );
    }
}
