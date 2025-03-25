
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps } from "class-variance-authority"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { sidebarMenuButtonVariants } from "../../utils"
import { useSidebar } from "../../context"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
    comingSoon?: boolean
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      comingSoon = false,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip && !comingSoon) {
      return button
    }

    let tooltipContent = tooltip;
    
    if (comingSoon) {
      tooltipContent = {
        children: "Simulation Only - Coming Soon",
        ...(typeof tooltip === "object" ? tooltip : {})
      };
    } else if (typeof tooltip === "string") {
      tooltipContent = {
        children: tooltip,
      };
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            hidden={state !== "collapsed" || isMobile}
            {...tooltipContent}
          />
        </Tooltip>
      </TooltipProvider>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export { SidebarMenuButton }
