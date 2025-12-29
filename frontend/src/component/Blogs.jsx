import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import { 
  FaSearch, 
  FaMobileAlt, 
  FaLaptopCode, 
  FaChartLine, 
  FaNetworkWired, 
  FaMicrochip,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaEnvelope
} from 'react-icons/fa';
import '../styles/blogs.css';
import Footer from "../component/Footer"

const Blogs = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const blogData = [
    {
      id: 1,
      category: 'App',
      title: 'Building Modern Mobile Applications',
      description: 'Discover the latest trends in mobile app development, from cross-platform solutions to native performance optimization.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      date: 'Dec 15, 2024',
      readTime: '5 min read'
    },
    {
      id: 2,
      category: 'App',
      title: 'Flutter vs React Native: 2024 Comparison',
      description: 'A comprehensive guide to choosing the right framework for your next mobile application project.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      date: 'Dec 10, 2024',
      readTime: '7 min read'
    },
    {
      id: 3,
      category: 'Web',
      title: 'Modern Web Development Best Practices',
      description: 'Learn essential techniques for building fast, responsive, and user-friendly websites in 2024.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
      date: 'Dec 12, 2024',
      readTime: '6 min read'
    },
    {
      id: 4,
      category: 'Web',
      title: 'The Future of Progressive Web Apps',
      description: 'Exploring how PWAs are revolutionizing the way we think about web applications and user experience.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      date: 'Dec 8, 2024',
      readTime: '8 min read'
    },
    {
      id: 5,
      category: 'Digital',
      title: 'Digital Marketing Strategies for Tech Companies',
      description: 'Effective digital marketing approaches to boost your tech business visibility and customer engagement.',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&q=80',
      date: 'Dec 14, 2024',
      readTime: '5 min read'
    },
    {
      id: 6,
      category: 'Digital',
      title: 'AI-Powered Digital Transformation',
      description: 'How artificial intelligence is reshaping digital business strategies and customer experiences.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      date: 'Dec 11, 2024',
      readTime: '6 min read'
    },
    {
      id: 7,
      category: 'IoT',
      title: 'Internet of Things: Connecting the World',
      description: 'Explore how IoT devices are transforming industries from healthcare to smart cities.',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
      date: 'Dec 9, 2024',
      readTime: '7 min read'
    },
    {
      id: 8,
      category: 'IoT',
      title: 'Smart Home Automation with IoT',
      description: 'Building intelligent home systems using IoT sensors and cloud connectivity.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      date: 'Dec 7, 2024',
      readTime: '5 min read'
    },
    {
      id: 9,
      category: 'Embedded',
      title: 'Embedded Systems in Modern Electronics',
      description: 'Understanding the role of embedded systems in powering everyday devices and industrial automation.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      date: 'Dec 13, 2024',
      readTime: '6 min read'
    },
    {
      id: 10,
      category: 'Embedded',
      title: 'Real-Time Operating Systems for Embedded',
      description: 'A deep dive into RTOS and their applications in time-critical embedded systems.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      date: 'Dec 6, 2024',
      readTime: '8 min read'
    },
    {
      id: 11,
      category: 'App',
      title: 'App Security Best Practices',
      description: 'Essential security measures every mobile app developer should implement to protect user data.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      date: 'Dec 5, 2024',
      readTime: '6 min read'
    },
    {
      id: 12,
      category: 'Web',
      title: 'Responsive Design Principles',
      description: 'Master the art of creating websites that look perfect on every device and screen size.',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80',
      date: 'Dec 4, 2024',
      readTime: '5 min read'
    }
  ];

  const categories = [
    { name: 'All', icon: null },
    { name: 'App', icon: <FaMobileAlt /> },
    { name: 'Web', icon: <FaLaptopCode /> },
    { name: 'Digital', icon: <FaChartLine /> },
    { name: 'IoT', icon: <FaNetworkWired /> },
    { name: 'Embedded', icon: <FaMicrochip /> }
  ];

  const filteredBlogs = blogData.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReadMore = (blogId) => {
    console.log('Reading blog:', blogId);
  };

  return (
    <div className="blogs-container">
      {/* Snowfall Effect */}
      <Snowfall
        color="#fff"
        snowflakeCount={200}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 1
        }}
      />

      <div className="blogs-content-wrapper">
        {/* Hero Section */}
        <div className="blogs-hero">
          <h1 className="blogs-hero-title">
            <span className="title-our">Our</span>
            <span className="title-tech">Tech Insights</span>
          </h1>
          <p className="blogs-hero-subtitle">
            Explore the latest trends, insights, and innovations in technology
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="blogs-controls">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon && <span className="category-icon">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'}</p>
        </div>

        {/* Blogs Grid */}
        <div className="blogs-grid">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="blog-image-container">
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <div className="blog-overlay"></div>
                <div className="blog-category-badge">
                  {blog.category === 'App' && <FaMobileAlt />}
                  {blog.category === 'Web' && <FaLaptopCode />}
                  {blog.category === 'Digital' && <FaChartLine />}
                  {blog.category === 'IoT' && <FaNetworkWired />}
                  {blog.category === 'Embedded' && <FaMicrochip />}
                  <span>{blog.category}</span>
                </div>
              </div>
              
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">
                    <FaCalendarAlt /> {blog.date}
                  </span>
                  <span className="blog-read-time">
                    <FaClock /> {blog.readTime}
                  </span>
                </div>
                
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.description}</p>
                
                <button 
                  className="read-more-btn"
                  onClick={() => handleReadMore(blog.id)}
                >
                  Read More
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
              
              <div className="card-shine"></div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">📭</div>
            <h3>No blogs found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <FaEnvelope className="newsletter-icon" />
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-subtitle">
              Subscribe to our newsletter and never miss an update on the latest tech trends
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                Subscribe
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Blogs;