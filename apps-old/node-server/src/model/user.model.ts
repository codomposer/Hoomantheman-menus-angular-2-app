import type { BaseUser } from '@menus/user-common'
import { UserRestaurantData } from './user-restaurant-data.model'

export class User extends BaseUser {
  UserRestaurantData: UserRestaurantData
}
