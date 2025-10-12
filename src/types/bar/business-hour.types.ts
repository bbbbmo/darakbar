import z from 'zod'

export const dayOfWeekSchemes = z.enum([
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
])

export const BusinessHourDetailSchemes = z.object({
  id: z.number(),
  barId: z.number(),
  day_of_week: dayOfWeekSchemes.nullable(),
  open_time: z.string().nullable(),
  close_time: z.string().nullable(),
  is_closed: z.boolean().nullable(),
  last_order_time: z.string().nullable().optional(),
  significant: z.string().nullable(),
})

export type BusinessHourDetail = z.infer<typeof BusinessHourDetailSchemes>
