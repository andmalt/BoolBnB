<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PhotoController extends Controller
{
    
    /**
     * get all images of an apartment
     *
     * @param  mixed $apartment
     * @return void
     */
    public function getImages(Apartment $apartment)
    {
        return view('admin.apartmentImages.index', compact('apartment'));
    }

    /**
     * upload images
     *
     * @param  mixed $request
     * @param  mixed $apartment
     * @return void
     */
    public function uploadImage(Request $request,Apartment $apartment)
    {
        $request->validate(
            [
                'images' => "required",
                'images.*' => 'mimes:jpg,png,jpeg,gif,svg',
            ],
            [
                "images.required" => 'Non hai inserito un immagine',
                "images.*.mimes" => 'Devi inserire un file immagine valido',
            ]
        );

        if($request->hasFile('images')){
            foreach($request->file('images') as $image){
                $photo = new Photo();
                $name = time() . Str::random(20) . '.' . $image->getClientOriginalExtension();
                $image->move(storage_path('app/public/apartments/images/'), $name);
                $photo->apartment_id = $apartment->id;
                $photo->image_url = $name;
                $photo->save();
            }
        }
        return redirect()->route('admin.apartment.show',$apartment->id)->with('ok_message','L\'immagine è stata inserita con successo');
    }
    
    /**
     * delete a model photo
     *
     * @param  mixed $photo
     * @return void
     */
    public function deleteImage(Photo $photo)
    {
        // \dd($photo->apartment->id);

        Storage::disk('public')->delete('apartments/images/'.$photo->image_url);
        $photo->delete();

        return redirect()->route('admin.images.index',$photo->apartment->id)->with('delete-image',"La foto è stata eliminata con successo" );
    }
}
