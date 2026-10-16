import { DestinationItem, ItineraryDayPlan } from '../types/trip';

export const TRIP_INFO = {
  name: "GPT — Ganpati Pule Trip",
  shortName: "Ganpati Pule Ride '26",
  tagline: "Ride the Konkan Coast • Seek Divine Blessings • 3 Days of Coastal Brotherhood",
  location: "Ganpatipule, Ratnagiri District, Maharashtra, India",
  dates: "27 November 2026 – 29 November 2026",
  departureDate: "27 November 2026",
  departureTime: "3:00 AM IST",
  returnDate: "29 November 2026",
  returnTime: "3:00 PM IST",
  travelStyle: "Bike Trip",
  mainRiders: 2,
  accommodation: "Bhakt Niwas (Planned / Tentative)",
  costNote: "100% Free Registration — Expression of Interest only. No ticket or booking fee.",
  mainDestination: "Ganpatipule Swayambhu Ganpati Temple"
};

export const DESTINATIONS: DestinationItem[] = [
  {
    id: "ganpatipule-temple",
    name: "Ganpatipule Ganpati Temple",
    category: "Temple",
    tagline: "400-Year-Old Divine Swayambhu Shrine by the Arabian Sea",
    description: "Unlike most Hindu shrines facing east, this sacred 400-year-old deity faces west to guard the western shores. Devotees take pradakshina around the verdant hillock overlooking crashing ocean waves.",
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
    status: "Confirmed Stop",
    approxDistance: "Main Destination (Ganpatipule center)",
    badgeColor: "bg-saffron-500 text-white"
  },
  {
    id: "ganpatipule-beach",
    name: "Ganpatipule Beach",
    category: "Beach",
    tagline: "Golden Sands, Coconut Groves & Arabian Sea Horizons",
    description: "A pristine stretch of silver-white sands bordered by dense betel-nut and coconut plantations. Known for dramatic Konkan sunsets, cool evening breezes, and serene unpolluted coastline.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    status: "Confirmed Stop",
    approxDistance: "Directly adjacent to temple",
    badgeColor: "bg-ocean-600 text-white"
  },
  {
    id: "aare-ware-coast",
    name: "Aare Ware Coastal Road & Viewpoint",
    category: "Scenic Coastal Road",
    tagline: "Maharashtra's Iconic Cliffside Marine Drive",
    description: "A dream stretch for motorcyclists: smooth, serpentine tarmac carved along towering laterite cliffs with the turquoise ocean right below. Features high viewpoints capturing the virgin twin beaches.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    status: "Tentative Suggestion",
    approxDistance: "12 km south of Ganpatipule",
    badgeColor: "bg-emerald-600 text-white"
  },
  {
    id: "jaigad-fort",
    name: "Jaigad Fort & Jaigad Lighthouse",
    category: "Fort",
    tagline: "16th-Century Coastal Bastion Overlooking River Shastri Estuary",
    description: "Perched atop a coastal cliff where the Shastri river merges into the Arabian Sea. Offers wide stone ramparts, a deep defensive moat, and the nearby 1899 British-era cast-iron lighthouse.",
    imageUrl: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
    status: "Tentative Suggestion",
    approxDistance: "20 km north of Ganpatipule",
    badgeColor: "bg-amber-700 text-white"
  },
  {
    id: "malgund-prachin-konkan",
    name: "Malgund Beach & Prachin Konkan",
    category: "Beach",
    tagline: "Poet Keshavsut's Homeland & Open-Air Rural Life Museum",
    description: "Quiet neighboring beach village of Malgund, home to the memorial of Marathi poet Keshavsut and an informative open-air museum capturing 500 years of Konkan culture and craftsmanship.",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    status: "Tentative Suggestion",
    approxDistance: "3 km north of Ganpatipule",
    badgeColor: "bg-purple-700 text-white"
  }
];

