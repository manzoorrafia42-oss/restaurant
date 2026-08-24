import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus, CheckCircle } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newOccasion, setNewOccasion] = useState('Dinner with Friends');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1 >= reviewsList.length ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? reviewsList.length - 1 : prev - 1));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.toUpperCase(),
      rating: newRating,
      comment: newComment,
      date: 'Just now',
      visitedFor: newOccasion
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSubmitted(false);
      setNewAuthor('');
      setNewComment('');
    }, 1800);
  };

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#0d0f11] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-2">
              Learn more about
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl italic text-white font-normal">
              What Our Visitors Say
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 hover:text-white hover:border-white/30 flex items-center gap-2 transition-colors mr-2"
            >
              <MessageSquarePlus size={14} className="text-[#b5c99a]" />
              <span>Share Experience</span>
            </button>

            <button
              onClick={prevReview}
              className="w-10 h-10 rounded-full border border-white/15 bg-[#14171a] flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#b5c99a] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextReview}
              className="w-10 h-10 rounded-full border border-white/15 bg-[#14171a] flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#b5c99a] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Reviews Layout Grid matching the video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Decorative Silhouette Photo (Palms / Botanical window seen in video) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 min-h-[360px]">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
                alt="Tropical foliage and warm sunlight at Edem restaurant"
                className="w-full h-full object-cover filter brightness-85 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <p className="font-cormorant italic text-xl text-white">"A paradise for your taste buds"</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-[#c6a869]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#c6a869]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Reviews Cards Carousel */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {reviewsList.slice(currentIndex, currentIndex + 2).concat(
                reviewsList.slice(0, Math.max(0, 2 - (reviewsList.length - currentIndex)))
              ).slice(0, 2).map((rev) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#13161a] border border-white/10 rounded-3xl p-7 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Author & Star Rating matching video format */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                      <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white">
                        {rev.author}
                      </span>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < rev.rating
                                ? 'text-[#c6a869] fill-[#c6a869]'
                                : 'text-neutral-600'
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review text matching video verbatim */}
                    <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>{rev.visitedFor || 'Fine Dining Guest'}</span>
                    <span>{rev.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#14171a] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <h3 className="font-cormorant text-2xl sm:text-3xl italic text-white mb-2">
              Share Your Edem Experience
            </h3>
            <p className="text-xs text-neutral-400 font-light mb-6">
              Your impression helps our culinary brigade elevate every moment.
            </p>

            {reviewSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle size={44} className="text-[#b5c99a] mb-3 animate-bounce" />
                <p className="text-base text-white font-medium">Thank you for your review!</p>
                <p className="text-xs text-neutral-400 mt-1">Your feedback has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Oksana V."
                    className="w-full bg-[#1b1f24] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#b5c99a]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          size={22}
                          className={
                            star <= newRating
                              ? 'text-[#c6a869] fill-[#c6a869]'
                              : 'text-neutral-600'
                          }
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#c6a869] ml-2 font-mono">{newRating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us about the atmosphere, dishes and service..."
                    className="w-full bg-[#1b1f24] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#b5c99a]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-2.5 rounded-full border border-white/10 text-xs text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-[#b5c99a] text-[#0d0f11] font-semibold text-xs uppercase tracking-wider hover:bg-[#cde4b3]"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
