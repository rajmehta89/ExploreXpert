// slides.js

import image from '../Assets/buddha1.jpeg';
import image1 from '../Assets/Broken_beach.jpeg';
import image2 from '../Assets/eiffel.jpeg';

import image3 from '../Assets/thailand.jpeg'
import image4 from '../Assets/bali3.jpeg'
import image5 from '../Assets/france.jpeg'
import image6 from '../Assets/indo.jpeg'
import background from '../Assets/image.jpeg';

const slides = [
    {
        country: 'INDONESIA',
        description: 'Indonesia beckons travelers with its diverse landscapes, vibrant cultures, and unparalleled natural beauty\nExplore ancient temples in Bali, trek through lush rainforests in Borneo, or unwind on pristine beaches in Lombok. Discover the warmth and hospitality of the Indonesian people as you embark on a journey of adventure and exploration across this breathtaking archipelago.',
        highlightDescription: 'Buddha temple, Thailand',
        image: image,
        background: background
    },
    {
        country: 'THAILAND',
        description: 'Thailand captivates visitors with its exotic allure, bustling cities, and serene tropical landscapes. Experience the vibrant street life of Bangkok, marvel at the ancient temples of Ayutthaya, and indulge in world-class cuisine in Chiang Mai. Whether you\'re seeking adventure in the lush jungles of the north or relaxation on the idyllic islands of the south, Thailand offers a kaleidoscope of experiences waiting to be discovered.',
        highlightDescription: 'Broken Beach, Bali',
        image: image1,
        background: image3
    },
    {
        country: 'BALI',
        description: 'Bali, known as the "Island of the Gods," enchants travelers with its mystical charm, pristine beaches, and rich cultural heritage. Immerse yourself in the spiritual ambiance of Ubud, explore ancient temples such as Tanah Lot and Uluwatu, and experience the vibrant nightlife of Seminyak. Whether you\'re seeking tranquility in lush rice terraces or adventure in cascading waterfalls, Bali offers a tropical paradise where every moment is a feast for the senses.',
        highlightDescription: 'Eiffel Tower, Paris',
        image: image2,
        background: image4
    },
    {
        country: 'FRANCE',
        description: 'France, with its romantic allure and cultural richness, invites travelers to explore the enchanting streets of Paris, savor gourmet cuisine in Provence, and immerse themselves in the history of Normandy\'s coastal landscapes. Experience the essence of French elegance and charm in every corner of this captivating country.',
        highlightDescription: 'Mount Bromo, Indonesia',
        image: image6,
        background: image5
    }
];

export default slides;
