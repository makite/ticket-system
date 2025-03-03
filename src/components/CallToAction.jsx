import { Component } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButton from "../widgets/customButton";

// Functional wrapper to provide navigate
const CallToActionWrapper = () => {
  const navigate = useNavigate();
  return <CallToAction navigate={navigate} />;
};

class CallToAction extends Component {
  handleNavigate = () => {
    const { navigate } = this.props;
    navigate("/sign-in");
  };

  render() {
    return (
      <div className="py-32 bg-white dark:bg-gray-900 flex items-center justify-center text-white dark:text-gray-100">
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 dark:text-white text-gray-800">
            Get Your Tickets Here
            <span role="img" aria-label="ticket">
              🎟️
            </span>
          </h1>
          <p className="text-lg lg:text-2xl mb-6 text-gray-800 dark:text-gray-300">
            Whether it&apos;s for a concert, bus, cinema, or anything else, our
            ticketing system is here to make your experience seamless. Get your
            tickets quickly and easily!
          </p>
          <CustomButton
            onClick={this.handleNavigate}
            color="green"
            text=" Get Started →"
          ></CustomButton>
        </div>
      </div>
    );
  }
}

export default CallToActionWrapper;
CallToAction.propTypes = {
  navigate: PropTypes.func.isRequired,
};
