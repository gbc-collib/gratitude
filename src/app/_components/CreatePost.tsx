import { createPost } from "../actions/posts";
export function CreatePost() {

    return (
        <form className="py-2" action={createPost}>
            <div className="flex items-center gap-1 w-full">
                <input className="bg-extend-card-bg text-extend-main-text border-extend-accent flex-grow rounded border-2" placeholder="I'm Grateful for..." name="content" />
                <button className="bg-extend-card-bg rounded border px-1 border-extend-accent w-1/5" type="submit">Post</button>
            </div>
        </form>
    )

}
