export default function Network(){
    return(
        <section className="relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="w-full h-[500px] relative bg-cover bg-center bg-white"
                style={{ backgroundImage: "url('/assets/banner.jpg')" }}
            >
                {/* Remove Gradient Overlay */}
                
                {/* Content */}
                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Text Content */}
                            <div className="text-white">
                                {/* Badge - only on screens >= 640px */}
                                <div className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600  px-6 py-2 rounded-full text-sm font-medium mb-6">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Join Our Network
                                </div>
                                
                                <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                                    Join the Network of Installers on 
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500"> Get Solar Company</span>
                                </h3>
                                
                                <p className="text-xl  mb-8 l text-white">
                                    Get registered among the top solar installers to have more opportunities to meet solar buyers near you.
                                </p>
                                
                                <div className=" gap-3 sm:gap-4 mb-6 w-full max-w-xs sm:max-w-md lg:mx-0 justify-center sm:justify-start text-left">
                                    <button className="border-2 border-gray-300 text-white px-3 sm:px-8 py-2.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg hover:border-pink-400 hover:text-pink-400 transition-all duration-300 max-w-[200px] sm:max-w-none w-auto">
                                        Get Started
                                    </button>
                                </div>
                            </div>
                            
                            {/* Card Section */}
                            <div className="hidden lg:block">
                                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-gray-300 shadow-2xl">
                                    <div className="text-center text-black">
                                        <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-2xl font-bold mb-4">Why Join Our Network?</h4>
                                        <div className="space-y-4 text-left">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                <span className="text-gray-500 text-sm sm:text-sm">Access to qualified leads</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                <span className="text-gray-500 text-sm sm:text-sm">Verified customer reviews</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                <span className="text-gray-500 text-sm sm:text-sm">Marketing support</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                <span className="text-gray-500 text-sm sm:text-sm">Technical assistance</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}