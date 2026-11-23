
const hairHappensFacebook =
  'https://www.facebook.com/profile.php?id=100084426616409';

export const catherine = {
  name: 'Catherine Tumahole',
  role: 'Founder & Entrepreneur',
  location: 'Lesotho',
  portrait: '/images/catherine.jpeg',

  contact: {
    phone: '+26663616177',
    whatsapp: '',
    email: 'tumaholecathy@gmail.com',
  },
};

export const businesses = [
  {
    id: 'hair-happens',
    name: 'Hair Happens',
    category: 'MOBILE HAIR SALON',
    description:
      'Professional hair services brought to your doorstep. Beauty and convenience, wherever you are.',
    image: '/images/hair-happens.jpg',
    links: [
      {
        label: 'Instagram',
        url: 'https://www.instagram.com/hairhappensmobilehairsalon/',
      },
      {
        label: 'Facebook',
        url: hairHappensFacebook,
      },
    ],
  },
  {
    id: 'kate-collections',
    name: 'Kate Collections',
    category: 'FASHION & ACCESSORIES',
    description:
      'A growing collection of clothing, handbags and accessories for everyday style.',
    image: '/images/kate-collections.jpeg',
    socialNote:
      'Currently showcased on the Hair Happens Facebook page.',
    links: [
      {
        label: 'Discover on Facebook',
        url: hairHappensFacebook,
      },
    ],
  },
];
