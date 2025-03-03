import { Component } from "react";
import PropTypes from "prop-types";

// Reusable Card Component
class Card extends Component {
  render() {
    const { title, description, gradientColors } = this.props; // Using gradientColors from props

    return (
      <div
        className={`py-8 px-14 md:px-16 text-center md:text-left rounded-xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl 
        bg-gray-100 dark:bg-gray-700`} // Background color based on light/dark mode
      >
        <h1
          className={`font-extrabold text-3xl md:text-4xl pb-4 text-${gradientColors} dark:text-${gradientColors} leading-relaxed`} // Text color from props, works in both modes
        >
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100 leading-relaxed">
          {description}
        </p>
      </div>
    );
  }
}

class WhyChooseUs extends Component {
  render() {
    return (
      <div className="px-4 xl:px-[180px] pt-14 pb-14">
        <div className="text-center pb-14">
          <h1 className="font-bold text-blue-500 text-3xl pb-4">
            Why Choose Us
          </h1>
          <p className="text-2xl max-w-[500px] mx-auto">
            Choose us for seamless ticketing, secure payments, and user-friendly
            features that make your ticketing process smooth and reliable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <Card
            title="Comprehensive Ticketing Solutions"
            description="Our platform provides a complete ticketing solution, from ticket sales and registration to managing customer data, simplifying your ticketing workflow."
            gradientColors="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
          />
          <Card
            title="User-Friendly Interface"
            description="Designed with simplicity in mind, our system ensures that both ticket buyers and sellers can navigate effortlessly, enhancing the overall experience."
            gradientColors="bg-gradient-to-r from-pink-500 via-yellow-500 to-indigo-500"
          />
          <Card
            title="Secure Payment Integration"
            description="We offer secure payment options, ensuring a hassle-free transaction process for all ticket buyers and sellers."
            gradientColors="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"
          />
          <Card
            title="Dedicated Customer Support"
            description="Our reliable support team is always available to assist with any issues, ensuring a smooth ticketing experience from purchase to redemption."
            gradientColors="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"
          />
        </div>
      </div>
    );
  }
}

export default WhyChooseUs;

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  gradientColors: PropTypes.string.isRequired,
};
