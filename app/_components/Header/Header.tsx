'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {

   
    const pathname = usePathname();
    const isActive = (path: string) => {
        return pathname === path ? "text-blue-600 font-bold" : "text-gray-800 hover:text-blue-600";
    }
    return (
        <div>
           <nav className="bg-white shadow-lg p-4 fixed top-0 left-0 right-0 w-full">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-gray-800 text-lg font-bold">
                        CurdApp
                    </div>
                    <ul className="flex space-x-4">
                        <li className={isActive("/")}>
                            <Link href="/" className="text-gray-800  hover:text-blue-600 " >
                                Home
                            </Link>
                        </li>
                        <li className={isActive("/inputFrom")}>
                            <Link href="/inputFrom" className="text-gray-800  hover:text-blue-600">
                                Input Form
                            </Link>
                        </li>
                        <li className={isActive("/showData")}>
                            <Link href="/showData" className="text-gray-800  hover:text-blue-600">
                                Show Data
                            </Link>
                        </li>

                       
                    </ul>
                </div>  
            </nav>
           
        </div>
    );
};

export default Header;