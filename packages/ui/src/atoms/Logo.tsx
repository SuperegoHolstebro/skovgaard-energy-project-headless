import SkovgaardEnergyLogo from '../logos/SkovgaardEnergyLogo'
import NordvestjyllandLogo from '../logos/NordvestjyllandLogo'
import React from 'react'
import CloudberryLogo from '../logos/CloudberryLogo'


/**
 * Logo-komponenten gengiver et SVG-logo med tilpasselige varianter og stilarter.
 *
 * @param {LogoProps} props - Egenskaberne for Logo-komponenten.
 * @param {string} props.variant - Varianten af logoet, der skal gengives.
 * @param {string} [props.className] - Yderligere CSS-klasser, der skal anvendes på logoet.
 * @param {React.SVGProps<SVGSVGElement>} props - Yderligere SVG-egenskaber, der skal videregives til logoet.
 *
 * @returns {JSX.Element} Det gengivne SVG-logo.
 */

export type LogoProps = {
  variant: "SkovgaardEnergy" | "Nordvestjylland" | "NeesHede" | "Cloudberry"
  className?: string
}

const Logo = ({ variant, className = " " }: LogoProps) => {
  return (
    <React.Fragment>
      {(() => {
        switch (variant) {
          case "SkovgaardEnergy":
            return <SkovgaardEnergyLogo className={className} />;
          case "Nordvestjylland":
            return <NordvestjyllandLogo className={className} />;
          case "NeesHede":
            return <div> Nees Hede logo </div>;
          case "Cloudberry":
            return <CloudberryLogo className={className} />;
          default:
            return <div> Ukendt logo </div>;
        }
      })()}
    </React.Fragment>
  )
};

export default Logo;