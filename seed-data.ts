import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload/payload.config';

async function seedData() {
  console.log('🔌 Connecting to database...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✓' : 'Not set ✗');
  console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Set ✓' : 'Not set ✗');

  const payload = await getPayload({ config });

  console.log('🌱 Starting database seeding...');

  // Seed Cars
  console.log('\n🚗 Seeding cars...');

  const carsData = [
    {
      name: { en: 'Mercedes-Benz S-Class', fr: 'Mercedes-Benz Classe S' },
      brand: 'Mercedes-Benz',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Black',
      priceDayNote: { en: '€200/day', fr: '200€/jour' },
      priceWithDriverNote: { en: '€300/day', fr: '300€/jour' },
      depositNote: { en: '€1,500 security deposit', fr: '1 500€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport meet & greet', fr: 'Accueil à l\'aéroport' } },
        { text: { en: 'Comprehensive insurance', fr: 'Assurance tous risques' } },
        { text: { en: 'Unlimited mileage', fr: 'Kilométrage illimité' } },
      ],
      options: [
        { name: { en: 'Wi-Fi hotspot', fr: 'Hotspot Wi-Fi' }, priceNote: { en: '€10/day', fr: '10€/jour' } },
        { name: { en: 'Child seat (0-3 years)', fr: 'Siège enfant (0-3 ans)' }, priceNote: { en: '€5/day', fr: '5€/jour' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'Range Rover Vogue', fr: 'Range Rover Vogue' },
      brand: 'Land Rover',
      year: 2024,
      seats: 7,
      transmission: 'Automatic',
      color: 'Pearl White',
      priceDayNote: { en: '€250/day', fr: '250€/jour' },
      priceWithDriverNote: { en: '€350/day', fr: '350€/jour' },
      depositNote: { en: '€2,000 security deposit', fr: '2 000€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport meet & greet', fr: 'Accueil à l\'aéroport' } },
        { text: { en: 'Premium insurance', fr: 'Assurance premium' } },
        { text: { en: 'GPS navigation', fr: 'Navigation GPS' } },
      ],
      options: [
        { name: { en: 'Additional driver', fr: 'Conducteur additionnel' }, priceNote: { en: '€15/day', fr: '15€/jour' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'BMW 7 Series', fr: 'BMW Série 7' },
      brand: 'BMW',
      year: 2025,
      seats: 5,
      transmission: 'Automatic',
      color: 'Space Grey',
      priceDayNote: { en: '€220/day', fr: '220€/jour' },
      priceWithDriverNote: { en: '€320/day', fr: '320€/jour' },
      depositNote: { en: '€1,800 security deposit', fr: '1 800€ de dépôt de garantie' },
      included: [
        { text: { en: 'Professional driver available', fr: 'Chauffeur professionnel disponible' } },
        { text: { en: 'Full insurance coverage', fr: 'Couverture d\'assurance complète' } },
        { text: { en: 'Free airport pickup', fr: 'Prise en charge gratuite à l\'aéroport' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'Mercedes-Benz G-Class AMG', fr: 'Mercedes-Benz Classe G AMG' },
      brand: 'Mercedes-Benz',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Matte Black',
      priceDayNote: { en: '€350/day', fr: '350€/jour' },
      priceWithDriverNote: { en: '€450/day', fr: '450€/jour' },
      depositNote: { en: '€3,000 security deposit', fr: '3 000€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport VIP service', fr: 'Service VIP à l\'aéroport' } },
        { text: { en: 'Premium insurance', fr: 'Assurance premium' } },
        { text: { en: 'Chauffeur service available', fr: 'Service de chauffeur disponible' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'Audi Q7', fr: 'Audi Q7' },
      brand: 'Audi',
      year: 2024,
      seats: 7,
      transmission: 'Automatic',
      color: 'Glacier White',
      priceDayNote: { en: '€180/day', fr: '180€/jour' },
      priceWithDriverNote: { en: '€280/day', fr: '280€/jour' },
      depositNote: { en: '€1,500 security deposit', fr: '1 500€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport meet & greet', fr: 'Accueil à l\'aéroport' } },
        { text: { en: 'Comprehensive insurance', fr: 'Assurance tous risques' } },
        { text: { en: 'Free GPS', fr: 'GPS gratuit' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'Porsche Cayenne', fr: 'Porsche Cayenne' },
      brand: 'Porsche',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Volcano Grey',
      priceDayNote: { en: '€280/day', fr: '280€/jour' },
      priceWithDriverNote: { en: '€380/day', fr: '380€/jour' },
      depositNote: { en: '€2,500 security deposit', fr: '2 500€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport VIP transfer', fr: 'Transfert VIP aéroport' } },
        { text: { en: 'Full coverage insurance', fr: 'Assurance tout risque' } },
        { text: { en: 'Unlimited kilometers', fr: 'Kilomètres illimités' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'Range Rover Sport', fr: 'Range Rover Sport' },
      brand: 'Land Rover',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Byron Blue',
      priceDayNote: { en: '€220/day', fr: '220€/jour' },
      priceWithDriverNote: { en: '€320/day', fr: '320€/jour' },
      depositNote: { en: '€1,800 security deposit', fr: '1 800€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport pickup service', fr: 'Service de prise en charge à l\'aéroport' } },
        { text: { en: 'Premium insurance', fr: 'Assurance premium' } },
        { text: { en: 'English-speaking driver', fr: 'Chauffeur anglophone' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'BMW X7', fr: 'BMW X7' },
      brand: 'BMW',
      year: 2025,
      seats: 7,
      transmission: 'Automatic',
      color: 'Carbon Black',
      priceDayNote: { en: '€240/day', fr: '240€/jour' },
      priceWithDriverNote: { en: '€340/day', fr: '340€/jour' },
      depositNote: { en: '€2,000 security deposit', fr: '2 000€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport meet & greet', fr: 'Accueil à l\'aéroport' } },
        { text: { en: 'Full insurance', fr: 'Assurance complète' } },
        { text: { en: 'Wi-Fi included', fr: 'Wi-Fi inclus' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'Mercedes-Benz E-Class', fr: 'Mercedes-Benz Classe E' },
      brand: 'Mercedes-Benz',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Obsidian Black',
      priceDayNote: { en: '€150/day', fr: '150€/jour' },
      priceWithDriverNote: { en: '€250/day', fr: '250€/jour' },
      depositNote: { en: '€1,200 security deposit', fr: '1 200€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport transfer', fr: 'Transfert aéroport' } },
        { text: { en: 'Insurance included', fr: 'Assurance incluse' } },
        { text: { en: 'GPS navigation', fr: 'Navigation GPS' } },
      ],
      airportMeet: true,
      published: true,
    },
    {
      name: { en: 'Audi A8', fr: 'Audi A8' },
      brand: 'Audi',
      year: 2025,
      seats: 5,
      transmission: 'Automatic',
      color: 'Manhattan Grey',
      priceDayNote: { en: '€190/day', fr: '190€/jour' },
      priceWithDriverNote: { en: '€290/day', fr: '290€/jour' },
      depositNote: { en: '€1,600 security deposit', fr: '1 600€ de dépôt de garantie' },
      included: [
        { text: { en: 'Airport VIP meet & greet', fr: 'Accueil VIP à l\'aéroport' } },
        { text: { en: 'Premium insurance', fr: 'Assurance premium' } },
        { text: { en: 'Chauffeur service available', fr: 'Service de chauffeur disponible' } },
      ],
      airportMeet: true,
      published: true,
    },
  ];

  for (const carData of carsData) {
    try {
      const car = await payload.create({
        collection: 'cars',
        data: carData as any,
      });
      console.log(`✅ Created car: ${car.name}`);
    } catch (error) {
      console.error(`❌ Error creating car:`, error);
    }
  }

  // Seed Villas
  console.log('\n🏠 Seeding villas...');

  const villasData = [
    {
      name: { en: 'Villa Oasis Palmeraie', fr: 'Villa Oasis Palmeraie' },
      district: 'Palmeraie',
      bedrooms: 6,
      bathrooms: 6,
      guests: 12,
      pricePerNightNote: { en: '€1,200/night', fr: '1 200€/nuit' },
      minNights: 3,
      highlights: [
        { text: { en: 'Private heated pool', fr: 'Piscine privée chauffée' } },
        { text: { en: 'Traditional hammam', fr: 'Hammam traditionnel' } },
        { text: { en: 'Palm grove views', fr: 'Vue sur la palmeraie' } },
      ],
      amenities: [
        { text: { en: 'Full staff included', fr: 'Personnel complet inclus' } },
        { text: { en: 'Private chef available', fr: 'Chef privé disponible' } },
        { text: { en: 'Airport transfers', fr: 'Transferts aéroport' } },
        { text: { en: 'Daily housekeeping', fr: 'Ménage quotidien' } },
      ],
      conciergeIncluded: true,
      published: true,
    },
    {
      name: { en: 'Riad Luxury Hivernage', fr: 'Riad Luxe Hivernage' },
      district: 'Hivernage',
      bedrooms: 4,
      bathrooms: 4,
      guests: 8,
      pricePerNightNote: { en: '€850/night', fr: '850€/nuit' },
      minNights: 2,
      highlights: [
        { text: { en: 'Modern luxury design', fr: 'Design de luxe moderne' } },
        { text: { en: 'Rooftop terrace', fr: 'Terrasse sur le toit' } },
        { text: { en: 'Close to downtown', fr: 'Proche du centre-ville' } },
      ],
      amenities: [
        { text: { en: 'Heated swimming pool', fr: 'Piscine chauffée' } },
        { text: { en: 'Concierge service', fr: 'Service de conciergerie' } },
        { text: { en: 'Housekeeping', fr: 'Ménage' } },
        { text: { en: 'Wi-Fi & entertainment', fr: 'Wi-Fi et divertissement' } },
      ],
      conciergeIncluded: true,
      published: true,
    },
    {
      name: { en: 'Villa Serenity Agdal', fr: 'Villa Sérénité Agdal' },
      district: 'Agdal',
      bedrooms: 5,
      bathrooms: 5,
      guests: 10,
      pricePerNightNote: { en: '€950/night', fr: '950€/nuit' },
      minNights: 3,
      highlights: [
        { text: { en: 'Spacious gardens', fr: 'Jardins spacieux' } },
        { text: { en: 'Contemporary architecture', fr: 'Architecture contemporaine' } },
        { text: { en: 'Mountain views', fr: 'Vue sur les montagnes' } },
      ],
      amenities: [
        { text: { en: 'Large swimming pool', fr: 'Grande piscine' } },
        { text: { en: 'BBQ area', fr: 'Espace BBQ' } },
        { text: { en: 'Parking for 4 cars', fr: 'Parking pour 4 voitures' } },
        { text: { en: 'Full staff', fr: 'Personnel complet' } },
      ],
      conciergeIncluded: true,
      published: true,
    },
    {
      name: { en: 'Villa Majorelle Guéliz', fr: 'Villa Majorelle Guéliz' },
      district: 'Guéliz',
      bedrooms: 3,
      bathrooms: 3,
      guests: 6,
      pricePerNightNote: { en: '€650/night', fr: '650€/nuit' },
      minNights: 2,
      highlights: [
        { text: { en: 'Central location', fr: 'Emplacement central' } },
        { text: { en: 'Art deco style', fr: 'Style art déco' } },
        { text: { en: 'Walking distance to shops', fr: 'Commerces à pied' } },
      ],
      amenities: [
        { text: { en: 'Private plunge pool', fr: 'Petite piscine privée' } },
        { text: { en: 'Modern kitchen', fr: 'Cuisine moderne' } },
        { text: { en: 'Air conditioning', fr: 'Climatisation' } },
        { text: { en: 'Daily cleaning', fr: 'Nettoyage quotidien' } },
      ],
      conciergeIncluded: false,
      published: true,
    },
    {
      name: { en: 'Villa Atlas View', fr: 'Villa Vue Atlas' },
      district: 'Route de l\'Ourika',
      bedrooms: 8,
      bathrooms: 8,
      guests: 16,
      pricePerNightNote: { en: '€2,200/night', fr: '2 200€/nuit' },
      minNights: 4,
      highlights: [
        { text: { en: 'Stunning Atlas Mountain views', fr: 'Vue imprenable sur l\'Atlas' } },
        { text: { en: 'Infinity pool', fr: 'Piscine à débordement' } },
        { text: { en: 'Wine cellar', fr: 'Cave à vin' } },
      ],
      amenities: [
        { text: { en: 'Private chef included', fr: 'Chef privé inclus' } },
        { text: { en: 'Full concierge team', fr: 'Équipe de conciergerie complète' } },
        { text: { en: 'Spa & massage room', fr: 'Spa et salle de massage' } },
        { text: { en: 'Cinema room', fr: 'Salle de cinéma' } },
      ],
      conciergeIncluded: true,
      published: true,
    },
    {
      name: { en: 'Villa Golf Amelkis', fr: 'Villa Golf Amelkis' },
      district: 'Amelkis',
      bedrooms: 5,
      bathrooms: 5,
      guests: 10,
      pricePerNightNote: { en: '€1,100/night', fr: '1 100€/nuit' },
      minNights: 3,
      highlights: [
        { text: { en: 'On golf course', fr: 'Sur le terrain de golf' } },
        { text: { en: 'Golf cart included', fr: 'Voiturette de golf incluse' } },
        { text: { en: 'Club access', fr: 'Accès au club' } },
      ],
      amenities: [
        { text: { en: 'Heated pool', fr: 'Piscine chauffée' } },
        { text: { en: 'Tennis court', fr: 'Court de tennis' } },
        { text: { en: 'Gym', fr: 'Salle de sport' } },
        { text: { en: 'Butler service', fr: 'Service de majordome' } },
      ],
      conciergeIncluded: true,
      published: true,
    },
    {
      name: { en: 'Villa Prestige Al Maaden', fr: 'Villa Prestige Al Maaden' },
      district: 'Al Maaden',
      bedrooms: 7,
      bathrooms: 7,
      guests: 14,
      pricePerNightNote: { en: '€1,800/night', fr: '1 800€/nuit' },
      minNights: 4,
      highlights: [
        { text: { en: 'Exclusive gated community', fr: 'Communauté fermée exclusive' } },
        { text: { en: 'Lake views', fr: 'Vue sur le lac' } },
        { text: { en: 'Modern Moroccan design', fr: 'Design marocain moderne' } },
      ],
      amenities: [
        { text: { en: 'Large infinity pool', fr: 'Grande piscine à débordement' } },
        { text: { en: 'Golf course access', fr: 'Accès au terrain de golf' } },
        { text: { en: 'Full staff included', fr: 'Personnel complet inclus' } },
        { text: { en: 'Security 24/7', fr: 'Sécurité 24h/24' } },
      ],
      conciergeIncluded: true,
      published: true,
    },
    {
      name: { en: 'Riad Authentique Médina', fr: 'Riad Authentique Médina' },
      district: 'Médina',
      bedrooms: 4,
      bathrooms: 4,
      guests: 8,
      pricePerNightNote: { en: '€750/night', fr: '750€/nuit' },
      minNights: 2,
      highlights: [
        { text: { en: 'Traditional riad architecture', fr: 'Architecture de riad traditionnelle' } },
        { text: { en: 'Walking distance to souks', fr: 'Souks à pied' } },
        { text: { en: 'Rooftop with city views', fr: 'Toit-terrasse avec vue sur la ville' } },
      ],
      amenities: [
        { text: { en: 'Central courtyard pool', fr: 'Piscine dans la cour centrale' } },
        { text: { en: 'Traditional hammam', fr: 'Hammam traditionnel' } },
        { text: { en: 'Breakfast included', fr: 'Petit-déjeuner inclus' } },
        { text: { en: 'Staff on site', fr: 'Personnel sur place' } },
      ],
      conciergeIncluded: false,
      published: true,
    },
    {
      name: { en: 'Villa Paradise Palmeraie', fr: 'Villa Paradis Palmeraie' },
      district: 'Palmeraie',
      bedrooms: 10,
      bathrooms: 10,
      guests: 20,
      pricePerNightNote: { en: '€3,500/night', fr: '3 500€/nuit' },
      minNights: 5,
      highlights: [
        { text: { en: 'Luxury estate with multiple buildings', fr: 'Domaine de luxe avec plusieurs bâtiments' } },
        { text: { en: 'Event space for weddings', fr: 'Espace événementiel pour mariages' } },
        { text: { en: 'Helipad available', fr: 'Héliport disponible' } },
      ],
      amenities: [
        { text: { en: 'Multiple pools', fr: 'Piscines multiples' } },
        { text: { en: 'Full-time chef & staff', fr: 'Chef et personnel à temps plein' } },
        { text: { en: 'Spa facilities', fr: 'Installations de spa' } },
        { text: { en: 'Private stables', fr: 'Écuries privées' } },
      ],
      conciergeIncluded: true,
      published: true,
    },
    {
      name: { en: 'Villa Moderne Targa', fr: 'Villa Moderne Targa' },
      district: 'Hivernage',
      bedrooms: 4,
      bathrooms: 4,
      guests: 8,
      pricePerNightNote: { en: '€900/night', fr: '900€/nuit' },
      minNights: 2,
      highlights: [
        { text: { en: 'Ultra-modern design', fr: 'Design ultra-moderne' } },
        { text: { en: 'Smart home technology', fr: 'Technologie maison intelligente' } },
        { text: { en: 'Close to nightlife', fr: 'Proche de la vie nocturne' } },
      ],
      amenities: [
        { text: { en: 'Heated pool with jacuzzi', fr: 'Piscine chauffée avec jacuzzi' } },
        { text: { en: 'Home cinema', fr: 'Cinéma maison' } },
        { text: { en: 'Gym & sauna', fr: 'Salle de sport et sauna' } },
        { text: { en: 'Concierge service', fr: 'Service de conciergerie' } },
      ],
      conciergeIncluded: true,
      published: true,
    },
  ];

  for (const villaData of villasData) {
    try {
      const villa = await payload.create({
        collection: 'villas',
        data: villaData as any,
      });
      console.log(`✅ Created villa: ${villa.name}`);
    } catch (error) {
      console.error(`❌ Error creating villa:`, error);
    }
  }

  console.log('\n✨ Database seeding completed!');
  process.exit(0);
}

seedData().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
