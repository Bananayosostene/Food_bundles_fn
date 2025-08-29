"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, Clock, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function ContactUs() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Food Bundles staff here to assist you with any questions about our farm-fresh products and services.',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('product') || message.includes('vegetable') || message.includes('food')) {
      return 'We offer fresh organic produce including tomatoes, carrots, lettuce, potatoes, and more! All our products are sourced directly from trusted local farms. Would you like to know about specific products or pricing?'
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
      return 'Our prices are competitive and vary by product. For example, organic tomatoes are $4.99/kg and premium carrots are $3.49/kg. Bulk orders get special discounts. Would you like a detailed price list?'
    }
    
    if (message.includes('delivery') || message.includes('shipping')) {
      return 'We offer fast delivery directly from farms to restaurants. Delivery times vary by location, but typically take 1-2 business days. We also provide tracking information for all orders.'
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to Food Bundles! I\'m here to help you learn about our farm-to-restaurant service. What would you like to know?'
    }
    
    if (message.includes('hours') || message.includes('time') || message.includes('open')) {
      return 'Our customer service hours are Monday - Friday, 9am - 5pm PST. However, I\'m available 24/7 to answer your questions! For urgent matters, you can call us at (555) 123-4567.'
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return 'You can reach us at info@foodbundle.com or call (119) , +25078456389. Our office is located at 123 Market Street, Farmville, CA 94123. We typically respond within 24 hours!'
    }
    
    if (message.includes('thanks') || message.includes('thank you')) {
      return 'You\'re welcome! I\'m happy to help. Is there anything else you\'d like to know about our products or services?'
    }
    
    return 'That\'s a great question! For detailed information about that topic, I\'d recommend contacting our team directly at info@foodbundle.com or (119) +25078456389. They\'ll be able to provide you with comprehensive assistance. Is there anything else I can help with right now?'
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage.trim()),
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <section id="contact-us" className="min-h-screen relative z-10 px-8 py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 flex-1 min-h-0">
          {/* Left Column - AI Chat */}
          <div className="flex flex-col h-full min-h-0">
            <div className="mb-6 flex-shrink-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Chat with us for Assistant</h2>
            </div>

            {/* Chat Container */}
            <div className="flex-1 shadow-xl border-0 bg-green-100 rounded-lg border border-gray-200 flex flex-col min-h-0 max-h-130">
              {/* Chat Header */}
              <div className="text-center pb-2 p-6 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">FB</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Food Bundles Assistant</h3>
                </div>
                <p className="text-gray-600 text-sm">Ask me anything about our products and services</p>
              </div>

              {/* Messages Area - Scrollable */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 min-h-0 max-h-full">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-blue-600" />
                        ) : (
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">FB</span>
                          </div>
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start ">
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">FB</span>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-100 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 h-12 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    className="h-12 w-12 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors duration-200 flex items-center justify-center flex-shrink-0" 
                    disabled={isTyping || !inputMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="bg-green-50/50 rounded-2xl p-8 lg:p-10 border border-green-100/50 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>

            <div className="space-y-6 flex-shrink-0">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">123 Market Street, Farmville, CA 94123</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a
                    href="mailto:info@foodbundle.com"
                    className="text-green-600 hover:text-green-700 text-sm transition-colors"
                  >
                    info@foodbundle.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <a href="tel:+15551234567" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                    (555) 123-4567
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Hours</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Monday - Friday, 9am - 5pm PST</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-green-300/50 flex-shrink-0">
              <div className="bg-white/50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Quick Response</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please
                  call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}