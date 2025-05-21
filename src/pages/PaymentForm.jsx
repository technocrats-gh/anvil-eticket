import { useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { redirect } from "react-router";
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import Poster from "../images/stage-play.jpg";

import { ProgressSpinner } from 'primereact/progressspinner';

function PaymentForm() {

    const [ticketNumber, setTicketNumber] = useState(1);
    const [totalCost, setTotalCost] = useState(50.00);
    const [isProcessing, setIsProcessing] = useState(false);
    const unitCost = 50.00; // Assuming each ticket costs GHS50

    const paystackKey = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
    const baseURL = import.meta.env.VITE_BASE_URL;

    const instance = axios.create({
        baseURL: 'https://api.paystack.co',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${paystackKey}` }
    });

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        contact: '',
        network: '',
        reference: '',
        other_ref: '',
        cast: '',
        totalCost: totalCost,
    };

    const onSubmit = async (values) => {
        let fee = Math.round((totalCost * 0.0195) * 100) / 100;
        const customerMetaData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            address: values.address,
            contact: values.contact,
            network: values.network,
            reference: values.reference,
            other_ref: values.other_ref,
            cast: values.cast,
            totalCost: totalCost + fee,
            ticketNumber: ticketNumber,
        };

        const customerMetaDataString = encodeURI(JSON.stringify(customerMetaData));
        localStorage.setItem("customerMetaData", customerMetaDataString);
        setIsProcessing(true);

        try {
            const response = await instance.post('/transaction/initialize', {
                email: values.email,
                amount: (totalCost + fee) * 100, // Paystack expects amount in pesewas
                currency: 'GHS',
                // reference: 'DedeiAshikishan',
                callback_url: `${baseURL}/sms-notification`,
                metadata: {
                    cancel_action: `${baseURL}/cancel-payment`,
                }
            });

            const authorizationUrl = response.data?.data?.authorization_url;
            if (authorizationUrl) {
                window.location.href = authorizationUrl;
            } else {
                console.error("Authorization URL missing in response");
            }
        } catch (error) {
            console.error("Payment initialization failed:", error);
        }
    };


    const validate = value => {
        let errorMessage;
        if (value.length < 1) {
            errorMessage = 'Invalid input';
        }
        return errorMessage;
    };

    if (isProcessing) {
        return (
            <div className="flex flex-column align-items-center justify-center min-h-screen bg-bluegray-100 text-black justify-content-center" style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
                <ProgressSpinner />
                <div className="text-lg font-medium mt-3">Processing...</div>
            </div>
        );
    }

    return (
        <div className="layout-wrapper layout-wrapper-light" style={{ fontFamily: "Roboto Condensed, sans- serif" }}>
            <div className="layout-content">
                <div className="block-section">
                    <div className="block-header">
                        <span className="block-title">
                            <span>Purchase E-Ticket</span>
                        </span>
                    </div>
                    <div className="block-content">
                        <div>
                            <div className="surface-section">
                                <div className="grid grid-nogutter">
                                    <div className="col-12 lg:col-6 h-full px-4 py-8 md:px-6 ">
                                        <img src={Poster} alt="Dedei_Ashikishan_Poster" className="col-12 w-full" />
                                    </div>
                                    <div className="col-12 lg:col-6 px-4 py-8 md:px-6 lg:px-8 surface-50">
                                        <div className="border-bottom-1 pb-3 surface-border">
                                            <span className="text-900 font-medium text-xl">Your Purchase</span>
                                        </div>
                                        <div className="flex flex-column lg:flex-row flex-wrap lg:align-items-center py-2 mt-3 md:my-6">
                                            <div className="grid formgrid ">
                                                <div className="col-12 field mb-6">
                                                    <span className="text-900 text-2xl block font-medium mb-5">Contact Information</span>
                                                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                                        {props => (
                                                            <Form>
                                                                <div className="grid formgrid">
                                                                    <div className="col-12 lg:col-6 field mb-4">
                                                                        <Field id="firstName" name="firstName" placeholder="Name" className="p-inputtext lg:w-full" style={{ borderColor: props.errors.firstName ? "red" : "" }} validate={validate} />
                                                                    </div>
                                                                    <div className="col-12 lg:col-6 field mb-4">
                                                                        <Field id="lastName" name="lastName" placeholder="Last Name" className="p-inputtext lg:w-full" style={{ borderColor: props.errors.lastName ? "red" : "" }} validate={validate} />
                                                                    </div>
                                                                    <div className="col-12 lg:col-6  field mb-4">
                                                                        <Field id="address" name="address" placeholder="City of Residence" className="p-inputtext lg:w-full" />
                                                                    </div>
                                                                    <div className="col-12 lg:col-6 field mb-4">
                                                                        <Field id="email" name="email" placeholder="Email" type="email" className="p-inputtext lg:w-full" style={{ borderColor: props.errors.email ? "red" : "" }} validate={validate} />
                                                                    </div>
                                                                    <div className="col-12 lg:col-6 field mb-4">
                                                                        <Field id="contact" name="contact" placeholder="Contact Number" className="p-inputtext lg:w-full" style={{ borderColor: props.errors.contact ? "red" : "" }} validate={validate} />
                                                                    </div>
                                                                    <div className="col-12 lg:col-6 field mb-4">
                                                                        <Field as="select" id="network" name="network" className="p-inputtext lg:w-full " style={{ borderColor: props.errors.network ? "red" : "" }} validate={validate}>
                                                                            <option value="">Select Network</option>
                                                                            <option value="MTN">MTN</option>
                                                                            <option value="AT">AT</option>
                                                                            <option value="TELECEL">TELECEL</option>
                                                                        </Field>
                                                                    </div>
                                                                    <div className="col-12 field mb-4">
                                                                        <Field as="select" id="reference" name="reference" className="p-inputtext lg:w-full" style={{ borderColor: props.errors.reference ? "red" : "" }} validate={validate}>
                                                                            <option value="">How did you hear of Dedi Ashikishan?</option>
                                                                            <option value="SOCIAL_MEDIA">Social Media</option>
                                                                            <option value="FRIENDS_FAMILY">Friends/Family</option>
                                                                            <option value="CAST">Cast</option>
                                                                            <option value="FOLKSPLACE">National Theater - Folksplace</option>
                                                                            <option value="WEBSITE">Website</option>
                                                                            <option value="OTHER">Other</option>
                                                                        </Field>
                                                                    </div>

                                                                    {props.values.reference === "OTHER" &&
                                                                        <div className="col-12 field mb-4">
                                                                            <Field id="other_ref" name="other_ref" placeholder="Specify how you heard of Dedi Ashikishan" className="p-inputtext lg:w-full"
                                                                                style={{ borderColor: props.errors.other_ref && !props.values.reference ? "red" : "" }} validate={validate} />
                                                                        </div>
                                                                    }
                                                                    {props.values.reference === "CAST" &&
                                                                        <div className="col-12 field mb-4">
                                                                            <Field as="select" id="cast" name="cast" className="p-inputtext lg:w-full" style={{ borderColor: props.errors.cast ? "red" : "" }} validate={validate}>
                                                                                <option value="">Which cast member referred you?</option>
                                                                                <option value="KS">KOJO SACKEY</option>
                                                                                <option value="BA">BELINDA APEDOE</option>
                                                                                <option value="NV">NHADJIL VAN-DYCK</option>
                                                                                <option value="SK">SAMUEL KODIE</option>
                                                                                <option value="BK">BRIGHT KOBBSON</option>
                                                                                <option value="TY">PATRICIA AMEWUSIKA</option>
                                                                            </Field>
                                                                        </div>
                                                                    }
                                                                </div>

                                                                <span className="text-900 text-2xl block font-medium mb-5">Order</span>
                                                                <div className="flex flex-column lg:flex-row flex-wrap  py-2 mt-3 border-bottom-1 surface-border md:">
                                                                    <img src={Poster} className="w-8rem h-8rem flex-shrink-0 mb-3" alt="checkoutform-1-2" />
                                                                    <div className="flex-auto lg:ml-3 w-14rem lg:w-full">
                                                                        <div className="flex align-items-center justify-content-between mb-3">
                                                                            <span className="text-900 font-medium">Dedei Ashikishan</span>
                                                                            <span className="text-900 font-bold">GHS {unitCost}</span>
                                                                        </div>
                                                                        <InputNumber value={ticketNumber} onValueChange={e => { setTicketNumber(e.value); setTotalCost(e.value * unitCost) }} showButtons buttonLayout="horizontal" step={1}
                                                                            decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                                                                            mode="decimal" className="justify-items-center" size={12} />
                                                                    </div>
                                                                </div>
                                                                <div className="py-2 mt-3 md:mx-4">
                                                                    <div className="flex justify-content-between align-items-center mb-3 w-14rem lg:w-full">
                                                                        <span className="text-900 font-bold">Total</span>
                                                                        <span className="text-900 font-medium text-xl">GHS {totalCost}</span>
                                                                    </div>
                                                                </div>
                                                                <button type="submit" className="p-button p-component p-button-primary lg:w-auto lg:px-6 flex-order-1 lg:flex-order-2">Buy</button>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="p-4 text-center text-gray-400 bg-black">
                © 2025 Anvil Productions. All rights reserved.
                <br />
                Powered by Effesus Software Solutions
            </footer>
        </div>
    )
}

export default PaymentForm;
