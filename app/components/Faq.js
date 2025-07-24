'use client';
import { Disclosure } from "@headlessui/react";

const ChevronIcon = ({ open }) => (
    <svg
        className={`w-6 h-6 text-pink-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const header = "What does Get Solar do for you?";
const faqs = [
    {
        question: "What are the benefits of installing solar panels?",
        answer:
            "Solar panels help reduce your electricity bills, increase your property value, and contribute to a cleaner environment by using renewable energy.",
    },
    {
        question: "How long do solar panels last?",
        answer:
            "Most solar panels come with a warranty of 20-25 years and can last even longer with proper maintenance.",
    },
    {
        question: "Will solar panels work during cloudy or rainy days?",
        answer:
            "Yes, solar panels still generate electricity on cloudy or rainy days, though their efficiency is reduced compared to sunny days.",
    },
    {
        question: "Can I go off-grid with solar panels?",
        answer:
            "Going off-grid is possible with a solar panel system and battery storage, but it requires careful planning and investment.",
    },
    {
        question: "How much does it cost to install solar panels?",
        answer:
            "The cost varies depending on your location, system size, and available incentives. Most homeowners see a return on investment within 5-8 years.",
    },
];

export default function Faq() {
    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Frequently Asked Questions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-10 mt-5">
                        {header}
                    </h2>
                    <div>
                        <div className="bg-white rounded-2xl p-9 shadow-lg border border-gray-200 text-left w-full">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                We make the best match between the homeowners and the solar installers to help homeowners save tens of thousands of dollars by connecting them with our huge network of solar manufacturers and installers.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                Our mission is to make going solar super-easy with full transparency.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                We understand how significant this investment is, that is why before enlisting any solar company on our website, we perform a thorough Pre-screening, during that we analyze their customers&apos; reviews, product quality, and their commitment for servicing and maintenance. Once the company satisfies us by meeting our standards and parameters, our admin team provides approval and then their company&apos;s information is updated on the site along with a link through which visitors can connect to them to get answers for their queries and finally get the services.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                No matter which company you choose here, you certainly get 25 to 30 years warranty which is nearby half of your life. Such a huge warranty itself speaks for its quality. When it comes to solar installers, you get full-service solar installers who are capable of doing everything related to solar installation.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                In other words, we call <strong className="text-pink-500">&quot;Get Solar Company&quot;</strong> a one stop solution provider for all solar PV related needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Sections */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Why Solar Go Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-black">Why Solar Go?</h3>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <Disclosure key={idx}>
                                    {({ open }) => (
                                        <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                                            <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-lg font-medium text-black hover:bg-gray-100 transition-colors duration-200">
                                                <span className="pr-4">{faq.question}</span>
                                                <ChevronIcon open={open} />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-6 pb-4 text-gray-700 text-base leading-relaxed bg-gray-50">
                                                {faq.answer}
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            ))}
                        </div>
                    </div>

                    {/* General FAQs Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-black">General FAQs</h3>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <Disclosure key={idx}>
                                    {({ open }) => (
                                        <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                                            <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-lg font-medium text-black hover:bg-gray-100 transition-colors duration-200">
                                                <span className="pr-4">{faq.question}</span>
                                                <ChevronIcon open={open} />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-6 pb-4 text-gray-700 text-base leading-relaxed bg-gray-50">
                                                {faq.answer}
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
