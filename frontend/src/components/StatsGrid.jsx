const StatsGrid = ({ reviews, uniqueProducts, latestReviewDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Reviews</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{reviews.length}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Products</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{uniqueProducts}</p>
          </div>
          <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Latest Review</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
              {latestReviewDate}
            </p>
          </div>
          <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📅</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;