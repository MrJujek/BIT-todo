import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import LogoutButton from "./LogoutButton";

interface AppNavbarProps {
  selectedOption: 'today' | 'all' | 'custom';
  setSelectedOption: (option: 'today' | 'all' | 'custom') => void;
}

const AppNavbar: React.FC<AppNavbarProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { selectedOption, setSelectedOption } = props;

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}

    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img src="/logo.svg" alt="EasyPlanner Logo" className="w-8 h-8 mb-1 mr-2" />
          <p className="font-bold text-inherit">EasyPlanner</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <img src="/logo.svg" alt="EasyPlanner Logo" className="w-8 h-8 mb-1 mr-2" />
          <p className="font-bold text-inherit">EasyPlanner</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="px-2" isActive={selectedOption == 'today'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'today' ? 'primary' : 'foreground'}
            onClick={() => setSelectedOption('today')}
          >
            Today tasks
          </Link>
        </NavbarItem>
        <NavbarItem className="px-2" isActive={selectedOption == 'all'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'all' ? 'primary' : 'foreground'}
            onClick={() => setSelectedOption('all')}
          >
            All tasks
          </Link>
        </NavbarItem>
        <NavbarItem className="px-2" isActive={selectedOption == 'custom'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'custom' ? 'primary' : 'foreground'}
            onClick={() => setSelectedOption('custom')}
          >
            Custom
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <LogoutButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="w-full" isActive={selectedOption == 'today'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'today' ? 'primary' : 'foreground'}
            onClick={() => setSelectedOption('today')}
            size="lg"
          >
            Today tasks
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="w-full" isActive={selectedOption == 'all'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'all' ? 'primary' : 'foreground'}
            onClick={() => setSelectedOption('all')}
            size="lg"
          >
            All tasks
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="w-full" isActive={selectedOption == 'custom'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'custom' ? 'primary' : 'foreground'}
            onClick={() => setSelectedOption('custom')}
            size="lg"
          >
            Custom
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key='hamburger4'>
          <LogoutButton />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default AppNavbar;