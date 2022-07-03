import test from 'ava'
import { assign } from '@ctx-core/object'
import { ServiceType } from '@menus/service-type-common'
import { schedule_ctx_, param_schedule_ctx_I, schedule_ctx_I } from '../index.js'
test('schedule_n0_a: is_open: same_day_prep: ETAMax_$minute_tick before close', t=>{
	const schedule_ctx = schedule_ctx_(param_schedule_ctx_({
		minute_tick: new Date('2021-02-28T17:30:00Z')
	})) as schedule_ctx_I
	t.deepEqual(schedule_ctx.schedule_n0_a[0], _asap_schedule_n0())
	t.deepEqual(schedule_ctx.schedule_n0_a[1], {
		value: '2021-02-28T16:30:00Z',
		text: 'Sunday—Feb28',
		schedule_n1_a: [
			{
				value: '2021-02-28T19:30:00.000Z',
				utc_time: new Date('2021-02-28T19:30:00.000Z'),
				text: '11:30AM'
			},
			{
				value: '2021-02-28T19:45:00.000Z',
				utc_time: new Date('2021-02-28T19:45:00.000Z'),
				text: '11:45AM'
			},
			{
				value: '2021-02-28T20:00:00.000Z',
				utc_time: new Date('2021-02-28T20:00:00.000Z'),
				text: '12:00PM'
			},
			{
				value: '2021-02-28T20:15:00.000Z',
				utc_time: new Date('2021-02-28T20:15:00.000Z'),
				text: '12:15PM'
			},
			{
				value: '2021-02-28T20:30:00.000Z',
				utc_time: new Date('2021-02-28T20:30:00.000Z'),
				text: '12:30PM'
			},
			{
				value: '2021-02-28T20:45:00.000Z',
				utc_time: new Date('2021-02-28T20:45:00.000Z'),
				text: '12:45PM'
			},
			{
				value: '2021-02-28T21:00:00.000Z',
				utc_time: new Date('2021-02-28T21:00:00.000Z'),
				text: '01:00PM'
			},
			{
				value: '2021-02-28T21:15:00.000Z',
				utc_time: new Date('2021-02-28T21:15:00.000Z'),
				text: '01:15PM'
			},
			{
				value: '2021-02-28T21:30:00.000Z',
				utc_time: new Date('2021-02-28T21:30:00.000Z'),
				text: '01:30PM'
			},
			{
				value: '2021-02-28T21:45:00.000Z',
				utc_time: new Date('2021-02-28T21:45:00.000Z'),
				text: '01:45PM'
			},
			{
				value: '2021-02-28T22:00:00.000Z',
				utc_time: new Date('2021-02-28T22:00:00.000Z'),
				text: '02:00PM'
			},
			{
				value: '2021-02-28T22:15:00.000Z',
				utc_time: new Date('2021-02-28T22:15:00.000Z'),
				text: '02:15PM'
			},
			{
				value: '2021-02-28T22:30:00.000Z',
				utc_time: new Date('2021-02-28T22:30:00.000Z'),
				text: '02:30PM'
			}
		]
	})
})
function _asap_schedule_n0() {
	return {
		value: '',
		text: 'ASAP',
		schedule_n1_a: [],
	}
}
function param_schedule_ctx_(override_param_schedule_ctx?:Partial<param_schedule_ctx_I>):param_schedule_ctx_I {
	return assign({
		serviceType: ServiceType.SERVICE_TYPE_DELIVERY,
		minute_tick: new Date(),
		ETAMax: 120,
		restaurant_hours: {
			WorkingHours: [
				{
					Timezone: 'America/Los_Angeles',
					DayID: 7,
					DayName: 'Sunday',
					Date: '02/28/2021',
					Time: [
						{
							Start: '08:30:00',
							End: '14:30:00',
							Start_ISO: '2021-02-28T16:30:00Z',
							End_ISO: '2021-02-28T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 1,
					DayName: 'Monday',
					Date: '03/01/2021',
					Time: [
						{
							Start: '08:00:00',
							End: '18:00:00',
							Start_ISO: '2021-03-01T16:00:00Z',
							End_ISO: '2021-03-02T02:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 2,
					DayName: 'Tuesday',
					Date: '03/02/2021',
					Time: [
						{
							Start: '08:00:00',
							End: '10:00:00',
							Start_ISO: '2021-03-02T16:00:00Z',
							End_ISO: '2021-03-02T18:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						},
						{
							Start: '12:00:00',
							End: '19:00:00',
							Start_ISO: '2021-03-02T20:00:00Z',
							End_ISO: '2021-03-03T03:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 3,
					DayName: 'Wednesday',
					Date: '03/03/2021',
					Time: [
						{
							Start: '12:55:00',
							End: '15:25:00',
							Start_ISO: '2021-03-03T20:55:00Z',
							End_ISO: '2021-03-03T23:25:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 4,
					DayName: 'Thursday',
					Date: '03/04/2021',
					Time: [
						{
							Start: '08:00:00',
							End: '11:00:00',
							Start_ISO: '2021-03-04T16:00:00Z',
							End_ISO: '2021-03-04T19:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						},
						{
							Start: '14:00:00',
							End: '02:00:00',
							Start_ISO: '2021-03-04T22:00:00Z',
							End_ISO: '2021-03-05T10:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				}
			],
			'DeliveryHours': [
				{
					Timezone: 'America/Los_Angeles',
					DayID: 6,
					DayName: 'Saturday',
					Date: '02/27/2021',
					Time: [
						{
							Start: '11:30:00',
							End: '14:30:00',
							Start_ISO: '2021-02-27T19:30:00Z',
							End_ISO: '2021-02-27T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 7,
					DayName: 'Sunday',
					Date: '02/28/2021',
					Time: [
						{
							Start: '08:30:00',
							End: '14:30:00',
							Start_ISO: '2021-02-28T16:30:00Z',
							End_ISO: '2021-02-28T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 1,
					DayName: 'Monday',
					Date: '03/01/2021',
					Time: [
						{
							Start: '08:30:00',
							End: '14:30:00',
							Start_ISO: '2021-03-01T16:30:00Z',
							End_ISO: '2021-03-01T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						},
						{
							Start: '16:00:00',
							End: '19:00:00',
							Start_ISO: '2021-03-02T00:00:00Z',
							End_ISO: '2021-03-02T03:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 2,
					DayName: 'Tuesday',
					Date: '03/02/2021',
					Time: [
						{
							Start: '15:00:00',
							End: '19:00:00',
							Start_ISO: '2021-03-02T23:00:00Z',
							End_ISO: '2021-03-03T03:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 3,
					DayName: 'Wednesday',
					Date: '03/03/2021',
					Time: [
						{
							Start: '11:30:00',
							End: '18:35:00',
							Start_ISO: '2021-03-03T19:30:00Z',
							End_ISO: '2021-03-04T02:35:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						},
						{
							Start: '21:00:00',
							End: '02:00:00',
							Start_ISO: '2021-03-04T05:00:00Z',
							End_ISO: '2021-03-04T10:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 4,
					DayName: 'Thursday',
					Date: '03/04/2021',
					Time: [
						{
							Start: '13:30:00',
							End: '14:30:00',
							Start_ISO: '2021-03-04T21:30:00Z',
							End_ISO: '2021-03-04T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						},
						{
							Start: '18:00:00',
							End: '02:00:00',
							Start_ISO: '2021-03-05T02:00:00Z',
							End_ISO: '2021-03-05T10:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				}
			],
			'CateringHours': [
				{
					Timezone: 'America/Los_Angeles',
					DayID: 6,
					DayName: 'Saturday',
					Date: '02/27/2021',
					Time: [
						{
							Start: '11:30:00',
							End: '14:30:00',
							Start_ISO: '2021-02-27T19:30:00Z',
							End_ISO: '2021-02-27T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 7,
					DayName: 'Sunday',
					Date: '02/28/2021',
					Time: [
						{
							Start: '08:30:00',
							End: '14:30:00',
							Start_ISO: '2021-02-28T16:30:00Z',
							End_ISO: '2021-02-28T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 1,
					DayName: 'Monday',
					Date: '03/01/2021',
					Time: [
						{
							Start: '08:30:00',
							End: '14:30:00',
							Start_ISO: '2021-03-01T16:30:00Z',
							End_ISO: '2021-03-01T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						},
						{
							Start: '16:00:00',
							End: '19:00:00',
							Start_ISO: '2021-03-02T00:00:00Z',
							End_ISO: '2021-03-02T03:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 2,
					DayName: 'Tuesday',
					Date: '03/02/2021',
					Time: [
						{
							Start: '15:00:00',
							End: '19:00:00',
							Start_ISO: '2021-03-02T23:00:00Z',
							End_ISO: '2021-03-03T03:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 3,
					DayName: 'Wednesday',
					Date: '03/03/2021',
					Time: [
						{
							Start: '11:30:00',
							End: '18:35:00',
							Start_ISO: '2021-03-03T19:30:00Z',
							End_ISO: '2021-03-04T02:35:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						},
						{
							Start: '21:00:00',
							End: '02:00:00',
							Start_ISO: '2021-03-04T05:00:00Z',
							End_ISO: '2021-03-04T10:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				},
				{
					Timezone: 'America/Los_Angeles',
					DayID: 4,
					DayName: 'Thursday',
					Date: '03/04/2021',
					Time: [
						{
							Start: '13:30:00',
							End: '14:30:00',
							Start_ISO: '2021-03-04T21:30:00Z',
							End_ISO: '2021-03-04T22:30:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						},
						{
							Start: '18:00:00',
							End: '02:00:00',
							Start_ISO: '2021-03-05T02:00:00Z',
							End_ISO: '2021-03-05T10:00:00Z',
							TzOffsetHours: -8,
							TzOffsetMinutes: -480,
							TzOffsetSeconds: -28800,
							TzOffsetMilliSeconds: -28800000
						}
					]
				}
			]
		},
	}, override_param_schedule_ctx) as param_schedule_ctx_I
}
