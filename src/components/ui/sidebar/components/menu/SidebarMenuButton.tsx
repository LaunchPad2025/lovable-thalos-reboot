
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSidebar } from "../../context"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    tooltip?: React.ReactNode
    tooltipSide?: "top" | "right" | "bottom" | "left"
    tooltipAlign?: "start" | "center" | "end"
    size?: "sm" | "default" | "lg"
    isActive?: boolean
  }
>(
  (
    {
      className,
      asChild = false,
      tooltip,
      tooltipSide = "right",
      tooltipAlign = "center",
      size = "default",
      isActive,
      children,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar()
    const showTooltip = tooltip && state === "collapsed"
    const Comp = asChild ? Slot : "button"

    if (showTooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              ref={ref}
              data-sidebar="menu-button"
              data-size={size}
              data-active={isActive}
              className={cn(
                "peer/menu-button flex min-w-0 items-center gap-2 rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg]:text-sidebar-icon",
                "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
                size === "sm" && "h-8 text-xs [&>svg]:size-4",
                size === "default" && "h-9 text-sm [&>svg]:size-5",
                size === "lg" && "h-11 text-base [&>svg]:size-5",
                "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:[&>span]:hidden",
                className
              )}
              {...props}
            >
              {children}
            </Comp>
          </TooltipTrigger>
          <TooltipContent side={tooltipSide} align={tooltipAlign}>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      )
    }

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          "peer/menu-button flex min-w-0 items-center gap-2 rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg]:text-sidebar-icon",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          size === "sm" && "h-8 text-xs [&>svg]:size-4",
          size === "default" && "h-9 text-sm [&>svg]:size-5",
          size === "lg" && "h-11 text-base [&>svg]:size-5",
          "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:[&>span]:hidden",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export { SidebarMenuButton }
