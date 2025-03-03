import { Component } from "react";
import { init, send } from "emailjs-com";
import InputField from "../widgets/inputField";
import CustomButton from "../widgets/customButton";

// Initialize EmailJS with your User ID
init("fmJ28uim_PWNSg-lJ");

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, subject, message } = this.state;

    // Validate if all fields are filled
    if (!firstName || !lastName || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Use EmailJS to send the email
    const templateParams = {
      firstName,
      lastName,
      email,
      subject,
      message,
    };

    // Sending email using EmailJS
    send("service_ks6di19", "template_wx7dwko", templateParams).then(
      (response) => {
        console.log("SUCCESS!", response);
        alert("Your message has been sent successfully!");
      },
      (err) => {
        console.log("FAILED...", err);
        alert("Failed to send message. Please try again.");
      }
    );
  };

  render() {
    return (
      <div className="px-4 xl:px-[180px] pt-20 flex md:flex-row flex-col md:items-center justify-between pb-14 text-white">
        {/* Left Section */}
        <div className="pb-6">
          <div className="pb-10">
            <h1 className="font-bold text-4xl text-blue-500">
              Let&apos;s Talk 🙋
            </h1>
          </div>
          <div className="pl-2 lg:pl-6 flex flex-col gap-11">
            <div>
              <h2 className="font-bold text-xl text-purple-500">Email</h2>
              <p className="text-xl text-black dark:text-white">
                makimanmtu@gmail.com
              </p>
            </div>
            <div>
              <h2 className="font-bold text-xl text-green-500">Contact</h2>
              <p className="text-xl text-black dark:text-white">
                Mobile No: +251 934 879 299
              </p>
            </div>
            <div>
              <h2 className="font-bold text-xl text-blue-500">Address</h2>
              <p className="text-xl text-black dark:text-white">
                Legahar, Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border-4 rounded-xl p-4 lg:p-8 lg:min-w-[550px] dark:bg-gray-900 text-white">
          <form onSubmit={this.handleSubmit}>
            <div className="flex md:flex-row flex-col gap-4 pb-4">
              <InputField
                label="First Name"
                id="firstName"
                placeholder="First Name"
                required
                color="blue"
                onChange={this.handleChange}
              />
              <InputField
                label="Last Name"
                id="lastName"
                placeholder="Last Name"
                required
                color="purple"
                onChange={this.handleChange}
              />
            </div>
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="Email Address"
              required
              color="green"
              onChange={this.handleChange}
            />
            <InputField
              label="Subject"
              id="subject"
              placeholder="Subject"
              color="blue"
              onChange={this.handleChange}
            />
            <InputField
              label="Your Message"
              id="message"
              placeholder="Your Message"
              type="textarea"
              required
              color="purple"
              onChange={this.handleChange}
            />
            <div className="mt-6">
              <CustomButton
                onClick={this.handleSubmit}
                text="Submit Form"
                color="green"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
