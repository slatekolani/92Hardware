<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class HardwareController extends Controller
{
    public function HomePage() : Response
    {
        return Inertia::render('HardwareHomepage');
    }
    public function About() : Response
    {
        return Inertia::render('Webpages/About');
    }
    public function Products() : Response
    {
        return Inertia::render('Webpages/Products');
    }
    public function ContactUs() : Response
    {
        return Inertia::render('Webpages/ContactUs');
    }

    public function BuildingBlocks() : Response
    {
        return Inertia::render('Webpages/Services/BuildingBlocks');
    }
    public function HardwareDealership() : Response
    {
        return Inertia::render('Webpages/Services/HardwareDealership');
    }
}
