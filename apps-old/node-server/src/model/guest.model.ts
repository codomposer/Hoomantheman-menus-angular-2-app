import { BaseUser } from '@menus/user-common'
export class Guest extends BaseUser {
  ID: number
  FirstName: string
  LastName: string
  Email: string
  Phone: string
  PlatformCompanyID: number
  GuestID: string
  GuestName: string
  GuestEmail: string
}
