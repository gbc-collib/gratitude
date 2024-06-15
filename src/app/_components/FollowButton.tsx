'use client';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { followNewUser } from '../actions/users';
import { Button } from '~/components/ui/button';

export function FollowButton({ target }: { target: string },) {
    return (
        <form action={followNewUser}>
            <input type="hidden" name="target" value={target} />
            <Button variant="ghost" type="submit" className="">
                <PersonAddIcon className="" />
            </Button>
        </form>
    )
}
