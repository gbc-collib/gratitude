import { Avatar, AvatarImage } from './avatar';
export function ProfilePic({ url }: { url: string }) {
    'use client';
    return (
        <Avatar>
            <AvatarImage src={url} className="w-12 h-12 rounded-full mr-2" />
        </Avatar>
    )

}
