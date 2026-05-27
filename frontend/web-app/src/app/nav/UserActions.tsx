"use client";
import { signOut } from "next-auth/react";
import { LinkComponent } from "@/components/LinkComponent";
import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import { User } from "next-auth";
import Link from "next/link";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi2";

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  return (
    <Dropdown inline label={`Welcome ${user.name}`} className="cursor-pointer">
      <DropdownItem icon={HiUser}>My Auctions</DropdownItem>
      <DropdownItem icon={AiFillTrophy}>Auctions won</DropdownItem>
      <DropdownItem icon={AiFillCar}>Sell my car</DropdownItem>
      <DropdownItem as={LinkComponent} href="/session" icon={HiCog}>
        Session
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem
        icon={AiOutlineLogout}
        onClick={() => signOut({ redirectTo: "/" })}
      >
        Sign Out
      </DropdownItem>
    </Dropdown>
  );
}
