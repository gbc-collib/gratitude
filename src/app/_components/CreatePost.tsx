import { createPost } from "../actions/posts";
import { Button } from '~/components/ui/button';
import { Input } from "~/components/ui/input";
export function CreatePost() {

    return (
        <form className="py-2" action={createPost}>
            <div className="flex items-center gap-1 w-full">
                <Input className=" text-extend-main-text border-extend-accent flex-grow rounded border-2" placeholder="I'm Grateful for..." name="content" />
                <Button variant="default" type="submit">Post</Button>
            </div>
        </form>
    )

}
