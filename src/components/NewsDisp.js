import React from "react";

const NewsCard = ({ title, description, imageUrl, hid, date, source }) => {
  return (
    <div className="aaaaaa-news-card-wrapper col-lg-1/5">
      <div className="aaaaaa-news-card">
        <div className="aaaaaa-news-card-image">
          <img src={imageUrl || "https://i-invdn-com.investing.com/news/LYNXMPED504AB_L.jpg"} alt={title} />
          <span className="aaaaaa-news-card-source">{source}</span>
        </div>
        <div className="aaaaaa-news-card-content">
          <h3 className="aaaaaa-news-card-title">{title}</h3>
          <p className="aaaaaa-news-card-description">{description}</p>
          <div className="aaaaaa-news-card-footer">
            <small className="aaaaaa-news-card-date">
              {new Date(date).toLocaleDateString()}
            </small>
            <a
              href={hid}
              target="_blank"
              rel="noreferrer"
              className="aaaaaa-news-card-link"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;