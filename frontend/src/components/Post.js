import { format } from "date-fns";
import { Link } from "react-router-dom"

export default function Post({_id, title, summary, cover, content, createdAt, author }) {
    return (
        <div className="post">
            <div className="image">
                <Link to={'/post/'+_id}>
                    <img src={'https://blogic2.onrender.com/' + cover} />
                </Link>
            </div>
            <div className="texts">
                <Link to={'/post/'+_id}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a href="" className="author">{author.userName}</a>
                    <time style={{color:'#11D4AA'}}>{format(new Date(createdAt), 'MMM d, yyyy HH:MM')}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    )
}
