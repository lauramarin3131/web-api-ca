import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../api/reviews-api";
import { useAuth } from "../contexts/AuthContext";

const MyReviewsPage = () => {
  const { token } = useAuth();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myReviews"],
    queryFn: () => getMyReviews(token),
    enabled: !!token,
  });

  if (isLoading) {
    return <h2>Loading reviews...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  if (data.length === 0) {
    return <h2>You have not written any reviews yet.</h2>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Reviews</h1>

      <ul>
        {data.map((review) => (
          <li key={review._id} style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Movie ID:</strong> {review.movieId}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p>
              <strong>Comment:</strong> {review.comment}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviewsPage;
