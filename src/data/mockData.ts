import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'DeWalt 20V MAX Cordless Drill/Driver Kit',
    price: 1299.99,
    category: 'drills',
    subCategory: 'cordless',
    brand: 'DeWalt',
    imageUrl: 'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4491899/pexels-photo-4491899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.7,
    reviewCount: 348,
    inStock: true,
    stockCount: 42,
    description: 'The DeWalt 20V MAX Cordless Drill/Driver Kit is compact and lightweight, perfect for working in tight spaces. It features a high-performance motor that delivers 300 unit watts out (UWO) of power, 2-speed transmission, and a 1/2-inch ratcheting chuck.',
    powerType: 'cordless',
    voltage: '20V',
    features: [
      'Compact, lightweight design fits into tight areas',
      'High-performance motor delivers 300 unit watts out (UWO) of power',
      '2-speed transmission (0-450 & 1,500 rpm)',
      '1/2-inch ratcheting chuck',
      'Ergonomic handle delivers comfort and control'
    ],
    specifications: {
      'Battery Type': 'Lithium Ion',
      'Voltage': '20V',
      'Chuck Size': '1/2 inch',
      'Speed': '0-450 & 0-1,500 RPM',
      'Weight': '3.64 lbs',
      'Dimensions': '9.2 x 3.6 x 8.5 inches',
      'Warranty': '3 Years Limited'
    }
  },
  {
    id: '2',
    name: 'Milwaukee M18 FUEL 18V Cordless Hammer Drill',
    price: 1899.99,
    category: 'drills',
    subCategory: 'hammer',
    brand: 'Milwaukee',
    imageUrl: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.9,
    reviewCount: 212,
    inStock: true,
    stockCount: 18,
    description: 'The Milwaukee M18 FUEL 18V Lithium-Ion Brushless Cordless Hammer Drill delivers more power, runtime, and durability than its competitors. It features POWERSTATE brushless motor for longer motor life and more power, REDLINK PLUS Intelligence, and a REDLITHIUM XC5.0 Battery Pack.',
    powerType: 'cordless',
    voltage: '18V',
    features: [
      'POWERSTATE Brushless Motor: Delivers up to 60% more power',
      'REDLINK PLUS Intelligence: Advanced system overload protection',
      'REDLITHIUM XC5.0 Battery Pack: Delivers up to 2.5x more runtime',
      'All-metal ratcheting chuck for maximum bit grip',
      '2-speed gearbox for versatile drilling in a variety of materials'
    ],
    specifications: {
      'Battery Type': 'Lithium Ion',
      'Voltage': '18V',
      'Chuck Size': '1/2 inch',
      'Speed': '0-550 & 0-2,000 RPM',
      'Torque': '1,200 in-lbs',
      'Weight': '4.8 lbs',
      'Dimensions': '7.75 x 3.75 x 9.9 inches',
      'Warranty': '5 Years Limited'
    }
  },
  {
    id: '3',
    name: 'Bosch GKS 190 Professional Circular Saw',
    price: 1499.99,
    category: 'saws',
    subCategory: 'circular',
    brand: 'Bosch',
    imageUrl: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4246094/pexels-photo-4246094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    stockCount: 25,
    description: 'The Bosch GKS 190 Professional Circular Saw is a powerful and precise tool for cutting wood and other materials. It features a 1400-watt motor for optimal cutting performance, a cutting depth of up to 67 mm, and an adjustable bevel angle of up to 56°.',
    powerType: 'corded',
    voltage: '110V',
    features: [
      '1400-watt motor for optimal cutting performance',
      'Cutting depth of up to 67 mm',
      'Adjustable bevel angle of up to 56°',
      'Robust aluminum base plate for stability and precision',
      'Dust extraction port for a cleaner workspace'
    ],
    specifications: {
      'Power Input': '1400 Watts',
      'No-load Speed': '5500 RPM',
      'Blade Diameter': '190 mm',
      'Cutting Depth': '67 mm at 90°, 48 mm at 45°',
      'Bevel Angle': '0° - 56°',
      'Weight': '4.2 kg',
      'Cable Length': '2.5 m',
      'Warranty': '2 Years Professional'
    }
  },
  {
    id: '4',
    name: 'Makita BO5041 5" Random Orbit Sander',
    price: 899.99,
    category: 'sanders',
    subCategory: 'orbital',
    brand: 'Makita',
    imageUrl: 'https://images.pexels.com/photos/2977304/pexels-photo-2977304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/2977304/pexels-photo-2977304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4116230/pexels-photo-4116230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 31,
    description: 'The Makita BO5041 5" Random Orbit Sander with variable speed control dial (4,000-12,000 OPM) enables the user to match the sanding speed to the application. It features a powerful 3.0 AMP motor for fast and smooth sanding and a large 1/8" random orbit action for fast sanding and swirl-free finish.',
    powerType: 'corded',
    voltage: '110V',
    features: [
      'Variable speed control dial (4,000-12,000 OPM)',
      'Powerful 3.0 AMP motor for fast and smooth sanding',
      'Large 1/8" random orbit action for fast sanding and swirl-free finish',
      'Ergonomic rubberized palm grip and handle for improved operator comfort and control',
      'Pad control system for controlled pad speed on start-up'
    ],
    specifications: {
      'Power Input': '3.0 AMP',
      'Orbits Per Minute': '4,000 - 12,000 OPM',
      'Orbit Diameter': '1/8"',
      'Pad Size': '5"',
      'Weight': '2.9 lbs',
      'Cord Length': '8.2 ft',
      'Warranty': '1 Year Limited'
    }
  },
  {
    id: '5',
    name: 'DeWalt 20V MAX Lithium-Ion Battery Pack',
    price: 499.99,
    category: 'accessories',
    subCategory: 'batteries',
    brand: 'DeWalt',
    imageUrl: 'https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5825363/pexels-photo-5825363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.8,
    reviewCount: 421,
    inStock: true,
    stockCount: 150,
    description: 'The DeWalt 20V MAX Lithium-Ion Battery Pack delivers longer runtime and enhanced performance. It features a 3-LED fuel gauge system that allows immediate feedback on state of charge, no memory, and virtually no self-discharge for maximum productivity and less downtime.',
    powerType: 'battery',
    voltage: '20V',
    features: [
      '3-LED fuel gauge system allows immediate feedback on state of charge',
      'No memory and virtually no self-discharge for maximum productivity and less downtime',
      'Lightweight design (1.5 lbs) for less user fatigue',
      'Compatible with all DeWalt 20V MAX tools',
      'Provides up to 33% more capacity than standard packs'
    ],
    specifications: {
      'Battery Type': 'Lithium Ion',
      'Voltage': '20V',
      'Amp Hours': '5.0 Ah',
      'Weight': '1.5 lbs',
      'Dimensions': '4.5 x 3 x 2.5 inches',
      'Warranty': '3 Years Limited'
    }
  },
  {
    id: '6',
    name: 'Bosch 34-Piece Drill and Drive Set',
    price: 199.99,
    category: 'accessories',
    subCategory: 'bits',
    brand: 'Bosch',
    imageUrl: 'https://images.pexels.com/photos/6105317/pexels-photo-6105317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/6105317/pexels-photo-6105317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/220639/pexels-photo-220639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.4,
    reviewCount: 76,
    inStock: true,
    stockCount: 200,
    description: 'The Bosch 34-Piece Drill and Drive Set includes a comprehensive range of high-quality accessories for drilling and driving in a variety of materials. It features titanium-coated drill bits for longer life, tough screwdriving bits for precision fit, and a compact case for easy organization and storage.',
    features: [
      'Titanium-coated drill bits for longer life',
      'Tough screwdriving bits for precision fit',
      'Compact case for easy organization and storage',
      'Includes: 14 HSS drill bits, 18 screwdriver bits, 1 bit holder, 1 countersink',
      'Compatible with all major power tool brands'
    ],
    specifications: {
      'Number of Pieces': '34',
      'Bit Material': 'High-Speed Steel with Titanium Coating',
      'Case Material': 'Impact-Resistant Plastic',
      'Dimensions': '8.5 x 4.5 x 1.5 inches',
      'Weight': '1.1 lbs',
      'Warranty': '1 Year Limited'
    }
  }
];

export const categories = [
  { id: 'drills', name: 'Drills', icon: 'Drill' },
  { id: 'saws', name: 'Saws', icon: 'Scissors' },
  { id: 'sanders', name: 'Sanders & Grinders', icon: 'CircleDot' },
  { id: 'accessories', name: 'Accessories', icon: 'Wrench' },
  { id: 'brands', name: 'Shop By Brand', icon: 'Tags' },
  { id: 'deals', name: 'Deals', icon: 'Percent' },
];

export const brands = [
  { id: 'dewalt', name: 'DeWalt', logoUrl: 'dewalt.png' },
  { id: 'milwaukee', name: 'Milwaukee', logoUrl: 'milwaukee.png' },
  { id: 'bosch', name: 'Bosch', logoUrl: 'bosch.png' },
  { id: 'makita', name: 'Makita', logoUrl: 'makita.png' },
  { id: 'ryobi', name: 'Ryobi', logoUrl: 'ryobi.png' },
  { id: 'hitachi', name: 'Hitachi', logoUrl: 'hitachi.png' },
];

export const mockUser = {
  id: 'user123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  company: 'Acme Construction Ltd.'
};