export const ITINERARY_DAYS: ItineraryDayPlan[] = [
  {
    day: 1,
    title: "Flag-off & The Great Coastal Descent",
    dateStr: "Friday, 27 November 2026",
    summary: "Departure at 3:00 AM sharp. Cool pre-dawn highway ride, crossing western ghat descents, arriving in Ganpatipule for temple darshan and ocean sunset.",
    stops: [
      {
        time: "03:00 AM",
        title: "Official Trip Flag-Off & Departure",
        description: "Riders assemble at departure point. Final tyre pressure check, safety briefing, and wheels rolling into the calm night.",
        tentative: false,
        type: "ride"
      },
      {
        time: "07:30 AM",
        title: "Highway Breakfast Stop",
        description: "Hot poha, steaming misal pav, and piping hot chai at a roadside Konkan highway dhaba.",
        tentative: true,
        type: "food"
      },
      {
        time: "01:30 PM",
        title: "Arrival in Ganpatipule & Bhakt Niwas Check-in",
        description: "Arrive at Ganpatipule. Settle down at the planned Bhakt Niwas accommodation, freshen up, and rest after the ride.",
        tentative: true,
        type: "rest"
      },
      {
        time: "05:00 PM",
        title: "Ganpatipule Swayambhu Temple Darshan",
        description: "Evening visit to the sacred seaside Ganpati temple. Offer prayers and perform the pradakshina around the sacred hill.",
        tentative: false,
        type: "temple"
      },
      {
        time: "06:30 PM",
        title: "Golden Hour Sunset at Ganpatipule Beach",
        description: "Unwind on the sands right by the temple. Watch the sun dip into the Arabian Sea horizon.",
        tentative: false,
        type: "sightseeing"
      },
      {
        time: "08:30 PM",
        title: "Konkani Welcome Dinner & Briefing",
        description: "Enjoy authentic Konkani cuisine (Modak, Solkadhi, local curries) and discuss the next day's coastal route.",
        tentative: true,
        type: "food"
      }
    ]
  },
  {
    day: 2,
    title: "Coastal Curves, Sea Forts & Lighthouses",
    dateStr: "Saturday, 28 November 2026",
    summary: "A thrilling motorcycle ride along the Aare Ware coastal cliff road, Jaigad fort exploration, and relaxed beachside camaraderie.",
    stops: [
      {
        time: "06:30 AM",
        title: "Morning Ocean Walk & Chai",
        description: "Crisp ocean air, sea breeze, and peaceful coastal morning quiet before gearing up.",
        tentative: true,
        type: "sightseeing"
      },
      {
        time: "08:30 AM",
        title: "Aare-Ware Marine Drive Ride (Tentative)",
        description: "Cruise along one of India's most scenic coastal stretches. Pit-stop at high cliff viewpoints for group photos.",
        tentative: true,
        type: "ride"
      },
      {
        time: "11:30 AM",
        title: "Jaigad Fort & Coastal Lighthouse (Tentative)",
        description: "Walk the historic ramparts of Jaigad overlooking the Shastri river estuary and see the 19th-century beacon.",
        tentative: true,
        type: "sightseeing"
      },
      {
        time: "02:00 PM",
        title: "Traditional Malvani Thali Feast",
        description: "Savor local fresh catch / authentic vegetarian Malvani thali with refreshing Solkadhi.",
        tentative: true,
        type: "food"
      },
      {
        time: "04:30 PM",
        title: "Malgund Coast / Prachin Konkan Museum (Tentative)",
        description: "Explore the life-size cultural museum of old Konkan living, followed by relaxed time along peaceful Malgund sands.",
        tentative: true,
        type: "sightseeing"
      },
      {
        time: "08:00 PM",
        title: "Riders' Circle & Stargazing",
        description: "Evening bonding, sharing motorcycle tales, trip memories, and acoustic ocean sounds under the stars.",
        tentative: true,
        type: "rest"
      }
    ]
  },
  {
    day: 3,
    title: "Morning Gratitude & Return Ride",
    dateStr: "Sunday, 29 November 2026",
    summary: "Final morning temple blessings, souvenir shopping for local cashews and Alphonso delicacies, packing up, and 3:00 PM return departure.",
    stops: [
      {
        time: "07:30 AM",
        title: "Farewell Temple Visit & Morning Darshan",
        description: "A peaceful morning prayer at the temple before the weekend rush begins.",
        tentative: true,
        type: "temple"
      },
      {
        time: "10:00 AM",
        title: "Local Market & Konkan Goodies",
        description: "Browse local stalls for Ratnagiri cashews, Kokum syrup, Aam Papad, and handmade souvenirs.",
        tentative: true,
        type: "sightseeing"
      },
      {
        time: "01:00 PM",
        title: "Pre-Ride Lunch & Gear Check",
        description: "Healthy energizing lunch, full hydration, luggage bungee strapping, and pre-departure motorcycle inspection.",
        tentative: true,
        type: "food"
      },
      {
        time: "03:00 PM",
        title: "Departure from Ganpatipule",
        description: "Bid adieu to the ocean and Ganpatipule. Ride back home with memories of an unforgettable Konkan adventure.",
        tentative: false,
        type: "ride"
      }
    ]
  }
];

export const TRIP_FAQS = [
  {
    q: "Is there any fee or payment required to register interest?",
    a: "Absolutely not! Registering your interest is 100% free. This website does NOT collect any fees, ticket prices, or deposits."
  },
  {
    q: "Does registering interest guarantee my confirmed seat on the trip?",
    a: "No. Submitting this form is purely an expression of interest to help organizers know how many fellow riders are keen to join. Final arrangements, route coordination, and accommodation will be discussed directly with registered participants."
  },
  {
    q: "What is the travel mode?",
    a: "This is primarily a bike (motorcycle) expedition. Two main riders have initiated the plan, and enthusiastic fellow riders are welcome to express their interest."
  },
  {
    q: "Where is the stay planned?",
    a: "We are currently planning accommodation at Bhakt Niwas in Ganpatipule for its proximity to the temple and coastal atmosphere. Note that stay plans are tentative and will be finalized based on group size."
  },
  {
    q: "How will my personal information be used?",
    a: "Your name, phone number, and preferences will be kept strictly private and used solely by the organizers to contact you regarding trip updates. No information is sold or publicly displayed."
  }
];
