export interface todo {
    id?: string,
    title: string, 
    description: string, 
    comments: string, 
    category: string, 
    assignee?: string,
    invites?: string[],
    status: 'pending' | 'upcoming' | 'in progress' | 'completed' | 'suspended'
    createdAt?: string,
    updatedAt?: string,
}