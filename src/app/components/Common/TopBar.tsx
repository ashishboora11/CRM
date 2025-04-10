import React from 'react';
import { Search, Mail, Bell, Smartphone } from 'lucide-react';

function TopBar() {
    return (
        <div>
            <div className="flex justify-end items-center space-x-10">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-3 w-[450px] rounded-full border focus:outline-none border-gray-600"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                </div>
                <div className="flex items-center space-x-8 text-gray-600">
                    <Mail size={30} className="cursor-pointer hover:text-blue-500" />
                    <Bell size={30} className="cursor-pointer hover:text-blue-500" />
                    <Smartphone size={30} className="cursor-pointer hover:text-blue-500" />
                </div>
            </div>
        </div>
    );
}

export default TopBar;
