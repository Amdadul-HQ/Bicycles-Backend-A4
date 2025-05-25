export const Role = ['admin', 'customer','vendor'];

export const USER_ROLE = {
    customer:'customer',
    admin: 'admin',
    vendor:'vendor'
} as const;

export const userSearchableFields = [
    'email',
    'name'
  ];

export type TUserRole = keyof typeof USER_ROLE;