import React from 'react';
import Schedule from "@/components/Schedule";

const Main = () => (
    <main className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-semibold">FrontEnd team meeting</h1>
        <p className="text-lg text-gray-600">Pick a convenient time to meet with the team</p>
        <div className="flex mt-8">
            <div className="w-1/2">
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold">Your name*</label>
                        <input type="text" id="name" placeholder="Blood"
                               className="w-full border border-purple-500 rounded p-2" required/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold">Your mail</label>
                        <input type="email" id="email" placeholder="mary@mail.ru"
                               className="w-full border border-purple-500 rounded p-2"/>
                        <p className="text-xs text-gray-500 mt-1">We will send you the final date and time of the
                            meeting after the end of the survey</p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                        <span>Load events from Google</span>
                        <i className="fas fa-external-link-alt"></i>
                    </button>
                    <p className="text-sm text-gray-500 mt-4" >Voting is active until 19pm</p>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded mt-4">SAVE
                    </button>
                </form>
            </div>
            <Schedule/>
        </div>
    </main>
);

export default Main;
