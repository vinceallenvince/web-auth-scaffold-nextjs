"use client";

import React, { useState } from 'react';
import { RadioGroup, Radio } from '@/app/components/ui/form';
import { FormField } from '@/app/components/ui/form/FormField';

export default function RadioGroupDemo() {
  const [selectedValue1, setSelectedValue1] = useState<string>('email');
  const [selectedValue2, setSelectedValue2] = useState<string>('red');
  const [selectedValue3, setSelectedValue3] = useState<string>('small');
  const [selectedValue4, setSelectedValue4] = useState<string>('');

  const notificationOptions = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notification' },
    { value: 'none', label: 'None', disabled: true }
  ];

  const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">RadioGroup Component Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Using options prop</h2>
          
          <div className="card bg-base-200 p-4">
            <h3 className="text-lg font-medium mb-4">Vertical Layout (Default)</h3>
            <RadioGroup
              label="Notification Preferences"
              description="How would you like to be notified?"
              name="notification-type"
              options={notificationOptions}
              value={selectedValue1}
              onValueChange={setSelectedValue1}
            />
            <div className="mt-2 text-sm">Selected value: {selectedValue1}</div>
          </div>
          
          <div className="card bg-base-200 p-4">
            <h3 className="text-lg font-medium mb-4">Horizontal Layout</h3>
            <RadioGroup
              label="Choose a Color"
              name="color"
              options={colorOptions}
              value={selectedValue2}
              onValueChange={setSelectedValue2}
              direction="horizontal"
            />
            <div className="mt-2 text-sm">Selected value: {selectedValue2}</div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Using children</h2>
          
          <div className="card bg-base-200 p-4">
            <FormField label="Choose a Size">
              <RadioGroup
                label="T-Shirt Size"
                name="size"
                value={selectedValue3}
                onValueChange={setSelectedValue3}
              >
                <Radio value="small" label="Small" checked={selectedValue3 === 'small'} onChange={() => setSelectedValue3('small')} />
                <Radio value="medium" label="Medium" checked={selectedValue3 === 'medium'} onChange={() => setSelectedValue3('medium')} />
                <Radio value="large" label="Large" checked={selectedValue3 === 'large'} onChange={() => setSelectedValue3('large')} />
              </RadioGroup>
            </FormField>
            <div className="mt-2 text-sm">Selected value: {selectedValue3}</div>
          </div>
          
          <div className="card bg-base-200 p-4">
            <h3 className="text-lg font-medium mb-4">With Error State</h3>
            <RadioGroup
              label="Payment Method"
              name="payment"
              error={!selectedValue4 ? "Please select a payment method" : undefined}
              required
            >
              <Radio value="credit" label="Credit Card" checked={selectedValue4 === 'credit'} onChange={() => setSelectedValue4('credit')} />
              <Radio value="debit" label="Debit Card" checked={selectedValue4 === 'debit'} onChange={() => setSelectedValue4('debit')} />
              <Radio value="paypal" label="PayPal" checked={selectedValue4 === 'paypal'} onChange={() => setSelectedValue4('paypal')} />
              <Radio value="bitcoin" label="Bitcoin" checked={selectedValue4 === 'bitcoin'} onChange={() => setSelectedValue4('bitcoin')} disabled />
            </RadioGroup>
            <div className="mt-2 text-sm">Selected value: {selectedValue4 || 'None'}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-base-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Component States</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Individual Radio States</h3>
            <div className="space-y-2">
              <Radio label="Default Radio" name="demo-states" />
              <Radio label="Checked Radio" name="demo-states" defaultChecked />
              <Radio label="Disabled Radio" name="demo-states" disabled />
              <Radio label="Disabled and Checked" name="demo-states" disabled defaultChecked />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">RadioGroup with FormField</h3>
            <FormField 
              label="Shipping Options" 
              helpText="Select your preferred shipping method"
              error="This is an example error message"
            >
              <RadioGroup name="shipping" label="Shipping Method">
                <Radio label="Standard Shipping" value="standard" />
                <Radio label="Express Shipping" value="express" />
                <Radio label="Next Day Delivery" value="next-day" />
              </RadioGroup>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
} 