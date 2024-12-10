import React from "react";
import { Button } from "../../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Menu, User, LogOut, Settings } from 'lucide-react';


const Navbar = ({ isLoggedIn, currentUser }) => {
    const handleLogout = () => {
        const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

        fetch('/users/sign_out', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    console.error("Logout failed");
                }
            })
            .catch(error => {
                console.error("Error during logout:", error);
            });
    };

    const NavLinks = ({ mobile = false }) => (
        <>
            <Button variant="ghost" asChild className={mobile ? "w-full justify-start" : ""}>
                <a href="/projects" className="text-gray-900 hover:text-gray-600 no-underline">
                    Projects
                </a>
            </Button>
            <Button variant="ghost" asChild className={mobile ? "w-full justify-start" : ""}>
                <a href="/employees" className="text-gray-900 hover:text-gray-600 no-underline">
                    Employees
                </a>
            </Button>
            <Button variant="ghost" asChild className={mobile ? "w-full justify-start" : ""}>
                <a href="/tasks" className="text-gray-900 hover:text-gray-600 no-underline">
                    Tasks
                </a>
            </Button>
        </>
    );

    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex md:flex-1">
                    <a href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Productivity Tool
                        </span>
                    </a>
                    <nav className="flex items-center space-x-1">
                        <NavLinks />
                    </nav>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <a href="/" className="flex items-center space-x-2">
                            <span className="font-bold">Productivity Tool</span>
                        </a>
                        <nav className="mt-4 flex flex-col space-y-2">
                            <NavLinks mobile />
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center">
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder-avatar.jpg" alt={currentUser} />
                                            <AvatarFallback>{currentUser.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-medium">Welcome, {currentUser}!</p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <a href="/users/edit" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Edit Profile</span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <a href="/settings" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" asChild>
                                    <a href="/login">Login</a>
                                </Button>
                                <Button asChild>
                                    <a href="/sign-up">Sign Up</a>
                                </Button>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </div>

    );
};

export default Navbar;
