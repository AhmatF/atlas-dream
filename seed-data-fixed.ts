import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload/payload.config';

async function seedData() {
  console.log('🔌 Connecting to database...');
  const payload = await getPayload({ config });

  console.log('🌱 Starting database seeding...');

  // Seed Cars (in English first, then update with French)
  console.log('\n🚗 Seeding cars...');

  const carsData = [
    {
      name: 'Mercedes-Benz S-Class',
      brand: 'Mercedes-Benz',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Black',
      priceDayNote: '€200/day',
      priceWithDriverNote: '€300/day',
      depositNote: '€1,500 security deposit',
      included: [
        { text: 'Airport meet & greet' },
        { text: 'Comprehensive insurance' },
        { text: 'Unlimited mileage' },
      ],
      options: [
        { name: 'Wi-Fi hotspot', priceNote: '€10/day' },
        { name: 'Child seat (0-3 years)', priceNote: '€5/day' },
      ],
      airportMeet: true,
      published: true,
      slug: 'mercedes-benz-s-class',
    },
    {
      name: 'Range Rover Vogue',
      brand: 'Land Rover',
      year: 2024,
      seats: 7,
      transmission: 'Automatic',
      color: 'Pearl White',
      priceDayNote: '€250/day',
      priceWithDriverNote: '€350/day',
      depositNote: '€2,000 security deposit',
      included: [
        { text: 'Airport meet & greet' },
        { text: 'Premium insurance' },
        { text: 'GPS navigation' },
      ],
      options: [
        { name: 'Additional driver', priceNote: '€15/day' },
      ],
      airportMeet: true,
      published: true,
      slug: 'range-rover-vogue',
    },
    {
      name: 'BMW 7 Series',
      brand: 'BMW',
      year: 2025,
      seats: 5,
      transmission: 'Automatic',
      color: 'Space Grey',
      priceDayNote: '€220/day',
      priceWithDriverNote: '€320/day',
      depositNote: '€1,800 security deposit',
      included: [
        { text: 'Professional driver available' },
        { text: 'Full insurance coverage' },
        { text: 'Free airport pickup' },
      ],
      airportMeet: true,
      published: true,
      slug: 'bmw-7-series',
    },
    {
      name: 'Mercedes-Benz G-Class AMG',
      brand: 'Mercedes-Benz',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Matte Black',
      priceDayNote: '€350/day',
      priceWithDriverNote: '€450/day',
      depositNote: '€3,000 security deposit',
      included: [
        { text: 'Airport VIP service' },
        { text: 'Premium insurance' },
        { text: 'Chauffeur service available' },
      ],
      airportMeet: true,
      published: true,
      slug: 'mercedes-benz-g-class-amg',
    },
    {
      name: 'Audi Q7',
      brand: 'Audi',
      year: 2024,
      seats: 7,
      transmission: 'Automatic',
      color: 'Glacier White',
      priceDayNote: '€180/day',
      priceWithDriverNote: '€280/day',
      depositNote: '€1,500 security deposit',
      included: [
        { text: 'Airport meet & greet' },
        { text: 'Comprehensive insurance' },
        { text: 'Free GPS' },
      ],
      airportMeet: true,
      published: true,
      slug: 'audi-q7',
    },
    {
      name: 'Porsche Cayenne',
      brand: 'Porsche',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Volcano Grey',
      priceDayNote: '€280/day',
      priceWithDriverNote: '€380/day',
      depositNote: '€2,500 security deposit',
      included: [
        { text: 'Airport VIP transfer' },
        { text: 'Full coverage insurance' },
        { text: 'Unlimited kilometers' },
      ],
      airportMeet: true,
      published: true,
      slug: 'porsche-cayenne',
    },
    {
      name: 'Range Rover Sport',
      brand: 'Land Rover',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Byron Blue',
      priceDayNote: '€220/day',
      priceWithDriverNote: '€320/day',
      depositNote: '€1,800 security deposit',
      included: [
        { text: 'Airport pickup service' },
        { text: 'Premium insurance' },
        { text: 'English-speaking driver' },
      ],
      airportMeet: true,
      published: true,
      slug: 'range-rover-sport',
    },
    {
      name: 'BMW X7',
      brand: 'BMW',
      year: 2025,
      seats: 7,
      transmission: 'Automatic',
      color: 'Carbon Black',
      priceDayNote: '€240/day',
      priceWithDriverNote: '€340/day',
      depositNote: '€2,000 security deposit',
      included: [
        { text: 'Airport meet & greet' },
        { text: 'Full insurance' },
        { text: 'Wi-Fi included' },
      ],
      airportMeet: true,
      published: true,
      slug: 'bmw-x7',
    },
    {
      name: 'Mercedes-Benz E-Class',
      brand: 'Mercedes-Benz',
      year: 2024,
      seats: 5,
      transmission: 'Automatic',
      color: 'Obsidian Black',
      priceDayNote: '€150/day',
      priceWithDriverNote: '€250/day',
      depositNote: '€1,200 security deposit',
      included: [
        { text: 'Airport transfer' },
        { text: 'Insurance included' },
        { text: 'GPS navigation' },
      ],
      airportMeet: true,
      published: true,
      slug: 'mercedes-benz-e-class',
    },
    {
      name: 'Audi A8',
      brand: 'Audi',
      year: 2025,
      seats: 5,
      transmission: 'Automatic',
      color: 'Manhattan Grey',
      priceDayNote: '€190/day',
      priceWithDriverNote: '€290/day',
      depositNote: '€1,600 security deposit',
      included: [
        { text: 'Airport VIP meet & greet' },
        { text: 'Premium insurance' },
        { text: 'Chauffeur service available' },
      ],
      airportMeet: true,
      published: true,
      slug: 'audi-a8',
    },
  ];

  for (const carData of carsData) {
    try {
      const car = await payload.create({
        collection: 'cars',
        data: carData,
        locale: 'en',
      });
      console.log(`✅ Created car: ${car.name} (EN)`);

      // Now update with French translation
      await payload.update({
        collection: 'cars',
        id: car.id,
        data: {
          name: carData.name.replace('Series', 'Série').replace('Class', 'Classe'),
        },
        locale: 'fr',
      });
      console.log(`   ✅ Added French translation for: ${car.name}`);
    } catch (error: any) {
      console.error(`❌ Error creating car ${carData.name}:`, error.message);
    }
  }

  // Seed Villas
  console.log('\n🏠 Seeding villas...');

  const villasData = [
    {
      name: 'Villa Oasis Palmeraie',
      district: 'Palmeraie',
      bedrooms: 6,
      bathrooms: 6,
      guests: 12,
      pricePerNightNote: '€1,200/night',
      minNights: 3,
      highlights: [
        { text: 'Private heated pool' },
        { text: 'Traditional hammam' },
        { text: 'Palm grove views' },
      ],
      amenities: [
        { text: 'Full staff included' },
        { text: 'Private chef available' },
        { text: 'Airport transfers' },
        { text: 'Daily housekeeping' },
      ],
      conciergeIncluded: true,
      published: true,
      slug: 'villa-oasis-palmeraie',
    },
    {
      name: 'Riad Luxury Hivernage',
      district: 'Hivernage',
      bedrooms: 4,
      bathrooms: 4,
      guests: 8,
      pricePerNightNote: '€850/night',
      minNights: 2,
      highlights: [
        { text: 'Modern luxury design' },
        { text: 'Rooftop terrace' },
        { text: 'Close to downtown' },
      ],
      amenities: [
        { text: 'Heated swimming pool' },
        { text: 'Concierge service' },
        { text: 'Housekeeping' },
        { text: 'Wi-Fi & entertainment' },
      ],
      conciergeIncluded: true,
      published: true,
      slug: 'riad-luxury-hivernage',
    },
    {
      name: 'Villa Serenity Agdal',
      district: 'Agdal',
      bedrooms: 5,
      bathrooms: 5,
      guests: 10,
      pricePerNightNote: '€950/night',
      minNights: 3,
      highlights: [
        { text: 'Spacious gardens' },
        { text: 'Contemporary architecture' },
        { text: 'Mountain views' },
      ],
      amenities: [
        { text: 'Large swimming pool' },
        { text: 'BBQ area' },
        { text: 'Parking for 4 cars' },
        { text: 'Full staff' },
      ],
      conciergeIncluded: true,
      published: true,
      slug: 'villa-serenity-agdal',
    },
    {
      name: 'Villa Majorelle Guéliz',
      district: 'Guéliz',
      bedrooms: 3,
      bathrooms: 3,
      guests: 6,
      pricePerNightNote: '€650/night',
      minNights: 2,
      highlights: [
        { text: 'Central location' },
        { text: 'Art deco style' },
        { text: 'Walking distance to shops' },
      ],
      amenities: [
        { text: 'Private plunge pool' },
        { text: 'Modern kitchen' },
        { text: 'Air conditioning' },
        { text: 'Daily cleaning' },
      ],
      conciergeIncluded: false,
      published: true,
      slug: 'villa-majorelle-gueliz',
    },
    {
      name: 'Villa Atlas View',
      district: 'Route de l\'Ourika',
      bedrooms: 8,
      bathrooms: 8,
      guests: 16,
      pricePerNightNote: '€2,200/night',
      minNights: 4,
      highlights: [
        { text: 'Stunning Atlas Mountain views' },
        { text: 'Infinity pool' },
        { text: 'Wine cellar' },
      ],
      amenities: [
        { text: 'Private chef included' },
        { text: 'Full concierge team' },
        { text: 'Spa & massage room' },
        { text: 'Cinema room' },
      ],
      conciergeIncluded: true,
      published: true,
      slug: 'villa-atlas-view',
    },
    {
      name: 'Villa Golf Amelkis',
      district: 'Amelkis',
      bedrooms: 5,
      bathrooms: 5,
      guests: 10,
      pricePerNightNote: '€1,100/night',
      minNights: 3,
      highlights: [
        { text: 'On golf course' },
        { text: 'Golf cart included' },
        { text: 'Club access' },
      ],
      amenities: [
        { text: 'Heated pool' },
        { text: 'Tennis court' },
        { text: 'Gym' },
        { text: 'Butler service' },
      ],
      conciergeIncluded: true,
      published: true,
      slug: 'villa-golf-amelkis',
    },
    {
      name: 'Villa Prestige Al Maaden',
      district: 'Al Maaden',
      bedrooms: 7,
      bathrooms: 7,
      guests: 14,
      pricePerNightNote: '€1,800/night',
      minNights: 4,
      highlights: [
        { text: 'Exclusive gated community' },
        { text: 'Lake views' },
        { text: 'Modern Moroccan design' },
      ],
      amenities: [
        { text: 'Large infinity pool' },
        { text: 'Golf course access' },
        { text: 'Full staff included' },
        { text: 'Security 24/7' },
      ],
      conciergeIncluded: true,
      published: true,
      slug: 'villa-prestige-al-maaden',
    },
    {
      name: 'Riad Authentique Médina',
      district: 'Médina',
      bedrooms: 4,
      bathrooms: 4,
      guests: 8,
      pricePerNightNote: '€750/night',
      minNights: 2,
      highlights: [
        { text: 'Traditional riad architecture' },
        { text: 'Walking distance to souks' },
        { text: 'Rooftop with city views' },
      ],
      amenities: [
        { text: 'Central courtyard pool' },
        { text: 'Traditional hammam' },
        { text: 'Breakfast included' },
        { text: 'Staff on site' },
      ],
      conciergeIncluded: false,
      published: true,
      slug: 'riad-authentique-medina',
    },
    {
      name: 'Villa Paradise Palmeraie',
      district: 'Palmeraie',
      bedrooms: 10,
      bathrooms: 10,
      guests: 20,
      pricePerNightNote: '€3,500/night',
      minNights: 5,
      highlights: [
        { text: 'Luxury estate with multiple buildings' },
        { text: 'Event space for weddings' },
        { text: 'Helipad available' },
      ],
      amenities: [
        { text: 'Multiple pools' },
        { text: 'Full-time chef & staff' },
        { text: 'Spa facilities' },
        { text: 'Private stables' },
      ],
      conciergeIncluded: true,
      published: true,
      slug: 'villa-paradise-palmeraie',
    },
    {
      name: 'Villa Moderne Hivernage',
      district: 'Hivernage',
      bedrooms: 4,
      bathrooms: 4,
      guests: 8,
      pricePerNightNote: '€900/night',
      minNights: 2,
      highlights: [
        { text: 'Ultra-modern design' },
        { text: 'Smart home technology' },
        { text: 'Close to nightlife' },
      ],
      amenities: [
        { text: 'Heated pool with jacuzzi' },
        { text: 'Home cinema' },
        { text: 'Gym & sauna' },
        { text: 'Concierge service' },
      ],
      conciergeIncluded: true,
      published: true,
      slug: 'villa-moderne-hivernage',
    },
  ];

  for (const villaData of villasData) {
    try {
      const villa = await payload.create({
        collection: 'villas',
        data: villaData,
        locale: 'en',
      });
      console.log(`✅ Created villa: ${villa.name} (EN)`);

      // French translations (same names work for villas)
      await payload.update({
        collection: 'villas',
        id: villa.id,
        data: {
          name: villaData.name
            .replace('Villa', 'Villa')
            .replace('Riad Luxury', 'Riad Luxe')
            .replace('Serenity', 'Sérénité')
            .replace('View', 'Vue')
            .replace('Golf', 'Golf')
            .replace('Prestige', 'Prestige')
            .replace('Moderne', 'Moderne')
            .replace('Paradise', 'Paradis'),
        },
        locale: 'fr',
      });
      console.log(`   ✅ Added French translation for: ${villa.name}`);
    } catch (error: any) {
      console.error(`❌ Error creating villa ${villaData.name}:`, error.message);
    }
  }

  console.log('\n✨ Database seeding completed!');
  console.log(`📊 Total: ${carsData.length} cars and ${villasData.length} villas created`);
  process.exit(0);
}

seedData().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
