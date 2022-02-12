<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Facility;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $apartments = DB::table('apartments')->where('user_id', '=', Auth::user()->id)->get();

        return view('admin.apartment.index', compact('apartments'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $regions = [
            'Abruzzo',
            'Basilicata',
            'Calabria',
            'Campania',
            'Emilia-Romagna',
            'Friuli Venezia Giulia',
            'Lazio',
            'Liguria',
            'Lombardia',
            'Marche',
            'Molise',
            'Piemonte',
            'Puglia',
            'Sardegna',
            'Sicilia',
            'Toscana',
            'Trentino-Alto Adige',
            'Umbria',
            'Valle d\'Aosta',
            'Veneto',
        ];

        $facilities = Facility::all();

        return view('admin.apartment.create', compact('regions', 'facilities'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'title' => 'required|string|unique:apartments|min:5|max:255',
                'city' => 'required|string|min:2|max:100',
                'region' => 'required|string|min:5|max:100',
                'address' => 'required|string|min:5|max:150',
                'images' => "required",
                'images.*' => 'mimes:jpg,png,jpeg,gif,svg',
                'rooms' => "required|integer|between:1,20",
                'bathrooms' => "required|integer|between:1,20",
                'beds' => "required|integer|between:1,40",
                'square' => "required|integer|between:15,500",
                'facilities' => 'nullable|exists:facilities,id',
                'description' => 'required|string|min:10|max:1500'
            ],
            [
                "title.required" => 'Non è possibile inserire un appartamento senza titolo',
                "title.min" => 'Inserisci almeno 5 caratteri per la descrizione del titolo',
                "title.max" => 'Puoi inserire massimo 255 caratteri per la descrizione del titolo',
                "title.unique" => 'Questa descrizione già esiste',
                "city.required" => 'Inserisci la città',
                "city.min" => 'Inserisci almeno 2 caratteri per il campo città',
                "city.max" => 'Puoi inserire massimo 100 caratteri per il campo città',
                "region.required" => 'Inserisci la regione',
                "region.min" => 'Inserisci almeno 5 caratteri per il campo regione',
                "region.max" => 'Puoi inserire massimo 100 caratteri per il campo regione',
                "address.required" => 'Non è possibile inserire un appartamento senza indirizzo',
                "address.min" => 'Inserisci almeno 5 caratteri per l\'indirizzo',
                "address.max" => 'Puoi inserire massimo 150 caratteri per l\'indirizzo',
                "images.required" => 'Non è possibile inserire un appartamento senza immagine',
                "images.*.mimes" => 'Devi inserire un file immagine valido',
                "rooms.required" => 'Inserisci il numero di stanze',
                "rooms.between" => 'Inserisci un numero di stanze compreso tra 1 e 20',
                "rooms.integer" => 'Puoi inserire solo numeri nel campo stanze',
                "bathrooms.required" => 'Inserisci il numero di bagni',
                "bathrooms.between" => 'Inserisci un numero di bagni compreso tra 1 e 20',
                "bathrooms.integer" => 'Puoi inserire solo numeri nel campo bagni',
                "beds.required" => 'Inserisci il numero di posti letto',
                "beds.between" => 'Inserisci un numero di posti letto compreso tra 1 e 40',
                "beds.integer" => 'Puoi inserire solo numeri nel campo posti letto',
                "square.required" => 'Inserisci i metri quadri',
                "square.between" => 'I metri quadri devono essere compresi tra 15 e 500',
                "square.integer" => 'Puoi inserire solo numeri nel campo metri quadri',
                "description.required" => 'inserisci una breve descrizione',
                "description.string" => 'la descrizione deve essere una stringa',
                "description.min" => 'la descrizione deve essere minimo di 10 caratteri',
                "description.max" => 'la descrizione deve essere massimo di 1500 caratteri'
            ]
        );



        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        $address = str_replace(' ', '-', $data['address']);
        $call = file_get_contents('https://api.tomtom.com/search/2/geocode/' . $data['region'] . '-' . $data['city'] . '-' . $address . '.JSON?key=CskONgb89uswo1PwlNDOtG4txMKrp1yQ');

        $response = json_decode($call);

        $data['lat'] = $response->results[0]->position->lat;
        $data['lon'] = $response->results[0]->position->lon;

        $apartment = new Apartment();
        $apartment->fill($data);
        $apartment->save();

        if (array_key_exists('facilities', $data)) {
            $apartment->facilities()->sync($data['facilities']);
        }

        if ($request->hasfile('images')) {

            foreach ($request->file('images') as $image) {
                $photo = new Photo();
                $name = time() . Str::random(35) . '.' . $image->getClientOriginalExtension();
                $image->move(storage_path('app/public/apartments/images/'), $name);
                $photo->image_url = $name;
                $photo->apartment_id = $apartment->id;
                $photo->save();
            }
        }

        return redirect()->route('admin.apartment.show', $apartment->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Apartment $apartment)
    {
        $facilities = Facility::all();


        return view('admin.apartment.show', compact('apartment'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return \view('admin.apartment.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
