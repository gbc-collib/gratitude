'use client';
import { unfollowUser } from "../actions/users";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button } from '~/components/ui/button';

export function UnfollowButton({ target }: { target: string }) {

    return (
        <form action={unfollowUser}>
            <input type="hidden" name="target" value={target} />
            <Button variant="ghost" type="submit">
                <PersonRemoveIcon className="text-destructive-foreground" />
            </Button>
        </form>
    )
}
