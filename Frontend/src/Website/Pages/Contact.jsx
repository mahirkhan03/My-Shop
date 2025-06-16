import React from "react";

const Contact = () => {
  return (
        <>
         <div className="w-full bg-white mt-5 px-6 py-3 rounded-full shadow-sm mb-6">
      <nav className="text-sm text-gray-500 font-medium space-x-1">
        <span className="text-gray-400">Home</span>
        <span>/</span>
        <span className="text-gray-400">pages</span>
        <span>/</span>
        <span className="text-black font-semibold">Contact</span>
      </nav>
    </div>
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">READY TO WORK WITH US</h2>
        <p className="mb-8">Contact us for all your questions and opinions</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name *" className="border rounded p-3 w-full" />
              <input type="text" placeholder="Last Name *" className="border rounded p-3 w-full" />
            </div>
            <input type="email" placeholder="Email Address *" className="border rounded p-3 w-full" />
            <input type="tel" placeholder="Phone Number (Optional)" className="border rounded p-3 w-full" />
            <select className="border rounded p-3 w-full">
              <option>United States (US)</option>
              <option>United Kingdom (UK)</option>
              <option>Canada</option>
            </select>
            <input type="text" placeholder="Subject (Optional)" className="border rounded p-3 w-full" />
            <textarea placeholder="Note about your order, e.g. special note for delivery" className="border rounded p-3 w-full h-32"></textarea>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <p className="text-sm">
                I want to receive news and updates once in a while. By submitting, I'm agreed to the{' '}
                <a href="#" className="text-green-600 underline">Terms & Conditions</a>
              </p>
            </div>

            <button className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700">SEND MESSAGE</button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded">
              <h4 className="font-bold mb-2">UNITED STATES (HEAD QUARTER)</h4>
              <p>152 Thatcher Road St, Mahattan, 10463, US</p>
              <p>(+025) 3886 25 16</p>
              <p className="text-green-600">hello@swotechmart.com</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h4 className="font-bold mb-2">UNITED KINGDOM (BRANCH)</h4>
              <p>12 Buckingham Rd, Thornthwaite, HG3 4TY, UK</p>
              <p>(+718) 895-5350</p>
              <p className="text-green-600">contact@swotechmart.co.uk</p>
            </div>
            <div className="flex gap-3 text-xl">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
            <img
              src="/public/contact.png.svg"
              alt="Contact"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">FIND US ON GOOGLE MAP</h3>
          <div className="w-full h-96">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.562161547375!2d10.50287487576503!3d43.84536697109392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a8e1d8e4f16ef%3A0x9dc6df00a2cc2ab7!2sChiesa%20di%20San%20Francesco%2C%2051010%20Lucca%20LU%2C%20Italy!5e0!3m2!1sen!2sus!4v1685225679182!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
