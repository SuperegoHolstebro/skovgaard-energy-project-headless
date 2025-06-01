'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import Section from './Section'
import { AdvancedButton } from '../atoms/AdvancedButton'
import { useRouter } from 'next/navigation'

const ContactFormSection = ({ data }: any) => {
  const router = useRouter()

  const initialState = data?.fields?.reduce(
    (acc: any, field: any) => {
      acc[field?.name] = field?.type === 'checkbox' ? [] : ''
      return acc
    },
    { honeyPot: '' },
  ) // Honeypot-felt for spam-beskyttelse

  const [formData, setFormData] = useState(initialState)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (formData?.honeyPot) return // Stop bots

    setLoading(true)

    try {
      const payload = {
        ...formData,
        recipientEmail: data?.recipientEmail,
      }

      const response = await axios.post('/api/send-email', payload)

      if (data?.redirectAfterSubmit && data?.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        setStatus(successMessage)
        setIsSubmitted(true)
        setFormData(initialState)
      }
    } catch (error) {
      console.error('Fejl ved afsendelse:', error)
      setStatus(errorMessage as any)
    } finally {
      setLoading(false)
    }
  }
  const buttonText = data?.submitButtonText || data?.submitButtonText || 'Send'
  const loadingText = data?.loadingButtonText || data?.loadingButtonText || 'Sender...'
  const successMessage = data?.successMessage || data?.successMessage || 'Tak for din besked'
  const errorMessage = 'Noget gik galt'

  return (
    <Section className="relative overflow-hidden">
      <div className="grid col-span-full md:grid-cols-2">
        <div className="col-span-1 pb-8 md:pr-20 prose-p:font-extralight">
          <Heading size="lg" spacing="small">
            {data?.heading}
          </Heading>
          <Paragraph className="text-center font-extralight md:text-left">
            {data?.description}
          </Paragraph>
        </div>

        {isSubmitted ? (
          <Paragraph>{status}</Paragraph>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {data?.fields?.map((field: any) => (
              <div key={field.name}>
                {field.type === 'textarea' ? (
                  <label>
                    {field.label}
                    <textarea
                      name={field.label}
                      placeholder={field.placeholder}
                      value={formData[field.label]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full border-b bg-inherit"
                    />
                  </label>
                ) : field.type === 'select' ? (
                  <label>
                    {field.label} {field.required && '*'}
                    <select
                      name={field.label}
                      value={formData[field.label]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full border-b bg-inherit"
                    >
                      <option value=""> {field.placeholder || 'Vælg...'}</option>
                      {field.options?.map((option: any) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : field.type === 'radio' ? (
                  <fieldset>
                    <legend className="mb-1 font-medium">
                      {field.label} {field.required && '*'}
                    </legend>
                    {field.options?.map((option: any) => (
                      <label key={option} className="block">
                        <input
                          type="radio"
                          name={field.label}
                          value={option}
                          checked={formData[field.label] === option}
                          onChange={handleChange}
                          required={field.required}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </fieldset>
                ) : field.type === 'checkbox' ? (
                  <fieldset>
                    <legend className="mb-1 font-medium">
                      {field.label} {field.required && '*'}
                    </legend>
                    {field.options?.map((option: any) => (
                      <label key={option} className="block">
                        <input
                          type="checkbox"
                          name={field.label}
                          value={option}
                          checked={
                            Array.isArray(formData[field.label]) &&
                            formData[field.label].includes(option)
                          }
                          onChange={(e) => {
                            const valueArray = Array.isArray(formData[field.label])
                              ? [...formData[field.label]]
                              : []
                            if (e.target.checked) {
                              valueArray.push(option)
                            } else {
                              const index = valueArray.indexOf(option)
                              if (index > -1) valueArray.splice(index, 1)
                            }
                            setFormData({ ...formData, [field.label]: valueArray })
                          }}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </fieldset>
                ) : (
                  <label>
                    {field.label} {field.required && '*'}
                    <input
                      type={field.type}
                      name={field.label}
                      placeholder={field.placeholder}
                      value={formData[field.label]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full border-b bg-inherit"
                    />
                  </label>
                )}
              </div>
            ))}
            {/* Honeypot */}
            <input
              type="text"
              name="honeyPot"
              className="hidden"
              autoComplete="off"
              onChange={handleChange}
            />

            <AdvancedButton type="submit" disabled={loading}>
              {loading ? loadingText : buttonText}{' '}
            </AdvancedButton>
          </form>
        )}
      </div>
    </Section>
  )
}

export default ContactFormSection
