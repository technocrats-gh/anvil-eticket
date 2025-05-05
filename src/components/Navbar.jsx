import AnvilLogo from '../images/mainLogo.png';
import { useNavigate } from 'react-router';

function Navbar() {

    const navigate = useNavigate();

    return (
        <div className="surface-100 py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static">
            <img src={AnvilLogo} alt="hyper" height="50" />
            <a className="cursor-pointer hidden text-700">
                <i className="pi pi-bars text-4xl"></i>
            </a>
            <div className="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 top-100 px-6 lg:px-0 z-2 shadow-2 lg:shadow-none">
                <section></section>
                <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                    <button aria-label="Register" className="p-button p-component ml-3 p-button-outlined font-bold cursor-pointer"
                        onClick={() => navigate('payment')} style={{ borderColor: "#8F5A26" }}>
                        <span className="p-button-label p-c" style={{ color: "#8F5A26" }}>Purchase a Ticket</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
