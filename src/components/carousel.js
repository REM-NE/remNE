
export default function Carousel({ images, id = "carousel" }) {
  if (!images.length) return null;

  return (
    <div className="container-carousel carousel-shell flex-grow-1">
      <div id={id} className="carousel slide">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={image.imageURL}
                className="d-block w-100 home-carousel-image"
                alt={`slide-${index}`}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
