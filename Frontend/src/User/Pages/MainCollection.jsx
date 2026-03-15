import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { ToastContext } from "../../Context/ToastContext";

export const products = [
  {
    id: 1.1,
    image: "/assets/Women/Roadtrip.png",
    name: "Roadtrip Oversized T-Shirt",
    price: 2499,
    category: "women",
    size: "M",
    available: true
  },
  {
    id: 1.2,
    image: "/assets/Women/Styles.png",
    name: "Styles Oversized T-Shirt",
    price: 1999,
    category: "women",
    size: "S",
    available: true
  },
  {
    id: 1.3,
    image: "/assets/Women/Signature.png",
    name: "Signature Oversized T-shirt",
    price: 3499,
    category: "women",
    size: "L",
    available: false
  },
  {
    id: 1.4,
    image: "/assets/Women/Ruffle-It-Up.png",
    name: "Ruffle-It-Up Oversized T-shirt",
    price: 4999,
    category: "women",
    size: "XL",
    available: true
  },
  {
    id: 1.5,
    image: "/assets/Women/GoodVibes.png",
    name: "Good Vibes Oversized T-shirt",
    price: 998,
    category: "women",
    size: "S",
    available: true
  },
  {
    id: 1.6,
    image: "/assets/Women/DirtyPotePink.png",
    name: "Dirty Pote Pink Oversized T-Shirt",
    price: 999,
    category: "women",
    size: "M",
    available: true
  },
  {
    id: 1.7,
    image: "/assets/Women/MoonChild.png",
    name: "Moon Child Oversized T-shirt",
    price: 899,
    category: "women",
    size: "L",
    available: true
  },
  {
    id: 1.8,
    image: "/assets/Women/StayWeird.png",
    name: "Style Weird Oversized T-shirt",
    price: 999,
    category: "women",
    size: "M",
    available: true
  },

  {
    id: 2.1,
    image: "/assets/Men/No-Mercy.png",
    name: "No-Mercy Oversized T-shirt",
    price: 2999,
    category: "men",
    size: "L",
    available: true
  },
  {
    id: 2.2,
    image: "/assets/Men/Cosmic.png",
    name: "Cosmic Oversized T-shirt",
    price: 2999,
    category: "men",
    size: "M",
    available: true
  },
  {
    id: 2.3,
    image: "/assets/Men/Yeezus.png",
    name: "Yeezus Oversized T-shirt",
    price: 2999,
    category: "men",
    size: "XL",
    available: true
  },
  {
    id: 2.4,
    image: "/assets/Men/Utopia.png",
    name: "Utopia Oversized T-shirt",
    price: 2999,
    category: "men",
    size: "L",
    available: true
  },
  {
    id: 2.5,
    image: "/assets/Men/Imagination.png",
    name: "Imagination Oversized T-shirt",
    price: 2999,
    category: "men",
    size: "M",
    available: true
  },
  {
    id: 2.6,
    image: "/assets/Men/LostIn.png",
    name: "Lost In Oversized T-shirt",
    price: 2999,
    category: "men",
    size: "L",
    available: true
  },
  {
    id: 2.7,
    image: "/assets/Men/ItsOkay.png",
    name: "Its Okay Oversized T-shirt",
    price: 2999,
    category: "men",
    size: "XL",
    available: true
  },
  {
    id: 2.8,
    image: "/assets/Men/InspirePosibilities.png",
    name: "Inspire Possibilities Oversized T-shirt",
    price: 2999,
    category: "men",
    size: "M",
    available: true
  },

  {
    id: 3.1,
    image: "/assets/Kids/OliveBreezeSet.png",
    name: "Olive Breeze Set",
    price: 998,
    category: "kids",
    size: "S",
    available: true
  },
  {
    id: 3.2,
    image: "/assets/Kids/MintGeoSet.png",
    name: "Mint Geo Printed Shirt Set",
    price: 999,
    category: "kids",
    size: "M",
    available: true
  },
  {
    id: 3.3,
    image: "/assets/Kids/ClassyBrownShirt.png",
    name: "Classy Brown Shirt",
    price: 899,
    category: "kids",
    size: "S",
    available: true
  },
  {
    id: 3.4,
    image: "/assets/Kids/PinkStriped.png",
    name: "Pink Striped Shirt",
    price: 999,
    category: "kids",
    size: "M",
    available: true
  },
  {
    id: 3.5,
    image: "/assets/Kids/TropicalPrintSet.png",
    name: "Tropical Print Set",
    price: 1699,
    category: "kids",
    size: "L",
    available: true
  },
  {
    id: 3.6,
    image: "/assets/Kids/PinkStreet.png",
    name: "Pink Street Set",
    price: 1499,
    category: "kids",
    size: "M",
    available: true
  },
  {
    id: 3.7,
    image: "/assets/Kids/FloralPrintSet.png",
    name: "Floral Print Set",
    price: 1599,
    category: "kids",
    size: "L",
    available: true
  },
  {
    id: 3.8,
    image: "/assets/Kids/BlossomSet.png",
    name: "Blossom Set",
    price: 999,
    category: "kids",
    size: "S",
    available: true
  }
];

