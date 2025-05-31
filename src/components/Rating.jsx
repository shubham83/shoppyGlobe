function Rating({ rating }) {
  // Round the rating to nearest whole number to get full stars
  const fullStars = Math.round(rating);
    // Calculate how many empty stars to show (out of 5 total)
  const emptyStars = 5 - fullStars;

  return (
    <span style={{ color: '#FFD700', fontSize: '1rem' }}>
       {[...Array(fullStars)].map((_, i) =>  <i key={`full-${i}`} className="fa-solid fa-star"></i>)}
       {/* [...Array(emptyStars)] creates an array with emptyStars length to render that many empty star icons */}
        {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`}  className="fa-regular fa-star"></i>)}
     
    </span>
  );
}

export default Rating;
