const ReviewList = ({ reviews }) => {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No reviews found</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((review, index) => (
        <div
          key={review.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {review.product_name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{review.user_name}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {review.user_name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-700/50 rounded-xl p-4 border-l-4 border-emerald-500">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic">"{review.product_review}"</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(review.created_at)}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-500">⭐</span>)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;