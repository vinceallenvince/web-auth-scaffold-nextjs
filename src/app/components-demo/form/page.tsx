"use client";

import React, { useState } from 'react';
import {
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch
} from '@/app/components/ui/form';
import { validate, required, email, minLength, ValidatableValue, Validator } from '@/lib/form-validation';

export default function FormComponentsDemo() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    country: '',
    acceptTerms: false,
    notificationType: 'email',
    darkMode: false
  });
  
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: ValidatableValue) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateField = (field: string, value: ValidatableValue, validators: Validator[]) => {
    const result = validate(value, validators);
    return result.errorMessage;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string | undefined> = {
      name: validateField('name', formState.name, [required(), minLength(2)]),
      email: validateField('email', formState.email, [required(), email()]),
      message: validateField('message', formState.message, [required()]),
      country: validateField('country', formState.country, [required()]),
      acceptTerms: formState.acceptTerms ? undefined : 'You must accept the terms'
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== undefined);
    
    if (!hasErrors) {
      setIsSubmitted(true);
      // In a real app, you would submit the form data to an API
      console.log('Form submitted:', formState);
    }
  };

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'other', label: 'Other' }
  ];

  const notificationOptions = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notification' },
    { value: 'none', label: 'None', disabled: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Form Components Demo</h1>
      
      {isSubmitted ? (
        <div className="bg-success/20 p-4 rounded-lg mb-6">
          <h2 className="text-success font-bold">Form Submitted Successfully!</h2>
          <p>Thank you for your submission.</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => {
              setIsSubmitted(false);
              setFormState({
                name: '',
                email: '',
                message: '',
                country: '',
                acceptTerms: false,
                notificationType: 'email',
                darkMode: false
              });
            }}
          >
            Reset Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              error={errors.name}
              required
              id="name-field"
            >
              <Input
                id="name-field"
                placeholder="John Doe"
                value={formState.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                required
              />
            </FormField>
            
            <FormField
              label="Email Address"
              error={errors.email}
              required
              helpText="We'll never share your email"
              id="email-field"
            >
              <Input
                id="email-field"
                type="email"
                placeholder="you@example.com"
                value={formState.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
                required
              />
            </FormField>
          </div>
          
          <FormField
            label="Message"
            error={errors.message}
            required
            helpText="Tell us what you think"
            id="message-field"
          >
            <Textarea
              id="message-field"
              placeholder="Enter your message here..."
              value={formState.message}
              onChange={(e) => handleChange('message', e.target.value)}
              error={!!errors.message}
              required
            />
          </FormField>
          
          <FormField
            label="Country"
            error={errors.country}
            required
            id="country-field"
          >
            <Select
              id="country-field"
              placeholder="Select your country"
              options={countryOptions}
              value={formState.country}
              onChange={(e) => handleChange('country', e.target.value)}
              error={!!errors.country}
              required
            />
          </FormField>
          
          <FormField
            label="Notification Preferences"
            helpText="How would you like to be notified?"
            id="notification-field"
          >
            <RadioGroup
              name="notificationType"
              options={notificationOptions}
              value={formState.notificationType}
              onValueChange={(value) => handleChange('notificationType', value)}
              direction="vertical"
              label="Select a notification method"
            />
          </FormField>
          
          <div className="flex flex-col gap-4 my-4">
            <Switch
              label="Enable Dark Mode"
              checked={formState.darkMode}
              onChange={(e) => handleChange('darkMode', e.target.checked)}
              id="dark-mode-switch"
            />
            
            <Checkbox
              label="I accept the terms and conditions"
              checked={formState.acceptTerms}
              onChange={(e) => handleChange('acceptTerms', e.target.checked)}
              error={!!errors.acceptTerms}
              id="terms-checkbox"
            />
            {errors.acceptTerms && (
              <div className="text-error text-sm">{errors.acceptTerms}</div>
            )}
          </div>
          
          <div className="mt-6">
            <button type="submit" className="btn btn-primary w-full md:w-auto">
              Submit Form
            </button>
          </div>
        </form>
      )}
      
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-bold mb-4">Component States</h2>
        
        <h3 className="text-lg font-medium mb-2">Input States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <FormField label="Default Input" id="default-input">
            <Input id="default-input" placeholder="Default input" />
          </FormField>
          
          <FormField label="Focused Input" helpText="Click to focus" id="focused-input">
            <Input id="focused-input" placeholder="Click me" />
          </FormField>
          
          <FormField label="Error Input" error="This field has an error" id="error-input">
            <Input id="error-input" placeholder="Error state" error />
          </FormField>
          
          <FormField label="Disabled Input" id="disabled-input">
            <Input id="disabled-input" placeholder="Disabled" disabled />
          </FormField>
          
          <FormField label="Required Input" required id="required-input">
            <Input id="required-input" placeholder="Required field" required />
          </FormField>
          
          <FormField label="With Helper Text" helpText="This is some helper text" id="helper-input">
            <Input id="helper-input" placeholder="With helper text" />
          </FormField>
        </div>
        
        <h3 className="text-lg font-medium mb-2">Select States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <FormField label="Default Select" id="default-select">
            <Select
              id="default-select"
              placeholder="Select an option"
              options={countryOptions}
            />
          </FormField>
          
          <FormField label="Error Select" error="Please select an option" id="error-select">
            <Select
              id="error-select"
              placeholder="Select an option"
              options={countryOptions}
              error
            />
          </FormField>
          
          <FormField label="Disabled Select" id="disabled-select">
            <Select
              id="disabled-select"
              placeholder="Select an option"
              options={countryOptions}
              disabled
            />
          </FormField>
        </div>
        
        <h3 className="text-lg font-medium mb-2">Checkbox & Radio States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Checkbox id="default-checkbox" label="Default Checkbox" />
            <Checkbox id="checked-checkbox" label="Checked Checkbox" defaultChecked />
            <Checkbox id="error-checkbox" label="Error Checkbox" error />
            <Checkbox id="disabled-checkbox" label="Disabled Checkbox" disabled defaultChecked />
          </div>
          
          <div>
            <Radio id="default-radio" label="Default Radio" name="demo" />
            <Radio id="checked-radio" label="Checked Radio" name="demo" defaultChecked />
            <Radio id="error-radio" label="Error Radio" name="demo" error />
            <Radio id="disabled-radio" label="Disabled Radio" name="demo" disabled />
          </div>
        </div>
      </div>
    </div>
  );
} 