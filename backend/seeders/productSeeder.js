const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// change this to a valid user ID from your DB
const USER_ID = "69c718169fe485720f23a6b0";

const products = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    description: "Noise cancelling bluetooth headphones",
    price: 2999,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Smartphone Charger",
    category: "Electronics",
    description: "Fast charging USB-C adapter",
    price: 799,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Gaming Keyboard",
    category: "Electronics",
    description: "Mechanical RGB keyboard",
    price: 4599,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Denim Jacket",
    category: "Clothing",
    description: "Classic blue denim jacket",
    price: 2199,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Running Shoes",
    category: "Clothing",
    description: "Lightweight sports shoes",
    price: 3499,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Cotton T-Shirt",
    category: "Clothing",
    description: "Comfortable everyday wear",
    price: 699,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Office Chair",
    category: "Furniture",
    description: "Ergonomic office chair",
    price: 6999,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Wooden Dining Table",
    category: "Furniture",
    description: "6 seater dining table",
    price: 15999,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Sofa Set",
    category: "Furniture",
    description: "3+2 luxury sofa set",
    price: 25999,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Protein Powder",
    category: "Food & Beverages",
    description: "Whey protein supplement",
    price: 2499,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Energy Drink Pack",
    category: "Food & Beverages",
    description: "Pack of 6 energy drinks",
    price: 899,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Organic Honey",
    category: "Food & Beverages",
    description: "Natural forest honey",
    price: 499,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Brake Pads",
    category: "Automotive",
    description: "High durability brake pads",
    price: 1799,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Car Engine Oil",
    category: "Automotive",
    description: "5W-40 synthetic oil",
    price: 1299,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Motorcycle Helmet",
    category: "Automotive",
    description: "ISI certified helmet",
    price: 2499,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Antibiotic Tablets",
    category: "Pharmaceuticals",
    description: "Broad spectrum antibiotic",
    price: 199,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Vitamin C Capsules",
    category: "Pharmaceuticals",
    description: "Boost immunity supplement",
    price: 299,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Pain Relief Spray",
    category: "Pharmaceuticals",
    description: "Fast acting pain relief",
    price: 349,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Steel Sheets",
    category: "Raw Materials",
    description: "Industrial steel sheets",
    price: 4999,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Copper Wire Bundle",
    category: "Raw Materials",
    description: "High conductivity copper",
    price: 3599,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Plastic Granules",
    category: "Raw Materials",
    description: "Industrial plastic raw material",
    price: 2799,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Hydraulic Press Machine",
    category: "Machinery",
    description: "Industrial press machine",
    price: 125000,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "CNC Cutting Machine",
    category: "Machinery",
    description: "High precision cutting machine",
    price: 350000,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Packaging Tape Roll",
    category: "Packaging",
    description: "Heavy duty packaging tape",
    price: 120,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Corrugated Boxes",
    category: "Packaging",
    description: "Shipping boxes pack",
    price: 899,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Bubble Wrap Roll",
    category: "Packaging",
    description: "Protective packaging wrap",
    price: 599,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Logistics Tracking Device",
    category: "Electronics",
    description: "GPS tracker for shipments",
    price: 5499,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Warehouse Barcode Scanner",
    category: "Electronics",
    description: "Fast scanning inventory device",
    price: 3299,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Heavy Duty Pallet",
    category: "Other",
    description: "Wooden logistics pallet",
    price: 1299,
    imageUrl: "",
    createdBy: USER_ID,
  },
  {
    name: "Cargo Safety Straps",
    category: "Other",
    description: "Industrial cargo securing straps",
    price: 699,
    imageUrl: "",
    createdBy: USER_ID,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("30 Products inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();