import OIP from '../images/OIP.jpeg';
import nat from '../images/nat.jpeg';

function Sponsors() {
    return (
        <div class="layout-wrapper layout-wrapper-light">
            <div class="layout-content">
                <div class="block-section w-full">
                    <div class="block-content border-0">
                        <div>
                            <section class="surface-section gap-3 px-4 py-8 md:px-6 lg:px-8 ">
                                <h2 className="text-2xl font-bold mb-4 text-center">Our Partners and Sponsors</h2>
                                <div class="flex justify-content-evenly flex-wrap w-full">
                                    <img src={OIP} alt="The 2 Idiots" className=' h-10rem' />
                                    <img src={nat} alt="The National Theatre - Ghana" className=' h-10rem' />
                                    {/* <img src="/demo/images/blocks/logos/hyper-cyan.png" alt="Hyper" />
                                    <img src="/demo/images/blocks/logos/hodly-orange.png" alt="Hodly" />
                                    <img src="/demo/images/blocks/logos/franki-green.png" alt="Franki" /> */}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sponsors;
