"use client";

import React, { useState } from "react";
import { FiStar, FiMessageSquare, FiFileText } from "react-icons/fi";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  // Fallback for reviews array if backend doesn't provide it yet
  const reviews = product.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = product.rating || 5;

  return (
    <div className="mt-16 border-t border-primary/10 pt-10">
      {/* Tab Navigation Header */}
      <div className="flex border-b border-primary/10 gap-8 mb-8">
        <button
          onClick={() => setActiveTab("description")}
          className={`flex items-center gap-2 pb-4 text-xs uppercase tracking-widest font-semibold transition-all relative ${
            activeTab === "description" ?
              "text-primary border-b-2 border-primary"
            : "text-primary/40 hover:text-primary border-b-2 border-transparent"
          }`}
        >
          <FiFileText className="w-4 h-4" />
          Description
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 pb-4 text-xs uppercase tracking-widest font-semibold transition-all relative ${
            activeTab === "reviews" ?
              "text-primary border-b-2 border-primary"
            : "text-primary/40 hover:text-primary border-b-2 border-transparent"
          }`}
        >
          <FiMessageSquare className="w-4 h-4" />
          Reviews ({reviewCount})
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="animate-fadeIn max-w-4xl">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Product Overview
            </h3>
            <p className="text-sm text-primary/70 font-light leading-relaxed whitespace-pre-line">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="animate-fadeIn max-w-4xl">
            {/* Rating Summary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-primary/10 p-6 rounded-lg mb-8 gap-4">
              <div>
                <span className="text-3xl font-bold text-primary">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-xs text-primary/50 ml-1">/ 5.0</span>
                <div className="flex items-center gap-1 mt-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(averageRating) ?
                          "fill-accent text-accent"
                        : "text-primary/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-primary/60 mt-1">
                  Based on {reviewCount}{" "}
                  {reviewCount === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>

            {/* Review List */}
            {reviews.length > 0 ?
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="border-b border-primary/10 pb-6 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary">
                        {review.userName || "Verified Customer"}
                      </span>
                      <span className="text-xs text-primary/40">
                        {review.createdAt || "Recently"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-accent mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < (review.rating || 5) ?
                              "fill-accent text-accent"
                            : "text-primary/20"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-primary/70 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            : <div className="bg-white border border-primary/10 p-8 rounded-lg text-center">
                <p className="text-sm text-primary/60 mb-2">
                  No reviews yet for this product.
                </p>
                <p className="text-xs text-primary/40">
                  Be the first to share your experience after purchasing!
                </p>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
