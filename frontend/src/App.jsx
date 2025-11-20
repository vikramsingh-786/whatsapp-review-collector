import { useState, useEffect } from "react";
import StatsGrid from "./components/StatsGrid";
import FilterBar from "./components/FilterBar";
import ReviewList from "./components/ReviewList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProduct, setFilterProduct] = useState("all");

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/reviews`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uniqueProducts = [
    "all",
    ...new Set(reviews.map((r) => r.product_name)),
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product_review.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterProduct === "all" || review.product_name === filterProduct;
    return matchesSearch && matchesFilter;
  });

  const latestReviewDate =
    reviews.length > 0
      ? new Date(reviews[0].created_at).toLocaleDateString()
      : "N/A";

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-emerald-600 dark:text-emerald-400 text-xl font-semibold">
          Loading reviews...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12 relative">
          <div className="absolute right-0 top-0 z-10">
            <ThemeToggle />
          </div>

          <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-3 transition-colors">
            Product Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors">
            Collected via WhatsApp
          </p>
        </div>

        <StatsGrid 
          reviews={reviews} 
          uniqueProducts={uniqueProducts.length - 1} 
          latestReviewDate={latestReviewDate} 
        />

        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          filterProduct={filterProduct} 
          setFilterProduct={setFilterProduct}
          uniqueProducts={uniqueProducts} 
          onRefresh={fetchReviews}
        />

        <ReviewList reviews={filteredReviews} />
      </div>
    </div>
    </div>
  );
}

export default App;
