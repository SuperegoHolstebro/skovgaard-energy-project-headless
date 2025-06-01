import React from 'react'
import Section from '../sections/Section'
import Heading from '../atoms/Heading'
import EmployeeCard from '../molecules/EmployeeCard'
import { clean } from '@repo/utils/src/sanitize'

const EmployeesSection = ({ data }: any) => {
  return (
    <Section data={data}>
      <div className="col-span-full">
        <Heading>{data.heading}</Heading>
      </div>
      <Section
        paddingBottom="none"
        paddingTop="none"
        paddingX="none"
        tag="ul"
        className="bg-transparent col-span-full"
      >
        <EmployeesSection.Department section={data} />
        <EmployeesSection.All section={data} />
        <EmployeesSection.Manual section={data} />
      </Section>
    </Section>
  )
}

export default EmployeesSection
EmployeesSection.Department = Department
EmployeesSection.All = All
EmployeesSection.Manual = Manual

function Department({ section }: any) {
  return (
    <>
      {clean(section.view) === 'department' && (
        <>
          {section.department.map((department: any, index: number) => (
            <Section
              paddingX="none"
              paddingBottom="none"
              paddingTop="none"
              tag={'div'}
              key={index}
              className="col-span-full"
            >
              <div className="col-span-full">
                <Heading>{department.title}</Heading>
              </div>
              {department?.employees?.map((employee: any, index: number) => (
                <EmployeeCard key={index} employee={employee} />
              ))}
            </Section>
          ))}
        </>
      )}
    </>
  )
}
function Manual({ section }: any) {
  return (
    <>
      {clean(section.view) === 'manual' && (
        <>
          {section?.employees?.map((employee: any, index: number) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </>
      )}
    </>
  )
}
function All({ section }: any) {
  return (
    <>
      {clean(section.view) === 'all' && (
        <>
          {section?.employees?.map((employee: any, index: number) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </>
      )}
    </>
  )
}
