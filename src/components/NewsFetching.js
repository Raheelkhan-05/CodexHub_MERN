import React, { useEffect, useState } from "react";
import NewsCard from "./NewsDisp";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import video1 from './Videos/v1.mp4';

const Hackathons = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const capital = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const update = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response not ok:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const parsedData = await response.json();
      console.log('Received data:', parsedData);
      
      if (parsedData.status === 'error') {
        console.error('API returned an error:', parsedData.message);
        throw new Error(parsedData.message);
      }
      
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Failed to load data", error);
      // You might want to set some state here to show an error message to the user
    }
  };

  useEffect(() => {
    document.title = `CodexHub - ${capital(props.category)}`;
    update();
  }, [props.category]);

  const fetchMoreData = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Failed to load more data", error);
    }
  };

  return (
    <div className="newsvideo pt-3">
      <video src={video1} autoPlay loop muted className="my-0" />
      <h1 className="text-center" style={{ margin: "34px 0px", marginTop: '90px', color: props.mode === "dark" ? "yellow" : "yellow", fontWeight: "700", textShadow: "0px 0px 7px rgba(255,255,255,0.3)" }}>
        TECH NEWS
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <NewsCard
                key={element.url}
                title={element.title ? element.title.slice(0, 45) : "No Title"}
                description={element.description ? element.description.slice(0, 88) : "No Description"}
                imageUrl={element.urlToImage ? element.urlToImage : "default_image_url"}
                hid={element.url}
                date={element.publishedAt || "Unknown Date"}
                source={element.source.name || "Unknown Source"}
              />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

Hackathons.defaultProps = {
  pageSize: 20,
  category: "general",
};

Hackathons.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default Hackathons;
