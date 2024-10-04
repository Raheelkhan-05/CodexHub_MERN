import React from 'react';
import contest from "./Images/contest.jpg";
import practice from "./Images/practice.png";
import news from "./Images/news.webp";

const ServiceCard = ({ image, title, description, link, iconClass }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100 hvre">
      <img src={image} className="card-img-top" alt={title} style={{height: '200px', objectFit: 'cover'}} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title ctlsch">{title}</h5>
        <p className="card-text flex-grow-1 ctlscb">{description}</p>
        <a href={link} className="btn btn-primary mt-auto bg-darkx">Learn More</a>
      </div>
    </div>
  </div>
);

export default function Services() {
  return (
    <section className='popupanim'>
      <div className="container py-5">
        <h2 className='text-center mb-5' style={{ color: 'white', fontSize: "50px", textShadow: "1px 1px 10px rgba(255,255,255,0.4)" }}>
          <u>Our Services</u>
        </h2>
        <div className="row">
          <ServiceCard
            image={contest}
            title="Contests"
            description="Coding contests foster skill development, creativity, and collaboration among programmers."
            link="/contest"
            iconClass="fa fa-globe"
          />
          <ServiceCard
            image={practice}
            title="Practice"
            description="Coding practice: mastery, problem-solving, adaptability, knowledge reinforcement, continuous learning."
            link="/practice"
            iconClass="fa fa-solid fa-code"
          />
          <ServiceCard
            image={news}
            title="Tech News"
            description="Tech innovations shape daily life, from AI advancements to sustainable energy."
            link="/technews"
            iconClass="fa fa-newspaper-o"
          />
        </div>
      </div>
    </section>
  );
}