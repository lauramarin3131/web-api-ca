export const getMyReviews = async (token) => {
  const response = await fetch("http://localhost:8080/api/reviews/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Failed to fetch reviews");
  }

  return response.json();
};
