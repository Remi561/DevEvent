'use client'

import { useState } from "react"

const BookEvent = () => {
    const [email, setEmail] = useState('')
    const [submitted, setIsSubmitted] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setTimeout(() => {
            setIsSubmitted(true)
        }, 500)

        // Here you can also add logic to send the email to your backend or an API
    }
    
  return (
      <div id="book-event">
          {submitted ? (
          <p className="text-sm">Thank you for signing up</p>
          ) : (
                  <form onSubmit={handleSubmit} >
                      <div>
                          <label htmlFor="email">Email address</label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter your email" />
                      </div>

                      <button type="submit" className="button-submit">submit</button>
                  </form>
          )}
    </div>
  )
}

export default BookEvent