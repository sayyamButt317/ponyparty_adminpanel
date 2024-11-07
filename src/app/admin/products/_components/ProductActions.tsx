// Setting 'use client' directive for Next.js to ensure this code runs on the client-side
"use client";

import React, { useTransition } from "react"; // Importing React hooks
import { DropdownMenuItem } from "./../../../../components/ui/dropdown-menu"; // Importing DropdownMenuItem for UI
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/products"; // Importing actions for product deletion and availability toggle
import { useRouter } from "next/navigation"; // Importing router to refresh the page

// ActiveToggleDropdownItem component: toggles the availability status of a product
export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string; // Product ID
  isAvailableForPurchase: boolean; // Availability status of the product
}) {
  const [isPending, startTransition] = useTransition(); // Hook to manage the transition state
  const router = useRouter(); // Router instance for refreshing the page after action

  return (
    <DropdownMenuItem
      disabled={isPending} // Disables the button while action is pending
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase); // Toggling product availability
          router.refresh(); // Refreshing the page after the action completes
        });
      }}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}{" "}
      {/* Dynamic button text based on product status */}
    </DropdownMenuItem>
  );
}

// DeleteDropdownItem component: deletes a product
export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string; // Product ID
  disabled: boolean; // Disable status based on certain conditions (e.g., if the product has orders)
}) {
  const [isPending, startTransition] = useTransition(); // Hook to manage the transition state
  const router = useRouter(); // Router instance for refreshing the page after deletion

  return (
    <DropdownMenuItem
      variant="destructive" // Variant for a destructive action (like deletion)
      disabled={disabled || isPending} // Disables the button if already pending or conditionally disabled
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id); // Deleting the product
          router.refresh(); // Refreshing the page after the action completes
        });
      }}
    >
      Delete {/* Button text */}
    </DropdownMenuItem>
  );
}
