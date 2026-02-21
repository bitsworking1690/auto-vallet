import { z } from 'zod'

export const bookingSchema = z.object({
  firstName:       z.string().min(1, 'First name is required').max(64),
  lastName:        z.string().min(1, 'Last name is required').max(64),
  phone:           z.string().regex(/^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Enter a valid US phone number'),
  pickupZip:       z.string().regex(/^\d{5}$/, 'Enter a 5-digit ZIP code'),
  dropoffZip:      z.string().regex(/^\d{5}$/, 'Enter a 5-digit ZIP code'),
  vehicleMakeModel:z.string().min(2, 'Vehicle make & model required').max(128),
  serviceType:     z.enum(['maintenance', 'dealership', 'recall', 'other'], {
                     errorMap: () => ({ message: 'Select a service type' }),
                   }),
  preferredShop:   z.string().max(256).optional(),
  notes:           z.string().max(1000).optional(),
  tipAmount:       z.number().min(0).max(200).optional(),
  paymentMethod:   z.enum(['card', 'applepay', 'googlepay'], {
                     errorMap: () => ({ message: 'Select a payment method' }),
                   }),
  agreedToTerms:   z.literal(true, { errorMap: () => ({ message: 'You must agree to the terms' }) }),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
