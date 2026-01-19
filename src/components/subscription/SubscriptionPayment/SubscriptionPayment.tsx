'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import './SubscriptionPayment.scss';

export function SubscriptionPayment() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvc: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    // TODO: Process payment
    router.push('/suscripcion/confirmacion');
  };

  // TODO: Get selected plan from state/URL params
  const selectedPlan = {
    name: 'ProAgent Plus',
    price: 39.00,
  };

  const taxes = 0.00;
  const total = selectedPlan.price + taxes;

  return (
    <div className="subscription-payment">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Container */}
      <div className="subscription-payment__container">
        {/* Payment Card */}
        <div className="subscription-payment__card">
          {/* Left Panel - Order Summary */}
          <div className="subscription-payment__summary">
            <div className="subscription-payment__summary-content">
              <h2 className="subscription-payment__summary-title">
                Resumen del Pedido
              </h2>
              <p className="subscription-payment__summary-subtitle">
                Suscripción <strong>{selectedPlan.name}</strong>
              </p>

              {/* Price Breakdown */}
              <div className="subscription-payment__breakdown">
                <div className="subscription-payment__breakdown-item">
                  <span className="subscription-payment__breakdown-label">Plan Pro</span>
                  <span className="subscription-payment__breakdown-value">${selectedPlan.price.toFixed(2)}</span>
                </div>
                <div className="subscription-payment__breakdown-item">
                  <span className="subscription-payment__breakdown-label">Impuestos</span>
                  <span className="subscription-payment__breakdown-value">${taxes.toFixed(2)}</span>
                </div>
                <div className="subscription-payment__breakdown-total">
                  <span className="subscription-payment__breakdown-total-label">Total</span>
                  <span className="subscription-payment__breakdown-total-value">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="subscription-payment__security">
              <span className="material-symbols-outlined subscription-payment__security-icon">
                lock
              </span>
              <span className="subscription-payment__security-text">
                Pago 100% seguro y encriptado
              </span>
            </div>
          </div>

          {/* Right Panel - Payment Form */}
          <div className="subscription-payment__form-panel">
            <div className="subscription-payment__form">
              {/* Header */}
              <div className="subscription-payment__form-header">
                <h2 className="subscription-payment__form-title">Detalles de Pago</h2>
                <p className="subscription-payment__form-subtitle">
                  Complete la información para procesar su pago.
                </p>
              </div>

              {/* Form Fields */}
              <div className="subscription-payment__fields">
                {/* Card Number */}
                <div className="subscription-payment__field">
                  <label className="subscription-payment__label">
                    <span className="material-symbols-outlined">
                      credit_card
                    </span>
                    Número de Tarjeta
                  </label>
                  <Input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="subscription-payment__input"
                    maxLength={19}
                  />
                </div>

                {/* Card Holder */}
                <div className="subscription-payment__field">
                  <label className="subscription-payment__label">
                    <span className="material-symbols-outlined">
                      person
                    </span>
                    Titular de la Tarjeta
                  </label>
                  <Input
                    type="text"
                    placeholder="Como aparece en la tarjeta"
                    value={formData.cardHolder}
                    onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                    className="subscription-payment__input"
                  />
                </div>

                {/* Expiration and CVC */}
                <div className="subscription-payment__field-row">
                  <div className="subscription-payment__field subscription-payment__field--half">
                    <label className="subscription-payment__label">
                      <span className="material-symbols-outlined">
                        calendar_today
                      </span>
                      Expiración
                    </label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expirationDate}
                      onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                      className="subscription-payment__input"
                      maxLength={5}
                    />
                  </div>
                  <div className="subscription-payment__field subscription-payment__field--half">
                    <label className="subscription-payment__label">
                      <span className="material-symbols-outlined">
                        password
                      </span>
                      CVC
                    </label>
                    <Input
                      type="text"
                      placeholder="123"
                      value={formData.cvc}
                      onChange={(e) => handleInputChange('cvc', e.target.value)}
                      className="subscription-payment__input"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                className="subscription-payment__submit"
                onClick={handlePayment}
              >
                Pagar Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
