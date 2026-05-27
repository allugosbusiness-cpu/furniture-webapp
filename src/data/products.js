export const products = [
  {
    id: "1",
    name: "Headboard White",
    category: "Beds",
    description: "A beautiful white headboard that adds a touch of elegance to any bedroom. Perfectly crafted to complement modern and classic interiors alike.",
    features: ["Premium white finish", "Durable construction", "Easy to clean", "Fits standard bed frames", "Modern elegant design"],
    price: 70,
    comparePrice: 90,
    images: [
      "/headboard-white.jpeg",
      "/product-more-1.jpeg"
    ],
    inStock: true,
    negotiable: true
  },
  {
    id: "2",
    name: "Headboard Single",
    category: "Beds",
    description: "A stylish single headboard designed for smaller beds and spaces. Compact yet elegant, it brings a refined look to any bedroom.",
    features: ["Single bed size", "Sturdy build quality", "Easy wall mounting", "Smooth finish", "Affordable elegance"],
    price: 80,
    comparePrice: 100,
    images: [
      "/headboard-single.jpeg",
      "/product-more-2.jpeg"
    ],
    inStock: true,
    negotiable: true
  },
  {
    id: "3",
    name: "Wardrobe White",
    category: "Storage",
    description: "A spacious white wardrobe offering ample storage for all your clothing. With a clean minimalist design, it fits perfectly in any bedroom.",
    features: ["Spacious interior", "White gloss finish", "Multiple shelves", "Hanging rail included", "Modern design"],
    price: 230,
    comparePrice: 280,
    images: [
      "/wadrobe-white.png",
      "/wadrobe4.png"
    ],
    inStock: true,
    negotiable: true
  },
  {
    id: "4",
    name: "Black Sofa",
    category: "Seating",
    description: "A sleek black sofa that combines comfort with contemporary style. Perfect for lounging, entertaining guests, or adding a modern touch to your living room.",
    features: ["Premium black upholstery", "Comfortable cushioning", "Sturdy frame", "Easy to maintain", "Contemporary design"],
    price: 200,
    comparePrice: 250,
    images: [
      "/sofa (2).jpeg",
      "/product-more-3.jpeg"
    ],
    inStock: true,
    negotiable: true
  },
  {
    id: "5",
    name: "Kitchen Unit",
    category: "Storage",
    description: "A functional and stylish kitchen unit designed to maximize your kitchen storage. Keeps your cooking essentials organized and within easy reach.",
    features: ["Ample storage space", "Durable materials", "Easy to assemble", "Smooth sliding drawers", "Space-saving design"],
    price: 170,
    comparePrice: 210,
    images: [
      "/kitchen-unit-1.png",
      "/product-more-1.jpeg"
    ],
    inStock: true,
    negotiable: true
  },
  {
    id: "6",
    name: "Bedside Cabinet",
    category: "Storage",
    description: "A charming bedside cabinet crafted from quality wood with a smooth finish. Compact yet spacious enough for all your bedside essentials.",
    features: ["Quality wood construction", "Smooth finish", "Drawer storage", "Compact design", "Perfect for bedside use"],
    price: 110,
    comparePrice: 140,
    images: [
      "/bedside%20cabinet.png",
      "/product-more-2.jpeg"
    ],
    inStock: true,
    negotiable: true
  }
];

export const categories = ["All", "Tables", "Seating", "Storage", "Beds", "Decor"];

export function getProduct(id) {
  return products.find(p => p.id === id);
}

export function getFilteredProducts(category) {
  if (!category || category === "All") return products;
  return products.filter(p => p.category === category);
}