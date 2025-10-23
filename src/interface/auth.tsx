export interface User {
    [x: string]: string | number | boolean | string[] | undefined,
    $id: string,
    email: string,
    fullname: string,
    img?: string,
    bio?: string,
    address?: string,
    userId: string,
    createdAt: string,
    updatedAt?: string
}
