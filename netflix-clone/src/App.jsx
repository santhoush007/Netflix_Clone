import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, Bell, Search, ChevronRight, ChevronLeft } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_DATA = {
  originals: [
    { id: 1, title: "Stranger Things", overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.", backdrop: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "The Crown", overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.", backdrop: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=2079&auto=format&fit=crop", poster: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Bridgerton", overview: "Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family.", backdrop: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=2064&auto=format&fit=crop", poster: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Money Heist", overview: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.", backdrop: "https://images.unsplash.com/photo-1563729784474-d77ddb923663?q=80&w=2070&auto=format&fit=crop", poster: "https://images.unsplash.com/photo-1563729784474-d77ddb923663?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "The Witcher", overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.", backdrop: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2070&auto=format&fit=crop", poster: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop" },
  ],
  trending: [
    { id: 6, title: "Inception", backdrop: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=2069&auto=format&fit=crop" },
    { id: 7, title: "Interstellar", backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" },
    { id: 8, title: "Dune", backdrop: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2070&auto=format&fit=crop" },
    { id: 9, title: "The Dark Knight", backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2070&auto=format&fit=crop" },
    { id: 10, title: "Avengers", backdrop: "https://images.unsplash.com/photo-1624522857416-563b71f98d6c?q=80&w=2070&auto=format&fit=crop" },
  ],
  topRated: [
    { id: 11, title: "The Godfather", backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2069&auto=format&fit=crop" },
    { id: 12, title: "Pulp Fiction", backdrop: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop" },
    { id: 13, title: "Fight Club", backdrop: "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=2069&auto=format&fit=crop" },
    { id: 14, title: "Forrest Gump", backdrop: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2070&auto=format&fit=crop" },
    { id: 15, title: "Matrix", backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" },
  ],
  action: [
    { id: 16, title: "Mad Max", backdrop: "https://images.unsplash.com/photo-1568876694728-451bbf694b83?q=80&w=2070&auto=format&fit=crop" },
    { id: 17, title: "Gladiator", backdrop: "https://images.unsplash.com/photo-1598556776374-1b4e07357759?q=80&w=2070&auto=format&fit=crop" },
    { id: 18, title: "Die Hard", backdrop: "https://images.unsplash.com/photo-1568910815147-38e55502c46f?q=80&w=2070&auto=format&fit=crop" },
    { id: 19, title: "Terminator", backdrop: "https://images.unsplash.com/photo-1626245347206-8c909c253d25?q=80&w=2070&auto=format&fit=crop" },
    { id: 20, title: "John Wick", backdrop: "https://images.unsplash.com/photo-1535446206140-5f2c416e7591?q=80&w=2070&auto=format&fit=crop" },
  ]
};

// --- STYLES (Normal CSS) ---
const styles = `
  /* Reset & Base */
  * { margin: 0; box-sizing: border-box; }
  body { 
    background-color: #111; 
    color: white; 
    font-family: 'Helvetica Neue', Arial, sans-serif; 
    overflow-x: hidden;
  }

  /* Navbar */
  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 64px;
    padding: 0 20px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.5s ease-in;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent);
  }
  .nav.black {
    background-color: #111;
  }
  .nav__logo {
    color: #e50914;
    font-size: 1.8rem;
    font-weight: bold;
    cursor: pointer;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
  .nav__icons {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .nav__avatar {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Banner */
  .banner {
    color: white;
    object-fit: contain;
    height: 448px;
    position: relative;
    background-size: cover;
    background-position: center center;
  }
  .banner__contents {
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
  }
  .banner__title {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
  }
  .banner__description {
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.9rem;
    max-width: 360px;
    height: 80px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
  }
  .banner__buttons {
    display: flex;
    gap: 10px;
  }
  .banner__button {
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding: 0.5rem 2rem;
    background-color: rgba(51, 51, 51, 0.5);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }
  .banner__button:hover {
    color: #000;
    background-color: #e6e6e6;
  }
  .banner__button.play {
    background-color: white;
    color: black;
  }
  .banner__button.play:hover {
    background-color: rgba(255, 255, 255, 0.75);
  }
  .banner--fadeBottom {
    height: 7.4rem;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  /* Rows */
  .row {
    margin-left: 20px;
    color: white;
    margin-bottom: 20px;
    position: relative;
  }
  .row__title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .row__posters {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px 0 20px 0;
    scroll-behavior: smooth;
  }
  /* Hide scrollbar */
  .row__posters::-webkit-scrollbar {
    display: none;
  }
  .row__posters {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .row__poster {
    object-fit: contain;
    width: 100%;
    max-height: 100px;
    margin-right: 10px;
    transition: transform 450ms;
    border-radius: 4px;
    cursor: pointer;
  }
  .row__poster:hover {
    transform: scale(1.08);
  }
  .row__posterLarge {
    max-height: 250px;
  }
  .row__posterLarge:hover {
    transform: scale(1.09);
  }
  
  /* Arrows */
  .row__arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    background-color: rgba(0,0,0,0.5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .row:hover .row__arrow {
    opacity: 1;
  }
  .row__arrow:hover {
    background-color: rgba(0,0,0,0.7);
  }
  .row__arrow.left { left: 0; }
  .row__arrow.right { right: 0; }

  /* Footer */
  .footer {
    padding: 30px;
    text-align: center;
    color: gray;
    font-size: 12px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .banner__title { font-size: 2rem; }
    .banner__description { width: auto; font-size: 0.8rem; }
    .banner { height: 350px; }
  }
`;

// --- COMPONENTS ---

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) handleShow(true);
      else handleShow(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`nav ${show ? "black" : ""}`}>
      <div className="nav__logo">NETFLIX</div>
      <div className="nav__icons">
        <Search color="white" size={24} style={{cursor: 'pointer'}}/>
        <span style={{fontSize: '0.9rem', cursor: 'pointer'}}>Kids</span>
        <Bell color="white" size={24} style={{cursor: 'pointer'}} />
        <img
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User Avatar"
        />
      </div>
    </div>
  );
};

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const randomMovie = MOCK_DATA.originals[Math.floor(Math.random() * MOCK_DATA.originals.length)];
    setMovie(randomMovie);
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (!movie) return <div className="banner"></div>;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("${movie.backdrop}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button play">
            <Play fill="black" size={16} /> Play
          </button>
          <button className="banner__button">
            <Info size={16} /> More Info
          </button>
        </div>

        <h1 className="banner__description">
          {truncate(movie.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

const Row = ({ title, movies, isLargeRow = false }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      
      {/* Left Arrow */}
      <div className="row__arrow left" onClick={() => scroll('left')}>
        <ChevronLeft size={30} color="white" />
      </div>

      <div className="row__posters" ref={rowRef}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
            src={isLargeRow ? movie.poster : movie.backdrop}
            alt={movie.name}
          />
        ))}
      </div>

      {/* Right Arrow */}
      <div className="row__arrow right" onClick={() => scroll('right')}>
        <ChevronRight size={30} color="white" />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      {/* Inject Styles */}
      <style>{styles}</style>

      <Nav />
      <Banner />
      
      <div className="rows-container">
        <Row title="NETFLIX ORIGINALS" movies={MOCK_DATA.originals} isLargeRow />
        <Row title="Trending Now" movies={MOCK_DATA.trending} />
        <Row title="Top Rated" movies={MOCK_DATA.topRated} />
        <Row title="Action Movies" movies={MOCK_DATA.action} />
      </div>

      <div className="footer">
        <p>Netflix Clone Project - Santhoush S (SOFT-IT-0012025119)</p>
        <p>Created for educational purposes.</p>
      </div>
    </div>
  );
};

export default App;