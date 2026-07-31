import React from 'react';
import { getReviews } from '@/lib/data/reviews';

export async function Reviews() {
  const reviews = await getReviews();

  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="eyebrow mono">Google reviews</div>
        <h2 className="section-title">What collaborators say.</h2>
        <div className="rating">
          <span className="stars" aria-label="Five stars">
            ★★★★★
          </span>
          <span>
            <b>Excellent</b> — based on 85 reviews
          </span>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.id} className="review">
              <q>{review.quote}</q>
              <footer className="mono">
                {review.avatarUrl && (
                  <img
                    className="review-avatar"
                    src={review.avatarUrl}
                    alt=""
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                )}
                <span>
                  <b>{review.authorName}</b>
                  <small>Google review</small>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
