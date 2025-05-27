import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { AdvancedButtonProps } from '@/types/AdvancedButton.types'
import { cn } from '@/utils/twMerge'

/**
 *
 * @returns: En knap-komponent med brugerdefineret styling
 * @example:
 * <AdvancedButton variant="default">Knap</AdvancedButton>
 * <AdvancedButton variant="default"><Link>Knap</Link></AdvancedButton>
 * <AdvancedButton variant="default"><Icon /><Link>Knap</Link></AdvancedButton>
 * @alias: AdvancedButton
 * @summary: Denne komponent bruges til at oprette en ny knap med brugerdefinerede stilarter.
 * @version: 1.0.0
 * @property: [variant, asChild]
 * @author: Kasper Buchholtz
 *
 **/

type ExtendedAdvancedButtonProps = AdvancedButtonProps &
  VariantProps<typeof advancedButton_Variants>

const advancedButton_Variants = cva(
  'inline-flex items-center gap-4 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', // whitespace-nowrap
  {
    variants: {
      variant: {
        default: 'bg-superego-green px-4 py-2 text-superego-light-light hover:bg-superego-green/90', // @deprecated
        primary: 'bg-superego-green px-4 py-2 text-superego-light-light hover:bg-superego-green/90',
        secondary: 'bg-superego-dark px-4 py-2 text-superego-light-light hover:bg-superego-dark/80',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const AdvancedButton = React.forwardRef<HTMLButtonElement, ExtendedAdvancedButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = (asChild ? Slot : 'button') as React.ElementType
    return (
      <Comp className={cn(advancedButton_Variants({ variant, className }))} ref={ref} {...props} />
    )
  },
)
AdvancedButton.displayName = 'Button'

export { AdvancedButton, advancedButton_Variants }
