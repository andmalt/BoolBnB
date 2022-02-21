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
        $allImages = DB::table('photos')->where('apartment_id','=',$apartment->id)->get();

        return view('admin.apartmentImages.index', compact('allImages'));
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
                $name = time() . Str::random(35) . '.' . $image->getClientOriginalExtension();
                $image->move(storage_path('app/public/apartments/images/'), $name);
                $photo->apartment_id = $apartment->id;
                $photo->image_url = $name;
                $photo->save();
            }
        }
        return redirect()->route('admin.apartment.show',$apartment->id);
    }
    
    /**
     * delete a model photo
     *
     * @param  mixed $photo
     * @return void
     */
    public function deleteImage(Photo $photo)
    {
        Storage::disk('public')->delete('apartments/images/'.$photo->image_url);
        $photo->delete();

        return with('delete-image',"la foto numero $photo->id è stata eliminata con successo" );
    }
}
