'use client';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton } from '@mui/material';
import { followNewUser } from '../actions/users';

export function FollowButton({ target }: { target: string }, { isFollowing }: { isFollowing: boolean }) {
    console.log("Target is");
    console.log(target);
    return (
        <form action={followNewUser}>
            <input type="hidden" name="target" value={target} />
            <IconButton type="submit">
                <PersonAddIcon className="text-extend-green" />
            </IconButton>
        </form>
    )
}