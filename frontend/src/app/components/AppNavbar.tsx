import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, useDisclosure, DateValue } from "@nextui-org/react";
import LogoutButton from "./LogoutButton";
import CalendarModal from "./CalendarModal";
import { parseDate } from '@internationalized/date';

interface AppNavbarProps {
  selectedOption: 'today' | 'all' | 'custom';
  setSelectedOption: (option: 'today' | 'all' | 'custom') => void;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const AppNavbar: React.FC<AppNavbarProps> = (props) => {
  const { selectedOption, setSelectedOption, setSelectedDate } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<DateValue | undefined>(parseDate(new Date().toISOString().split('T')[0]));

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (calendarDate) {
      setSelectedDate(calendarDate.toString());
    }
  }, [calendarDate]);

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
            onClick={() => {
              setSelectedOption('today')
              setIsMenuOpen(false);
            }}
          >
            Today tasks
          </Link>
        </NavbarItem>
        <NavbarItem className="px-2" isActive={selectedOption == 'all'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'all' ? 'primary' : 'foreground'}
            onClick={() => {
              setSelectedOption('all');
              setIsMenuOpen(false);
            }}
          >
            All tasks
          </Link>
        </NavbarItem>
        <NavbarItem className="px-2" isActive={selectedOption == 'custom'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'custom' ? 'primary' : 'foreground'}
            onClick={() => {
              setSelectedOption('custom');
              setIsMenuOpen(false);
              onOpen();
            }}
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
            onClick={() => {
              setSelectedOption('today');
              setIsMenuOpen(false);
            }}
            size="lg"
          >
            Today tasks
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="w-full" isActive={selectedOption == 'all'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'all' ? 'primary' : 'foreground'}
            onClick={() => {
              setSelectedOption('all');
              setIsMenuOpen(false);
            }}
            size="lg"
          >
            All tasks
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="w-full" isActive={selectedOption == 'custom'}>
          <Link
            className='hover:cursor-pointer'
            color={selectedOption == 'custom' ? 'primary' : 'foreground'}
            onClick={() => {
              onOpen();
              setSelectedOption('custom');
            }}
            size="lg"
          >
            Custom
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key='hamburger4'>
          <LogoutButton />
        </NavbarMenuItem>
      </NavbarMenu>

      <CalendarModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setIsMenuOpen={setIsMenuOpen}
        calendarDate={calendarDate}
        setCalendarDate={setCalendarDate}
      />
    </Navbar>
  );
}

export default AppNavbar;