import Post from "../components/Post";
import Header from "../components/Header";
import { useEffect, useState } from "react"

export default function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://blogic2.onrender.com/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])

    return (
        <>
            <Header />
            <div className="gif">
                <h2 className="trending">
                    Latest Blogs
                </h2>
                {posts.length > 0 && posts.map(post => (
                    <Post {...post} />
                ))}
            </div>

        </>
    )
}
