import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_your_publishable_key_here");

const CheckoutForm = ({ selectedPlan, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPlan.price * 100,
          currency: "usd"
        }),
      });

      const { clientSecret } = await response.json();
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name, email, address: { line1: address } }
        }
      });

      if (stripeError) throw stripeError;
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <button onClick={onClose} className="close-button">×</button>
      <h2>Purchase {selectedPlan.name}</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Form fields same as before */}
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : `Pay $${selectedPlan.price}`}
        </button>
      </form>
    </div>
  );
};

export const PurchaseModal = ({ show, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Starter",
      price: 99,
      features: [
        "1-year limited warranty",
        "Basic temperature control (cold/room temp)",
        "Manual water flow control",
        "LED indicator lights",
        "BPA-free materials",
        "Energy-saving mode",
        "Customer support via email"
      ],
      bestFor: "Individuals or small offices"
    },
    {
      id: "pro",
      name: "Pro",
      price: 149,
      features: [
        "3-year comprehensive warranty",
        "Touchless infrared sensor activation"
      ],
      popular: true,
      bestFor: "Families or busy workplaces"
    },
    {
      id: "premium",
      name: "Elite",
      price: 199,
      features: [
        "5-year full coverage warranty",
        "Precision temperature control (5 settings)",
        "UV water purification system",
        "Mineral enhancement filter",

      ],
      bestFor: "Premium homes & health-conscious users"
    },
    {
      id: "commercial",
      name: "Enterprise",
      price: 399,
      features: [
        "7-year commercial warranty",
        "High-capacity water tank (5 gallons)",
        "Continuous water supply option",
        "Multi-user recognition",
        "Usage analytics dashboard",
        "Dedicated account manager",
        "Same-day service guarantee",
        "Custom branding options",
        "ADA compliant design",
        "Monthly performance reports"
      ],
      bestFor: "Offices, gyms & commercial spaces"
    }
  ];

  if (!show) return null;

  return (
    <div className="modal-overlay">
      {paymentComplete ? (
        <div className="success-message">
          <h2>Thank you!</h2>
          <button onClick={onClose}>Close</button>
        </div>
      ) : selectedPlan ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm 
            selectedPlan={selectedPlan}
            onSuccess={() => setPaymentComplete(true)}
            onClose={onClose}
          />
        </Elements>
      ) : (
        <div className="plan-selection">
          <h2>Choose Your Plan</h2>
          {plans.map(plan => (
            <div key={plan.id} onClick={() => setSelectedPlan(plan)}>
              <h3>{plan.name}</h3>
              <p>${plan.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};