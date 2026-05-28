import { LinkComponent } from "@/components/LinkComponent";
import { Button } from "flowbite-react";

type Props = {
  id: string;
};

export default function EditButton({ id }: Props) {
  return (
    <Button outline as={LinkComponent} href={`/auctions/update/${id}`}>
      Update Auction
    </Button>
  );
}
