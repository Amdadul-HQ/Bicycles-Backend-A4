export const Role = ['admin', 'customer'];

export const USER_ROLE = {
    customer:'customer',
    admin: 'admin',
} as const;

export const userSearchableFields = [
    'email',
    'name'
  ];

export type TUserRole = keyof typeof USER_ROLE;