'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Heading from '../atoms/Heading'
import Icon from '../atoms/Icons'
import { AccordionContextType, AccordionProps } from '../types/Accordion.types'

const AccordionContext = createContext<AccordionContextType | null>(null)

const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider')
  }
  return context
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  unfloded = false,
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(unfloded)

  useEffect(() => {
    setIsOpen(unfloded)
  }, [unfloded])

  const toggle = () => setIsOpen(!isOpen)

  return (
    <AccordionContext.Provider value={{ isOpen: isOpen ? 'true' : 'false', toggle }}>
      <div
        className={` ease-custom transition-colors duration-500  bg-primary/10
          data-[state=open]:bg-primary data-[state=open]:prose-p:text-skovgaard-white data-[state=open]:prose-headings:!text-skovgaard-white
          accordion relative w-full rounded text-primary group overflow-hidden
          
           ${className}`}
        data-type="accordion"
        data-state={isOpen ? 'open' : 'closed'}
      >
        <AccordionButton>{title}</AccordionButton>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AccordionPanel>{children}</AccordionPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toggle, isOpen } = useAccordion()
  return (
    <button
      className=" ease-custom accordion-button group/state cursor-pointer
      after:absolute after:inset-0 after:size-full after:bg-primary after:hover:rounded after:rounded after:z-10 after:-translate-x-full after:translate-y-0 hover:after:translate-x-0 hover:after:translate-y-0 after:-left-px after:transition-all overflow-hidden after:duration-700 after:ease-custom
       flex items-center justify-between w-full p-4 transition-colors md:p-4 pr-13 hover:rounded  duration-700 overflow-hidden group-hover:text-skovgaard-white group-hover:prose-headings:!text-skovgaard-white group-hover:prose-p:text-skovgaard-white group-hover:prose-headings:text-skovgaard-white
      "
      onClick={toggle}
      aria-expanded={isOpen}
      data-state={isOpen}
    >
      <span className='z-20 relative'>
        <Heading spacing="none" className="z-10 relative m-0 text-left" tag="h6" size="md" text={'pretty'} dangerouslySetInnerHTML={{ __html: children as string }} />
      </span>
      <AccordionIcon />
    </button>
  )
}

const AccordionIcon: React.FC = () => {
  return (
    <span // ${isPanelOpen ? 'bg-skovgaard-white' : 'bg-transparent'}
      className={`
        group-data-[state=true]/state:bg-skovgaard-white
        group-hover:bg-skovgaard-white ease-custom duration-700 absolute p-2 border rounded right-4 border-primary size-8 overflow-hidden  z-20`}
    >
      <span // ${isPanelOpen ? 'rotate-180' : 'rotate-0'}
        className={` 
          group-data-[state=true]/state:rotate-180
          absolute inset-0 top-0 group-hover:top-1/2 group-hover:-translate-y-1/2 -translate-y-full translate-x-1/2 fill-primary [&_svg_path]:!fill-primary right-1/2  size-4  w-auto  *:size-4  transition-all ease-custom duration-700`}
      >
        <Icon type={'chevronDown'} />
      </span>
      <span // ${isPanelOpen ? 'rotate-180' : 'rotate-0'} 
        className={`
          group-data-[state=true]/state:rotate-180
          absolute inset-0 top-1/2 -translate-y-1/2 group-hover:translate-y-full translate-x-1/2 fill-primary [&_svg_path]:!fill-primary right-1/2  size-4  w-auto  *:size-4  transition-all ease-custom duration-700`}
      >
        <Icon type={'chevronDown'} />
      </span>
    </span>

    /*     <span className="absolute right-4 z-20">
          <Icon
            type="chevronDown"
            className="text-superego-dark group-data-[state=true]/state:rotate-180 transition-all size-6"
          />
        </span>*/
  )
}

const AccordionPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-4 pb-6 relative z-20 accordion-panel">{children}</div>
)

export default Accordion
