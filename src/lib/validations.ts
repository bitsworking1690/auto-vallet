import { z } from 'zod'

// Validate YYYY-MM-DD format and that the date is in the future (or today)
const pickupDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Select a pickup date').refine(
  (val) => {
    const d = new Date(val + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return d >= today
  },
  { message: 'Pickup date must be today or in the future' }
)

export const bookingSchema = z.object({
  firstName:        z.string().min(1, 'First name is required').max(64),
  lastName:         z.string().min(1, 'Last name is required').max(64),
  phone:            z.string().regex(/^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Enter a valid US phone number'),
  pickupZip:        z.string().regex(/^\d{5}$/, 'Enter a 5-digit ZIP code'),
  dropoffZip:       z.string().regex(/^\d{5}$/, 'Enter a 5-digit ZIP code'),
  vehicleMakeModel: z.string().min(2, 'Vehicle make & model required').max(128),
  serviceType:      z.enum(['maintenance', 'dealership', 'recall', 'other'], {
                      errorMap: () => ({ message: 'Select a service type' }),
                    }),
  pickupDate:       pickupDateSchema,
  timeSlot:         z.enum(['morning', 'afternoon'], {
                      errorMap: () => ({ message: 'Select a time slot' }),
                    }),
  preferredShop:    z.string().max(256).optional(),
  notes:            z.string().max(1000).optional(),
  addTip:           z.boolean().optional(),
  tipAmount:        z.number().min(0).max(200).optional(),
  agreedToTerms:    z.literal(true, { errorMap: () => ({ message: 'You must agree to the terms' }) }),
})

export type BookingFormValues = z.infer<typeof bookingSchema>

export const TIME_SLOTS = [
  {
    value:       'morning'   as const,
    label:       'Morning',
    time:        '8:00 AM – 12:00 PM',
    description: 'Driver arrives between 8 and 11 AM',
    emoji:       '🌅',
  },
  {
    value:       'afternoon' as const,
    label:       'Afternoon',
    time:        '1:00 PM – 4:00 PM',
    description: 'Driver arrives between 1 and 3 PM',
    emoji:       '☀️',
  },
]

// Base service price in cents (for Stripe)
export const BASE_SERVICE_PRICE_CENTS = 4900 // $49.00
