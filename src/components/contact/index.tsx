"use client";
import React, { useState } from 'react'
// import './Contact.css'
import ContactForm from '../contact/contactForm/contactForm'
import { Mail, MapPin, Phone } from 'lucide-react';
import Footer from '../footerPage/footerPage'

function ContactPage() {
    const [email, setEmail] = useState('');
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Email submitted:', email);
    };

    return (
        <section id="contactBlackBg" className='w-full bg-[#000000] contact-parent-container'>
            {/* <div className='contact-parent-inner-container'> */}
            <div className='contact-parent-inner-container'>
                <div className='text-center '>
                    <h3 className='text-[#9747FF] inter text-2xl'>Contact us</h3>
                    <p className='text-white text-5xl font-bold mt-8 inter'>We'd love to hear from you </p>
                    <p className='text-gray-400 mt-8 inter'>Our friendly team is always here to chat. </p>
                </div>
                {/* </div> */}
                <div className="bg-black text-white w-full">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Email Section */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center ">
                                    <Mail className="w-6 h-6 text-purple-500 text-center" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 inter">Email</h3>
                            <a href="mailto:support@example.com" className="text-white hover:text-purple-400 transition-colors inter">
                                support@example.com
                            </a>
                        </div>
                        {/* Office Section */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center ">
                                    <MapPin className="w-6 h-6 text-purple-500" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 inter">Office</h3>
                            <p className="text-white inter">
                                No. 6/9, 3rd cross street, Cit colony,<br />
                                Chennai, Tamilnadu - 600004
                            </p>
                        </div>

                        {/* Phone Section */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center ">
                                    <Phone className="w-6 h-6 text-purple-500" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 inter">Phone</h3>
                            <a href="tel" className="text-white hover:text-purple-400 transition-colors inter">
                                +91 9876-543210
                            </a>
                        </div>
                    </div>
                </div>
                <ContactForm />
                <div className=" bg-[#0B0B0B] rounded-xl w-full contact-section-three">
                    <div className='contact-section-three-inner-first-container '>
                        <h2 className="text-2xl text-white inter contact-section-text-align">
                            Join 2,000+ Bubbl Community
                        </h2>
                        <p className="text-gray-400 pt-2 contact-section-text-align w-full inter">
                            Stay in the loop with everything you need to know.
                        </p>
                    </div>
                    <div className="contact-section-three-inner-second-container">
                        <div className='contact-section-three-inner-second'>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="contact-section-three-email-input w-full px-2 py-2 bg-[#111111] inter text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                required
                            />
                            <button
                                type="submit"
                                className="px-7 py-2 inter bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors contact-subscribe-button-width"
                            >
                                Subscribe
                            </button>
                        </div>
                        <p className="mt-2 pl-1 text-sm contact-section-text-align text-gray-400 inter">
                            We care about your data in our{' '}
                            <a href="#" className="underline hover:text-gray-300 inter">
                                privacy policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
}

export default ContactPage
