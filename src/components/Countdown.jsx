import React, { useEffect, useState } from 'react';

function Countdown() {
    const eventDate = new Date('2025-05-28T19:00:00');

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = eventDate - now;
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-content-center gap-4 text-center w-full">
            <div className="grid grid-nogutter w-full">
                <div className="col-12 md:col-6 lg:col-3 p-3">
                    <div className="text-center p-5 border-round flex flex-column" style={{ backgroundColor: "#fdeaec" }}>
                        <i className="pi pi-calendar-times text-4xl block mb-4" style={{ color: "#EA2F3D" }}></i>
                        <span className="text-900 text-5xl">{timeLeft.days}</span>
                        <div className=" mt-3 font-medium" style={{ color: "#EA2F3D" }}>DAYS</div>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3 p-3">
                    <div className="bg-purple-50 text-center p-5 border-round flex flex-column">
                        <i className="text-purple-500 pi pi-clock text-4xl block mb-4"></i>
                        <span className="text-900 text-5xl">{timeLeft.hours}</span>
                        <div className="text-purple-700 mt-3 font-medium">HOURS</div>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3 p-3">
                    <div className="bg-teal-50 text-center p-5 border-round flex flex-column">
                        <i className="text-teal-500 pi pi-hourglass text-4xl block mb-4"></i>
                        <span className="text-900 text-5xl">{timeLeft.minutes}</span>
                        <div className="text-teal-700 mt-3 font-medium">MINUTES</div>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3 p-3">
                    <div className="bg-indigo-50 text-center p-5 border-round flex flex-column">
                        <i className="text-indigo-500 pi pi-stopwatch text-4xl block mb-4"></i>
                        <span className="text-900 text-5xl">{timeLeft.seconds}</span>
                        <div className="text-indigo-700 mt-3 font-medium">SECONDS</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Countdown;