const MainProducts = ({ selectedCategory = "all" }) => {

  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  const [sortOption, setSortOption] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  let filteredProducts = [...products];

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (selectedSize) {
    filteredProducts = filteredProducts.filter((p) => p.size === selectedSize);
  }

  if (priceRange === "below1000") {
    filteredProducts = filteredProducts.filter((p) => p.price < 1000);
  }

  if (priceRange === "1000to3000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 1000 && p.price <= 3000
    );
  }

  if (inStockOnly) {
    filteredProducts = filteredProducts.filter((p) => p.available);
  }

  if (sortOption === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8">

      <div className="flex justify-between items-center mb-8">

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="border px-4 py-2 text-sm rounded-md hover:bg-gray-100"
        >
          Filter
        </button>

        <div className="relative">

          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="border px-4 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            Sort By ▾
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow-lg z-20">

              <div
                onClick={() => {
                  setSortOption("lowToHigh");
                  setIsSortOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Price: Low to High
              </div>

              <div
                onClick={() => {
                  setSortOption("highToLow");
                  setIsSortOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Price: High to Low
              </div>

            </div>
          )}

        </div>

      </div>

      <div className="flex gap-8">

        {isFilterOpen && (
          <div className="w-72 border rounded-xl p-5 bg-white shadow-lg h-fit">

            <p className="text-xs text-gray-500 mb-2 uppercase">Size</p>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {["S","M","L","XL"].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? "" : size)
                  }
                  className={`h-9 text-sm border rounded-md ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mb-2 uppercase">Price</p>

            <div className="flex flex-col gap-2 mb-6">

              <button
                onClick={() =>
                  setPriceRange(priceRange === "below1000" ? "" : "below1000")
                }
                className={`border py-2 px-3 text-sm rounded-md text-left ${
                  priceRange === "below1000"
                    ? "bg-black text-white"
                    : "hover:border-black"
                }`}
              >
                Below ₹1000
              </button>

              <button
                onClick={() =>
                  setPriceRange(priceRange === "1000to3000" ? "" : "1000to3000")
                }
                className={`border py-2 px-3 text-sm rounded-md text-left ${
                  priceRange === "1000to3000"
                    ? "bg-black text-white"
                    : "hover:border-black"
                }`}
              >
                ₹1000 – ₹3000
              </button>

            </div>

            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`border w-full py-2 text-sm rounded-md mb-4 ${
                inStockOnly ? "bg-black text-white" : "hover:border-black"
              }`}
            >
              In Stock Only
            </button>

            {/* APPLY & CLOSE BUTTON */}

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              Apply & Close
            </button>

          </div>
        )}

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredProducts.map((p) => (

            <div
              key={p.id}
              className="group bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >

              <Link to={`/product/${p.id}`} state={{ product: p }}>

                <img
                  src={p.image}
                  className="w-full h-[360px] object-contain bg-white"
                  alt={p.name}
                />

              </Link>

              <div className="p-3 bg-slate-100">

                <h1 className="text-sm font-medium text-center h-10 overflow-hidden">
                  {p.name}
                </h1>

                <div className="flex justify-center items-center gap-4 mt-2">

                  <span className="font-semibold text-sm">
                    ₹{p.price}
                  </span>

                  <button
                    onClick={() => {
                      addToCart(p);
                      showToast("Added to Cart");
                    }}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white rounded-full"
                  >
                    🛒
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MainProducts;