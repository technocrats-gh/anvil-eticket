import { useNavigate } from "react-router";

function CancelPayment() {
    const navigate = useNavigate();
    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
    const contactPhone = import.meta.env.VITE_CONTACT_PHONE;

    return (
        <div className="flex flex-column align-items-center justify-content-center min-h-screen p-4 surface-0 text-center h-full" style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
            <div className="flex flex-column align-items-center mb-4">
                <i className="pi pi-times-circle" style={{ fontSize: '3rem', color: '#F44336' }}></i>
            </div>

            <h1 className="text-3xl font-bold mb-2">Cancelled Payment?</h1>
            <p className="text-lg mb-4">Ouch, something seems to have gone wrong. Kindly purchase your ticket again.</p>
            <p className="text-lg mb-4">
                If you have any questions, please contact us at <a href={`mailto:${contactEmail}`} className="text-blue-500 underline">{contactEmail}</a>
                {" "}or <a href={`tel:${contactPhone}`} className="text-blue-500 underline">{contactPhone}</a>.
            </p>

            <div className="flex justify-content-center mb-8">
                <button
                    className="p-button p-component p-button-outlined p-button-primary cursor-pointer hover:bg-orange-100"
                    style={{ borderColor: "#8F5A26", color: "#8F5A26" }}
                    onClick={() => navigate('/')}>
                    <strong>Return to Home</strong>
                </button>
                <button
                    className="p-button p-component p-button-primary cursor-pointer bg-green-500 hover:bg-green-300 border-green-500"
                    style={{ marginLeft: '10px', color: 'white' }}
                    onClick={() => navigate('/payment')}>
                    <strong>Buy Tickets</strong>
                </button>
            </div>

            <footer className="mt-8 p-4 text-center text-gray-400 bg-black">
                © 2025 Anvil Productions. All rights reserved.
                <br />
                Powered by Effesus Software Solutions
            </footer>
        </div>
    );
}

export default CancelPayment;
