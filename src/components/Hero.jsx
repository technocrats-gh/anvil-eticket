import { useNavigate } from 'react-router';
import MainFlyer from '../images/stage-play.jpg';

function Hero() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-800">
                {/* Text Section */}
                <div className="flex align-items-center justify-center md:text-left">
                    <section className="w-full">
                        <span className="block text-lg md:text-xl mb-2 text-gray-700">
                            Anvil Productions, The 2 Idiots, and The National Theatre of Ghana
                        </span>
                        <span className="block text-2xl md:text-4xl font-bold mb-2">PRESENTS</span>
                        <div className="lg:text-8xl text-6xl font-bold mb-4 cascadia-mono-header text-orange-900">
                            DEDEI ASHIKISHAN
                        </div>
                        <p className="text-base md:text-lg text-gray-600 mb-6">
                            A sitcom filled with drama. It highlights the need for us to contribute to our nation's development starting from whatever small society we belong to.
                        </p>
                        <button
                            aria-label="Purchase Ticket"
                            className="p-button p-component p-button-raised p-button-primary cursor-pointer hover:bg-orange-600"
                            style={{ backgroundColor: "#8F5A26", borderColor: "#8F5A26", color: "white" }}
                            onClick={() => navigate('payment')}
                        >
                            <span className="p-button-label">Purchase a Ticket</span>
                        </button>
                    </section>
                </div>

                {/* Image Section */}
                <div className="flex items-center justify-center">
                    <img
                        src={MainFlyer}
                        alt="Dedei Ashikishan flyer"
                        className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl border-round-3xl border-black-alpha-30 border-2 shadow-6"
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;
