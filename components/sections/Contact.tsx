'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSubmissionSchema } from '@/lib/validation';
import type { ContactSubmission } from '@/lib/types';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSubmission>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      service: 'Line production',
    },
  });

  const onSubmit = async (data: ContactSubmission) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitStatus('success');
      reset(); // clear form
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div>
          <div className="eyebrow mono">Come join us now</div>
          <h2 className="section-title">Send us a message.</h2>
          <p className="section-lede">
            Tell us what you’re making, where you plan to shoot and what kind of production support you need.
          </p>
          <div className="contact-list">
            <div className="contact-row">
              <span className="mono">Address</span>
              <a href="https://maps.app.goo.gl/YmK2xHwajpEm2gH49" target="_blank" rel="noopener noreferrer">
                22, 18th Main Rd, Nisarga Layout, Padmanabhanagar, Bengaluru, Karnataka 560070 ↗
              </a>
            </div>
            <div className="contact-row">
              <span className="mono">Mobile</span>
              <a href="tel:+919844672040">+91 98446 72040</a>
            </div>
            <div className="contact-row">
              <span className="mono">Hotline</span>
              <a href="tel:+918147702464">+91 81477 02464</a>
            </div>
            <div className="contact-row">
              <span className="mono">Email</span>
              <a href="mailto:mahafilms01@gmail.com">mahafilms01@gmail.com</a>
            </div>
          </div>
        </div>
        <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" {...register('name')} autoComplete="name" />
              {errors.name && <span className="error-text" style={{color: 'red', fontSize: '0.875rem'}}>{errors.name.message}</span>}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" {...register('phone')} type="tel" autoComplete="tel" />
              {errors.phone && <span className="error-text" style={{color: 'red', fontSize: '0.875rem'}}>{errors.phone.message}</span>}
            </div>
            <div className="field full">
              <label htmlFor="email">Email</label>
              <input id="email" {...register('email')} type="email" autoComplete="email" />
              {errors.email && <span className="error-text" style={{color: 'red', fontSize: '0.875rem'}}>{errors.email.message}</span>}
            </div>
            <div className="field full">
              <label htmlFor="service">Service needed</label>
              <select id="service" {...register('service')}>
                <option value="Line production">Line production</option>
                <option value="Location scouting & permissions">Location scouting & permissions</option>
                <option value="Crew & equipment">Crew & equipment</option>
                <option value="Advertisement / brand shoot">Advertisement / brand shoot</option>
                <option value="Film / digital content">Film / digital content</option>
                <option value="Other production support">Other production support</option>
              </select>
              {errors.service && <span className="error-text" style={{color: 'red', fontSize: '0.875rem'}}>{errors.service.message}</span>}
            </div>
            <div className="field full">
              <label htmlFor="message">Project details</label>
              <textarea id="message" {...register('message')} rows={6}></textarea>
              {errors.message && <span className="error-text" style={{color: 'red', fontSize: '0.875rem'}}>{errors.message.message}</span>}
            </div>
          </div>
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Email MAHA Films'}
          </button>
          
          {submitStatus === 'success' && (
            <p className="form-note" style={{ color: 'green', marginTop: '1rem' }}>
              Your message was sent successfully! We will get back to you soon.
            </p>
          )}
          
          {submitStatus === 'error' && (
            <p className="form-note" style={{ color: 'red', marginTop: '1rem' }}>
              There was an error sending your message. Please try again.
            </p>
          )}
          
          {submitStatus === 'idle' && (
            <p className="form-note">
              Submitting sends your enquiry to our production team.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
