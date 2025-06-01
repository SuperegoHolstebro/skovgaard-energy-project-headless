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
        <Heading spacing="none" className=" z-10 relative m-0 text-left" tag="h6" size="md">
          {children}
        </Heading>
      </span>
      <AccordionIcon />
    </button>
  )
}

const AccordionIcon: React.FC = () => {
  return (
    <span className="absolute right-4 z-20">
      <Icon
        type="chevronDown"
        className="text-superego-dark group-data-[state=true]/state:rotate-180 transition-all size-6"
      />
    </span>
  )
}

const AccordionPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-4 pb-6 relative z-20 accordion-panel">{children}</div>
)

export default Accordion
