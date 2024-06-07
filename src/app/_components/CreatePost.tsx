"use client";

import { useState } from "react"
import { createPost } from "~/utils/postsUtils";
export function CreatePost() {
    //SUBMIT FORM SERVER FUNCTION
    const [content, setContent] = useState("");

    const handleInputChange = (e: any) => {
        setContent(e.target.value);
    }

    const handleSubmit = async () => {
        if (!content) {
            //TODO INVALIDATE FORM
            return;
        } else {
            console.log(content);
            await createPost(content);
            setContent('');


        }
    }
    return (
        <div className="py-2">
            <div className="flex items-center gap-1 w-full">
                <input className="bg-extend-card-bg text-extend-main-text border-extend-accent flex-grow rounded border-2" placeholder="I'm Grateful for..." value={content} onChange={handleInputChange} />
                <button className="bg-extend-card-bg rounded border px-1 border-extend-accent border-2 w-1/5" onClick={handleSubmit}>Post</button>
            </div>
        </div>
    )

}
