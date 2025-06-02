import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { AdvancedButtonProps } from '../types/AdvancedButton.types'
import { cn } from '@repo/utils/twMerge'

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
  'group/advancedbutton inline-flex items-center gap-4 justify-center cursor-pointer rounded-md text-regular font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', // whitespace-nowrap
  {
    variants: {
      variant: {
        outlineNegative: 'px-6 py-2.5 text-skovgaard-white border-skovgaard-white hover:bg-skovgaard-white hover:text-primary border',
        icon: 'border px-8 py-2.5 border-transparent hover:border-secondary rounded fill-secondary active:bg-secondary active:fill-skovgaard-white',
        default: 'px-6 py-2 bg-secondary rounded text-regular justify-center items-center inline-flex text-skovgaard-white transition-colors border border-secondary hover:bg-transparent hover:text-secondary active:bg-secondary active:text-skovgaard-white',
        destructive:
          'bg-destructive px-6 text-destructive-foreground hover:bg-destructive/90',
        outline:
          ' isolate *:z-10 px-6 !outline-none text-primary hover:text-skovgaard-white border active:bg-transparent active:text-primary transition-colors border-primary px-5 py-2 bg-transparent rounded justify-center items-center ———— relative before:absolute  before:inset-0 before:size-full before:bg-primary before:z-10 before:-translate-x-full before:translate-y-0 hover:before:translate-x-0 hover:before:translate-y-0 before:-left-px before:transition-all overflow-hidden before:duration-500 hover:before:left-0 before:ease-in-out  ',
        primary: 'px-6 py-2 bg-secondary rounded text-regular justify-center items-center inline-flex text-skovgaard-white transition-colors border border-secondary hover:bg-transparent hover:text-secondary active:bg-secondary active:text-skovgaard-white',

        secondary:
          'hover:bg-transparent px-6 hover:text-dark border active:bg-primary active:text-skovgaard-white transition-colors border-primary px-5 py-2 bg-primary rounded justify-center items-center  text-skovgaard-white ',
        ghost: 'hover:bg-accent px-6 hover:text-accent-foreground',
        link: 'text-secondary underline-offset-4 hover:underline hover:text-primary transition-all',
        none: '',
        tertiary: 'hover:scale-95 bg-skovgaard-turkis duration-735 transition ease-custom px-8 py-2 text-skovgaard-clean border hover:border-skovgaard-mørk border-skovgaard-turkis hover:bg-skovgaard-mørk hover:text-skovgaard-white-ish ',

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
