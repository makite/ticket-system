import { Component } from "react";
import CallToAction from "../components/CallToAction";
import home1 from "/images/home1.jpeg";
import home2 from "/images/home2.jpeg";
import home3 from "/images/home3.jpeg";
import home4 from "/images/home4.jpeg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  // Array of images to be displayed
  images = [home1, home2, home3, home4];

  // Effect to change the image every 5 seconds
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        currentIndex: (prevState.currentIndex + 1) % this.images.length,
      }));
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Handlers for next and previous image
  goToNext = () => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % this.images.length,
    }));
  };

  goToPrev = () => {
    this.setState((prevState) => ({
      currentIndex:
        (prevState.currentIndex - 1 + this.images.length) % this.images.length,
    }));
  };

  // Handle dot click to change image
  handleDotClick = (index) => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { currentIndex } = this.state;

    return (
      <>
        <div className="p-[4px]">
          <div className="relative w-full h-[519px]">
            <img
              src={this.images[currentIndex]} // Set the image dynamically based on the current index
              alt="Slider Image"
              className="w-full h-full object-cover transition-all duration-500" // Maintain image quality and dimensions
              loading="eager" // Force immediate high-quality load
            />
            {/* Prev Button */}
            <button
              onClick={this.goToPrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black dark:bg-green-500 bg-opacity-50 p-2 rounded-full transition-all hover:bg-green-700"
            >
              &#10094;
            </button>

            {/* Next Button */}
            <button
              onClick={this.goToNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black dark:bg-green-500 bg-opacity-50 p-2 rounded-full transition-all hover:bg-green-700"
            >
              &#10095;
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {this.images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => this.handleDotClick(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    currentIndex === index
                      ? "bg-green-500 dark:bg-green-500"
                      : "bg-gray-500 dark:bg-gray-300"
                  } transition-all`}
                />
              ))}
            </div>
          </div>
        </div>
        <CallToAction />
      </>
    );
  }
}

export default Home;
