import { useState } from "react"
import { Navigate } from "react-router"
import Editor from "./Editor"

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFile] = useState('')
    const [redirect, setRedirect] = useState(false)

    async function createNewPost(ev) {

        ev.preventDefault();

        const data = new FormData();
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('files', files[0])

        const response = await fetch('https://blogic2.onrender.com/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="title"
                className="postInput"
                placeholder={'Title'}
                value={title}
                onChange={ev => setTitle(ev.target.value)} />

            <input
                type="summary"
                className="postInput"
                placeholder={'Summary'}
                value={summary}
                onChange={ev => setSummary(ev.target.value)} />

            <input type="file"
                className="postInput"
                onChange={ev => setFile(ev.target.files)} />

            <Editor onChange={setContent} value={content}/>

            <button className="postButton">POST</button>
        </form>
    )
}
