'use client';
import { unfollowUser } from "../actions/users";
import { IconButton } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export function UnfollowButton({ target }: { target: string }) {
    console.log("Target is");
    console.log(target);

    return (
        <form action={unfollowUser}>
            <input type="hidden" name="target" value={target} />
            <IconButton type="submit">
                <PersonRemoveIcon className="text-extend-red" />
            </IconButton>
        </form>
    )
}
